import { UniqueEntityId } from './UniqueEntityId'

function isEntity(v: any): v is Entity {
  return v instanceof Entity
}

export abstract class Entity {
  readonly id: UniqueEntityId

  constructor(id?: string) {
    this.id = new UniqueEntityId(id)
  }

  // Entities are compared based on their referential
  // equality.
  public equals(object?: Entity): boolean {
    if (object == null)
      return false

    if (this === object)
      return true

    if (!isEntity(object))
      return false

    return this.id.equals(object.id)
  }
}
