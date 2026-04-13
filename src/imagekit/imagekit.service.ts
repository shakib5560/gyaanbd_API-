import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import ImageKit from 'imagekit';

@Injectable()
export class ImagekitService {
  private imagekit: ImageKit;
  private readonly logger = new Logger(ImagekitService.name);

  constructor(private configService: ConfigService) {
    this.imagekit = new ImageKit({
      publicKey: this.configService.get<string>('IMAGEKIT_PUBLIC_KEY'),
      privateKey: this.configService.get<string>('IMAGEKIT_PRIVATE_KEY'),
      urlEndpoint: this.configService.get<string>('IMAGEKIT_URL_ENDPOINT'),
    });
  }

  async upload(file: Express.Multer.File, folder: string): Promise<{ url: string; fileId: string }> {
    try {
      const response = await this.imagekit.upload({
        file: file.buffer, // upload from buffer directly
        fileName: file.originalname,
        folder: folder,
      });
      return {
        url: response.url,
        fileId: response.fileId,
      };
    } catch (error) {
      this.logger.error('Failed to upload file to ImageKit', error);
      throw error;
    }
  }

  async delete(fileId: string): Promise<void> {
    try {
      if (fileId) {
        await this.imagekit.deleteFile(fileId);
      }
    } catch (error) {
      this.logger.error(`Failed to delete file from ImageKit with ID: ${fileId}`, error);
      // We don't throw here to prevent failing the entire record deletion just because file deletion failed
    }
  }
}
