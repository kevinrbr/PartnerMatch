import { create } from 'zustand'

import { IMessage } from '@/types/message'

interface MessageState {
  messages: IMessage[]
  optimisticsIds: string[]
  addMessage: (message: IMessage) => void
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
      console.log('2 (after state update)', updatedState.optimisticsIds) // Ici après la mise à jour
      return updatedState
    })
  }
}))
