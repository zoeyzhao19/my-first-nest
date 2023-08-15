import { AggregateRoot } from "@libs/domain";
import { Permission } from "../permissions/Permission";
import { Entity, ObjectId, ObjectIdColumn } from "typeorm";

@Entity()
export class Role extends AggregateRoot {
  @ObjectIdColumn()
  public id: ObjectId;

  public name: string;

  public permissions: Permission[];

  constructor(name: string, permissions: Permission[], id?: ObjectId) {
    super()
    this.name = name;
    this.permissions = permissions;
    this.id = id
  }

  // static fromPrimitives(plainData: {
  //   id: string
  //   name: string
  //   permissions: {
  //     id: string
  //     code: string
  //     description: string
  //   }[]
  // }): Role {
  //   const role = new Role(
  //     plainData.name,
  //     plainData.permissions.map(item => Permission.fromPrimitives(item)),
  //     plainData.id,
  //   )
  //   return role
  // }

  toPrimitives() {
    return {
      id: this.id.toString(),
      name: this.name,
      permissions: this.permissions.map(permission => permission.toPrimitives()),
    }
  }
  
}