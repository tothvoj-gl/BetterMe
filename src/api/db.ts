import firestore from '@react-native-firebase/firestore';
import {Asset, Liability, User} from '../model/types';
import {AssetType, UserResponse} from './types';

export const getUserData = async (): Promise<User> => {
  try {
    const userDoc = await firestore()
      .collection('users')
      .doc('jKsLb3uKvwgAQ0exVTblyCaFSNh1')
      .get();

    const user = userDoc.data() as UserResponse;
    console.log(user);

    const assetTypes = await getAssetTypes();

    const userAssets: Asset[] = [];

    for (const [key, value] of Object.entries(user?.finance?.assets)) {
      const assetType = assetTypes.get(key);
      if (assetType && value.value && value.dateModified) {
        userAssets.push({
          ...assetType,
          value: value.value,
          dateModified: value.dateModified.toDate(),
          id: key,
          keepInPension: value.keepInPension,
        });
      }
    }

    const userLiabilities: Liability[] = [];

    for (const [key, value] of Object.entries(user?.finance?.liabilities)) {
      if (value.value && value.dateModified) {
        userLiabilities.push({
          value: value.value,
          name: value.name,
          dateModified: value.dateModified.toDate(),
          id: key,
        });
      }
    }

    return {
      ...user,
      birthDate: user.birthDate.toDate(),
      finance: {
        assets: userAssets.sort((a, b) => b.value - a.value),
        liabilities: userLiabilities,
        monthlyNetIncome: user.finance.monthlyNetIncome,
        monthlyNetExpense: user.finance.monthlyNetExpense,
      },
    };
  } catch (error) {
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
