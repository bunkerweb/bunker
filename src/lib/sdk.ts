export class SDK {
  // @ts-ignore
  private id: string
  constructor(id: string) {
    this.id = id
  }
}


export function createSDK(id: string) {
  return new SDK(id)
}