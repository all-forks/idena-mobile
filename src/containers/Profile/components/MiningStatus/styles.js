import { StyleSheet } from 'react-native'
import { Colors } from '../../../../utils'

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  miningStatusText: {
    color: Colors.grey,
    fontSize: 16,
    fontWeight: '600',
  },
  miningSwitcherText: {
    marginRight: 13,
    color: Colors.grey,
    fontSize: 16,
    fontWeight: '400',
  },
})
