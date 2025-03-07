import {Image, View, Text} from 'react-native';
import {StyleSheet} from 'react-native-unistyles';
import {AppButton} from '../../components/button';
import {buttonLabels, financeScreen} from '../../util/strings';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {RootStackParamList} from '../../../App';
import {useUserData} from '../../api/useUserData';
import {AppText} from '../../components/text';
import {useAssetTypes} from '../../api/useAssetTypes';
import {getMontlhlyPension, getUserNetWorth} from '../../util/data';
import {FinanceListItem} from './finance-list-item';

const styles = StyleSheet.create(theme => ({
  container: {
    backgroundColor: theme.colors.background,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
    padding: theme.spacing.m,
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

  if (isPending) {
    return <AppText>Loading...</AppText>;
  }

  if (isError) {
    return <AppText>Error: {error.message}</AppText>;
  }

  console.log(data);

  if (data.finance) {
    const {totalNetWorth, totalWorth} = getUserNetWorth(data, 10);
    return (
      <View style={styles.container}>
        <AppText color="light">{financeScreen.totalNetWorth}</AppText>
        <Text>
          <AppText weight="bold" size="header2" color="highlight">
            {'€ '}
          </AppText>
          <AppText weight="bold" size="header2">
            {totalNetWorth.toLocaleString()}
          </AppText>
          <AppText weight="bold" size="header2">
            {' '}
            ({totalWorth.toLocaleString()})
          </AppText>
        </Text>

        <AppText weight="bold" size="header2">
          {getMontlhlyPension(data, 10)}
        </AppText>

        {data.finance?.assets.map(asset => {
          return <FinanceListItem isAsset item={asset} key={asset.id} />;
        })}

        {data.finance?.liabilities.map(liability => {
          return (
            <FinanceListItem
              isAsset={false}
              item={liability}
              key={liability.id}
            />
          );
        })}

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
