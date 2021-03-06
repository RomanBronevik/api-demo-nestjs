import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);
  const logger = new Logger('main');

  if (process.env.NODE_ENV === 'development') {
    app.enableCors();
  } else {
    app.enableCors();
    //   app.enableCors({ origin: serverConfig.origin });
    //   logger.log(`Accepting requests from origin "${serverConfig.origin}"`);
  }

  // app.setGlobalPrefix(configService.get('URL_PREFIX'));

  await app.listen(configService.get('PORT'));
  logger.log(`Application listening on port ${configService.get('PORT')}`);

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
