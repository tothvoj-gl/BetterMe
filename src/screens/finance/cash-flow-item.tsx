import {View} from 'react-native';
import {StyleSheet} from 'react-native-unistyles';
import {AppText} from '../../components/text';

export type Props = {
  name: string;
  value: number;
  isIncome: boolean;
  currency: string;
};

const styles = StyleSheet.create(theme => ({
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.s,
    marginVertical: theme.spacing.xs,
  },
}));

export const CashFlowItem = ({name, value, isIncome, currency}: Props) => {
  return (
    <View style={styles.container}>
      <AppText size="body1" weight="semiBold">
        {name}
      </AppText>
      <AppText
        size="body1"
        weight="semiBold"
        color={isIncome ? 'success' : 'danger'}>
        {value.toLocaleString(undefined, {
          style: 'currency',
          currency: currency,
          maximumFractionDigits: 0,
        })}
      </AppText>
    </View>
  );
};
