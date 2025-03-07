import {Image, View, Text} from 'react-native';
import {StyleSheet} from 'react-native-unistyles';
import {AppButton} from '../../components/button';
import {buttonLabels, financeScreen} from '../../util/strings';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {RootStackParamList} from '../../../App';
import {useUserData} from '../../api/useUserData';
import {AppText} from '../../components/text';
import {
  getCurrentLocale,
  getDeviceCurrency,
  getDeviceCurrencySymbol,
  getLifeExpectancy,
  getMontlhlyPension,
  getUserNetWorth,
} from '../../util/data';
import {FinanceListItem} from './finance-list-item';
import Slider from '@react-native-community/slider';
import {useConstants} from '../../api/useConstants';
import {differenceInYears} from 'date-fns/differenceInYears';
import {useState} from 'react';
import {pallette} from '../../util/colors';
import {Spacing} from '../../components/spacing';
import * as RNLocalize from 'react-native-localize';

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
  slider: {
    width: '100%',
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
  const {data: user, isPending, isError, error} = useUserData();
  const {data: constants} = useConstants();
  const [years, setYears] = useState(0);

  if (isPending) {
    return <AppText>Loading...</AppText>;
  }

  if (isError) {
    return <AppText>Error: {error.message}</AppText>;
  }

  const locale = RNLocalize.getLocales()[0].languageTag;
  console.log(locale); // Example output: "en-US", "fr-FR"

  if (user.finance) {
    const {totalNetWorth, totalWorth} = getUserNetWorth(
      user,
      years,
      constants.inflationRate,
    );

    return (
      <View style={styles.container}>
        <AppText color="light">{financeScreen.totalNetWorth}</AppText>
        <Text>
          <AppText weight="bold" size="header2" color="highlight">
            {getDeviceCurrencySymbol()}{' '}
          </AppText>
          <AppText weight="bold" size="header2">
            {totalNetWorth.toLocaleString(getCurrentLocale(), {
              maximumFractionDigits: 0,
            })}
          </AppText>
          <Text>
            <AppText size="header4" color="light">
              {' ('}
              {totalWorth.toLocaleString(getCurrentLocale(), {
                maximumFractionDigits: 0,
              })}
            </AppText>
            <AppText size="body2" color="light">
              {' '}
              {financeScreen.withoutInflation}
            </AppText>
            <AppText size="header5" color="light">
              {')'}
            </AppText>
          </Text>
        </Text>
        <Spacing />
        <AppText color="light">{financeScreen.simulateFuture}</AppText>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={
            getLifeExpectancy(user, constants) -
            differenceInYears(new Date(), user.birthDate) -
            1
          }
          onValueChange={value => setYears(value)}
          minimumTrackTintColor={pallette.secondary900}
          maximumTrackTintColor={pallette.primary900}
          step={1}
        />
        <Text>
          <AppText weight="bold" size="header2" color="highlight">
            {years === 0 ? 'Now' : `${years} `}
          </AppText>
          <AppText weight="bold" size="header5">
            {years === 0 ? '' : 'years from now'}
          </AppText>
        </Text>
        <Spacing />
        <AppText color="light">{financeScreen.expectedPension}</AppText>
        <AppText weight="bold" size="header2">
          {getMontlhlyPension(user, years, constants).toLocaleString(
            getCurrentLocale(),
            {
              style: 'currency',
              currency: getDeviceCurrency(),
              maximumFractionDigits: 0,
            },
          )}
        </AppText>
        <AppText size="body2" color="light">
          {financeScreen.withdrawalPeriod(
            getLifeExpectancy(user, constants) -
              years -
              differenceInYears(new Date(), user.birthDate),
          )}
        </AppText>
        <Spacing />
        <AppText>{user.finance?.monthlyNetIncome}</AppText>
        <AppText>{user.finance?.monthlyNetExpense}</AppText>
        <Spacing />
        {user.finance?.assets.map(asset => {
          return <FinanceListItem isAsset item={asset} key={asset.id} />;
        })}

        {user.finance?.liabilities.map(liability => {
          return (
            <FinanceListItem
              isAsset={false}
              item={liability}
              key={liability.id}
            />
          );
        })}
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
