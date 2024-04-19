import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { forwardRef, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { CalendarDaysIcon, XMarkIcon } from 'react-native-heroicons/outline'

import Button from './Button'
import CustomBottomSheet from './CustomBottomSheet'
import Separator from './Separator'

import { bookASlot, updateSlotAvailability } from '@/services/slot'

interface HomeBottomSheetBookingProps {
  ref: any
  closeBottomSheet: () => void
  slotId: number
  slotAvailability: string
  confirmBook: () => void
}

type Ref = BottomSheet

const HomeBottomSheetBooking = forwardRef<Ref, HomeBottomSheetBookingProps>(
  (
    { closeBottomSheet, slotId, slotAvailability, confirmBook }: HomeBottomSheetBookingProps,
    ref
  ) => {
    const queryClient = useQueryClient()

    const confirmBooking = async () => {
      try {
        await addMutation.mutate({ id: slotId, slotAvailability })
        await bookASlot(slotId)
        confirmBook()
      } catch (e) {}
    }

    const addMutation = useMutation({
      mutationFn: (variables: { id: number; slotAvailability: string }) =>
        updateSlotAvailability(variables),
      onSuccess: data => {
        queryClient.invalidateQueries({
          queryKey: ['slots']
        })
        queryClient.invalidateQueries({
          queryKey: ['bookingByUserId']
        })
      }
    })

    const handleBackLinkClick = () => {
      closeBottomSheet()
    }

    return (
      <CustomBottomSheet ref={ref}>
        <Text style={styles.title}>Avant de reserver</Text>
        <View style={styles.textContainer}>
          <CalendarDaysIcon style={styles.icon} color="#000" />
          <Text style={styles.text}>Je m'engage à être présent au moment de la réservation</Text>
        </View>
        <Separator />
        <View style={styles.textContainer}>
          <XMarkIcon style={styles.icon} color="#FF0000" />
          <Text style={styles.text}>
            En cas d’indisponibilité, j’annule ma réservation et je préviens la personne à
            l’initiative de la réservation afin de permettre au groupe de trouver un joueur pour me
            remplacer.
          </Text>
        </View>
        <View style={styles.btnContainer}>
          <Button
            title="Je reserve"
            accessibilityLabel="Confirmer la réservation"
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

export default HomeBottomSheetBooking

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
