import {Image, View, Text, ScrollView} from 'react-native';
import {StyleSheet} from 'react-native-unistyles';
import {AppButton} from '../../components/button';
import {buttonLabels, financeScreen} from '../../util/strings';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {RootStackParamList} from '../../../App';
import {AppText} from '../../components/text';
import {getDeviceCurrencySymbol} from '../../util/data';
import {FinanceListItem} from './finance-list-item';
import Slider from '@react-native-community/slider';
import {useState} from 'react';
import {pallette} from '../../util/colors';
import {Spacing} from '../../components/spacing';
import {LoadingSpinner} from '../../components/loading-spinner';
import {CashFlowItem} from './cash-flow-item';
import {useFinanceScreenData} from './use-finance-screen-data';
import {useNavigation} from '@react-navigation/native';
import {formatMoney, formatMoneyWithCurrencySymbol} from '../../util/formatter';

const styles = StyleSheet.create(theme => ({
  container: {
    backgroundColor: theme.colors.background,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: theme.spacing.m,
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
  sliderContainer: {
    width: '100%',
    backgroundColor: theme.colors.backgroundSecondary,
    paddingHorizontal: theme.spacing.m,
  },
  centeredText: {textAlign: 'center'},
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: theme.colors.background,
    backgroundColor: 'transparent',
  },
  viewWithPadding: {
    paddingHorizontal: theme.spacing.m,
  },
  header: {
    alignSelf: 'flex-start',
  },
}));

export const FinanceScreen = () => {
  const navigation = useNavigation();
  const [years, setYears] = useState(0);
  const {data, isPending, isError, error} = useFinanceScreenData(years);

  if (isPending) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <AppText>{error?.message}</AppText>;
  }

  if (data) {
    const {
      totalNetWorth,
      totalWorth,
      currency,
      userLifeExpectancy,
      userAge,
      monthlyPension,
      monthlyNetPension,
      monthlyNetIncome,
      monthlyNetExpense,
      assets,
      liabilities,
      assetPayments,
      liabilityPayments,
    } = data;

    return (
      <ScrollView
        contentContainerStyle={styles.container}
        stickyHeaderIndices={[4]}>
        <AppText size="header2" color="light" weight="bold">
          {financeScreen.totalNetWorth}
        </AppText>
        <Text>
          <AppText weight="bold" size="header2" color="highlight">
            {getDeviceCurrencySymbol(currency)}{' '}
          </AppText>
          <AppText weight="bold" size="header2">
            {formatMoney(totalWorth)}{' '}
          </AppText>
        </Text>
        <AppText size="header4" color="light">
          {financeScreen.inCurrentPrices(
            formatMoneyWithCurrencySymbol(totalNetWorth, currency),
          )}
        </AppText>
        <Spacing />
        <View style={styles.sliderContainer}>
          <Spacing />
          <AppText color="light" style={styles.centeredText}>
            {financeScreen.simulateFuture}
          </AppText>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={userLifeExpectancy - userAge - 1}
            onValueChange={value => setYears(value)}
            minimumTrackTintColor={pallette.secondary900}
            maximumTrackTintColor={pallette.primary900}
            step={1}
          />
          <Text style={styles.centeredText}>
            <AppText weight="bold" size="header2" color="highlight">
              {years === 0 ? financeScreen.now : `${years} `}
            </AppText>
            <AppText weight="bold" size="header5">
              {financeScreen.yearsFromNowOn(years)}
            </AppText>
          </Text>
          <Spacing />
        </View>
        <Spacing />
        <AppText size="header2" color="light" weight="bold">
          {financeScreen.expectedPension}
        </AppText>
        <Text>
          <AppText weight="bold" size="header2" color="highlight">
            {getDeviceCurrencySymbol(currency)}{' '}
          </AppText>
          <AppText weight="bold" size="header2">
            {formatMoney(monthlyPension)}{' '}
          </AppText>
        </Text>
        <AppText size="header4" color="light">
          {financeScreen.inCurrentPrices(
            formatMoneyWithCurrencySymbol(monthlyNetPension, currency),
          )}
        </AppText>

        <AppText size="body2" color="light">
          {financeScreen.withdrawalPeriod(userLifeExpectancy - years - userAge)}
        </AppText>
        <Spacing />
        <CashFlowItem
          name={financeScreen.montlyNetIncome}
          value={monthlyNetIncome}
          isIncome
          currency={currency}
        />

        <CashFlowItem
          name={financeScreen.montlyNetExpense}
          value={monthlyNetExpense}
          isIncome={false}
          currency={currency}
        />
        <CashFlowItem
          name={financeScreen.monthlyLiabilityPayments}
          value={liabilityPayments}
          isIncome={false}
          currency={currency}
        />
        <CashFlowItem
          name={financeScreen.monthlyAssetPayments}
          value={assetPayments}
          isIncome={false}
          currency={currency}
        />
        <Spacing size="large" />
        <View style={styles.viewWithPadding}>
          <AppText size="header3" weight="semiBold" style={styles.header}>
            {financeScreen.assets}
          </AppText>

          {assets.map(asset => {
            return (
              <FinanceListItem
                isAsset
                item={asset}
                key={asset.id}
                value={asset.value}
              />
            );
          })}

          <Spacing />
          <AppText size="header3" weight="semiBold" style={styles.header}>
            {financeScreen.liabilities}
          </AppText>

          {liabilities.map(liability => {
            return (
              <FinanceListItem
                isAsset={false}
                item={liability}
                key={liability.id}
                value={liability.value}
              />
            );
          })}
        </View>
      </ScrollView>
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
