import { v4 as uuid4 } from 'uuid'
import { ValueObject } from './ValueObject'

export class Uuid extends ValueObject<string> {
  constructor(value?: string) {
    super(value || uuid4())
  }
}
