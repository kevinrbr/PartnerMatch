import BottomSheet from '@gorhom/bottom-sheet'
import { useQuery } from '@tanstack/react-query'
import { useLocalSearchParams } from 'expo-router'
import { useEffect, useRef, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'

import HomeBottomSheetBooking from '@/components/HomeBottomSheetBooking'
import SlotList from '@/components/SlotList'
import Toast from '@/components/Toast'
import { getUserId } from '@/services/account'
import { getSlots } from '@/services/slot'
import { ISlot } from '@/types/slot'

const Home = () => {
  const { showToastParams, message } = useLocalSearchParams()

  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [bookingSlotId, setBookingSlotId] = useState<number | null>()
  const [slotAvailability, setSlotAvailability] = useState<string | null>()
  const [isErrorToast, setIsErrorToast] = useState(false)

  useEffect(() => {
    if (showToastParams === 'true') {
      setShowToast(true)
      setToastMessage(message as string)
    }
  }, [showToastParams, message])

  const slotsQuery = useQuery({
    queryKey: ['slots'],
    queryFn: getSlots
  })

  const bottomSheetRef = useRef<BottomSheet>(null)

  const closeBottomSheet = () => {
    bottomSheetRef.current?.close()
  }

  const confirmBook = () => {
    setToastMessage('Réservation confirmée')
    setShowToast(true)
    bottomSheetRef.current?.close()
  }

  const handleOnClick = async (value: ISlot) => {
    const userId = await getUserId()
    if (userId === value.user_id) {
      setToastMessage('Vous participez déjà')
      setIsErrorToast(true)
      setShowToast(true)
    } else if (+value.nbPlaces > 0) {
      setIsErrorToast(false)
      setBookingSlotId(value.id)
      setSlotAvailability(value.nbPlaces)
      bottomSheetRef.current?.expand()
    }
  }

  return (
    <View style={styles.mainContainer}>
      {showToast && (
        <Toast
          message={toastMessage}
          showToast={showToast}
          setShowToast={setShowToast}
          error={isErrorToast}
        />
      )}
      <ScrollView style={styles.slotContainer}>
        <SlotList slots={slotsQuery} onClick={handleOnClick} />
      </ScrollView>
      <HomeBottomSheetBooking
        ref={bottomSheetRef}
        closeBottomSheet={closeBottomSheet}
        confirmBook={confirmBook}
        slotId={bookingSlotId}
        slotAvailability={slotAvailability}
      />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  slotContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 26,
    paddingTop: 30
  },
  btnContainer: {
    width: '100%',
    marginTop: 16
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: 26
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',
    marginVertical: 22
  },
  title: {
    fontFamily: 'Satoshi-Bold',
    fontSize: 20,
    marginBottom: 16
  },
  text: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 14,
    flex: 1
  },
  icon: {
    marginRight: 12
  },
  backLink: {
    color: '#FF7131',
    alignItems: 'center',
    textAlign: 'center'
  }
})
