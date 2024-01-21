import { format } from 'date-fns'
import { useState } from 'react'
import { Pressable, Text, StyleSheet } from 'react-native'
import DateTimePicker from 'react-native-modal-datetime-picker'

import { FR_DATE, local_FR } from '@/types/date'

interface IDateInputProps {
  label: string
  date: Date
  onInputChange: (date: Date) => void
}

const DateInput = ({ label, date, onInputChange }: IDateInputProps) => {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <Pressable style={styles.input} onPress={() => setIsVisible(true)}>
        <Text>{format(date, FR_DATE)}</Text>
      </Pressable>
      <DateTimePicker
        isVisible={isVisible}
        onConfirm={date => {
          onInputChange(date)
          setIsVisible(false)
        }}
        onCancel={() => setIsVisible(false)}
        mode="datetime"
        cancelTextIOS="Annuler"
        confirmTextIOS="Valider"
        minimumDate={new Date()}
        locale={local_FR}
      />
    </>
  )
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 12,
    height: 48,
    borderColor: '#8996A2',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10
  },
  label: {
    marginBottom: 6,
    marginLeft: 4,
    fontSize: 16,
    fontFamily: 'Satoshi-Regular'
  }
})

export default DateInput
