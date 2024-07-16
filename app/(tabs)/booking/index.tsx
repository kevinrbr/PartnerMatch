import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet'
import { Session } from '@supabase/supabase-js'
import { useRef, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import DismissKeyboard from '@/components/DismissKeyboard'
import RedirectLink from '@/components/RedirectLink'
import SlotCard from '@/components/SlotCard'
import Title from '@/components/Title'
import Toast from '@/components/Toast'
import { supabaseAuth } from '@/services/constants'
import { useBooksByUserId } from '@/services/slots/useBooksByUserId'
import { useSlotsByUserId } from '@/services/slots/useSlotsByUserId'

const Booking = () => {
  const [_session, setSession] = useState<Session | null>(null)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  const { data: slotsByUserId } = useSlotsByUserId()
  const { data: booksByUserId } = useBooksByUserId()

  supabaseAuth.getSession().then(({ data: { session } }) => {
    setSession(session)
  })

  const combinedAndSortedSlots = [...(slotsByUserId || []), ...(booksByUserId || [])]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3)

  return (
    <DismissKeyboard>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Title variant="pageTitle" hasSubtitle>
            Parties et réservations
          </Title>
          <Title variant="subTitle">Réservations à venir</Title>
          <Toast message={toastMessage} showToast={showToast} setShowToast={setShowToast} />
          <View style={styles.bookingContainer}>
            <FlatList
              data={combinedAndSortedSlots}
              renderItem={({ item }) => <SlotCard slot={item} />}
              keyExtractor={item => item.id.toString()}
            />
          </View>
          <RedirectLink text="Gérer mes annonces" link="/booking/manageMySlots" />
          <RedirectLink text="Gérer mes réservations" link="/booking/manageMyBookings" />
          {/* <RedirectLink text="Parties archivées" link="/booking/manageMySlots" /> */}
        </View>
      </GestureHandlerRootView>
    </DismissKeyboard>
  )
}

export default Booking

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 16,
    backgroundColor: 'white'
  },
  bookingContainer: {
    marginTop: 32,
    marginBottom: 16
  }
})
