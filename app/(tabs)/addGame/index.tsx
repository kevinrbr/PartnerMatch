import { router } from 'expo-router'
import { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native'

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
      nbPlaces: 1,
      level_min: null,
      level_max: null
    }
  })

  const [step, setStep] = useState(1)

  const handleNextStep = (data: any) => {
    setStep(step + 1)
  }

  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1)
    }
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
  }

  return (
    <DismissKeyboard>
      <FormProvider {...methods}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          <View style={styles.formContainer}>
            {step === 1 && <CityForm />}
            {step === 2 && <ClubForm handlePreviousStep={handlePreviousStep} />}
            {step === 3 && <DateForm handlePreviousStep={handlePreviousStep} />}
            {step === 4 && <MoreInformationsForm handlePreviousStep={handlePreviousStep} />}
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title={step === 4 ? 'Enregistrer' : 'Suivant'}
              onPress={methods.handleSubmit(step === 4 ? onSubmit : handleNextStep)}
            />
          </View>
        </KeyboardAvoidingView>
      </FormProvider>
    </DismissKeyboard>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 80
  },
  buttonContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16
  }
})

export default ResearchForm
