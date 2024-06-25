import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet'
import React, { ReactNode, forwardRef, useCallback } from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface CustomBottomSheetProps {
  children: ReactNode
  ref: any
}

type Ref = BottomSheet

const CustomBottomSheet = forwardRef<Ref, CustomBottomSheetProps>(
  ({ children }: CustomBottomSheetProps, ref: any) => {
    const renderBackdrop = useCallback(
      (props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />,
      []
    )

    return (
      <BottomSheet
        ref={ref}
        enablePanDownToClose
        enableDynamicSizing
        index={-1}
        backdropComponent={renderBackdrop}
        snapPoints={['25%']}
      >
        <BottomSheetView style={styles.contentContainer}>{children}</BottomSheetView>
      </BottomSheet>
    )
  }
)

export default CustomBottomSheet

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'yellow'
  },
  contentContainer: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 26
  }
})
