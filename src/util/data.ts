import {differenceInYears} from 'date-fns';
import {User} from '../model/types';

const inflationRate = 3;
const averageLifeExpectancy = 79;

export const getUserNetWorth = (
  user: User,
  yearsFromNow: number,
  excludeNonPensionAssets = false,
) => {
  let totalNetWorth = 0;
  let totalWorth = 0;
  user.finance?.assets.forEach(asset => {
    console.log({excludeNonPensionAssets});

    if (!excludeNonPensionAssets || !asset.keepInPension) {
      const assetGrowthRate = 1 + asset.avgGrowthRate / 100;
      const assetRealGrowthRate =
        (1 + asset.avgGrowthRate / 100) / (1 + inflationRate / 100);
      totalWorth =
        totalWorth + asset.value * Math.pow(assetGrowthRate, yearsFromNow);
      totalNetWorth =
        totalNetWorth +
        asset.value * Math.pow(assetRealGrowthRate, yearsFromNow);
    }
  });

  const monthlyNetIncome =
    (user.finance?.monthlyNetIncome || 0) -
    (user.finance?.monthlyNetExpense || 0);
  const totalRealIncome = calculateInflationAdjustedIncome(
    monthlyNetIncome,
    yearsFromNow,
  );
  totalWorth = totalWorth + monthlyNetIncome * yearsFromNow * 12;
  totalNetWorth = totalNetWorth + totalRealIncome;

  user.finance?.liabilities.forEach(liability => {
    totalWorth = totalWorth - liability.value;
    totalNetWorth = totalNetWorth - liability.value;
  });

  return {totalWorth, totalNetWorth};
};

export const getMontlhlyPension = (
  user: User,
  retirementInYearsFromNow: number,
) => {
  const pensionYears =
    averageLifeExpectancy -
    differenceInYears(new Date(), user.birthDate) -
    retirementInYearsFromNow;

  const {totalNetWorth} = getUserNetWorth(user, retirementInYearsFromNow, true);

  const penstion = totalNetWorth / pensionYears / 12;

  console.log(pensionYears);

  return penstion;
};

const calculateInflationAdjustedIncome = (
  monthlyIncome: number,
  years: number,
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
