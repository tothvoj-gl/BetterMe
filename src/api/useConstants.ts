import {useQuery} from '@tanstack/react-query';
import {getConstants} from './db';
import {Constants} from './types';

const constantsFallback: Constants = {
  inflationRate: 3,
  lifeExpextancyFemales: 84,
  lifeExpextancyMales: 79,
};

export const useConstants = () => {
  return useQuery({
    queryKey: ['constants'],
    queryFn: getConstants,
    initialData: constantsFallback,
  });
};
