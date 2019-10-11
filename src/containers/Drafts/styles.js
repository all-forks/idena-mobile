import { StyleSheet } from 'react-native'
import { Colors } from '../../utils'

export default StyleSheet.create({
  modalLg: {
    backgroundColor: '#fff',
    paddingTop: 44,
    paddingBottom: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  modal: {
    paddingTop: 21,
    paddingBottom: 27,
  },
  title: {
    marginBottom: 10,
    color: Colors.grey,
    fontWeight: '500',
    fontSize: 20,
    textAlign: 'center',
  },
  text: {
    color: 'rgb(83,86,92)',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  description: {
    color: Colors.lightGrey,
    textAlign: 'center',
  },
  address: {
    color: 'rgb(87,143,255)',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
  profileInfoRowTitle: {
    marginVertical: 13,
    color: 'rgb(150,153,158)',
    fontSize: 16,
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
})
