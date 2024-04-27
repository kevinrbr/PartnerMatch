import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { forwardRef, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

import Button from './Button'
import CustomBottomSheet from './CustomBottomSheet'

import { removeSlot } from '@/services/slot'

interface BottomSheetRemoveBookingProps {
  ref: any
  closeBottomSheet: () => void
  slotId: number
  // slotAvailability: string
  confirmBook: () => void
}

type Ref = BottomSheet

const BottomSheetRemoveBooking = forwardRef<Ref, BottomSheetRemoveBookingProps>(
  ({ closeBottomSheet, slotId, confirmBook }: BottomSheetRemoveBookingProps, ref) => {
    const queryClient = useQueryClient()

    const addMutation = useMutation({
      mutationFn: removeSlot,
      onSuccess: data => {
        queryClient.invalidateQueries({
          queryKey: ['slots']
        })
        queryClient.invalidateQueries({
          queryKey: ['slotsByUserId']
        })
      }
    })

    const confirmBooking = async () => {
      try {
        await addMutation.mutate(slotId)
      } catch (e) {}
    }

    const handleBackLinkClick = () => {
      closeBottomSheet()
    }

    return (
      <CustomBottomSheet ref={ref}>
        <Text style={styles.title}>Annuler ma partie</Text>
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
    textAlign: 'center'
  }
})
