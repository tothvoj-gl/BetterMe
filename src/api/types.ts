import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

export interface AssetType {
  name: string;
  avgGrowthRate: number;
}

interface AssetObject {
  value?: number;
  dateModified?: FirebaseFirestoreTypes.Timestamp;
  keepInPension: boolean;
}

interface LiabilityObject {
  value?: number;
  dateModified?: FirebaseFirestoreTypes.Timestamp;
  monthlyPayment?: number;
  endDate: FirebaseFirestoreTypes.Timestamp;
  name: string;
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
