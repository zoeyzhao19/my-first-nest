import { AggregateRoot } from "@libs/domain";
import { Role } from "../roles/Role";
import { Username } from "./Username";
import { Password } from "./Password";
import { Nickname } from "./Nickname";
import { Email } from "./Email";
import { Entity, ObjectId, ObjectIdColumn } from "typeorm";

@Entity()
export class User extends AggregateRoot {
  @ObjectIdColumn()
  public id: ObjectId;

  /**
   * 用户名
   */
  public username: Username;

  /**
   * 密码
   */
  public password: Password;

  /**
   * 昵称
   */
  public nickname: Nickname;

  /**
   * 邮箱
   */
  public email: Email;

  /**
   * 头像
   */
  public headPic: string;

  /**
   * 手机号
   */
  public phoneNumber: string;

  /**
   * 是否冻结
   */
  public isFrozen: boolean;

  /**
   * 是否是管理员
   */
  public isAdmin: boolean;

  /**
   * 创建时间
   */
  public createTime: Date;

  /**
   * 更新时间
   */
  public updateTime: Date

  /**
   * 所属角色
   */
  roles: Role[]

  constructor(
    username: Username,
    password: Password,
    nickname: Nickname,
    email: Email,
    id?: ObjectId,
  ) {
    super();
    this.username = username;
    this.password = password;
    this.nickname = nickname;
    this.email = email;
    this.id = id
  }

  static create(username: string, password: string, nickname: string, email: string) {
    const user = new User(
      new Username(username), 
      new Password(password), 
      new Nickname(nickname), 
      new Email(email)
    )
    user.createTime = new Date()
    user.updateTime = new Date()
    user.isAdmin = false
    user.isFrozen = false

    return user
  }

  toPrimitives() {
    
  }
}