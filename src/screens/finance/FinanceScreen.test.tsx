import {render, screen} from '@testing-library/react-native';
import {FinanceScreen} from './FinanceScreen';
import {FinanceScreenData} from './useFinanceScreenData';

let mockFinanceData: FinanceScreenData = {
  isPending: false,
  isError: false,
  error: null,
  data: undefined,
};

jest.mock('./use-finance-screen-data', () => ({
  useFinanceScreenData: () => mockFinanceData,
}));

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({navigate: mockedNavigate}),
}));

test('Lets start button is displayed if there is no finance data', () => {
  render(<FinanceScreen />);
  expect(screen.getByRole('button', {name: "Let's start"})).toBeOnTheScreen();
});

test('Finance data is displayed', () => {
  mockFinanceData = {
    isPending: false,
    isError: false,
    error: null,
    data: {
      currency: 'USD',
      totalWorth: 10000,
      totalNetWorth: 10000,
      monthlyPension: 200,
      monthlyNetPension: 200,
      monthlyNetIncome: 300,
      monthlyNetExpense: 100,
      totalRealIncome: 300,
      userAge: 35,
      userLifeExpectancy: 79,
      assets: [
        {
          value: 300,
          name: 'asset1',
          id: 'asset1',
          dateModified: new Date(),
          keepInPension: false,
          avgGrowthRate: 3,
          supportsRegularPayments: true,
        },
      ],
      liabilities: [
        {
          value: 300,
          name: 'asset1',
          id: 'asset1',
          dateModified: new Date(),
          endDate: new Date(),
          annualRate: 3,
        },
      ],
    },
  };
  render(<FinanceScreen />);
  expect(screen.getByText('Total net worth')).toBeOnTheScreen();
  expect(screen.getByText('Expected monthly pension')).toBeOnTheScreen();
  expect(screen.getByText('Assets')).toBeOnTheScreen();
  expect(screen.getByText('Liabilities')).toBeOnTheScreen();
  expect(screen.getByText('Monthly net income')).toBeOnTheScreen();
  expect(screen.getByText('Monthly net expense')).toBeOnTheScreen();
  expect(screen.getByText('10,000')).toBeOnTheScreen();
  expect(screen.getByText('200')).toBeOnTheScreen();
});

test('Loading indicator is displayed while data is loading', () => {
  mockFinanceData = {
    isPending: true,
    isError: false,
    data: undefined,
    error: null,
  };
  render(<FinanceScreen />);
  expect(screen.getByTestId('loading-indicator')).toBeOnTheScreen();
});

test('Error message is displayed in case of an error', () => {
  mockFinanceData = {
    isPending: false,
    isError: true,
    data: undefined,
    error: new Error('Test error msg'),
  };
  render(<FinanceScreen />);
  expect(screen.getByText('Test error msg')).toBeOnTheScreen();
});
