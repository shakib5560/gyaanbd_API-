import { ValidationPipe, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import { Reflector } from '@nestjs/core';
import {RolesGuard} from "./common/guard/roles.guard";
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
    const logger = new Logger('Bootstrap');

    // Create NestJS app
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    const nodeEnv = configService.get<string>('NODE_ENV', 'development');

    // API Prefix
    app.setGlobalPrefix('api/v1.0');

    // -------------------------------
    // Security & Performance Middlewares
    // -------------------------------
    app.use(helmet());             // Secure HTTP headers
    app.use(compression());        // Response compression
    app.use(cookieParser());       // Parse cookies

    // Enable CORS
    const allowedOrigins = configService.get<string>('ALLOWED_ORIGINS', 'http://localhost:3000').split(',');
    app.enableCors({
        origin: allowedOrigins,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    });

    // -------------------------------
    // Global Validation Pipe
    // -------------------------------
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,             // Remove extra properties
            transform: true,             // Auto-transform payloads to DTO instances
            forbidNonWhitelisted: true,  // Throw error on unknown properties
        }),
    );

    const reflector = app.get(Reflector);

    app.useGlobalGuards(
        new RolesGuard(reflector),
    );

    // -------------------------------
    // Swagger / OpenAPI Setup
    // -------------------------------
    if (nodeEnv !== 'production') {
        const swaggerConfig = new DocumentBuilder()
            .setTitle('GyaanBD API')
            .setDescription('GyaanBD Learning Management System API documentation')
            .setVersion('1.0')
            .addBearerAuth() // JWT authentication in Swagger
            .build();

        const document = SwaggerModule.createDocument(app, swaggerConfig);
        SwaggerModule.setup('docs', app, document);
        logger.log('Swagger docs available at /docs');
    } else {
        logger.log('Swagger docs disabled in production');
    }

    // -------------------------------
    // Start Application
    // -------------------------------
    const port = configService.get<number>('PORT', 3000);
    await app.listen(port);
    logger.log(`Application is running on: http://localhost:${port} in ${nodeEnv} mode`);
}

bootstrap();