import { useQuery } from '@tanstack/react-query'

import { addNamesToSlots } from '@/common/addNameToSlot'
import { slotsQueryKey } from '@/services/slots/slots-query-key'
import { supabase } from '@/supabase'

export function useSlots() {
  const getSlots = async () => {
    try {
      const currentDate = new Date().toISOString()

      const { data: allSlots, error: allSlotsError } = await supabase
        .from('slot')
        .select('*')
        .gte('date', currentDate)

      if (allSlotsError) {
        throw allSlotsError
      }

      const sortedSlots = allSlots
        .slice()
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

      const slotsWithNames = addNamesToSlots(sortedSlots)

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
