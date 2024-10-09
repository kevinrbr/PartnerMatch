import { useState, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { View, StyleSheet } from 'react-native'

import Counter from '@/components/Counter'
import SliderRange from '@/components/SliderRange'
import Title from '@/components/Title'

const MoreInformationsForm = () => {
  const { setValue, watch } = useFormContext()
  const [counterValue, setCounterValue] = useState(1)
  const level = watch('level') || []

  useEffect(() => {
    setValue('playersNb', counterValue)
  }, [counterValue, setValue])

  const handleSliderChange = values => {
    setValue('level', values)
  }

  return (
    <View>
      <Title variant="pageTitle">Informations supplémentaires</Title>
      <View style={styles.counterContainer}>
        <Counter min={1} max={3} value={counterValue} onChange={setCounterValue} />
      </View>
      <View style={styles.sliderContainer}>
        <SliderRange onChange={handleSliderChange} selectedValues={level} />
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
