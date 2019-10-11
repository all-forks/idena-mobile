import Toast from 'react-native-root-toast'
import { Dimensions } from 'react-native'

const defaultConfig = {
  duration: Toast.durations.LONG,
  position: -35,
  shadow: false,
  animation: true,
  backgroundColor: 'rgba(83,86,92, 0.96)',
  hideOnPress: true,
  opacity: 1,
  textStyle: {
    textAlign: 'left',
    fontSize: 15,
  },
  delay: 0,
  containerStyle: {
    textAlign: 'left',
    width: Dimensions.get('window').width - 32,
    marginHorizontal: 16,
  },
  onShow: () => {},
  onShown: () => {},
  onHide: () => {},
  onHidden: () => {},
}

export function showToast(message = 'default message', config) {
  const toast = Toast.show(message, { ...defaultConfig, config })

  setTimeout(() => {
    Toast.hide(toast)
    clearTimeout(toast)
  }, 3000)
}

export default {
  showToast,
}
