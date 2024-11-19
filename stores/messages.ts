import { create } from 'zustand'

import { IMessage } from '@/types/message'

interface MessageState {
  messages: IMessage[]
  optimisticsIds: string[]
  addMessage: (message: IMessage) => void
  setMessages: (messages: IMessage[]) => void // Nouvelle fonction pour définir les messages
}

export const useMessage = create<MessageState>(set => ({
  messages: [],
  optimisticsIds: [],
  addMessage: newMessage => {
    set(state => {
      const updatedState = {
        messages: [...state.messages, newMessage],
        optimisticsIds: [...state.optimisticsIds, newMessage.id]
      }
      return updatedState
    })
  },
  setMessages: messages => {
    // Fonction pour définir tous les messages à la fois
    set({ messages })
  }
}))
