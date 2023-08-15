export class AppError extends Error {
  constructor(message: string, ...replacers: string[]) {
    for (const replacer of replacers)
      message = message.replace(/\{.*?\}/, replacer)
    super(message)
    this.name = this.constructor.name
  }
}
