import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    alignSelf: 'center',
  },
  modalTitle: {
    marginBottom: 10,
    color: 'rgb(83, 86, 92)',
    fontSize: 20,
    fontWeight: '600',
  },
  modalDescription: {
    marginBottom: 15,
    color: 'rgb(150,153,158)',
    fontSize: 16,
  },
  description: {
    textAlign: 'center',
    color: 'rgb(150,153,158)',
    fontSize: 16,
  },
  accentButtonText: {
    color: 'rgb(87, 143, 255)',
    fontSize: 15,
    textAlign: 'center',
  },
  buttonText: {
    color: 'rgb(83, 86, 92)',
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 8,
    paddingBottom: 10,
    zIndex: -1,
  },
})
