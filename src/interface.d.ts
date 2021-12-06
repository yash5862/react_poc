interface IContact {
    assignee: any
    chats: Array<any>
    check: boolean
    id: number
    messagesReceived: number
    messagesSent: number
    name: string
    phoneNumber: string
    platformNames: Array<any>
    tags: Array<any>
    type: string
  }

  interface ITages {
    name:String
    filters:Object<String>
  }
