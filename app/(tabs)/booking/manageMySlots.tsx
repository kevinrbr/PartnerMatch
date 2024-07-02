import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet'
import React, { useRef, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import BottomSheetRemoveBooking from '@/components/BottomSheetRemoveBooking'
import SlotCard from '@/components/SlotCard'
import { useSlotsByUserId } from '@/services/slots/useSlotsByUserId'
import { ISlot } from '@/types/slot'

const ManageMySlots = () => {
  const [slotId, setSlotId] = useState<number | null>(null)
  const bottomSheetRef = useRef<BottomSheet>(null)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  const { data: slotsByUserId } = useSlotsByUserId()

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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <FlatList
          data={slotsByUserId}
          renderItem={({ item }) => <SlotCard slot={item} onClick={handleOnClick} />}
          keyExtractor={item => item.id}
        />
      </View>
      <BottomSheetRemoveBooking
        ref={bottomSheetRef}
        closeBottomSheet={closeBottomSheet}
        slotId={slotId}
        confirmBook={confirmBook}
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
