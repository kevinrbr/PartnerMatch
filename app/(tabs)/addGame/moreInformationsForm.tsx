import { router } from 'expo-router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'

import Button from '@/components/Button'
import Counter from '@/components/Counter'
import DismissKeyboard from '@/components/DismissKeyboard'
import SliderRange from '@/components/SliderRange'
import Title from '@/components/Title'

const MoreInformationsForm = () => {
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

  return (
    <DismissKeyboard>
      <View style={styles.container}>
        <View>
          <Title variant="pageTitle">Informations supplémentaires</Title>
          <View style={styles.counterContainer}>
            <Counter />
          </View>
          <View style={styles.sliderContainer}>
            <SliderRange />
          </View>
        </View>
        <Button title="Enregistrer" onPress={goNext} />
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
    marginTop: 24
  },
  sliderContainer: {
    marginTop: 48
  }
})

export default MoreInformationsForm
