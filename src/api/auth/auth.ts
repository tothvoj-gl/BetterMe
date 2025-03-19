import auth from '@react-native-firebase/auth';

export const loginWithEmailPassword = (email: string, password: string) => {
  return auth().signInWithEmailAndPassword(email, password);
};

export const logout = () => {
  return auth().signOut();
};
