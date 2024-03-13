import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView
} from '@gorhom/bottom-sheet'
import { useQuery } from '@tanstack/react-query'
import { useCallback, useMemo, useRef, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import { CalendarDaysIcon, XMarkIcon } from 'react-native-heroicons/outline'

import Button from '@/components/Button'
import Separator from '@/components/Separator'
import SlotList from '@/components/SlotList'
import { bookASlot, getSlots } from '@/services/slot'
import { ISlot } from '@/types/slot'

const Home = () => {
  const [bookingSlotId, setBookingSlotId] = useState<number | null>()

  const slotsQuery = useQuery({
    queryKey: ['slots'],
    queryFn: getSlots
  })

  const bottomSheetRef = useRef<BottomSheet>(null)

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index)
  }, [])

  const snapPoints = useMemo(() => ['70%'], [])

  const handleBackLinkClick = () => {
    bottomSheetRef.current?.close()
  }

  const renderBackdrop = useCallback(
    (props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />,
    []
  )

  const handleOnClick = (value: ISlot) => {
    setBookingSlotId(value.id)
    bottomSheetRef.current?.expand()
  }

  const confirmBooking = () => {
    bookASlot(bookingSlotId)
  }

  return (
    <View style={styles.mainContainer}>
      <ScrollView style={styles.slotContainer}>
        <SlotList slots={slotsQuery} onClick={handleOnClick} />
      </ScrollView>
      <BottomSheet
        ref={bottomSheetRef}
        onChange={handleSheetChanges}
        snapPoints={snapPoints}
        enablePanDownToClose
        index={-1}
        backdropComponent={renderBackdrop}
      >
        <BottomSheetView style={styles.contentContainer}>
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
              l’initiative de la réservation afin de permettre au groupe de trouver un joueur pour
              me remplacer.
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
        </BottomSheetView>
      </BottomSheet>
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
    marginTop: 32
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
