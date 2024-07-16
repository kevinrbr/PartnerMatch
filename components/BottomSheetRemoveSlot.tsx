import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet'
import React, { forwardRef } from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native'
import { XMarkIcon } from 'react-native-heroicons/outline'

import Button from './Button'

import CustomBottomSheet from '@/components/CustomBottomSheet'
import { useRemoveSlot } from '@/services/slots/useRemoveSlot'

interface BottomSheetRemoveSlotProps {
  ref: any
  closeBottomSheet: () => void
  slotId: number
  deleteSlot: () => void
}

type Ref = BottomSheet

const BottomSheetRemoveSlot = forwardRef<Ref, BottomSheetRemoveSlotProps>(
  ({ closeBottomSheet, slotId, deleteSlot }: BottomSheetRemoveSlotProps, ref) => {
    const { mutate: remove } = useRemoveSlot()

    const handleDeleteSlot = async () => {
      try {
        await remove(slotId)
        deleteSlot()
      } catch (e) {
        console.error(e)
      }
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
            onPress={handleDeleteSlot}
          />
          <TouchableWithoutFeedback onPress={handleBackLinkClick}>
            <Text style={styles.backLink}>Retour</Text>
          </TouchableWithoutFeedback>
        </View>
      </CustomBottomSheet>
    )
  }
)

export default BottomSheetRemoveSlot

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
