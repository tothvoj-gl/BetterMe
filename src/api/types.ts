import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {Asset} from '../model/types';

export interface AssetType {
  name: string;
  avgGrowthRate: number;
}

interface AssetObject {
  value?: number;
  dateModified?: FirebaseFirestoreTypes.Timestamp;
}

interface LiabilityObject {
  value?: number;
  dateModified?: FirebaseFirestoreTypes.Timestamp;
}

export interface LiabilityType {
  name: string;
  avgGrowthRate: number;
}

export interface UserResponse {
  birthDate: FirebaseFirestoreTypes.Timestamp;
  finance: {
    assets: Assets;
    liabilities: Liabilities;
    monthlyNetExpense: number;
    monthlyNetIncome: number;
  };
}

type Assets = {
  [key: string]: AssetObject;
};

type Liabilities = {
  [key: string]: LiabilityObject;
};
