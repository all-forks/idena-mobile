import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  buttonContainer: {
    marginTop: 24,
    paddingHorizontal: 32,
  },
  button: {
    backgroundColor: 'rgba(83,86,92, 0.6)',
  },
  carouselContainer: {
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  exampleTitle: {
    marginTop: 20,
    marginBottom: 60,
    color: '#fff',
  },
  itemContainer: {
    backgroundColor: 'transparent',
    borderRadius: 8,
  },
  title: {
    color: 'white',
    fontSize: 20,
  },
  topRadius: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  bottomRadius: {
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  description: {
    color: 'rgb(150, 153, 158)',
    fontSize: 15,
  },
  wordPair: {
    marginBottom: 1,
    padding: 24,
    backgroundColor: 'rgba(83, 86, 92, 1)',
    height: 125,
  },
})
