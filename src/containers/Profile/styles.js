import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    paddingHorizontal: 48,
  },
  header: {
    alignItems: 'center',
  },
  name: {
    marginTop: 20,
    marginBottom: 5,
    color: 'rgb(83,86,92)',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  address: {
    color: 'rgb(87,143,255)',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
  addressPopupContainer: {
    marginTop: 19,
    marginBottom: 29,
  },
  gray: {
    color: 'rgb(150,153,158)',
    fontSize: 16,
    lineHeight: 22,
  },
  qrCodeBorder: {
    borderRadius: 8,
    padding: 5,
    borderWidth: 0.5,
    borderColor: 'gray',
  },
  actionInfoContainer: {
    marginTop: 56,
    marginBottom: 24,
  },
  nextValidationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  time: {
    color: 'rgb(83,86,92)',
    fontSize: 16,
  },
  currentTasksContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(245,246,247)',
    borderRadius: 16,
    marginTop: 20,
    paddingVertical: 20,
    paddingHorizontal: 38,
  },
  currentTaskTitle: {
    color: 'rgb(83,86,92)',
    fontSize: 16,
  },
  userAvatarContainer: {
    marginTop: 8,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flipItem: {
    justifyContent: 'flex-end',
    flex: 0.3,
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
    marginVertical: 0,
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
    marginTop: 21,
    marginBottom: 25,
    // padding: 20,
    paddingVertical: 20,
  },
  profileInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  profileInfoRowTitle: {
    color: 'rgb(150,153,158)',
    fontSize: 16,
    fontWeight: '600',
  },
  profileInfoRowValue: {
    color: 'rgb(83, 86, 92)',
    fontWeight: 'bold',
    fontSize: 15,
  },
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
  sectionContainer: {
    flex: 1,
    marginTop: 32,
    marginHorizontal: 24,
    padding: 24,
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  text: {
    color: 'rgb(83,86,92)',
    fontSize: 15,
    textAlign: 'center',
  },
})
