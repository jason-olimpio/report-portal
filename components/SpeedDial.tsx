import {ComponentProps, useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import MaterialIcons from '@react-native-vector-icons/material-icons';

type Action = {
  icon: ComponentProps<typeof MaterialIcons>['name'];
  onPress: () => void;
};

const ACTIONS: Action[] = [
  {icon: 'plus-one', onPress: () => {}},
  {icon: 'bedtime', onPress: () => {}},
];

const SpeedDial = () => {
  const [open, setOpen] = useState(false);

  const renderActions = () =>
    ACTIONS.map(({icon, onPress}, idx) => (
      <TouchableOpacity
        key={icon}
        className="bg-white rounded-full p-4 mb-2 absolute right-1 shadow-lg"
        style={{
          bottom: 50 * (1 + idx),
          elevation: 5,
        }}
        onPress={() => {
          setOpen(false);
          onPress();
        }}>
        <MaterialIcons name={icon} size={15} color="black" />
      </TouchableOpacity>
    ));

  return (
    <View className="absolute right-6 bottom-6 z-50">
      {open && renderActions()}

      <TouchableOpacity
        className="w-14 h-14 rounded-full bg-primary justify-center items-center shadow-lg"
        onPress={() => setOpen(previousState => !previousState)}
        activeOpacity={0.85}
        style={{
          elevation: 5,
        }}>
        <MaterialIcons
          name={open ? 'close' : 'add'}
          size={12}
          color="white"
        />
      </TouchableOpacity>
    </View>
  );
};

export default SpeedDial;
