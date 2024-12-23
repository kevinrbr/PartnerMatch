import { useState } from 'react'
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import { CheckIcon } from 'react-native-heroicons/outline'

type checkboxType = {
  label?: string
  value?: boolean
  color?: string
  onCheckboxChange: (value: boolean) => void
}

const Checkbox = ({ label, value, color = '#000', onCheckboxChange }: checkboxType) => {
  const [isChecked, setIsChecked] = useState(value)

  const handleToggle = () => {
    const newChecked = !isChecked
    setIsChecked(newChecked)
    onCheckboxChange(newChecked)
  }

  return (
    <TouchableWithoutFeedback onPress={handleToggle}>
      <View style={styles.checkboxContainer}>
        <View style={styles.checkboxIconContainer}>
          {isChecked && <CheckIcon size={16} color={color} />}
        </View>
        {label && <Text style={styles.label}>{label}</Text>}
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  checkboxIconContainer: {
    height: 18,
    width: 18,
    borderWidth: 1,
    borderRadius: 4
  },
  label: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 16,
    marginLeft: 10
  }
})

export default Checkbox
