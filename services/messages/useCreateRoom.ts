import { useMutation, useQueryClient } from '@tanstack/react-query'

import { messagesQueryKey } from './messages-query-key'

import { supabase } from '@/supabase'

export function useCreateRoom() {
  const queryClient = useQueryClient()

  const createRoom = async function (slotId: number) {
    try {
      const { data, error } = await supabase.from('rooms').insert({
        slot_id: slotId
      })

      if (error) {
        throw error
      }

      return data
    } catch (error) {
      console.error('Erreur lors de la création du chat:', error.message)
      throw error
    }
  }

  return useMutation({
    mutationFn: createRoom,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: messagesQueryKey.all })
    }
  })
}
