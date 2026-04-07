# GyaanBD API 🚀🎓

**GyaanBD API** is a robust, production-ready Learning Management System (LMS) Backend built with NestJS. It provides a solid foundation for managing users, courses, and educational content with a strong focus on security, user experience, and clean architecture.

## ✨ Core LMS Features & Capabilities

- **🛡️ Secure Authentication**: Full JWT-based authentication flow (Login, Signup, JWT Validation).
- **🔄 Session Management**: Dual Token System with Access tokens (short-lived) and Refresh tokens (long-lived) for seamless user experience.
- **📧 Professional Email OTP**: Real-time email verification and password reset using responsive HTML templates.
- **🔒 Security First**: Server-side token blacklisting and refresh token revocation to ensure sessions are properly terminated. Role-based access control readiness for Students, Instructors, and Admins.
- **🗄️ Scalable Database Design**: Optimized PostgreSQL schema using Prisma ORM, starting with User and EmailOtp models and expandable for Courses, Enrollments, and Progress tracking.
- **🧪 Validation & Protection**: Strict input validation using `class-validator`, password hashing with `bcrypt`, and secure headers with `helmet`.

## 🛠️ Tech Stack

- **Framework**: [NestJS](https://nestjs.com/) - A progressive Node.js framework
- **ORM**: [Prisma](https://www.prisma.io/) - Next-generation Node.js and TypeScript ORM
- **Database**: [PostgreSQL](https://www.postgresql.org/) - Relational database
- **Email**: [Nodemailer](https://nodemailer.com/) - Gmail SMTP configured for sending OTP and alerts
- **Security**: [Passport.js](https://www.passportjs.org/), [JWT](https://jwt.io/), [Bcrypt](https://github.com/kelektiv/node.bcrypt.js)
- **Package Manager**: [pnpm](https://pnpm.io/)
- **Documentation**: Swagger UI built-in for API testing

## 🚀 Getting Started

### 1. Clone & Install
```bash
git clone https://github.com/shakib5560/gyaanbd_API-.git
cd gyaanbd_API-
pnpm install
```

### 2. Environment Variables
Create a `.env` file referencing `sample.env`:
```env
DATABASE_URL="postgresql://user:pass@localhost:5433/nest?schema=public"
JWT_SECRET="your_ultra_secret_key"
MAIL_USER="your-email@gmail.com"
MAIL_PASS="your-app-password"
```

### 3. Database Setup
```bash
pnpm prisma migrate dev
```

### 4. Run Application
```bash
# development
pnpm run start:dev

# production
pnpm run build
pnpm run start:prod
```

## 📡 API Endpoints

### Authentication & Authorization
| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- |
| POST | `/auth/signup` | Register new user (Student/Instructor) | Public |
| POST | `/auth/verify-email` | Verify email with OTP | Public |
| POST | `/auth/login` | Login and get tokens | Public |
| POST | `/auth/refresh` | Get new access token | Public |
| POST | `/auth/forgot-password` | Request password reset OTP | Public |
| POST | `/auth/reset-password` | Reset password with OTP | Public |
| GET | `/auth/me` | Get current user profile | Private |
| POST | `/auth/logout` | Logout and revoke tokens | Private |

*(Note: Course management, enrollment, and content-delivery endpoints will be added to the roadmap context).*

## 📧 Email Templates
The system includes professional HTML templates for:
- Student/Instructor Account Verification
- Password Reset Instructions

## 📄 License
This project is open-source and [MIT licensed](LICENSE).
