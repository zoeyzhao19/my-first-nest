import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomService } from '@services/room.service';
import { Room } from '../domain/rooms/Room';
import { RoomController } from '../controllers/room.controller';
import { GetRoomQueryHandler } from '@applications/room/queries/GetRoomQueryHandler';

@Module({
  imports: [TypeOrmModule.forFeature([Room])],
  controllers: [RoomController],
  providers: [
    RoomService,

    GetRoomQueryHandler
  ],
  exports: [RoomService]
})
export class RoomModule {}
