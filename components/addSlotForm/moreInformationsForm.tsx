import { View, StyleSheet } from 'react-native'

import Counter from '@/components/Counter'
import SliderRange from '@/components/SliderRange'
import Title from '@/components/Title'

const MoreInformationsForm = () => {
  return (
    <View>
      <Title variant="pageTitle">Informations supplémentaires</Title>
      <View style={styles.counterContainer}>
        <Counter min={1} max={3} />
      </View>
      <View style={styles.sliderContainer}>
        <SliderRange />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  counterContainer: {
    marginTop: 24
  },
  sliderContainer: {
    marginTop: 48
  }
})

export default MoreInformationsForm
