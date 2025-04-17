import {AssetType} from '../api/types';

export interface FinanceData {
  assets?: Asset[];
  liabilities?: Liability[];
  monthlyNetIncome: number;
  monthlyNetExpense: number;
  incomeGrowthRate: number;
}

export interface User {
  birthDate: Date;
  sex: string;
  currency: string;
  finance: FinanceData;
}

export interface Asset extends AssetType {
  value: number;
  dateModified: Date;
  keepInPension: boolean;
  monthlyPayment?: number;
}

export interface Liability {
  id: string;
  value: number;
  dateModified: Date;
  name: string;
  endDate: Date;
  annualRate: number;
}
