import {Image, View} from 'react-native';
import {StyleSheet} from 'react-native-unistyles';
import {AppButton} from '../../components/button';
import {buttonLabels} from '../../util/strings';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {RootStackParamList} from '../../../App';
import {useUserData} from '../../api/useUserData';
import {AppText} from '../../components/text';
import {useAssetTypes} from '../../api/useAssetTypes';
import {getUserNetWorth} from '../../util/data';

const styles = StyleSheet.create(theme => ({
  container: {
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  linearGradient: {
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    margin: 15,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: theme.colors.background,
    backgroundColor: 'transparent',
  },
}));

type Props = BottomTabScreenProps<RootStackParamList>;

export const FinanceScreen = ({navigation}: Props) => {
  const {data, isPending, isError, error} = useUserData();
  const result = useAssetTypes();

  if (isPending) {
    return <AppText>Loading...</AppText>;
  }

  if (isError) {
    return <AppText>Error: {error.message}</AppText>;
  }

  console.log(data);

  if (data.finance) {
    return (
      <View style={styles.container}>
        <AppText>{getUserNetWorth(data)}</AppText>
        <AppText>{data.finance?.monthlyNetIncome}</AppText>
        <AppText>{data.finance?.monthlyNetExpense}</AppText>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={require('./img/finance.png')} />
      <AppButton
        onPress={() => navigation.navigate('AddFinanceInfo')}
        label={buttonLabels.letsStart}
      />
    </View>
  );
};
