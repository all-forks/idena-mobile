import { StyleSheet } from 'react-native'
import { Colors } from '../../utils'

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 48,
    justifyContent: 'center',
    marginBottom: 150,
  },
  title: {
    color: Colors.grey,
    fontSize: 15,
    textAlign: 'center',
    fontWeight: '500',
  },
  description: {
    color: Colors.lightGrey,
    fontSize: 14,
    textAlign: 'center',
  },
})
