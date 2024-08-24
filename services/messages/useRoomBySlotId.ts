import { useQuery } from '@tanstack/react-query'

import { messagesQueryKey } from './messages-query-key'

import { supabase } from '@/supabase'

export function useRoomBySlotId(slotIds: number[]) {
  const getRoomBySlotId = async () => {
    try {
      const { data, error } = await supabase.from('rooms').select('*').in('slot_id', slotIds)

      if (error) {
        throw error
      }

      return data
    } catch (error) {
      console.error('Erreur lors de la récupération des rooms:', error.message)
      throw error
    }
  }

  return useQuery({
    queryKey: messagesQueryKey.all,
    queryFn: getRoomBySlotId,
    enabled: slotIds.length > 0
  })
}
