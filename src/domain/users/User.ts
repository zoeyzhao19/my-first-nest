import { AggregateRoot } from "@libs/domain";
import { Role } from "../roles/Role";
import { Username } from "./Username";
import { Password } from "./Password";
import { Nickname } from "./Nickname";
import { Email } from "./Email";
import { Column, Entity, ObjectId, ObjectIdColumn } from "typeorm";
import { UserRegisteredDomainEvent } from "./events/UserRegisteredDomainEvent";

@Entity({
  name: 'users'
})
export class User extends AggregateRoot {
  @ObjectIdColumn()
  public id: ObjectId;

  /**
   * 用户名
   */
  @Column()
  public username: Username;

  /**
   * 密码
   */
  @Column()
  public password: Password;

  /**
   * 昵称
   */
  @Column()
  public nickname: Nickname;

  /**
   * 邮箱
   */
  @Column()
  public email: Email;

  /**
   * 头像
   */
  @Column()
  public headPic: string;

  /**
   * 手机号
   */
  @Column()
  public phoneNumber: string;

  /**
   * 是否冻结
   */
  @Column()
  public isFrozen: boolean;

  /**
   * 是否是管理员
   */
  @Column()
  public isAdmin: boolean;

  /**
   * 创建时间
   */
  @Column()
  public createTime: Date;

  /**
   * 更新时间
   */
  @Column()
  public updateTime: Date

  /**
   * 所属角色
   */
  @Column()
  roles: Role[]

  constructor(
    username: Username,
    password: Password,
    nickname: Nickname,
    email: Email,
  ) {
    super();
    this.username = username;
    this.password = password;
    this.nickname = nickname;
    this.email = email;
  }

  static create(username: Username, password: Password, nickname: Nickname, email: Email) {
    const user = new User(
      username, 
      password, 
      nickname, 
      email
    )
    user.createTime = new Date()
    user.updateTime = new Date()
    user.isAdmin = false
    user.isFrozen = false

    user.addDomainEvent(new UserRegisteredDomainEvent(user))

    return user
  }

  setRoles(roles: Role[]) {
    this.roles = roles
    this.updateTime = new Date()
  }

  toPrimitives() {
    
  }
}