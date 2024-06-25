import { useQuery } from '@tanstack/react-query'

import { slotsQueryKey } from '@/services/slots/slots-query-key'
import { supabase } from '@/supabase'

export function useSlots() {
  const getSlots = async () => {
    try {
      const { data: userData, error: userError } = await supabase.auth.getUser()
      if (userError) {
        throw userError
      }

      const { data: nameData, error: nameError } = await supabase
        .from('profiles')
        .select('firstName')
        .eq('id', userData.user.id)
      if (nameError) {
        throw nameError
      }

      if (!nameData || nameData.length === 0) {
        throw new Error("Nom d'utilisateur non trouvé")
      }
      const name = nameData[0].firstName

      const { data: slotsData, error: slotsError } = await supabase.from('slot').select('*')
      if (slotsError) {
        throw slotsError
      }

      const slotsWithNames = slotsData.map(slot => ({
        ...slot,
        name
      }))

      return slotsWithNames
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error.message)
      throw error
    }
  }

  return useQuery({
    queryKey: slotsQueryKey.all,
    queryFn: getSlots
  })
}
