export interface IMessenger {
  openThreads: number[]
  threads: IThread[] | undefined
}

export interface IThread {
  createdAt: Date
  id: number
  latestMessage: IMessage
  messages: IMessage[]
  newMessage: boolean
  participants: IParticipant[]
  updatedAt: Date
}

export interface IMessage {
  content: string
  createdAt: Date
  id: number
  new: boolean
  participant: IParticipant
  thread: IThread
  updatedAt: Date
}

export interface IParticipant {
  createdAt: Date
  id: number
  updatedAt: Date
  userId: number
}

export interface ICreateMessageDto {
  content: string
  threadId: number
}

export interface ICreateThreadDto {
  firstMessageContent: string
  participants: IParticipant[]
}
