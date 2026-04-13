<div align="center">

<img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" />
<img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" />
<img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" />
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
<img src="https://img.shields.io/badge/License-MIT-22c55e?style=for-the-badge" />

# GyaanBD API

**A production-ready Learning Management System backend — built for scale, secured by design.**

[Getting Started](#-getting-started) · [API Reference](#-api-reference) · [Tech Stack](#-tech-stack) · [Deployment](#-deployment)
<br/>

[![Live API](https://img.shields.io/badge/Live_API-gyaanbd--api.onrender.com-6366f1?style=for-the-badge&logo=render&logoColor=white)](https://gyaanbd-api.onrender.com)
[![API Documentation](https://img.shields.io/badge/Documentation-Swagger_UI-06b6d4?style=for-the-badge&logo=swagger&logoColor=white)](https://gyaanbd-api.onrender.com/docs)
[![Build Status](https://img.shields.io/badge/Build-Passing-22c55e?style=for-the-badge)](https://gyaanbd-api.onrender.com/docs)

</div>

---

## Overview

GyaanBD API is a robust LMS backend built on **NestJS**, designed with clean architecture principles and developer experience in mind. It handles user authentication, course content management (Courses, Modules, Lessons), file uploads, and email workflows — giving you a solid foundation to build a full-featured e-learning platform.

```
🔐 JWT Auth + OTP Email Verification
📚 Full Content CRUD (Courses, Categories, Modules, Lessons)
📝 Assessments (Assignments & MCQs)
⭐ Course & Teacher Reviews (Paid students only)
🖼️  Multimedia Uploads (Thumbnails & Lesson Media) via Multer
📧 Transactional Email Templates
📖 Swagger Docs at /docs
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [NestJS](https://nestjs.com/) |
| **Language** | TypeScript |
| **ORM** | [Prisma](https://www.prisma.io/) |
| **Database** | [PostgresSQL](https://www.postgresql.org/) |
| **File Uploads** | [Multer](https://github.com/expressjs/multer) + [@nestjs/serve-static](https://github.com/nestjs/serve-static) |
| **Security** | [Helmet](https://helmetjs.github.io/) + [Compression](https://github.com/expressjs/compression) |
| **Documentation** | Swagger UI (`/docs`) |
| **Package Manager** | pnpm |

---

## Getting Started

### Prerequisites

- Node.js `v18+`
- PostgreSQL
- pnpm (`npm install -g pnpm`)

### 1 · Clone & Install

```bash
git clone https://github.com/shakib5560/gyaanbd_API.git
cd gyaanbd_API
pnpm install
```

### 2 · Configure Environment

Create a `.env` file in the project root (see `sample.env` for reference):

```env
DATABASE_URL="postgresql://user:pass@localhost:5433/nest?schema=public"
JWT_SECRET="your_ultra_secret_key"
MAIL_USER="your-email@gmail.com"
MAIL_PASS="your-app-password"
PORT=3000
```

### 3 · Set Up the Database

```bash
npx prisma generate
npx prisma db push
```

### 4 · Run the Server

```bash
# Development (hot-reload)
pnpm run start:dev

# Production
pnpm run build
pnpm run start:prod
```

Once running, visit **`http://localhost:3000/docs`** for the interactive Swagger UI.

---

## Deployment

### Docker (Recommended)

This project includes a multi-stage Docker build for optimized production images.

1. **Build the image**:
   ```bash
   docker build -t gyaanbd-api .
   ```

2. **Run the container**:
   ```bash
   docker run -p 3001:3001 \
     --env-file .env \
     -e NODE_ENV=production \
     gyaanbd-api
   ```

### Production Configuration

Ensure the following environment variables are set in your production environment:

| Variable | Description |
|---|---|
| `NODE_ENV` | Set to `production` to disable Swagger and enable production optimizations. |
| `ALLOWED_ORIGINS` | Comma-separated list of allowed CORS origins (e.g., `https://your-app.com`). |
| `DATABASE_URL` | Your production PostgreSQL connection string. |
| `JWT_SECRET` | A strong, random string for JWT signing. |
| `PORT` | The port your application will listen on (default: `3001`). |

> [!IMPORTANT]
> Swagger documentation is automatically disabled when `NODE_ENV=production` for security.

---

## API Reference

### Authentication & Profile

| Method | Endpoint | Description | Access |
|---|---|---|---|
| `POST` | `/auth/signup` | Register a new user | Public |
| `POST` | `/auth/verify-email` | Verify email with OTP | Public |
| `POST` | `/auth/login` | Login and receive JWT tokens | Public |
| `POST` | `/auth/refresh` | Rotate access token | Public |
| `GET` | `/auth/me` | Get authenticated user profile | 🔒 Private |
| `POST` | `/auth/logout` | Invalidate session | 🔒 Private |

### Course & Content Management

| Method | Endpoint | Description | Access |
|---|---|---|---|
| `POST` | `/categories` | Create a new category (supports thumbnail) | 🛡️ Admin |
| `GET` | `/categories` | List all categories | Public |
| `POST` | `/courses` | Create a course (supports thumbnail) | 🛡️ Admin/Teacher |
| `GET` | `/courses` | List all courses | Public |
| `GET` | `/courses/:id` | Get course by ID (includes modules/lessons) | Public |
| `PATCH` | `/courses/:id` | Update course (supports thumbnail) | 🛡️ Admin/Teacher |
| `DELETE` | `/courses/:id` | Delete course + auto-remove media | 🛡️ Admin/Teacher |
| `POST` | `/modules` | Create a course module | 🛡️ Admin/Teacher |
| `GET` | `/modules` | List all modules | Public |
| `GET` | `/modules/:id` | Get module by ID | Public |
| `PATCH` | `/modules/:id` | Update module | 🛡️ Admin/Teacher |
| `DELETE` | `/modules/:id` | Delete module | 🛡️ Admin/Teacher |
| `POST` | `/lessons` | Create a lesson (supports video/media upload) | 🛡️ Admin/Teacher |
| `GET` | `/lessons` | List all lessons | Public |
| `GET` | `/lessons/:id` | Get lesson by ID | Public |
| `PATCH` | `/lessons/:id` | Update lesson (supports media update) | 🛡️ Admin/Teacher |
| `DELETE` | `/lessons/:id` | Delete lesson + auto-remove media | 🛡️ Admin/Teacher |
| `POST` | `/assignments` | Create a course assignment | 🛡️ Admin/Teacher |
| `GET` | `/assignments` | List all assignments | Public |
| `GET` | `/assignments/:id` | Get assignment by ID | Public |
| `PATCH` | `/assignments/:id` | Update assignment | 🛡️ Admin/Teacher |
| `DELETE` | `/assignments/:id` | Delete assignment | 🛡️ Admin/Teacher |
| `POST` | `/mcq` | Create a multiple choice question | 🛡️ Admin/Teacher |
| `GET` | `/mcq` | List all MCQs | Public |
| `GET` | `/mcq/:id` | Get MCQ by ID | Public |
| `PATCH` | `/mcq/:id` | Update MCQ | 🛡️ Admin/Teacher |
| `DELETE` | `/mcq/:id` | Delete MCQ | 🛡️ Admin/Teacher |
| `POST` | `/reviews/course` | Submit a course review | 🔒 Paid Student |
| `POST` | `/reviews/teacher` | Submit a teacher review | 🔒 Paid Student |
| `GET` | `/reviews/course/:id` | Get reviews + avg rating for course | Public |
| `GET` | `/reviews/teacher/:id` | Get reviews + avg rating for teacher | Public |

---

## File Uploads

GyaanBD handles multimedia uploads locally in the development environment.

| Type | Field Name | Storage Path | Access URL |
|---|---|---|---|
| **Thumbnails** | `thumbnail` | `public/uploads/thumbnails/` | `.../public/uploads/thumbnails/<name>` |
| **Lesson Media** | `video` | `public/uploads/lessons/` | `.../public/uploads/lessons/<name>` |

**Testing uploads via Postman or Swagger:**

1. Set the request body type to `multipart/form-data`
2. Add necessary text fields (e.g., `title`, `courseId`, `moduleId`)
3. Add the file field (`thumbnail` or `video`) and attach your file

> [!NOTE]
> The local storage setup is intended for **development and testing only**. For production deployments, migrate to a cloud storage provider such as **AWS S3** or **Cloudinary** for persistence, redundancy, and scalability.

---

## Email Templates

GyaanBD ships with professionally designed, responsive HTML email templates for:

- ✅ **Account Verification** — OTP-based email confirmation
- 🔑 **Password Reset** — Secure reset instructions with expiry

---

## Project Structure

```
src/
├── auth/          # JWT strategy, guards, OTP flows
├── category/      # Category management
├── course/        # Course CRUD + thumbnail handling
├── module/        # Module management
├── lesson/        # Lesson CRUD + media handling
├── mail/          # Nodemailer + HTML templates
├── prisma/        # Prisma service & schema
├── assignment/    # Assignment CRUD
├── mcq/           # MCQ CRUD
├── review/        # Course & Teacher reviews
└── main.ts        # App bootstrap, Helmet, Swagger
```

---

## Contributing

Contributions are welcome! To get started:

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push to your branch: `git push origin feat/your-feature`
5. Open a Pull Request

Please follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages.

---

## License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for full terms.

---

<div align="center">

Made with ❤️ by [shakib5560](https://github.com/shakib5560)

</div>