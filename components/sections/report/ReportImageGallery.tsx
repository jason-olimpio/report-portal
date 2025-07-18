import {useState} from 'react';
import {View, Image, TouchableOpacity, ImageSourcePropType} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import MaterialIcons from '@react-native-vector-icons/material-icons';

import {PlaceholderImage} from '@assets';
import {useTheme} from '@hooks';

type ReportImageGalleryProps = {
  images: ImageSourcePropType[];
};

const getImageSources = (images: ImageSourcePropType[]) =>
  Array.isArray(images) && images.length > 0 ? images : [PlaceholderImage];

const ReportImageGallery = ({images}: ReportImageGalleryProps) => {
  const sources = getImageSources(images);
  const [current, setCurrent] = useState(0);
  const canGoLeft = current > 0;
  const canGoRight = current < sources.length - 1;
  const {isDark} = useTheme();

  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
  }));

  const pinchGesture = Gesture.Pinch()
    .onUpdate(event => {
      scale.value = event.scale;
    })
    .onEnd(() => {
      scale.value = withTiming(1);
    });

  const goLeft = () => canGoLeft && setCurrent(current - 1);
  const goRight = () => canGoRight && setCurrent(current + 1);

  const iconColor = isDark ? 'white' : 'black';
  const iconDisabled = 'gray';
  const imageBg = isDark ? 'bg-neutral-gray-800' : 'bg-neutral-gray-200';
  const shadow = isDark ? '' : 'shadow-lg';

  return (
    <View className="z-[9999] w-full mb-4 flex-row items-center justify-center">
      <TouchableOpacity onPress={goLeft} disabled={!canGoLeft} className="p-2">
        <MaterialIcons
          name="chevron-left"
          size={32}
          color={canGoLeft ? iconColor : iconDisabled}
        />
      </TouchableOpacity>

      <GestureDetector gesture={pinchGesture}>
        <Animated.View
          style={animatedStyle}
          className={`rounded-3xl mx-2 w-32 h-32 overflow-hidden ${shadow} ${imageBg}`}>
          <Image
            source={sources[current]}
            className="w-full h-full rounded-3xl"
            resizeMode="cover"
          />
        </Animated.View>
      </GestureDetector>

      <TouchableOpacity
        onPress={goRight}
        disabled={!canGoRight}
        className="p-2">
        <MaterialIcons
          name="chevron-right"
          size={32}
          color={canGoRight ? iconColor : iconDisabled}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ReportImageGallery;
