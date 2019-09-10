import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    paddingHorizontal: 28,
  },
  header: {
    alignItems: 'center',
  },
  name: {
    color: 'rgb(89,89,89)',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  nickname: {
    color: 'rgb(149,149,149)',
    textAlign: 'center',
  },
  userAvatarContainer: {
    marginTop: 25,
    borderRadius: 30,
  },
  mainButtons: {
    marginTop: 50,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    textAlign: 'center',
  },
  menuImageItemContainer: {
    marginBottom: 5,
    padding: 5,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgb(87, 143, 255)',
  },
  menuItem: {
    color: 'rgb(87, 143, 255)',
    fontSize: 12,
    textAlign: 'center',
  },
  flipsContainer: {
    marginVertical: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flipItem: {
    justifyContent: 'flex-end',
    backgroundColor: 'rgb(87, 143, 255)',
    borderRadius: 16,
    height: 175,
  },
  flipImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  flipTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  flipText: {
    color: 'rgb(255, 255, 255)',
  },
  formContainer: {
    marginVertical: 25,
  },
  formHeader: {
    marginBottom: 15,
  },
  activateTitle: {
    marginBottom: 5,
    color: 'rgb(83, 86, 92)',
    fontSize: 18,
  },
  activateNoticement: {
    color: 'rgb(150, 153, 158)',
  },
  card: {
    marginBottom: 25,
    padding: 20,
    backgroundColor: 'rgb(245, 246, 247)',
    borderRadius: 16,
  },
  profileInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  profileInfoRowTitle: {
    color: 'rgb(83, 86, 92)',
    fontSize: 15,
  },
  profileInfoRowValue: {
    color: 'rgb(83, 86, 92)',
    fontWeight: 'bold',
    fontSize: 15,
  },
  sectionContainer: {
    flex: 1,
    marginTop: 32,
    marginHorizontal: 24,
    padding: 24,
  },
})
