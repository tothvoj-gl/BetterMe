import {differenceInYears} from 'date-fns/differenceInYears';
import {useConstants} from '../../api/useConstants';
import {useUserData} from '../../api/useUserData';
import {
  calculateAmortization,
  getLifeExpectancy,
  getMontlhlyPension,
  getRealFutureValue,
  getUserNetWorth,
} from '../../util/data';
import {CASH_ASSET_ID} from '../../util/constant';
import {Asset, Liability} from '../../model/types';

export type FinanceScreenData = {
  isPending: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => void;
  data:
    | {
        totalNetWorth: number;
        totalWorth: number;
        totalRealIncome: number;
        currency: string;
        userAge: number;
        userLifeExpectancy: number;
        monthlyPension: number;
        monthlyNetPension: number;
        monthlyNetIncome: number;
        monthlyNetExpense: number;
        liabilityPayments: number;
        assetPayments: number;
        assets: Asset[];
        liabilities: Liability[];
      }
    | undefined;
};

export const useFinanceScreenData = (years: number): FinanceScreenData => {
  const {data: user, isPending, isError, error, refetch} = useUserData();
  const {data: constants} = useConstants();

  let data;

  if (user && constants) {
    const {totalNetWorth, totalWorth, totalRealIncome} = getUserNetWorth(
      user,
      years,
      constants.inflationRate,
    );

    const {pension, netPension} = getMontlhlyPension(user, years, constants);
    let assetPayments = 0;
    const assets = user.finance.assets.map(asset => {
      assetPayments = assetPayments + (asset.monthlyPayment || 0);
      const futureValue = getRealFutureValue(
        asset.value,
        asset.avgGrowthRate,
        years,
        constants.inflationRate,
        asset.monthlyPayment,
      ).assetTotalNetWorth;

      return {
        ...asset,
        value:
          asset.id === CASH_ASSET_ID
            ? futureValue + totalRealIncome
            : futureValue,
      };
    });

    let liabilityPayments = 0;
    const liabilities = user.finance.liabilities.map(liability => {
      const {monthlyPayment, balance} = calculateAmortization(liability, years);
      liabilityPayments = liabilityPayments + monthlyPayment;
      return {
        ...liability,
        value: balance,
      };
    });

    data = {
      totalNetWorth,
      totalWorth,
      totalRealIncome,
      currency: user.currency,
      userAge: differenceInYears(new Date(), user.birthDate),
      userLifeExpectancy: getLifeExpectancy(user, constants),
      monthlyPension: pension,
      monthlyNetPension: netPension,
      monthlyNetIncome: getRealFutureValue(
        user.finance.monthlyNetIncome,
        user.finance.incomeGrowthRate,
        years,
        constants.inflationRate,
      ).assetTotalWorth,
      monthlyNetExpense: getRealFutureValue(
        user.finance.monthlyNetExpense,
        constants.inflationRate,
        years,
        0,
      ).assetTotalWorth,
      assets,
      liabilities,
      assetPayments,
      liabilityPayments,
    };
  }

  return {
    isPending,
    isError,
    error,
    data,
    refetch,
  };
};
