import BottomSheet from '@gorhom/bottom-sheet'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRef, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import { CalendarDaysIcon, XMarkIcon } from 'react-native-heroicons/outline'

import Button from '@/components/Button'
import CustomBottomSheet from '@/components/CustomBottomSheet'
import Separator from '@/components/Separator'
import SlotList from '@/components/SlotList'
import { bookASlot, getSlots, updateSlotAvailability } from '@/services/slot'
import { ISlot } from '@/types/slot'

const Home = () => {
  const queryClient = useQueryClient()
  const [bookingSlotId, setBookingSlotId] = useState<number | null>()
  const [slotAvailability, setSlotAvailability] = useState<string | null>()

  const slotsQuery = useQuery({
    queryKey: ['slots'],
    queryFn: getSlots
  })

  const bottomSheetRef = useRef<BottomSheet>(null)

  const handleBackLinkClick = () => {
    bottomSheetRef.current?.close()
  }

  const handleOnClick = (value: ISlot) => {
    setBookingSlotId(value.id)
    setSlotAvailability(value.nbPlaces)
    bottomSheetRef.current?.expand()
  }

  const confirmBooking = () => {
    addMutation.mutate({ id: bookingSlotId, slotAvailability })
    bookASlot(bookingSlotId)
    bottomSheetRef.current?.close()
  }

  const addMutation = useMutation({
    mutationFn: (variables: { id: number; slotAvailability: string }) =>
      updateSlotAvailability(variables),
    onSuccess: data => {
      queryClient.invalidateQueries({
        queryKey: ['slots']
      })
    }
  })

  return (
    <View style={styles.mainContainer}>
      <ScrollView style={styles.slotContainer}>
        <SlotList slots={slotsQuery} onClick={handleOnClick} />
      </ScrollView>
      <CustomBottomSheet ref={bottomSheetRef}>
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
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  slotContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 26,
    paddingTop: 30
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
    textAlign: 'center'
  }
})
