import {ComponentProps, useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';

type Action = {
  icon: ComponentProps<typeof FontAwesome6>['name'];
  onPress: () => void;
};

const ACTIONS: Action[] = [
  {icon: 'envelope', onPress: () => {}},
  {icon: 'bell', onPress: () => {}},
];

const SpeedDial = () => {
  const [open, setOpen] = useState(false);

  const renderActions = () =>
    ACTIONS.map(({icon, onPress}, idx) => (
      <TouchableOpacity
        key={icon}
        className="bg-white rounded-full p-4 mb-2 absolute right-1 shadow-lg"
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          bottom: 50 + idx * 50,
          elevation: 5,
        }}
        onPress={() => {
          setOpen(false);
          onPress();
        }}>
        <FontAwesome6 name={icon as any} size={15} color="black" />
      </TouchableOpacity>
    ));

  return (
    <View className="absolute right-6 bottom-6 z-50">
      {open && renderActions()}

      <TouchableOpacity
        className="w-14 h-14 rounded-full bg-primary justify-center items-center shadow-lg"
        onPress={() => setOpen(previousState => !previousState)}
        activeOpacity={0.85}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          elevation: 5,
        }}>
        <FontAwesome6
          name={open ? 'xmark' : ('plus' as any)}
          size={12}
          color="white"
          iconStyle="solid"
        />
      </TouchableOpacity>
    </View>
  );
};

export default SpeedDial;
