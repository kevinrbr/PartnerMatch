import { useQuery } from '@tanstack/react-query'

import { supabase } from '@/supabase'

const getProfilesDetails = async () => {
  try {
    const authenticatedUser = await supabase.auth.getUser()
    const { data: profileData, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authenticatedUser.data.user.id)

    if (error) {
      throw error
    }

    const userProfile = profileData[0]

    const userEmail = authenticatedUser.data.user.email

    return {
      id: userProfile.id,
      firstName: userProfile.firstName,
      lastName: userProfile.lastName,
      email: userEmail
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error.message)
    throw error
  }
}

export function useUser() {
  return useQuery({
    queryKey: ['user'],
    queryFn: () => getProfilesDetails()
  })
}
