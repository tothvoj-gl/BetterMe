import {differenceInYears} from 'date-fns';
import * as RNLocalize from 'react-native-localize';
import {Liability, User} from '../model/types';
import {Constants} from '../api/types';

export const getRealFutureValue = (
  presentValue: number,
  annualGrowthRate: number,
  years: number,
  inflationRate: number,
  monthlyPayment?: number,
) => {
  let assetTotalWorth = presentValue;
  if (annualGrowthRate > 0) {
    const monthlyRate = annualGrowthRate / 100 / 12;
    const totalMonths = years * 12;

    // Future Value of Initial Asset
    const futureValueInitial =
      presentValue * Math.pow(1 + monthlyRate, totalMonths);

    // Future Value of Monthly Contributions
    const futureValuePayments =
      (monthlyPayment || 0) *
      ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);

    // Total Future Value (Nominal)
    assetTotalWorth = futureValueInitial + futureValuePayments;
  }

  const assetTotalNetWorth =
    assetTotalWorth / Math.pow(1 + inflationRate / 100, years);

  return {assetTotalNetWorth, assetTotalWorth};
};

export const getUserNetWorth = (
  user: User,
  yearsFromNow: number,
  inflationRate: number,
  excludeNonPensionAssets = false,
) => {
  console.log(JSON.stringify(user));

  let totalNetWorth = 0;
  let totalWorth = 0;
  user.finance?.assets.forEach(asset => {
    if (!excludeNonPensionAssets || !asset.keepInPension) {
      const {assetTotalNetWorth, assetTotalWorth} = getRealFutureValue(
        asset.value,
        asset.avgGrowthRate,
        yearsFromNow,
        inflationRate,
      );
      totalWorth = totalWorth + assetTotalWorth;
      totalNetWorth = totalNetWorth + assetTotalNetWorth;
    }
  });

  let liablityMonthlyExpenses = 0;
  user.finance.liabilities.forEach(liability => {
    const {monthlyPayment, balance} = calculateAmortization(
      liability,
      yearsFromNow,
    );

    totalWorth = totalWorth - balance;
    totalNetWorth = totalNetWorth - balance;
    liablityMonthlyExpenses = liablityMonthlyExpenses + monthlyPayment;
  });

  const {totalRealIncome, totalIncome} = calculateInflationAdjustedIncome(
    user.finance.monthlyNetIncome,
    user.finance.monthlyNetExpense,
    liablityMonthlyExpenses,
    yearsFromNow,
    inflationRate,
    user.finance.incomeGrowthRate,
  );
  totalWorth = totalWorth + totalIncome;
  totalNetWorth = totalNetWorth + totalRealIncome;

  return {totalWorth, totalNetWorth, totalRealIncome, totalIncome};
};

export const calculateAmortization = (
  liability: Liability,
  yearsPaid: number,
) => {
  const totalYears = differenceInYears(liability.endDate, new Date());
  const months = totalYears * 12;
  const monthsPaid = yearsPaid * 12;
  const monthlyRate = liability.annualRate / 100 / 12;
  const monthlyPayment =
    (liability.value * monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1);

  let balance = liability.value;

  for (let i = 1; i <= monthsPaid; i++) {
    const interestPayment = balance * monthlyRate;
    const principalPayment = monthlyPayment - interestPayment;
    if (balance - principalPayment < 0) {
      balance = 0;
      break;
    }
    balance -= principalPayment;
  }

  return {monthlyPayment, balance};
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

  const {totalNetWorth, totalWorth} = getUserNetWorth(
    user,
    retirementInYearsFromNow,
    constants.inflationRate,
    true,
  );

  const pension = totalWorth / pensionYears / 12;
  const netPension = totalNetWorth / pensionYears / 12;

  return {pension, netPension};
};

export const getLifeExpectancy = (user: User, constants: Constants) =>
  user.sex === 'f'
    ? constants.lifeExpextancyFemales
    : constants.lifeExpextancyMales;

const calculateInflationAdjustedIncome = (
  monthlyIncome: number,
  monthlyExpense: number,
  liablityMonthlyExpenses: number,
  years: number,
  inflationRate: number,
  incomeGrowthRate: number,
) => {
  const totalMonths = years * 12;
  const monthlyRate = incomeGrowthRate / 100 / 12;
  const monthlyInflation = inflationRate / 100 / 12;

  const totalIncome =
    monthlyIncome *
      ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) -
    (monthlyExpense + liablityMonthlyExpenses) * totalMonths;

  const totalRealIncome =
    totalIncome / Math.pow(1 + monthlyInflation, totalMonths);

  return {
    totalRealIncome,
    totalIncome,
  };
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
