import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import { useLocalSearchParams } from 'expo-router'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { StyleSheet, View, Text, FlatList } from 'react-native'
import { Button } from 'react-native-elements'
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler'

import HomeBottomSheetBooking from '@/components/HomeBottomSheetBooking'
import SlotCard from '@/components/SlotCard'
import Toast from '@/components/Toast'
import { getUserId } from '@/services/account/useUser'
import { useBooksByUserId } from '@/services/slots/useBooksByUserId'
import { useSlots } from '@/services/slots/useSlots'
import { ISlot } from '@/types/slot'
import CustomBottomSheet from '@/components/CustomBottomSheet'

const Home = () => {
  const { showToastParams, message } = useLocalSearchParams()

  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [bookingSlotId, setBookingSlotId] = useState<number | null>(null)
  const [slotAvailability, setSlotAvailability] = useState<string | null>(null)
  const [isErrorToast, setIsErrorToast] = useState(false)

  useEffect(() => {
    if (showToastParams) {
      setShowToast(true)
      setToastMessage(message as string)
    }
  }, [showToastParams, message])

  const { data: slots, isSuccess, isFetching } = useSlots()
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

  const snapPoints = useMemo(() => ['25%', '50%', '90%'], [])

  const handleSnapPress = useCallback(index => {
    bottomSheetRef.current?.snapToIndex(index)
  }, [])

  const handleClosePress = useCallback(() => {
    bottomSheetRef.current?.close()
  }, [])

  return (
    <GestureHandlerRootView style={{ flex: 1, height: '100%' }}>
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
        {isFetching && (
          <View style={styles.emptyContainer}>
            <Text>Récupération des informations..</Text>
          </View>
        )}
        {isSuccess &&
          (slots && slots.length !== 0 ? (
            <View style={styles.slotContainer}>
              <FlatList
                data={slots}
                renderItem={({ item }) => <SlotCard slot={item} onClick={handleOnClick} />}
                keyExtractor={item => item.id}
              />
              {/* <HomeBottomSheetBooking
              ref={bottomSheetRef}
              closeBottomSheet={closeBottomSheet}
              confirmBook={confirmBook}
              slotId={bookingSlotId}
              slotAvailability={slotAvailability}
            /> */}
            </View>
          ) : (
            <View style={styles.emptyContainer}>
              <Text>Aucun créneau disponible</Text>
            </View>
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
  slotContainer: {
    flex: 1
  },
  emptyContainer: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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
