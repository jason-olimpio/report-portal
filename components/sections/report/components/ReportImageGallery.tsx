import React, {useState} from 'react'
import {View, Image, ImageSourcePropType} from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated'
import {Gesture, GestureDetector} from 'react-native-gesture-handler'
import Carousel from 'react-native-reanimated-carousel'
import {scheduleOnRN} from 'react-native-worklets'

import {PlaceholderImage} from '@assets'
import {useScreenWidth} from '@hooks'

type ReportImageGalleryProps = {
  images: ImageSourcePropType[]
}

const getImageSources = (images: ImageSourcePropType[]) =>
  images?.length > 0 ? images : [PlaceholderImage]

const ReportImageGallery = ({images}: ReportImageGalleryProps) => {
  const sources = getImageSources(images)
  const [canScroll, setCanScroll] = useState(true)

  const scale = useSharedValue(1)

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
  }))

  const pinchGesture = Gesture.Pinch()
    .onUpdate(event => {
      scale.value = event.scale
      if (event.scale > 1.01 && canScroll)
        scheduleOnRN(() => setCanScroll(false))
    })
    .onEnd(() => {
      scale.value = withTiming(1)
      scheduleOnRN(() => setCanScroll(true))
    })

  const carouselWidth = Math.min(useScreenWidth() - 32, 360)
  const carouselHeight = 160

  return (
    <View className="z-[9999] w-full mb-4 flex-col items-center justify-center">
      <Carousel
        width={carouselWidth}
        height={carouselHeight}
        data={sources}
        loop={false}
        pagingEnabled
        snapEnabled
        enabled={canScroll}
        renderItem={({item}) => (
          <GestureDetector gesture={pinchGesture}>
            <Animated.View
              className="rounded-3xl w-full h-full overflow-hidden items-center 
              justify-center shadow-lg bg-neutral-gray-200 dark:bg-neutral-gray-800"
              style={animatedStyle}>
              <Image
                source={item}
                className="w-full h-full rounded-3xl"
                resizeMode="cover"
              />
            </Animated.View>
          </GestureDetector>
        )}
      />
    </View>
  )
}

export default ReportImageGallery
