import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

/**
 * The entry point for the application.
 * @description This function creates and starts the NestJS application, sets up Swagger API documentation, and listens on a specified port.
 */
async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);

    const config = new DocumentBuilder()
      .setTitle('Inventory Management System') 
      .setDescription('API documentation for managing items')
      .setVersion('2.0')
      .build(); 
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, documentFactory);

    const port = +configService.get('INTERNAL_APP_PORT') || 3000;
    await app.listen(port);
}
bootstrap();
