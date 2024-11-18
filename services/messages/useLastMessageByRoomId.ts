import { useQuery } from '@tanstack/react-query'

import { messagesQueryKey } from './messages-query-key'

import { supabase } from '@/supabase'

type Profile = {
  firstName: string
}

type LastMessage = {
  created_at: string
  id: string
  message: string
  room_id: string
  sender_id: string
  firstName: string
}

type UseMessagesParams = {
  roomId: string
}

export function useLastMessageByRoomId({ roomId }: UseMessagesParams) {
  const getLastMessageByRoomId = async (): Promise<LastMessage | null> => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select(
          `
          *,
          profiles:profiles(firstName)
        `
        )
        .eq('room_id', roomId)
        .order('created_at', { ascending: false })
        .limit(1)

      if (error) {
        throw error
      }

      return data && data.length > 0
        ? {
            ...data[0],
            firstName: data[0].profiles.firstName
          }
        : null
    } catch (error) {
      console.error('Erreur lors de la récupération du dernier message:', error.message)
      throw error
    }
  }

  return useQuery({
    queryKey: [messagesQueryKey.latest, roomId],
    queryFn: getLastMessageByRoomId,
    enabled: !!roomId
  })
}
