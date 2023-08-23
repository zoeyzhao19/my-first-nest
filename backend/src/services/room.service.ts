import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from '../domain/rooms/Room';
import { Like, MongoRepository } from 'typeorm';

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
}
