// import { StyleSheet, Text, View } from 'react-native'
// import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet'
// import React, { ReactNode, forwardRef, useCallback, useMemo, useRef } from 'react'
// import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet'

// type BottomModalProps = {
//   children?: ReactNode
// }

// const BottomModal = forwardRef((ref: any, props) => {
//   // const bottomSheetModalRef = useRef<BottomSheetModal>(null)

//   const snapPoints = useMemo(() => ['25%', '50%'], [])

//   // const handlePresentModalPress = useCallback(() => {
//   //   bottomSheetModalRef.current?.present()
//   // }, [])

//   // const handleSheetChanges = useCallback((index: number) => {
//   //   console.log('handleSheetChanges', index)
//   // }, [])

//   return (
//     <BottomSheetModalProvider>
//       <View>
//         <BottomSheetModal ref={ref} index={1} snapPoints={snapPoints}>
//           <BottomSheetView style={styles.contentContainer}>
//             <Text>abc </Text>
//           </BottomSheetView>
//         </BottomSheetModal>
//       </View>
//     </BottomSheetModalProvider>
//   )
// })

// export default BottomModal

// const styles = StyleSheet.create({
//   contentContainer: {
//     flex: 1,
//     alignItems: 'center'
//   }
// })
