import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet'
import React, { forwardRef } from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native'
import { XMarkIcon } from 'react-native-heroicons/outline'

import Button from './Button'

import CustomBottomSheet from '@/components/CustomBottomSheet'
import { useRemoveSlot } from '@/services/slots/useRemoveSlot'

interface BottomSheetRemoveBookingProps {
  ref: any
  closeBottomSheet: () => void
  slotId: number
  confirmBook: () => void
}

type Ref = BottomSheet

const BottomSheetRemoveBooking = forwardRef<Ref, BottomSheetRemoveBookingProps>(
  ({ closeBottomSheet, slotId }: BottomSheetRemoveBookingProps, ref) => {
    const { mutate: remove } = useRemoveSlot()

    const confirmBooking = async () => {
      try {
        await remove(slotId)
      } catch (e) {}
    }

    const handleBackLinkClick = () => {
      closeBottomSheet()
    }

    return (
      <CustomBottomSheet ref={ref}>
        <Text style={styles.title}>Annuler ma partie</Text>
        <View style={styles.textContainer}>
          <XMarkIcon style={styles.icon} color="#FF0000" />
          <Text style={styles.text}>
            L'annulation entrainera la suppression du créneau et l'annulation automatique pour tous
            les participants.
          </Text>
        </View>
        <View style={styles.btnContainer}>
          <Button
            title="J'annule la partie"
            accessibilityLabel="Annuler la partie"
            onPress={confirmBooking}
          />
          <TouchableWithoutFeedback onPress={handleBackLinkClick}>
            <Text style={styles.backLink}>Retour</Text>
          </TouchableWithoutFeedback>
        </View>
      </CustomBottomSheet>
    )
  }
)

export default BottomSheetRemoveBooking

const styles = StyleSheet.create({
  btnContainer: {
    width: '100%',
    marginTop: 16
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
    textAlign: 'center',
    marginTop: 12
  }
})
