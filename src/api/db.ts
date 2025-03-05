import firestore from '@react-native-firebase/firestore';
import {Asset, Liability, User} from '../model/types';
import {AssetType, LiabilityType, UserResponse} from './types';
import {assets} from '../../react-native.config';

export const getUserData = async (): Promise<User> => {
  try {
    const userDoc = await firestore()
      .collection('users')
      .doc('jKsLb3uKvwgAQ0exVTblyCaFSNh1')
      .get();

    const user = userDoc.data() as UserResponse;
    console.log(user);

    const assetTypes = await getAssetTypes();
    const liabilityTypes = await getLiabilityTypes();
    const userAssets: Asset[] = [];

    for (const [key, value] of Object.entries(user?.finance?.assets)) {
      const assetType = assetTypes.get(key);
      if (assetType && value.value && value.dateModified) {
        userAssets.push({
          ...assetType,
          value: value.value,
          dateModified: value.dateModified.toDate(),
          id: key,
        });
      }
    }

    const userLiabilities: Liability[] = [];

    for (const [key, value] of Object.entries(user?.finance?.liabilities)) {
      const liabilityType = liabilityTypes.get(key);
      if (liabilityType && value.value && value.dateModified) {
        userLiabilities.push({
          ...liabilityType,
          value: value.value,
          dateModified: value.dateModified.toDate(),
          id: key,
        });
      }
    }

    return {
      ...user,
      birthDate: user.birthDate.toDate(),
      finance: {
        assets: userAssets,
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

export const getLiabilityTypes = async () => {
  try {
    const liabilityTypes = new Map<string, LiabilityType>();
    const querySnapshot = await firestore().collection('liabilityTypes').get();

    querySnapshot.forEach(documentSnapshot => {
      const liability = {
        ...(documentSnapshot.data() as LiabilityType),
        id: documentSnapshot.id,
      };
      liabilityTypes.set(documentSnapshot.id, liability);
    });

    return liabilityTypes;
  } catch (error) {
    throw error;
  }
};
