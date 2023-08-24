import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository} from '@nestjs/typeorm'
import { User } from '../domain/users/User';
import { Like, MongoRepository} from 'typeorm'
import { ObjectId} from 'mongodb'
import { Username } from '../domain/users/Username';
import { Nickname } from '../domain/users/Nickname';
import { Password } from '../domain/users/Password';
import { Email } from '../domain/users/Email';
import { UserError } from '@errors/UserError';
import { Role } from 'src/domain/roles/Role';
import { EventbusService } from '@libs/eventbus';

@Injectable()
export class UserService {

  @InjectRepository(User)
  private userRepository: MongoRepository<User>

  @Inject(EventbusService)
  private eventBus: EventbusService

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
    
    this.eventBus.publish(user.getDomainEvents())
  }

  async updateRoles(user: User, roles: Role[]) {
    const id = new ObjectId(user.id)
    const existed = await this.userRepository.findOne({
      where: {
        _id: id
      }
    })

    if(!existed) {
      throw new UserError(UserError.UserNoExist)
    }

    user.setRoles(roles)
    await this.userRepository.save(user)
  }

  async login(username: string, password: string) {

    const user = await this.userRepository.findOne({
      where: {
        username: {
          value: username
        }
      }
    })

    if(!user) {
      throw new UserError(UserError.UserNoExist)
    }

    const passwordVo = Password.create(password)
    if(passwordVo.value !== user.password.value) {
      throw new UserError(UserError.PasswordError)
    }

    return user
  }

  async updatePassword(userId: string, oldPassword: string, newPassword: string) {
    const user = await this.userRepository.findOne({
      where: {
        _id: new ObjectId(userId)
      },
    })

    if(!user) {
      throw new UserError(UserError.UserNoExist)
    }

    const oldPasswordVo = Password.create(oldPassword)

    // https://github.com/typeorm/typeorm/issues/4268
    // user.password.equal(oldPasswordVo)
    if(!oldPasswordVo.equal(user.password)) {
      throw new UserError(UserError.OldPasswordError)
    }

    user.updatePassword(newPassword);

    await this.userRepository.save(user)
  }

  async freeze(userId: string) {
    const user = await this.userRepository.findOne({
      where: {
        _id: new ObjectId(userId)
      }
    })

    if(!user) {
      throw new UserError(UserError.UserNoExist)
    }

    if(user.isFrozen) {
      throw new UserError(UserError.UserAlreadyFrozen)
    }
    
    user.freeze()

    await this.userRepository.save(user)
  }

  async unfreeze(userId: string) {
    const user = await this.userRepository.findOne({
      where: {
        _id: new ObjectId(userId)
      }
    })

    if(!user) {
      throw new UserError(UserError.UserNoExist)
    }

    if(!user.isFrozen) {
      throw new UserError(UserError.UserAlreadyUnfrozen)
    }

    user.unfreeze()

    await this.userRepository.save(user)
  }

  async getList(pageNum: number, pageSize: number, username = '', email = '', nickname = '') {
    const condition: Record<string, any> = {};
      if(username) {
          condition.username = Like(`%${username}%`);   
      }
      if(nickname) {
          condition.nickName = Like(`%${nickname}%`); 
      }
      if(email) {
          condition.email = Like(`%${email}%`); 
      }
    const [users, total] = await this.userRepository.findAndCount({
      where: condition,
      skip: pageNum - 1,
      take: pageSize
    })

    return [users, total] as [User[], number]
  }

  async findUserByIds(userIds: string[]) {
    const users = await this.userRepository.find({
      where: {
        _id: {
          $in: userIds.map(id => new ObjectId(id))
        }
      }
    })

    return users
  }
}
