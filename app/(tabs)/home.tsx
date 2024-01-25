import { ScrollView } from 'react-native'

import SlotCard from '@/components/SlotCard'

const Home = () => {
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 26, paddingTop: 30 }}
    >
      <SlotCard />
      <SlotCard />
      <SlotCard />
      <SlotCard />
      <SlotCard />
    </ScrollView>
  )
}

export default Home
