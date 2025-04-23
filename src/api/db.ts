import firestore from '@react-native-firebase/firestore';
import crashlytics from '@react-native-firebase/crashlytics';
import {Asset, Liability, User} from '../model/types';
import {AssetType, Constants, UserSchema} from './types';
import {getCurrentUser} from './auth/auth';
import {getUserSchemaFromUser} from '../util/data';

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
    const userAssets: Asset[] =
      user?.finance?.assets?.map(asset => {
        const assetType = assetTypes.find(item => item.id === asset.id);
        return {
          ...assetType,
          value: asset.value,
          dateModified: asset.dateModified.toDate(),
          keepInPension: asset.keepInPension,
          monthlyPayment: asset.monthlyPayment,
        };
      }) || [];

    const userLiabilities: Liability[] = user?.finance?.liabilities?.map(
      liability => {
        return {
          value: liability.value,
          name: liability.name,
          annualRate: liability.annualRate,
          endDate: liability.endDate.toDate(),
          dateModified: liability.dateModified.toDate(),
          id: liability.id,
        };
      },
    );

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
    console.log(error);

    crashlytics().recordError(error);
    throw error;
  }
};

export const getAssetTypes = async () => {
  try {
    const assetTypes: AssetType[] = [];
    const querySnapshot = await firestore().collection('assetTypes').get();

    querySnapshot.forEach(documentSnapshot => {
      assetTypes.push(documentSnapshot.data() as AssetType);
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

export const setUserData = async (user: User) => {
  try {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      throw new Error('User not signed in.');
    }
    await firestore()
      .collection('users')
      .doc(currentUser?.uid)
      .set(getUserSchemaFromUser(user));
  } catch (error) {
    throw error;
  }
};
