import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet'
import React, { forwardRef } from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native'

import Button from '@/components/Button'
import CustomBottomSheet from '@/components/CustomBottomSheet'
import { useCancelBooking } from '@/services/slots/useCancelBooking'
import { useUpdateSlotAvailability } from '@/services/slots/useUpdateSlotAvailability'

interface BottomSheetCancelBookingProps {
  ref: any
  closeBottomSheet: () => void
  slotId: number
  slotAvailability: string
  cancelBook: () => void
}

type Ref = BottomSheet

const BottomSheetCancelBooking = forwardRef<Ref, BottomSheetCancelBookingProps>(
  (
    { slotAvailability, closeBottomSheet, slotId, cancelBook }: BottomSheetCancelBookingProps,
    ref
  ) => {
    const { mutate: cancel } = useCancelBooking()
    const { mutate: updateSlotAvailability } = useUpdateSlotAvailability()

    const handleCancelBook = async () => {
      try {
        await updateSlotAvailability({ id: slotId, slotAvailability, count: 1 })
        await cancel(slotId)
        cancelBook()
      } catch (e) {
        console.error(e)
      }
    }

    const handleBackLinkClick = () => {
      closeBottomSheet()
    }

    return (
      <CustomBottomSheet ref={ref}>
        <Text style={styles.title}>Annuler ma réservation</Text>
        <View style={styles.btnContainer}>
          <Button
            title="J'annule ma réservation"
            accessibilityLabel="Annuler la réservation"
            onPress={handleCancelBook}
          />
          <TouchableWithoutFeedback onPress={handleBackLinkClick}>
            <Text style={styles.backLink}>Retour</Text>
          </TouchableWithoutFeedback>
        </View>
      </CustomBottomSheet>
    )
  }
)

export default BottomSheetCancelBooking

const styles = StyleSheet.create({
  btnContainer: {
    width: '100%',
    marginTop: 16
  },
  title: {
    fontFamily: 'Satoshi-Bold',
    fontSize: 20,
    marginBottom: 16
  },
  backLink: {
    color: '#FF7131',
    alignItems: 'center',
    textAlign: 'center',
    marginTop: 12
  }
})
