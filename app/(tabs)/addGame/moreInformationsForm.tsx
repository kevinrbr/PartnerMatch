import { router } from 'expo-router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'

import Button from '@/components/Button'
import DismissKeyboard from '@/components/DismissKeyboard'
import SliderRange from '@/components/SliderRange'
import Title from '@/components/Title'

const MoreInformationsForm = () => {
  const [count, setCount] = useState(1)
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      club: ''
    }
  })

  const onSubmit = data => {
    router.navigate({ pathname: '/addGame/nbPlayersForm/' })
  }

  const goNext = () => {
    handleSubmit(onSubmit)()
  }

  const increment = () => {
    if (count < 3) setCount(prev => prev + 1)
  }

  const decrement = () => {
    if (count > 1) setCount(prev => prev - 1)
  }

  return (
    <DismissKeyboard>
      <View style={styles.container}>
        <View>
          <Title variant="pageTitle">Informations supplémentaires</Title>
          <View style={styles.counterContainer}>
            <Text style={styles.counterLabel}>Nombre de places disponibles :</Text>
            <View style={styles.counter}>
              <TouchableOpacity onPress={decrement} style={styles.button}>
                <Text style={styles.buttonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.counterValue}>{count}</Text>
              <TouchableOpacity onPress={increment} style={styles.button}>
                <Text style={styles.buttonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.sliderContainer}>
            <SliderRange />
          </View>
        </View>
        <Button title="Suivant" onPress={goNext} />
      </View>
    </DismissKeyboard>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 80,
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    paddingBottom: 16
  },
  counterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  counter: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  counterLabel: {
    fontSize: 16
  },
  button: {
    marginHorizontal: 12
  },
  buttonText: {
    fontFamily: 'Satoshi-Regular',
    color: '#191822',
    fontSize: 32
  },
  counterValue: {
    fontFamily: 'Satoshi-Bold',
    fontSize: 26,
    fontWeight: 'bold'
  },
  sliderContainer: {}
})

export default MoreInformationsForm
