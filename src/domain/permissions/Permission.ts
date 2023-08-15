import { AggregateRoot } from "@libs/domain";
import { Code } from "./Code";
import { Entity, ObjectId, ObjectIdColumn } from "typeorm";

@Entity()
export class Permission extends AggregateRoot {

  @ObjectIdColumn()
  public id: ObjectId;
  /**
   * 权限码
   */
  code: Code;

  /**
   * 权限描述
   */
  description: string;

  constructor(code: Code, description: string) {
    super();
    this.code = code;
    this.description = description;
  }

  // static fromPrimitives(plainData: {
  //   id: string
  //   code: string
  //   description: string
  // }): Permission {
  //   const permission = new Permission(
  //     new Code(plainData.code),
  //     plainData.description,
  //     plainData.id,
  //   )
  //   return permission
  // }

  toPrimitives() {
    return {
      id: this.id.toString(),
      code: this.code,
      description: this.description,
    }
  }
}