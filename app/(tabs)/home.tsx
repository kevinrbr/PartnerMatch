import { useQuery } from '@tanstack/react-query'
import { ScrollView, StyleSheet, Text } from 'react-native'

import SlotCard from '@/components/SlotCard'
import { getSlots } from '@/services/slot'

const Home = () => {
  const slotsQuery = useQuery({
    queryKey: ['slots'],
    queryFn: getSlots
  })

  if (slotsQuery.isLoading) {
    return <Text style={styles.slotContainer}>Chargement en cours..</Text>
  }

  if (slotsQuery.isError) {
    return <Text style={styles.slotContainer}>Erreur lors de la récupération des données.</Text>
  }

  return (
    <ScrollView style={styles.slotContainer}>
      {slotsQuery.data && slotsQuery.data.length > 0 ? (
        slotsQuery.data.map((slot, index) => <SlotCard key={index} slot={slot} />)
      ) : (
        <Text>Aucun créneau disponible</Text>
      )}
    </ScrollView>
  )
}

export default Home

const styles = StyleSheet.create({
  slotContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 26,
    paddingTop: 30
  }
})
