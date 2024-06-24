import { useMutation, useQueryClient } from '@tanstack/react-query'

import { slotsQueryKey } from '@/services/slots/slots-query-key'
import { supabase } from '@/supabase'
import { ISlot } from '@/types/slot'

export function usePostSlot() {
  const queryClient = useQueryClient()

  const postSlot = async function (formData: ISlot) {
    try {
      const { data, error } = await supabase.from('slot').insert({
        user_id: (await supabase.auth.getUser()).data.user.id,
        city: formData.city,
        club: formData.club,
        nbPlaces: formData.nbPlaces,
        level: formData.level,
        date: formData.date
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
    mutationFn: postSlot,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: slotsQueryKey.all })
      queryClient.invalidateQueries({ queryKey: ['slotsByUserId'] })
    }
  })
}
