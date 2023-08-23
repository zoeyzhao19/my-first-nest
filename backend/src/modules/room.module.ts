import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomService } from '@services/room.service';
import { Room } from '../domain/rooms/Room';
import { RoomController } from '../controllers/room.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Room])],
  providers: [RoomService],
  controllers: [RoomController],
  exports: []
})
export class RoomModule {}
