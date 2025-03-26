import React, {useState} from 'react';
import {AppRadioButton} from './AppRadioButton';
import {View} from 'react-native';

type SelectableContentItem = {
  label: string;
  value: string;
};

type Props = {
  items: SelectableContentItem[];
  initialIndex: number;
  onPress: (value: string) => void;
};

export const AppRadioButtonGroup = ({items, initialIndex, onPress}: Props) => {
  const [selectedItemIndex, setselectedItemIndex] = useState(initialIndex);
  return (
    <View>
      {items.map((item, index) => (
        <AppRadioButton
          key={item.value}
          label={item.label}
          index={index}
          selectedItemIndex={selectedItemIndex}
          onPress={() => {
            setselectedItemIndex(index);
            onPress(item.value);
          }}
        />
      ))}
    </View>
  );
};
