import { StyleSheet } from 'react-native'
import { Colors } from '../../utils'

export default StyleSheet.create({
  inputContainer: {
    marginBottom: 5,
    justifyContent: 'center',
    paddingHorizontal: 15,
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgb(232, 234, 237)',
  },
  input: {
    color: Colors.grey,
  },
  title: {
    color: Colors.accent,
    fontSize: 12,
    fontWeight: 'bold',
  },
})
