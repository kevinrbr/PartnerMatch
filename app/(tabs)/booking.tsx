import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet'
import { Session } from '@supabase/supabase-js'
import { useQuery } from '@tanstack/react-query'
import { useRef, useState } from 'react'
import { StyleSheet, View } from 'react-native'

import BottomSheetRemoveBooking from '@/components/BottomSheetRemoveBooking'
import DismissKeyboard from '@/components/DismissKeyboard'
import RedirectLink from '@/components/RedirectLink'
import SlotList from '@/components/SlotList'
import Title from '@/components/Title'
import Toast from '@/components/Toast'
import { supabaseAuth } from '@/services/constants'
import { getBookingByUserId, getSlotsByUserId } from '@/services/slot'
import { ISlot } from '@/types/slot'

const Booking = () => {
  const [slotId, setSlotId] = useState<number | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const bottomSheetRef = useRef<BottomSheet>(null)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  const slotsByUserId = useQuery({
    queryKey: ['slotsByUserId'],
    queryFn: getSlotsByUserId
  })

  const bookingByUserId = useQuery({
    queryKey: ['bookingByUserId'],
    queryFn: getBookingByUserId
  })

  supabaseAuth.getSession().then(({ data: { session } }) => {
    setSession(session)
  })

  const handleOnClick = (value: ISlot) => {
    setSlotId(value.id)
    bottomSheetRef.current?.expand()
  }

  const closeBottomSheet = () => {
    bottomSheetRef.current?.close()
  }

  const confirmBook = () => {
    setToastMessage('Supprimé avec succès')
    setShowToast(true)
    closeBottomSheet()
    bottomSheetRef.current?.close()
  }

  return (
    <DismissKeyboard>
      <View style={styles.container}>
        <Title variant="pageTitle" hasSubtitle>
          Parties et réservations
        </Title>
        <Title variant="subTitle">Réservations à venir</Title>
        <Toast message={toastMessage} showToast={showToast} setShowToast={setShowToast} />
        <View style={styles.bookingContainer}>
          <SlotList slots={slotsByUserId} onClick={handleOnClick} />
          <SlotList slots={bookingByUserId} />
        </View>
        <RedirectLink text="Gérer mes annonces" />
        <RedirectLink text="Gérer mes réservations" />
        <RedirectLink text="Parties archivées" />
        <BottomSheetRemoveBooking
          ref={bottomSheetRef}
          closeBottomSheet={closeBottomSheet}
          slotId={slotId}
          confirmBook={confirmBook}
        />
      </View>
    </DismissKeyboard>
  )
}

export default Booking

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80
  },
  bookingContainer: {
    marginTop: 32,
    marginBottom: 16
  }
})
