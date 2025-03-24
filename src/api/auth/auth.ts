import auth, {
  CallbackOrObserver,
  FirebaseAuthTypes,
} from '@react-native-firebase/auth';

export const loginWithEmailPassword = (email: string, password: string) => {
  return auth().signInWithEmailAndPassword(email, password);
};

export const registerWithEmailPassword = (email: string, password: string) => {
  return auth().createUserWithEmailAndPassword(email, password);
};

export const logout = () => {
  return auth().signOut();
};

export const getCurrentUser = () => {
  return auth().currentUser;
};

export const subscribeToUserChanges = (
  listener: CallbackOrObserver<FirebaseAuthTypes.AuthListenerCallback>,
) => {
  return auth().onAuthStateChanged(listener);
};
