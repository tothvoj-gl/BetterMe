import {Image, TouchableOpacity} from 'react-native';
import {StyleSheet} from 'react-native-unistyles';
import {AppText} from './AppText';

export type Props = {
  onPress: () => void;
  label: string;
  index: number;
  selectedItemIndex: number;
};

const styles = StyleSheet.create(theme => ({
  button: (isActiveItem: boolean) => ({
    borderRadius: 5,
    borderColor: isActiveItem ? theme.colors.primary : theme.colors.border,
    backgroundColor: theme.colors.background,
    margin: theme.spacing.s,
    borderWidth: 1,
    width: '80%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }),
  buttonText: {
    margin: 10,
  },
  image: {
    height: 20,
    width: 20,
    marginRight: theme.spacing.m,
    resizeMode: 'contain',
  },
}));

export const AppRadioButton = ({
  label,
  onPress,
  index,
  selectedItemIndex,
}: Props) => {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      onPress={onPress}
      style={styles.button(selectedItemIndex === index)}>
      <AppText style={styles.buttonText}>{label}</AppText>
      {selectedItemIndex === index && (
        <Image style={styles.image} source={require('./img/tick-circle.png')} />
      )}
    </TouchableOpacity>
  );
};
