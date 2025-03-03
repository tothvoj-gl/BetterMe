import firestore from '@react-native-firebase/firestore';

export const getUserData = async () => {
  console.log('bleee');

  try {
    // Get user document with an ID of ABC
    const userDoc = await firestore()
      .collection('users')
      .doc('jKsLb3uKvwgAQ0exVTblyCaFSNh1')
      .get();

    const user = userDoc.data() as User;
    console.log(user.birthDate.toDateString());
  } catch (error) {
    console.log(error);
  }
};
