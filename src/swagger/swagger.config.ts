import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const initSwagger = (app: INestApplication) => {
    const config = new DocumentBuilder()
        .setTitle('API-BASE')
        .setDescription('The base API for future applications')
        .setVersion('1.0')
        .addSecurity('bearer',{
            type: 'http',
            scheme: 'bearer'
        })
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('api', app, document);
};