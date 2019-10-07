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
    fontWeight: 'bold',
  },
  description: {
    color: Colors.lightGrey,
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
  },
})
