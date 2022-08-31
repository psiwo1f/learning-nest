import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TracksModule } from './tracks/tracks.module';
import { ConfigService } from '@nestjs/config';

@Module({
  // imports: [MongooseModule.forRoot('mongodb://localhost:27017/nest-db')],
  // imports: [MongooseModule.forRoot('mongodb://root:example@dev-db:27017/nest-db?authSource=admin')],
  // imports: [MongooseModule.forRoot('mongodb://root:example@dev-db:27017/nest-db')],
  // imports: [
  //   MongooseModule.forRootAsync({
  //     useFactory: (configService: ConfigService) => ({
  //       uri: configService.get<string>('DB_URI'),
  //     })
  //   }),
  // ],
  imports: [MongooseModule.forRoot('mongodb://root:example@dev-db:27017/nest-db'), TracksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
