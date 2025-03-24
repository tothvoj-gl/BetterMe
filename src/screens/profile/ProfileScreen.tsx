import {Linking, View} from 'react-native';

import {ProfileScreenListItem} from './ProfileScreenListItem';
import {profileScreen} from '../../util/strings';
import {PRIVACY_POLICY_URL, TERMS_OF_USE_URL} from '../../util/constant';
import {useLogout} from '../../api/auth/useAuth';
import {AppButtonOutline} from '../../components/AppButtonOutline';

export const ProfileScreen = () => {
  const logout = useLogout();
  return (
    <View>
      <ProfileScreenListItem
        label={profileScreen.termsOfUse}
        onPress={() => Linking.openURL(TERMS_OF_USE_URL)}
      />
      <ProfileScreenListItem
        label={profileScreen.privacyPolicy}
        onPress={() => Linking.openURL(PRIVACY_POLICY_URL)}
      />
      <AppButtonOutline label="Sign out" onPress={() => logout.mutate()} />
    </View>
  );
};
