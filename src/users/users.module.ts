import { Module } from '@nestjs/common';
import { UsersController } from './controller/users.controller';
import { UsersService } from './sevice/users.service';

@Module({
  imports: [UsersModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
