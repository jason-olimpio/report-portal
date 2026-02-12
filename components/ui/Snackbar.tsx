import {useEffect, useState, useRef} from 'react'
import {useTranslation} from 'react-i18next'
import {Text, Animated, Pressable} from 'react-native'

type SnackbarProps = {
  visible: boolean
  message: string
  onClose?: () => void
}

const Snackbar = ({visible, message, onClose}: SnackbarProps) => {
  const [slideAnimation] = useState(() => new Animated.Value(100))
  const [shouldRender, setShouldRender] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const {t} = useTranslation()

  useEffect(() => {
    clearTimer()

    if (!visible) {
      hideSnackbar()
      return
    }

    setShouldRender(true)

    Animated.timing(slideAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start()

    timerRef.current = setTimeout(() => hideSnackbar(onClose), 3000)

    return clearTimer
  }, [visible, onClose, slideAnimation])

  const handleClose = () => {
    clearTimer()
    hideSnackbar(onClose)
  }

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }

  const hideSnackbar = (callback?: () => void) =>
    Animated.timing(slideAnimation, {
      toValue: 100,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setShouldRender(false)

      if (callback) callback()
    })

  if (!shouldRender) return null

  return (
    <Animated.View
      style={{transform: [{translateY: slideAnimation}]}}
      className="absolute right-5 bottom-8 z-[1000] min-w-[250px] 
      max-w-xs rounded-lg shadow-lg bg-system-red-600-light dark:bg-system-red-600-dark 
      py-3 px-6 flex-row items-center pointer-events-auto"
      pointerEvents="auto">
      <Text className="text-white font-titillium-bold flex-1 pr-4">
        {message}
      </Text>

      <Pressable
        onPress={handleClose}
        accessibilityLabel={t('close')}
        className="pl-2">
        <Text className="text-white text-lg font-titillium-bold">×</Text>
      </Pressable>
    </Animated.View>
  )
}

export default Snackbar
