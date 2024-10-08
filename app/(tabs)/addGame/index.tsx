import { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { View, StyleSheet } from 'react-native'

import Button from '@/components/Button'
import DismissKeyboard from '@/components/DismissKeyboard'
import CityForm from '@/components/addSlotForm/cityForm'
import ClubForm from '@/components/addSlotForm/clubForm'
import DateForm from '@/components/addSlotForm/dateForm'
import MoreInformationsForm from '@/components/addSlotForm/moreInformationsForm'

const ResearchForm = () => {
  const methods = useForm({
    defaultValues: {
      city: '',
      club: '',
      date: new Date(),
      moreInfo: ''
    }
  })
  const [step, setStep] = useState(1)

  const handleNextStep = (data: any) => {
    setStep(step + 1)
  }

  const onSubmit = (data: any) => {
    console.log('Données finales :', data)
    // Envoi vers la base de données
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
