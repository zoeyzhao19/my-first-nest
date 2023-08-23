import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from '../domain/rooms/Room';
import { ClientSession, Like, MongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { RoomStatus } from '@shared/status';
import { RoomError } from '@errors/RoomError';

@Injectable()
export class RoomService {

  @InjectRepository(Room)
  private roomRepository: MongoRepository<Room>

  async getList(pageNum: number, pageSize: number, name = '') {
    const condition: Record<string, any> = {};
      if(name) {
          condition.name = Like(`%${name}%`);   
      }

    const [rooms, total] = await this.roomRepository.findAndCount({
      where: condition,
      skip: pageNum - 1,
      take: pageSize
    })

    return [rooms, total] as [Room[], number]
  }

  async bookRoom(roomId: string, session: ClientSession) {
    let room = await this.roomRepository.findOne({
      where: {
        _id: new ObjectId(roomId)
      }
    })

    if(!room) {
      throw new RoomError(RoomError.RoomNoExisted)
    }

    if(room.state.status !== RoomStatus.Available) {
      throw new RoomError(RoomError.RoomNoAvailable)
    }
    
    room = Room.fromPrimitive(room.id, room.name, room.scale, room.state.status)

    room.book()

    await this.roomRepository.updateOne({
      _id: new ObjectId(room.id)
    }, {$set: room}, {session})

    return room
  }
}
