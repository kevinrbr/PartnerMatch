import { useMutation, useQueryClient } from '@tanstack/react-query'

import { slotsQueryKey } from '@/services/slots/slots-query-key'
import { supabase } from '@/supabase'

export function useEditProfile() {
  const queryClient = useQueryClient() // Utilise le client existant
  console.log('useEditProifle')

  const updateProfileLastName = async (lastName: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .update({ lastName })
      .eq('id', (await supabase.auth.getSession()).data.session.user.id)
    if (error) {
      throw new Error(error.message)
    }

    return data
  }

  return useMutation({
    mutationFn: updateProfileLastName,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: slotsQueryKey.all })
    }
  })
}
