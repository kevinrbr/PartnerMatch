import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet'
import { useQuery } from '@tanstack/react-query'
import { useCallback, useMemo, useRef } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

import Button from '@/components/Button'
import SlotList from '@/components/SlotList'
import { getSlots } from '@/services/slot'

const Home = () => {
  const slotsQuery = useQuery({
    queryKey: ['slots'],
    queryFn: getSlots
  })

  const bottomSheetModalRef = useRef<BottomSheetModal>(null)

  // variables
  const snapPoints = useMemo(() => ['25%', '50%'], [])

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index)
  }, [])

  return (
    <ScrollView style={styles.slotContainer}>
      <SlotList slots={slotsQuery} />
      <BottomSheetModalProvider>
        <View style={styles.container}>
          <Button onPress={handlePresentModalPress} title="Present Modal" color="black" />
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
          >
            <BottomSheetView style={styles.contentContainer}>
              <Text>Awesome 🎉</Text>
            </BottomSheetView>
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>
    </ScrollView>
  )
}

export default Home

const styles = StyleSheet.create({
  slotContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 26,
    paddingTop: 30
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center'
  }
})
