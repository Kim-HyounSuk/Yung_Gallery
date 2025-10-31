export interface Manager {
  email: string
  name: string
  isSuper?: boolean
}

export interface ManagerMap {
  [key: string]: Manager[]
}

export interface Attachment {
  filename: string
  content: Buffer
}
