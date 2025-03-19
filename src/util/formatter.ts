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
