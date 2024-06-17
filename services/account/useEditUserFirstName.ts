import { useMutation, useQueryClient } from '@tanstack/react-query'

import { slotsQueryKey } from '@/services/slots/slots-query-key'
import { supabase } from '@/supabase'

export function useEditUserFirstName() {
  const queryClient = useQueryClient() // Utilise le client existant

  const updateProfileFirstName = async (firstName: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .update({ firstName })
      .eq('id', (await supabase.auth.getSession()).data.session.user.id)
    if (error) {
      throw new Error(error.message)
    }

    return data
  }

  return useMutation({
    mutationFn: updateProfileFirstName,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: slotsQueryKey.all })
      queryClient.invalidateQueries({ queryKey: ['user'] })
    }
  })
}
