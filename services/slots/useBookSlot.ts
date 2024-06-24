import { useMutation, useQueryClient } from '@tanstack/react-query'

import { slotsQueryKey } from '@/services/slots/slots-query-key'
import { supabase } from '@/supabase'

export function useBookSlot() {
  const queryClient = useQueryClient()

  const bookSlot = async (id: number) => {
    try {
      const { data, error } = await supabase.from('booking').insert({
        user_id: (await supabase.auth.getUser()).data.user.id,
        slot_id: id
      })

      if (error) {
        throw error
      }

      return data
    } catch (error) {
      console.error('Erreur lors de la création du créneau:', error.message)
      throw error
    }
  }

  return useMutation({
    mutationFn: bookSlot,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: slotsQueryKey.all })
      queryClient.invalidateQueries({ queryKey: ['slotsByUserId'] })
    }
  })
}
