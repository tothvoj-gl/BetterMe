import i18n from '../locales/i18n';

export const formatMoney = (value: number) => {
  return value.toLocaleString(undefined, {
    maximumFractionDigits: 0,
  });
};

export const formatMoneyWithCurrencySymbol = (
  value: number,
  currency: string,
) => {
  return value.toLocaleString(undefined, {
    maximumFractionDigits: 0,
    style: 'currency',
    currency: currency,
  });
};

export const formatRemoteDataError = (error: Error) => {
  if (error.message.includes('firestore/permission-denied')) {
    return i18n.getResource(
      i18n.language,
      'errorMessages',
      'firestorePermissionDenied',
    );
  } else {
    return error.message;
  }
};
