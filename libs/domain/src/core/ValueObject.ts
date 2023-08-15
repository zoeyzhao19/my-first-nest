export abstract class ValueObject<T> {
  readonly value: T

  constructor(value: T) {
    this.value = value
  }

  public equal(vo?: ValueObject<T>): boolean {
    if (vo == null)
      return false
    return JSON.stringify(this.value) === JSON.stringify(vo.value)
  }
}
