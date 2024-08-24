import { useMutation, useQueryClient } from '@tanstack/react-query'

import { messagesQueryKey } from './messages-query-key'

import { supabase } from '@/supabase'

type SendMessageParams = {
  roomId: string
  senderId: string
  message: string
}

export function useSendMessage() {
  const queryClient = useQueryClient()

  const sendMessage = async ({ roomId, senderId, message }: SendMessageParams) => {
    try {
      const { data, error } = await supabase.from('messages').insert({
        room_id: roomId,
        message,
        sender_id: senderId
      })

      if (error) {
        throw error
      }

      return data
    } catch (error) {
      console.error("Erreur lors de l'envoi du message:", error.message)
      throw error
    }
  }

  return useMutation({
    mutationFn: sendMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: messagesQueryKey.all })
    }
  })
}
