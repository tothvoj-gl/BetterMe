import {userMock} from '../test/__mocks__/userMock';
import {
  getDeviceCurrencySymbol,
  getRealFutureValue,
  getUserNetWorth,
} from './data';

test('getDeviceCurrencySymbol', () => {
  const result = getDeviceCurrencySymbol('USD');
  expect(result).toBe('$');
});

test('getRealFutureValue', () => {
  const result = getRealFutureValue(10000, 4, 10, 3, 100);
  expect(result).toStrictEqual({
    assetTotalNetWorth: 22049.96363776187,
    assetTotalWorth: 29633.307296730483,
  });
});

test('getUserNetWorth', () => {
  const result = getUserNetWorth(userMock, 10, 3, true);
  expect(result).toStrictEqual({
    totalIncome: 387166.7603707186,
    totalNetWorth: 338673.85849613807,
    totalRealIncome: 286927.5892717283,
    totalWorth: 473041.84377445636,
  });

  const result2 = getUserNetWorth(userMock, 10, 3, false);
  expect(result2).toStrictEqual({
    totalIncome: 387166.7603707186,
    totalNetWorth: 708459.9161142001,
    totalRealIncome: 286927.5892717283,
    totalWorth: 970003.3834604593,
  });
});
