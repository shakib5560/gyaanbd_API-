<div align="center">

<img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" />
<img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" />
<img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" />
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
<img src="https://img.shields.io/badge/License-MIT-22c55e?style=for-the-badge" />

# GyaanBD API

**A production-ready Learning Management System backend — built for scale, secured by design.**

[Getting Started](#-getting-started) · [API Reference](#-api-reference) · [Tech Stack](#-tech-stack) · [Contributing](#-contributing)

</div>

---

## Overview

GyaanBD API is a robust LMS backend built on **NestJS**, designed with clean architecture principles and developer experience in mind. It handles user authentication, course management, file uploads, and email workflows — giving you a solid foundation to build a full-featured e-learning platform.

```
🔐 JWT Auth + OTP Email Verification
📚 Full Course & Category CRUD
🖼️  Thumbnail Uploads via Multer
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
| **Database** | [PostgreSQL](https://www.postgresql.org/) |
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
git clone https://github.com/shakib5560/gyaanbd_API-.git
cd gyaanbd_API-
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

### Course Management

| Method | Endpoint | Description | Access |
|---|---|---|---|
| `POST` | `/courses` | Create a course (supports thumbnail) | 🛡️ Admin |
| `GET` | `/courses` | List all courses | Public |
| `GET` | `/courses/:id` | Get course by ID | Public |
| `PATCH` | `/courses/:id` | Update course (supports thumbnail) | 🛡️ Admin |
| `DELETE` | `/courses/:id` | Delete course + auto-remove thumbnail | 🛡️ Admin |

### Category Management

| Method | Endpoint | Description | Access |
|---|---|---|---|
| `POST` | `/categories` | Create a new category | 🛡️ Admin |
| `GET` | `/categories` | List all categories | Public |

---

## File Uploads

Thumbnails are stored and served locally in the development environment.

```
Storage path : public/uploads/thumbnails/
Access URL   : http://localhost:3000/public/uploads/thumbnails/<filename>
```

**Testing uploads via Postman or Swagger:**

1. Set the request body type to `multipart/form-data`
2. Add text fields: `title`, `level`, `teacherId`, etc.
3. Add a file field named `thumbnail` and attach your image

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
├── courses/       # Course CRUD + thumbnail handling
├── categories/    # Category management
├── mail/          # Nodemailer + HTML templates
├── prisma/        # Prisma service & schema
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