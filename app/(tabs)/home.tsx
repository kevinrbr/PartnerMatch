import { useEffect, useState } from 'react'
import { ScrollView, StyleSheet } from 'react-native'

import SlotCard from '@/components/SlotCard'
import { getSlots } from '@/services/slot'
import { ISlot } from '@/types/slot'

const Home = () => {
  const [slotsData, setSlotsData] = useState<ISlot[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSlots()
        setSlotsData(data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [])

  return (
    <ScrollView style={styles.slotContainer}>
      {slotsData.map((slot, index) => (
        <SlotCard key={index} slot={slot} />
      ))}
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
