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
        assets: Asset[];
        liabilities: Liability[];
      }
    | undefined;
};

export const useFinanceScreenData = (years: number): FinanceScreenData => {
  const {data: user, isPending, isError, error} = useUserData();
  const {data: constants} = useConstants();

  let data;

  if (user && constants) {
    const {totalNetWorth, totalWorth, totalRealIncome} = getUserNetWorth(
      user,
      years,
      constants.inflationRate,
    );

    const {pension, netPension} = getMontlhlyPension(user, years, constants);

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
      assets: user.finance.assets.map(asset => {
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
      }),
      liabilities: user.finance.liabilities.map(liability => {
        return {
          ...liability,
          value: calculateAmortization(liability, years).balance,
        };
      }),
    };
  }

  return {
    isPending,
    isError,
    error,
    data,
  };
};
