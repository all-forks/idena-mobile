import { StyleSheet } from 'react-native'
import { Colors } from '../../../utils'

export default StyleSheet.create({
  stepContainer: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgb(245,246,247)',
    marginVertical: 17,
  },
  step: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 24,
    height: 24,
    marginRight: 12,
    borderRadius: 12,
    backgroundColor: Colors.accent,
  },
  stepText: {
    color: Colors.white,
    fontSize: 12,
    textAlign: 'center',
  },
  description: {
    color: Colors.lightGrey,
    fontSize: 14,
  },
})
