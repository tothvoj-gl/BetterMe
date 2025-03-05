import {AssetType, LiabilityType} from '../api/types';

export interface FinanceData {
  assets: Asset[];
  liabilities: Liability[];
  monthlyNetIncome: number;
  monthlyNetExpense: number;
}

export interface User {
  birthDate: Date;
  finance?: FinanceData;
}

export interface Asset extends AssetType {
  id: string;
  value: number;
  dateModified: Date;
}

export interface Liability extends LiabilityType {
  id: string;
  value: number;
  dateModified: Date;
}
