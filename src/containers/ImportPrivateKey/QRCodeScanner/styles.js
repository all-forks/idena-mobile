import { StyleSheet } from 'react-native'
import { Colors } from '../../../utils'

export default StyleSheet.create({
  labelContainer: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 16,
    backgroundColor: Colors.grey,
    justifyContent: 'flex-start',
  },
  label: {
    color: '#fff',
    fontSize: 18,
  },
})
