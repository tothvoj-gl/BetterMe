import React from 'react';
import {measureRenders} from 'reassure';
import {useQuery} from '@tanstack/react-query';
import {FinanceScreen} from './FinanceScreen';
import {screen} from '@testing-library/react-native';
import {User} from '../../model/types';

let mockUserData: User = {
  currency: 'USD',
  birthDate: new Date(2000, 6, 15),
  sex: 'm',
  finance: {
    monthlyNetExpense: 1000,
    monthlyNetIncome: 300,
    assets: [
      {
        value: 1000,
        dateModified: new Date(2025, 6, 15),
        id: 'asset1',
        keepInPension: true,
        name_en: 'asset',
        name_sk: 'asset_sk',
        question_en: 'question',
        question_sk: 'question_sk',
        avgGrowthRate: 4,
        supportsRegularPayments: true,
      },
    ],
    liabilities: [
      {
        value: 1000,
        dateModified: new Date(2025, 6, 15),
        id: 'asset1',
        name: 'liablity',
        endDate: new Date(2025, 6, 15),
        annualRate: 3,
      },
    ],
  },
};
jest.mock('@tanstack/react-query');

test('FinanceScreen performance remains stable', async () => {
  (useQuery as jest.Mock).mockReturnValue({
    data: mockUserData,
    isPending: false,
    error: null,
  });
  const scenario = async () => {
    await screen.findByText('Total net worth');
  };
  await measureRenders(<FinanceScreen />, {scenario});
});
