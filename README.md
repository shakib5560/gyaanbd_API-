# GyaanBD API 🚀🎓

**GyaanBD API** is a robust, production-ready Learning Management System (LMS) Backend built with NestJS. It provides a solid foundation for managing users, courses, and educational content with a strong focus on security, user experience, and clean architecture.

## 📁 Media & Uploads (Development Environment)

In the current development setup, the project handles file uploads (like Course Thumbnails) locally.

- **Storage Location**: `public/uploads/thumbnails/`
- **Access URL**: `http://localhost:3000/public/uploads/thumbnails/[filename]`
- **Implementation**: Uses `Multer` for disk storage and `@nestjs/serve-static` to serve files.

> [!NOTE]
> This local storage system is designed for **Development and Testing**. When the project is moved to a **VPS** or Production environment in the future, it is recommended to transition to a cloud storage provider (like AWS S3 or Cloudinary) for better scalability and persistence.

## 🛠️ Tech Stack

- **Framework**: [NestJS](https://nestjs.com/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **File Uploads**: [Multer](https://github.com/expressjs/multer)
- **Static Files**: [@nestjs/serve-static](https://github.com/nestjs/serve-static)
- **Security**: [Helmet](https://helmetjs.github.io/), [Compression](https://github.com/expressjs/compression)
- **Documentation**: Swagger UI built-in at `/docs`

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
PORT=3000
```

### 3. Database Setup
```bash
npx prisma generate
npx prisma db push
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

### 🔐 Authentication & Profile
| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- |
| POST | `/auth/signup` | Register new user | Public |
| POST | `/auth/verify-email` | Verify email with OTP | Public |
| POST | `/auth/login` | Login and get tokens | Public |
| POST | `/auth/refresh` | Get new access token | Public |
| GET | `/auth/me` | Get profile | Private |
| POST | `/auth/logout` | Logout | Private |

### 📚 Course Management
| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- |
| POST | `/courses` | Create course (supports thumbnail upload) | Admin |
| GET | `/courses` | List all courses | Public |
| GET | `/courses/:id` | Get course details | Public |
| PATCH | `/courses/:id` | Update course (supports thumbnail update) | Admin |
| DELETE | `/courses/:id` | Remove course (auto-deletes thumbnail file) | Admin |

### 📁 Category Management
| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- |
| POST | `/categories` | Create new category | Admin |
| GET | `/categories` | List all categories | Public |

## 🧪 Testing File Uploads (Postman/Swagger)
To test thumbnail uploads:
1.  Set Request type to `multipart/form-data`.
2.  Add text fields for `title`, `level`, `teacherId`, etc.
3.  Add a file field named `thumbnail` and choose your image.

## 📧 Email Templates
The system includes professional HTML templates for:
- Account Verification
- Password Reset Instructions

## 📄 License
This project is open-source and [MIT licensed](LICENSE).
