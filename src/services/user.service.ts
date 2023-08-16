import { Inject, Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm'
import { User } from '../domain/users/User';
import { MongoRepository} from 'typeorm'
import { Username } from '../domain/users/Username';
import { Nickname } from '../domain/users/Nickname';
import { Password } from '../domain/users/Password';
import { Email } from '../domain/users/Email';
import { UserError } from '@errors/UserError';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserRegisteredDomainEvent } from 'src/domain/users/events/UserRegisteredDomainEvent';

@Injectable()
export class UserService {

  @InjectRepository(User)
  private userRepository: MongoRepository<User>

  @Inject(EventEmitter2)
  private eventEmitter: EventEmitter2

  async register({username, password, email, nickname}: {username: string, password: string, email: string, nickname:string}) {
    const usernameVo = Username.create(username)
    const passwordVo = Password.create(password)
    const nicknameVo = Nickname.create(nickname)
    const emailVo = Email.create(email)
    const existed = await this.userRepository.findOne({
      where: {
        $or: [
          {
            username: {
              value: usernameVo.value
            } 
          },
          {
            email: {
              value: emailVo.value
            }
          }  
        ]
      }
    })

    if(existed) {
      throw new UserError(UserError.UsernameOrEmailExisted, username, email)
    }

    const user = User.create(usernameVo, passwordVo, nicknameVo, emailVo)
    await this.userRepository.save(user)
    
    this.eventEmitter.emit(UserRegisteredDomainEvent.EVENT_NAME, user.pullDomainEvents())
  }
}
