import { v4 as uuidv4 } from 'uuid'
import { Identifier } from './Identifier'

export class UniqueEntityId extends Identifier<string | number> {
  constructor(id?: string) {
    super(id || uuidv4 ())
  }
}
