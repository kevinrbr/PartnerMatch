import { create } from 'zustand'

import { IMessage } from '@/types/message'

interface MessageState {
  messages: IMessage[]
  addMessage: (message: IMessage) => void
}

export const useMessage = create<MessageState>(set => ({
  messages: [],
  addMessage: message =>
    set(state => ({
      messages: [...state.messages, message]
    }))
}))
