import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  notification: {
    position: 'absolute',
    top: 150,
    left: 0,
    right: 0,
    zIndex: 999,
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: '100%',
    backgroundColor: 'rgba(83, 86, 92, 1)',
    borderRadius: 8,
  },

  title: {
    color: '#fff',
    fontSize: 14,
  },
})
