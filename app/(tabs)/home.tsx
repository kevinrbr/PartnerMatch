import { ScrollView, StyleSheet } from 'react-native'

import SlotCard from '@/components/SlotCard'

const Home = () => {
  return (
    <ScrollView style={styles.slotContainer}>
      <SlotCard />
      <SlotCard />
      <SlotCard />
      <SlotCard />
      <SlotCard />
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
