import BottomSheet from '@gorhom/bottom-sheet'
import { useLocalSearchParams } from 'expo-router'
import { useEffect, useRef, useState } from 'react'
import { StyleSheet, View, Text, FlatList } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import EmptyContent from '@/components/EmptyContent'
import HomeBottomSheetBooking from '@/components/HomeBottomSheetBooking'
import SlotCard from '@/components/SlotCard'
import Toast from '@/components/Toast'
import { getUserId } from '@/services/account/useUser'
import { useBooksByUserId } from '@/services/slots/useBooksByUserId'
import { useSlots } from '@/services/slots/useSlots'
import { ISlot } from '@/types/slot'

const Home = () => {
  const { showToastParams, message } = useLocalSearchParams()

  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [bookingSlotId, setBookingSlotId] = useState<number | null>(null)
  const [slotAvailability, setSlotAvailability] = useState<string | null>(null)
  const [isErrorToast, setIsErrorToast] = useState(false)

  useEffect(() => {
    if (showToastParams) {
      setIsErrorToast(false)
      setShowToast(true)
      setToastMessage(message as string)
    }
  }, [showToastParams, message])

  const { data: slots, isSuccess, isLoading } = useSlots()
  const { data: booksByUuid } = useBooksByUserId()

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
    const isNotBookable = booksByUuid.find(book => book.id === value.id)

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
    <GestureHandlerRootView style={{ flex: 1 }}>
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
          <View style={styles.homeHeader}>
            <Text style={styles.labelTitle}>Ville</Text>
            <Text style={styles.title}>Nantes, Loire-Atlantique</Text>
          </View>
        </View>
        {isLoading && <Text style={styles.loadingText}>Récupération des informations..</Text>}
        {isSuccess &&
          !isLoading &&
          (slots && slots.length !== 0 ? (
            <View style={styles.slotContainer}>
              <FlatList
                data={slots}
                renderItem={({ item }) => <SlotCard slot={item} onClick={handleOnClick} />}
                keyExtractor={item => item.id}
              />
            </View>
          ) : (
            <EmptyContent
              title="Pas de parties"
              content="Aucune partie disponibles, revenez plus tard ou proposez un créneau pour trouver des joueurs."
            />
          ))}
      </View>
      <HomeBottomSheetBooking
        ref={bottomSheetRef}
        closeBottomSheet={closeBottomSheet}
        confirmBook={confirmBook}
        slotId={bookingSlotId}
        slotAvailability={slotAvailability}
      />
    </GestureHandlerRootView>
  )
}

export default Home

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 16
  },
  homeHeader: {
    marginBottom: 24
  },
  slotContainer: {
    flex: 1,
    marginTop: 40
  },
  emptyText: {
    fontSize: 16
  },
  loadingText: {
    fontSize: 16
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
