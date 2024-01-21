import { format } from 'date-fns'
import { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import DateTimePicker from 'react-native-modal-datetime-picker'

import Button from '@/components/Button'
import DismissKeyboard from '@/components/DismissKeyboard'
import DateInput from '@/components/input/DateInput'
import TextInput from '@/components/input/TextInput'
import { postSlot } from '@/services/slot'
import { FR_DATE } from '@/types/date'
import { ISlot, ESlot } from '@/types/slot'

const ResearchForm = () => {
  const [reservation, setReservation] = useState<ISlot>({
    city: '',
    club: '',
    nbPlaces: '',
    level: '',
    date: new Date()
  })

  const handleChange = (field: string, value: string | Date) => {
    setReservation(prevReservation => ({
      ...prevReservation,
      [field]: value
    }))
  }

  return (
    <DismissKeyboard>
      <View style={styles.container}>
        <TextInput
          placeholder="Nantes"
          onInputChange={city => handleChange(ESlot.CITY, city)}
          label="Ville"
          value={reservation.city}
        />
        <TextInput
          placeholder="UCPA"
          onInputChange={club => handleChange(ESlot.CLUB, club)}
          label="Club"
          value={reservation.club}
        />
        <TextInput
          placeholder="2"
          onInputChange={nbPlaces => handleChange(ESlot.NUMBER_PLACES, nbPlaces)}
          label="Nombre de joueurs"
          value={reservation.nbPlaces}
          inputMode="numeric"
          keyboardType="numeric"
          min={1}
          max={3}
        />
        <TextInput
          placeholder="2"
          onInputChange={level => handleChange(ESlot.LEVEL, level)}
          label="Niveau"
          value={reservation.level}
          inputMode="numeric"
          keyboardType="numeric"
          min={0}
          max={10}
        />
        <DateInput
          label="Date"
          date={reservation.date}
          onInputChange={date => handleChange(ESlot.DATE, date)}
        />
        <Button
          title="Valider"
          accessibilityLabel="Bouton pour se connecter"
          onPress={() => postSlot(reservation)}
        />
      </View>
    </DismissKeyboard>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16
  }
})

export default ResearchForm
