import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
    private transporter: nodemailer.Transporter;
    private readonly logger = new Logger(MailService.name);

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });
    }

    private buildOtpEmail(opts: {
        title: string;
        preheader: string;
        heading: string;
        bodyText: string;
        otp: string;
        footerNote: string;
        accentColor: string;
    }): string {
        return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${opts.title}</title>
</head>
<body style="margin:0;padding:0;background-color:#f0f4f8;font-family:'Segoe UI',Arial,sans-serif;">
  <div style="display:none;max-height:0;overflow:hidden;">${opts.preheader}</div>

  <!-- Wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f4f8;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

          <!-- Header -->
          <tr>
            <td align="center" style="background:${opts.accentColor};border-radius:12px 12px 0 0;padding:32px 40px;">
              <div style="display:inline-block;background:rgba(255,255,255,0.15);border-radius:50%;padding:14px;margin-bottom:12px;">
                <span style="font-size:28px;">🎓</span>
              </div>
              <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:0.5px;">Learning App</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#ffffff;padding:40px;">
              <h2 style="margin:0 0 12px;color:#1a202c;font-size:20px;font-weight:700;">${opts.heading}</h2>
              <p style="margin:0 0 28px;color:#4a5568;font-size:15px;line-height:1.7;">${opts.bodyText}</p>

              <!-- OTP Box -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding:8px 0 32px;">
                    <div style="display:inline-block;background:#f7fafc;border:2px dashed ${opts.accentColor};border-radius:12px;padding:20px 48px;">
                      <p style="margin:0 0 4px;color:#718096;font-size:11px;font-weight:600;letter-spacing:2px;text-transform:uppercase;">Your OTP Code</p>
                      <p style="margin:0;color:${opts.accentColor};font-size:40px;font-weight:800;letter-spacing:12px;font-family:'Courier New',monospace;">${opts.otp}</p>
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Expiry note -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:#fffbeb;border-left:4px solid #f6ad55;border-radius:0 8px 8px 0;padding:12px 16px;margin-bottom:28px;">
                    <p style="margin:0;color:#92400e;font-size:13px;">⏱ This code will expire in <strong>10 minutes</strong>. Do not share it with anyone.</p>
                  </td>
                </tr>
              </table>

              <p style="margin:28px 0 0;color:#718096;font-size:13px;line-height:1.7;">
                If you did not request this, you can safely ignore this email. Your account security is important to us.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f7fafc;border-radius:0 0 12px 12px;padding:24px 40px;text-align:center;border-top:1px solid #e2e8f0;">
              <p style="margin:0 0 4px;color:#a0aec0;font-size:12px;">${opts.footerNote}</p>
              <p style="margin:0;color:#cbd5e0;font-size:11px;">© ${new Date().getFullYear()} Learning App. All rights reserved.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
    }

    async sendVerificationOtp(email: string, otp: string) {
        try {
            await this.transporter.sendMail({
                from: `"Learning App" <${process.env.MAIL_USER}>`,
                to: email,
                subject: '✅ Your Account Verification OTP',
                text: `Your OTP for account verification is: ${otp}. It will expire in 10 minutes.`,
                html: this.buildOtpEmail({
                    title: 'Account Verification OTP',
                    preheader: `Your verification code is ${otp} — valid for 10 minutes.`,
                    heading: 'Verify Your Email Address',
                    bodyText: 'Welcome to <strong>Learning App</strong>! Use the one-time code below to verify your email address and activate your account.',
                    otp,
                    footerNote: 'You received this because you signed up for Learning App.',
                    accentColor: '#4f46e5',
                }),
            });
            this.logger.log(`Verification OTP sent to ${email}`);
        } catch (error) {
            this.logger.error(`Error sending verification email: ${error.message}`);
            throw new Error('Could not send verification email.');
        }
    }

    async sendPasswordResetOtp(email: string, otp: string) {
        try {
            await this.transporter.sendMail({
                from: `"Learning App" <${process.env.MAIL_USER}>`,
                to: email,
                subject: '🔐 Your Password Reset OTP',
                text: `Your OTP to reset your password is: ${otp}. It will expire in 10 minutes.`,
                html: this.buildOtpEmail({
                    title: 'Password Reset OTP',
                    preheader: `Your password reset code is ${otp} — valid for 10 minutes.`,
                    heading: 'Reset Your Password',
                    bodyText: 'We received a request to reset your <strong>Learning App</strong> password. Use the one-time code below to proceed. If this wasn\'t you, please ignore this email.',
                    otp,
                    footerNote: 'You received this because a password reset was requested for your account.',
                    accentColor: '#dc2626',
                }),
            });
            this.logger.log(`Password reset OTP sent to ${email}`);
        } catch (error) {
            this.logger.error(`Error sending password reset email: ${error.message}`);
            throw new Error('Could not send password reset email.');
        }
    }
}
