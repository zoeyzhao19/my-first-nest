import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm'
import { User } from '../domain/users/User';
import {Repository} from 'typeorm'

@Injectable()
export class UserService {

  @InjectRepository(User)
  private userRepository: Repository<User>

  async register({username, password, email, nickname}: {username: string, password: string, email: string, nickname:string}) {
    const user = User.create(username, password, nickname, email)
    await this.userRepository.save(user)
  }
}
