import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';
import { SwaggerTheme } from 'swagger-themes';

export const initSwagger = (app: INestApplication) => {
    const config = new DocumentBuilder()
        .setTitle('API-BASE')
        .setDescription('The base API for future applications')
        .setVersion('1.0')
        .addSecurity('bearer', {
            type: 'http',
            scheme: 'bearer'
        })
        .addBearerAuth()
        .build();

    const theme = new SwaggerTheme('v3');
    const customOptions: SwaggerCustomOptions = {
        swaggerOptions: {
            persistAuthorization: true,
            docExpansion: 'list',
            filter: true,
            ignoreGlobalPrefix: false,
        },
        customCss: theme.getBuffer('dark'),
        customSiteTitle: 'LTV-CV360',
    };
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document, customOptions);

};