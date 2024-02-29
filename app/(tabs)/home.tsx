import { useQuery } from '@tanstack/react-query'
import { ScrollView, StyleSheet, Text } from 'react-native'

import SlotList from '@/components/SlotList'
import { getSlots } from '@/services/slot'

const Home = () => {
  const slotsQuery = useQuery({
    queryKey: ['slots'],
    queryFn: getSlots
  })

  return (
    <ScrollView style={styles.slotContainer}>
      <SlotList slots={slotsQuery} />
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
