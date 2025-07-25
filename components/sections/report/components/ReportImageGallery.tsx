import {View, Image, ImageSourcePropType} from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  useDerivedValue,
} from 'react-native-reanimated'
import {Gesture, GestureDetector} from 'react-native-gesture-handler'
import Carousel from 'react-native-reanimated-carousel'

import {PlaceholderImage} from '@assets'

import {useTheme, useScreenWidth} from '@hooks'

type ReportImageGalleryProps = {
  images: ImageSourcePropType[]
}

const getImageSources = (images: ImageSourcePropType[]) =>
  Array.isArray(images) && images.length > 0 ? images : [PlaceholderImage]

const ReportImageGallery = ({images}: ReportImageGalleryProps) => {
  const {isDark} = useTheme()
  const sources = getImageSources(images)

  const scale = useSharedValue(1)
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
  }))

  const carouselEnabled = useDerivedValue(() => scale.value <= 1.01)

  const pinchGesture = Gesture.Pinch()
    .onUpdate(event => (scale.value = event.scale))
    .onEnd(() => (scale.value = withTiming(1)))

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
        enabled={carouselEnabled.value}
        renderItem={({item}: {item: ImageSourcePropType; index: number}) => (
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
