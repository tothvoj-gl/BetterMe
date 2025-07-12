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
    totalNetWorth: 366360.0799848854,
    totalRealIncome: 286927.5892717283,
    totalWorth: 510249.8103153331,
  });

  const result2 = getUserNetWorth(userMock, 10, 3, false);
  expect(result2).toStrictEqual({
    totalIncome: 387166.7603707186,
    totalNetWorth: 736146.1376029474,
    totalRealIncome: 286927.5892717283,
    totalWorth: 1007211.3500013361,
  });
});
