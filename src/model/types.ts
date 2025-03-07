import {AssetType} from '../api/types';

export interface FinanceData {
  assets: Asset[];
  liabilities: Liability[];
  monthlyNetIncome: number;
  monthlyNetExpense: number;
}

export interface User {
  birthDate: Date;
  sex: string;
  finance?: FinanceData;
}

export interface Asset extends AssetType {
  id: string;
  value: number;
  dateModified: Date;
  keepInPension: boolean;
}

export interface Liability {
  id: string;
  value: number;
  dateModified: Date;
  name: string;
}
