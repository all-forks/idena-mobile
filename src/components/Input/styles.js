import { StyleSheet } from 'react-native'
import { Colors } from '../../utils'

export default StyleSheet.create({
  inputContainer: {
    marginBottom: 5,
    paddingHorizontal: 15,
    height: 56,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgb(232, 234, 237)',
  },
  input: {},
  title: {
    color: Colors.accent,
    fontSize: 12,
    fontWeight: 'bold',
  },
})
