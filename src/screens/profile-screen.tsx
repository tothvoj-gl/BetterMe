import {Text, View} from 'react-native';
import {AppButton} from '../components/button';
import {useLogout} from '../api/auth/useAuth';

export const ProfileScreen = () => {
  const logout = useLogout();
  return (
    <View>
      <Text>Profile</Text>
      <AppButton label="Sign out" onPress={() => logout.mutate()} />
    </View>
  );
};
