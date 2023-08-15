import { AggregateRoot } from "@libs/domain";
import { Permission } from "../permissions/Permission";

export class Role extends AggregateRoot {
  public name: string;

  public permissions: Permission[];

  constructor(name: string, permissions: Permission[], id?: string) {
    super(id);
    this.name = name;
    this.permissions = permissions;
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