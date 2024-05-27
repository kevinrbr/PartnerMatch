import BottomSheet from '@gorhom/bottom-sheet'
import { useQuery } from '@tanstack/react-query'
import { useLocalSearchParams } from 'expo-router'
import { useEffect, useRef, useState } from 'react'
import { ScrollView, StyleSheet, View, Text } from 'react-native'

import HomeBottomSheetBooking from '@/components/HomeBottomSheetBooking'
import SlotList from '@/components/SlotList'
import Toast from '@/components/Toast'
import { getUserId } from '@/services/account'
import { getBookingByUserId, getSlots } from '@/services/slot'
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
    const bookingByUserId = await getBookingByUserId()
    const isNotBookable = bookingByUserId.find(book => book.id === value.id)

    if (userId === value.user_id || !!isNotBookable) {
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
      <View>
        <View>
          <Text style={styles.labelTitle}>Ville</Text>
          <Text style={styles.title}>Nantes, Loire-Atlantique</Text>
        </View>
      </View>
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
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 16
  },
  slotContainer: {
    backgroundColor: 'white',
    marginTop: 44
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
  labelTitle: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 16,
    color: '#4E5D6B'
  },
  title: {
    fontFamily: 'Satoshi-Bold',
    fontSize: 20,
    color: '#191822'
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
