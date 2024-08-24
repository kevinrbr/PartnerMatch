import { useQuery } from '@tanstack/react-query'

import { messagesQueryKey } from './messages-query-key'

import { supabase } from '@/supabase'

type UseMessagesParams = {
  roomId: string
}

export function useMessagesByRoomId({ roomId }: UseMessagesParams) {
  const getMessagesByRoomId = async () => {
    try {
      const { data, error } = await supabase.from('messages').select('*').eq('room_id', roomId)

      if (error) {
        throw error
      }

      return data
    } catch (error) {
      console.error('Erreur lors de la récupération des messages:', error.message)
      throw error
    }
  }

  return useQuery({
    queryKey: messagesQueryKey.all,
    queryFn: getMessagesByRoomId
  })
}
