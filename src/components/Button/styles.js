import { StyleSheet } from 'react-native'
import { Colors } from '../../utils'

export default StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(87,143,255)',
    paddingVertical: 15,
    borderRadius: 8,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  disabledTitle: {
    color: Colors.lightGrey,
  },
})
