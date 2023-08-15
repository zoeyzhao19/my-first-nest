import { AggregateRoot } from "@libs/domain";
import { Code } from "./Code";

export class Permission extends AggregateRoot {
  /**
   * 权限码
   */
  code: Code;

  /**
   * 权限描述
   */
  description: string;

  constructor(code: Code, description: string, id?: string) {
    super(id);
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