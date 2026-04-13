import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>GyaanBD API | Welcome</title>
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&display=swap" rel="stylesheet">
        <style>
            :root {
                --primary: #6366f1;
                --primary-dark: #4f46e5;
                --bg: #0f172a;
                --text: #f8fafc;
                --text-muted: #94a3b8;
            }
            body {
                margin: 0;
                font-family: 'Outfit', sans-serif;
                background-color: var(--bg);
                color: var(--text);
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100vh;
                overflow: hidden;
            }
            .container {
                text-align: center;
                padding: 3rem;
                background: rgba(255, 255, 255, 0.05);
                backdrop-filter: blur(12px);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 2rem;
                box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
                max-width: 600px;
                animation: fadeIn 1s ease-out;
            }
            h1 {
                font-size: 3.5rem;
                font-weight: 700;
                margin-bottom: 0.5rem;
                background: linear-gradient(to right, #818cf8, #c084fc);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
            p {
                font-size: 1.2rem;
                color: var(--text-muted);
                margin-bottom: 2.5rem;
            }
            .badge {
                display: inline-block;
                padding: 0.5rem 1rem;
                background: rgba(99, 102, 241, 0.2);
                color: #818cf8;
                border-radius: 9999px;
                font-size: 0.875rem;
                font-weight: 600;
                margin-bottom: 1.5rem;
                border: 1px solid rgba(99, 102, 241, 0.3);
            }
            .btn {
                display: inline-block;
                padding: 1rem 2.5rem;
                background-color: var(--primary);
                color: white;
                text-decoration: none;
                border-radius: 1rem;
                font-weight: 600;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                box-shadow: 0 10px 15px -3px rgba(99, 102, 241, 0.4);
            }
            .btn:hover {
                background-color: var(--primary-dark);
                transform: translateY(-2px);
                box-shadow: 0 20px 25px -5px rgba(99, 102, 241, 0.5);
            }
            .footer {
                margin-top: 3rem;
                font-size: 0.875rem;
                color: var(--text-muted);
            }
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="badge">Running Production v1.0.0</div>
            <h1>GyaanBD API</h1>
            <p>Welcome to the production backbone of GyaanBD LMS. Secure, scalable, and ready to serve your learning journey.</p>
            <a href="/docs" class="btn">Explore Documentation</a>
            <div class="footer">
                &copy; 2026 GyaanBD. Designed with &hearts; for creators and students.
            </div>
        </div>
    </body>
    </html>
    `;
  }
}