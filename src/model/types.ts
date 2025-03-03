interface FinanceData {
  assets: number;
  liabilities: null;
  monthlyNetIncome: number;
  monthlyNetExpense: number;
}

interface User {
  birthDate: Date;
  finance: FinanceData;
}

interface Asset {
  value: number;
  dateModified: Date;
}

interface Liability {
  value: number;
  dateModified: Date;
}
