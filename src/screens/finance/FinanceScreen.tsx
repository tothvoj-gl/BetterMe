import {Image, View, Text, ScrollView} from 'react-native';
import {StyleSheet} from 'react-native-unistyles';
import {AppButton} from '../../components/AppButton';
import {AppText} from '../../components/AppText';
import {getDeviceCurrencySymbol} from '../../util/data';
import {FinanceListItem} from './FinanceListItem';
import Slider from '@react-native-community/slider';
import {useEffect, useState} from 'react';
import {pallette} from '../../util/colors';
import {Spacing} from '../../components/Spacing';
import {LoadingSpinner} from '../../components/LoadingSpinner';
import {CashFlowItem} from './CashFlowItem';
import {useFinanceScreenData} from './useFinanceScreenData';
import {useNavigation} from '@react-navigation/native';
import {formatMoney, formatMoneyWithCurrencySymbol} from '../../util/formatter';
import {useTranslation} from 'react-i18next';

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
  loading: {
    flex: 1,
    justifyContent: 'center',
  },
}));

export const FinanceScreen = () => {
  const navigation = useNavigation();
  const [years, setYears] = useState(0);
  const {data, isPending, isError, error} = useFinanceScreenData(years);
  const {t} = useTranslation('financeScreen');
  const ble = t('expectedPension');

  // useEffect(() => {
  //   navigation.setOptions({
  //     title: ble,
  //   });
  // }, [navigation, t]);

  if (isPending) {
    return (
      <View style={styles.loading}>
        <LoadingSpinner />
      </View>
    );
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
          {t('totalNetWorth')}
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
          {t('inCurrentPrices', {
            value: formatMoneyWithCurrencySymbol(totalNetWorth, currency),
          })}
        </AppText>
        <Spacing />
        <View style={styles.sliderContainer}>
          <Spacing />
          <AppText color="light" style={styles.centeredText}>
            {t('simulateFuture')}
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
            <AppText weight="bold" size="header4" color="highlight">
              {years === 0 ? t('now') : ''}
            </AppText>
            <AppText weight="bold" size="header4">
              {years === 0
                ? ''
                : years === 1
                  ? t('yearsFromNowOnOneYear', {value: years})
                  : years < 5
                    ? t('yearsFromNowOnLessThanFive', {value: years})
                    : t('yearsFromNowOn', {value: years})}
            </AppText>
          </Text>
          <Spacing />
        </View>
        <Spacing />
        <AppText size="header2" color="light" weight="bold">
          {t('expectedPension')}
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
          {t('inCurrentPrices', {
            value: formatMoneyWithCurrencySymbol(monthlyNetPension, currency),
          })}
        </AppText>

        <AppText size="body2" color="light">
          {t('withdrawalPeriod', {value: userLifeExpectancy - years - userAge})}
        </AppText>
        <Spacing />
        <CashFlowItem
          name={t('montlyNetIncome')}
          value={monthlyNetIncome}
          isIncome
          currency={currency}
        />

        <CashFlowItem
          name={t('montlyNetExpense')}
          value={monthlyNetExpense}
          isIncome={false}
          currency={currency}
        />
        <CashFlowItem
          name={t('monthlyLiabilityPayments')}
          value={liabilityPayments}
          isIncome={false}
          currency={currency}
        />
        <CashFlowItem
          name={t('monthlyAssetPayments')}
          value={assetPayments}
          isIncome={false}
          currency={currency}
        />
        <Spacing size="large" />
        <View style={styles.viewWithPadding}>
          <AppText size="header3" weight="semiBold" style={styles.header}>
            {t('assets')}
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
            {t('liabilities')}
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
    <View>
      <Image
        style={{alignSelf: 'center'}}
        source={require('./img/finance.png')}
      />
      <AppText size="header3" weight="semiBold" style={styles.header}>
        Ble
      </AppText>

      <AppButton
        onPress={() => navigation.navigate('AddFinanceInfo')}
        label={t('letsStart')}
      />
    </View>
  );
};
