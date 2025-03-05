import {User} from '../model/types';

export const getUserNetWorth = (user: User) => {
  let totalNetWorth = 0;
  user.finance?.assets.forEach(asset => {
    totalNetWorth = totalNetWorth + asset.value;
  });

  user.finance?.liabilities.forEach(liability => {
    totalNetWorth = totalNetWorth - liability.value;
  });

  return totalNetWorth;
};
