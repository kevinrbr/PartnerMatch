import { router } from 'expo-router'
import { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { View, StyleSheet } from 'react-native'

import Button from '@/components/Button'
import DismissKeyboard from '@/components/DismissKeyboard'
import CityForm from '@/components/addSlotForm/cityForm'
import ClubForm from '@/components/addSlotForm/clubForm'
import DateForm from '@/components/addSlotForm/dateForm'
import MoreInformationsForm from '@/components/addSlotForm/moreInformationsForm'
import { useCreateRoom } from '@/services/messages/useCreateRoom'
import { usePostSlot } from '@/services/slots/usePostSlot'

const ResearchForm = () => {
  const { mutate: post } = usePostSlot()
  const { mutate: createRoom } = useCreateRoom()

  const methods = useForm({
    defaultValues: {
      city: '',
      club: '',
      date: new Date(),
      playersNb: 1,
      level: [],
      level_min: null,
      level_max: null
    }
  })

  const [step, setStep] = useState(1)

  const handleNextStep = (data: any) => {
    setStep(step + 1)
  }

  const onSubmit = (data: any) => {
    post(data, {
      onSuccess: data => {
        if (data && data.id) {
          createRoom(data.id)
          const toast = { showToastParams: 'true', message: 'Publié avec succès' }
          router.push({ pathname: '/(tabs)/home/', params: toast })
        }
      }
    })
    console.log('Données finales :', data)
  }

  return (
    <DismissKeyboard>
      <FormProvider {...methods}>
        <View style={styles.container}>
          {step === 1 && <CityForm />}
          {step === 2 && <ClubForm />}
          {step === 3 && <DateForm />}
          {step === 4 && <MoreInformationsForm />}
          <Button
            title={step === 4 ? 'Enregistrer' : 'Suivant'}
            onPress={methods.handleSubmit(step === 4 ? onSubmit : handleNextStep)}
          />
        </View>
      </FormProvider>
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
  }
})

export default ResearchForm
