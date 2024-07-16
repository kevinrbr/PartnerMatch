import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet'
import React, { useRef, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import BottomSheetCancelBooking from '@/components/BottomSheetCancelBooking'
import SlotCard from '@/components/SlotCard'
import { useBooksByUserId } from '@/services/slots/useBooksByUserId'
import { ISlot } from '@/types/slot'

const ManageMySlots = () => {
  const [slotId, setSlotId] = useState<number | null>(null)
  const bottomSheetRef = useRef<BottomSheet>(null)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [slotAvailability, setSlotAvailability] = useState<string | null>(null)

  const { data: booksByUserId } = useBooksByUserId()

  const handleOnClick = (value: ISlot) => {
    setSlotId(value.id)
    bottomSheetRef.current?.expand()
    setSlotAvailability(value.nbPlaces)
  }

  const closeBottomSheet = () => {
    bottomSheetRef.current?.close()
  }

  const handleCancelSlot = () => {
    setToastMessage('Supprimé avec succès')
    setShowToast(true)
    closeBottomSheet()
    bottomSheetRef.current?.close()
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <FlatList
          data={booksByUserId}
          renderItem={({ item }) => <SlotCard slot={item} onClick={handleOnClick} />}
          keyExtractor={item => item.id}
        />
      </View>
      <BottomSheetCancelBooking
        ref={bottomSheetRef}
        closeBottomSheet={closeBottomSheet}
        slotId={slotId}
        slotAvailability={slotAvailability}
        cancelBook={handleCancelSlot}
      />
    </GestureHandlerRootView>
  )
}

export default ManageMySlots

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 26
  }
})
