import {differenceInYears} from 'date-fns';
import * as RNLocalize from 'react-native-localize';
import {User} from '../model/types';
import {Constants} from '../api/types';

export const getUserNetWorth = (
  user: User,
  yearsFromNow: number,
  inflationRate: number,
  excludeNonPensionAssets = false,
) => {
  let totalNetWorth = 0;
  let totalWorth = 0;
  user.finance?.assets.forEach(asset => {
    if (!excludeNonPensionAssets || !asset.keepInPension) {
      const assetGrowthRate = 1 + asset.avgGrowthRate / 100;
      const assetRealGrowthRate =
        (1 + asset.avgGrowthRate / 100) / (1 + inflationRate / 100);
      totalWorth =
        totalWorth + asset.value * Math.pow(assetGrowthRate, yearsFromNow);
      totalNetWorth =
        totalNetWorth +
        asset.value * Math.pow(assetRealGrowthRate, yearsFromNow);

      console.log({
        asset,
        ble: asset.value * Math.pow(assetRealGrowthRate, yearsFromNow),
      });
      console.log({totalNetWorth, excludeNonPensionAssets});
    }
  });

  const monthlyNetIncome =
    (user.finance?.monthlyNetIncome || 0) -
    (user.finance?.monthlyNetExpense || 0);
  const totalRealIncome = calculateInflationAdjustedIncome(
    monthlyNetIncome,
    yearsFromNow,
    inflationRate,
  );
  totalWorth = totalWorth + monthlyNetIncome * yearsFromNow * 12;
  totalNetWorth = totalNetWorth + totalRealIncome;

  console.log({ble2: totalNetWorth});

  user.finance?.liabilities.forEach(liability => {
    totalWorth = totalWorth - liability.value;
    totalNetWorth = totalNetWorth - liability.value;
  });

  console.log({ble3: totalNetWorth});

  return {totalWorth, totalNetWorth};
};

export const getMontlhlyPension = (
  user: User,
  retirementInYearsFromNow: number,
  constants: Constants,
) => {
  const lifeExpextancy = getLifeExpectancy(user, constants);
  const pensionYears =
    lifeExpextancy -
    differenceInYears(new Date(), user.birthDate) -
    retirementInYearsFromNow;

  const {totalNetWorth} = getUserNetWorth(
    user,
    retirementInYearsFromNow,
    constants.inflationRate,
    true,
  );

  const penstion = totalNetWorth / pensionYears / 12;

  console.log(pensionYears);

  return penstion;
};

export const getLifeExpectancy = (user: User, constants: Constants) =>
  user.sex === 'f'
    ? constants.lifeExpextancyFemales
    : constants.lifeExpextancyMales;

const calculateInflationAdjustedIncome = (
  monthlyIncome: number,
  years: number,
  inflationRate: number,
): number => {
  const months = years * 12;
  let totalRealIncome = 0;

  for (let month = 1; month <= months; month++) {
    // Adjust each month's income for inflation
    const realValue =
      monthlyIncome / Math.pow(1 + inflationRate / 100, month / 12);
    totalRealIncome += realValue;
  }

  return totalRealIncome;
};

const getCurrencySymbol = (locale: string, currency: string) => {
  const formatted = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(1);

  // Extract non-numeric characters (likely the currency symbol)
  return formatted.replace(/\d/g, '').trim();
};

export const getDeviceCurrencySymbol = (currency: string) => {
  const locale = getCurrentLocale(); // Get device locale
  return getCurrencySymbol(locale, currency);
};

export const getCurrentLocale = () => {
  const locale = RNLocalize.getLocales()[0].languageTag; // Get device locale
  return locale;
};
