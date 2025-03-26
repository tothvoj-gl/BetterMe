import {Linking, View} from 'react-native';
import {useRef} from 'react';
import {TrueSheet} from '@lodev09/react-native-true-sheet';
import {ProfileScreenListItem} from './ProfileScreenListItem';
import {PRIVACY_POLICY_URL, TERMS_OF_USE_URL} from '../../util/constant';
import {useLogout} from '../../api/auth/useAuth';
import {AppButtonOutline} from '../../components/AppButtonOutline';
import {useTranslation} from 'react-i18next';
import {AppText} from '../../components/AppText';
import {StyleSheet} from 'react-native-unistyles';
import {AppRadioButtonGroup} from '../../components/AppRadioButtonGroup';
import i18n from '../../locales/i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LANGUAGE_KEY} from '../../api/localStorage';
import {Spacing} from '../../components/Spacing';

const styles = StyleSheet.create(theme => ({
  bottomSheetContainer: {
    padding: theme.spacing.l,
  },
}));

export const ProfileScreen = () => {
  const sheet = useRef<TrueSheet>(null);
  const logout = useLogout();
  const {t} = useTranslation('profileScreen');
  return (
    <View>
      <ProfileScreenListItem
        label={t('changeLanguage')}
        onPress={() => sheet.current?.present()}
      />
      <ProfileScreenListItem
        label={t('termsOfUse')}
        onPress={() => Linking.openURL(TERMS_OF_USE_URL)}
      />
      <ProfileScreenListItem
        label={t('privacyPolicy')}
        onPress={() => Linking.openURL(PRIVACY_POLICY_URL)}
      />
      <AppButtonOutline label={t('logout')} onPress={() => logout.mutate()} />

      <TrueSheet
        ref={sheet}
        sizes={['30%']}
        cornerRadius={24}
        contentContainerStyle={styles.bottomSheetContainer}>
        <AppText weight="semiBold">{t('chooseLanguage')}</AppText>
        <Spacing />
        <AppRadioButtonGroup
          items={[
            {label: t('english'), value: 'en'},
            {label: t('slovak'), value: 'sk'},
          ]}
          initialIndex={i18n.language === 'sk' ? 1 : 0}
          onPress={value => {
            AsyncStorage.setItem(LANGUAGE_KEY, value);
            i18n.changeLanguage(value);
            sheet.current?.dismiss();
          }}
        />
      </TrueSheet>
    </View>
  );
};
