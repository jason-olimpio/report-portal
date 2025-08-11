/**
 * useScreenWidth.ts
 *
 * @author Jason Olimpio
 * @date 11 August 2025
 *
 * @description Custom hook for tracking screen width changes.
 * Provides dynamic screen width updates when the device is rotated
 * or the window is resized.
 */

import {useState, useEffect} from 'react'
import {Dimensions} from 'react-native'

const useScreenWidth = (offset: number = 0): number => {
  const [screenWidth, setScreenWidth] = useState(
    Dimensions.get('window').width - offset,
  )

  useEffect(() => {
    const onChange = ({window}: {window: {width: number}}) =>
      setScreenWidth(window.width - offset)
    const subscription = Dimensions.addEventListener('change', onChange)

    return () => subscription.remove()
  }, [offset])

  return screenWidth
}

export default useScreenWidth
