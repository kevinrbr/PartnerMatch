import { UseQueryResult } from '@tanstack/react-query'
import { ScrollView, StyleSheet, Text } from 'react-native'

import SlotCard from '@/components/SlotCard'
import { ISlot } from '@/types/slot'

type SlotCardProps = {
  slots: UseQueryResult<ISlot[]>
}

const SlotList = ({ slots }: SlotCardProps) => {
  if (slots?.isLoading) {
    return <Text style={styles.slotContainer}>Chargement en cours..</Text>
  }

  if (slots?.isError) {
    return <Text style={styles.slotContainer}>Erreur lors de la récupération des données.</Text>
  }

  return (
    <ScrollView style={styles.slotContainer}>
      {slots?.data && slots.data.length > 0 ? (
        slots.data.map((slot, index) => <SlotCard key={index} slot={slot} />)
      ) : (
        <Text>Aucun créneau disponible</Text>
      )}
    </ScrollView>
  )
}

export default SlotList

const styles = StyleSheet.create({
  slotContainer: {
    flex: 1,
    backgroundColor: 'white'
  }
})
