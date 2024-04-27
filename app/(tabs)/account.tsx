import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet'
import { Session } from '@supabase/supabase-js'
import { useQuery } from '@tanstack/react-query'
import { useRef, useState } from 'react'
import { StyleSheet, Pressable, Text, ScrollView, View } from 'react-native'
import { ArrowLeftStartOnRectangleIcon } from 'react-native-heroicons/outline'

import BottomSheetRemoveBooking from '@/components/BottomSheetRemoveBooking'
import DismissKeyboard from '@/components/DismissKeyboard'
import SlotList from '@/components/SlotList'
import Toast from '@/components/Toast'
import { signOut, updateProfile } from '@/services/account'
import { supabaseAuth } from '@/services/constants'
import { getBookingByUserId, getSlotsByUserId } from '@/services/slot'
import { ISlot } from '@/types/slot'

const Account = () => {
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
      <>
        <Toast message={toastMessage} showToast={showToast} setShowToast={setShowToast} />
        <ScrollView style={styles.container}>
          <Pressable style={styles.disconnectLinkContainer} onPress={signOut}>
            <ArrowLeftStartOnRectangleIcon color="#182A60" />
            <Text style={styles.disconnectLink}>Se deconnecter</Text>
          </Pressable>
          <Text style={styles.subTitle}>Mes parties</Text>
          <SlotList slots={slotsByUserId} onClick={handleOnClick} />
          <View style={styles.bookingList}>
            <Text style={styles.subTitleBis}>Mes réservations</Text>
            <SlotList slots={bookingByUserId} />
          </View>
        </ScrollView>
        <BottomSheetRemoveBooking
          ref={bottomSheetRef}
          closeBottomSheet={closeBottomSheet}
          slotId={slotId}
          confirmBook={confirmBook}
        />
      </>
    </DismissKeyboard>
  )
}

export default Account

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 26,
    paddingTop: 30
  },
  disconnectLinkContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16
  },
  disconnectLink: {
    marginLeft: 8,
    color: '#4E5D6B',
    fontSize: 16,
    fontFamily: 'Satoshi-Regular'
  },
  subTitle: {
    fontFamily: 'Satoshi-Bold',
    fontSize: 18,
    marginBottom: 20
  },
  subTitleBis: {
    fontFamily: 'Satoshi-Bold',
    fontSize: 18,
    marginTop: 30,
    marginBottom: 20
  },
  bookingList: {
    marginBottom: 30
  }
})
