import firestore from '@react-native-firebase/firestore';
import crashlytics from '@react-native-firebase/crashlytics';
import {Asset, Liability, User} from '../model/types';
import {AssetType, Constants, UserSchema} from './types';
import {getCurrentUser} from './auth/auth';

export const getUserData = async (): Promise<User | null> => {
  try {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      throw new Error('User not signed in.');
    }
    const userDoc = await firestore()
      .collection('users')
      .doc(currentUser?.uid)
      .get();

    const user = UserSchema.parse(userDoc.data());
    if (!user) {
      return null;
    }
    const assetTypes = await getAssetTypes();
    const userAssets: Asset[] = [];

    for (const [key, value] of Object.entries(user?.finance?.assets)) {
      const assetType = assetTypes.get(key);
      if (assetType && value.dateModified) {
        userAssets.push({
          ...assetType,
          value: value.value,
          dateModified: value.dateModified.toDate(),
          id: key,
          keepInPension: value.keepInPension,
          monthlyPayment: value.monthlyPayment,
        });
      }
    }

    const userLiabilities: Liability[] = [];

    for (const [key, value] of Object.entries(user?.finance?.liabilities)) {
      if (value.value && value.dateModified) {
        userLiabilities.push({
          value: value.value,
          name: value.name,
          annualRate: value.annualRate,
          endDate: value.endDate.toDate(),
          dateModified: value.dateModified.toDate(),
          id: key,
        });
      }
    }

    return {
      ...user,
      birthDate: user.birthDate.toDate(),
      sex: user.sex,
      finance: {
        assets: userAssets.sort((a, b) => b.value - a.value),
        liabilities: userLiabilities.sort((a, b) => b.value - a.value),
        monthlyNetIncome: user.finance.monthlyNetIncome,
        monthlyNetExpense: user.finance.monthlyNetExpense,
        incomeGrowthRate: user.finance.incomeGrowthRate,
      },
    };
  } catch (error: any) {
    crashlytics().recordError(error);
    throw error;
  }
};

export const getAssetTypes = async () => {
  try {
    const assetTypes = new Map<string, AssetType>();
    const querySnapshot = await firestore().collection('assetTypes').get();

    querySnapshot.forEach(documentSnapshot => {
      const asset = {
        ...(documentSnapshot.data() as AssetType),
        id: documentSnapshot.id,
      };
      assetTypes.set(documentSnapshot.id, asset);
    });

    return assetTypes;
  } catch (error) {
    throw error;
  }
};

export const getConstants = async () => {
  try {
    const constants = (
      await firestore().collection('constants').doc('constants').get()
    ).data() as Constants;

    return constants;
  } catch (error) {
    throw error;
  }
};
