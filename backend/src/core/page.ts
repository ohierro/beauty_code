export class Page {
  // page: number
  // size: number

  constructor(public page: number, public size: number) {}

  static with(page: number, size: number): Page {
    return new Page(page, size)
  }
}
