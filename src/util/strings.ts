export const screenNames = {
  Finance: 'Finance',
};

export const buttonLabels = {
  letsStart: "Let's start",
};

export const financeScreen = {
  totalNetWorth: 'Total net worth',
  expectedPension: 'Expected monthly pension',
  simulateFuture: 'Use the slider to simulate future',
  withoutInflation: 'without inflation',
  withdrawalPeriod: (years: number) =>
    `assuming a ${years}-year withdrawal period`,
  montlyNetIncome: 'Monthly net income',
  montlyNetExpense: 'Monthly net expense',
  monthlyLiabilityPayments: 'Monthly liability payments',
  monthlyAssetPayments: 'Monthly asset payments',
  assets: 'Assets',
  liabilities: 'Liabilities',
  inCurrentPrices: (value: string) => `(${value} in current prices)`,
  now: 'Now',
  yearsFromNowOn: (years: number) =>
    years === 0 ? '' : `year${years === 1 ? '' : 's'} from now`,
};

export const loginScreen = {
  email: 'Email',
  emailFieldError: 'Email is required.',
  password: 'Password',
  confirmPassword: 'Confirm password',
  passwordFieldError: 'Password is required.',
  login: 'Login',
  loginDemo: 'Try it with a demo account',
  or: 'or',
  dontHaveAccount: 'Don’t have an account?',
  alreadyHaveAccount: 'Already have an account?',
  createAccount: 'Create Account',
  footer1: 'By Logging in, you agree to the ',
  footer1register: 'By Registering, you agree to the ',
  footer2: 'Terms of Use',
  footer3: ' and ',
  footer4: 'Privacy Policy.',
};
