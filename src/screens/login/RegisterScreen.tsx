import React from 'react';
import {Linking, View} from 'react-native';
import {AppTextinput} from '../../components/AppTextInput';
import {StyleSheet} from 'react-native-unistyles';
import {AppButton} from '../../components/AppButton';
import {Controller, useForm} from 'react-hook-form';
import {z} from 'zod';
import {AppText} from '../../components/AppText';
import {Spacing} from '../../components/Spacing';
import {useRegister} from '../../api/auth/useAuth';
import {LoadingSpinner} from '../../components/LoadingSpinner';
import {PRIVACY_POLICY_URL, TERMS_OF_USE_URL} from '../../util/constant';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {zodResolver} from '@hookform/resolvers/zod';
import {useTranslation} from 'react-i18next';

const styles = StyleSheet.create(theme => ({
  container: {
    flex: 1,
    paddingHorizontal: theme.spacing.m,
    backgroundColor: theme.colors.background,
    justifyContent: 'space-between',
    paddingBottom: theme.spacing.s,
  },
  buttonText: {
    textAlign: 'center',
    margin: 10,
  },
  centeredText: {textAlign: 'center'},
  centeredRowView: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    flexWrap: 'wrap',
  },
}));

export const RegisterScreen = () => {
  const {t} = useTranslation('loginScreen');
  const schema = z
    .object({
      email: z.string().email(t('emailFieldError')),
      password: z.string().min(8, t('passwordFieldError')),
      confirmPassword: z.string().min(8, t('passwordFieldError')),
    })
    .required()
    .refine(data => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ['confirmPassword'],
    });
  type FormData = z.infer<typeof schema>;
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const navigation = useNavigation();

  const register = useRegister();
  const onRegister = (data: FormData) => {
    register.mutate({email: data.email, password: data.password});
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Spacing size="extraLarge" />
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <AppTextinput
              placeholder={t('email')}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              testID="email-input"
            />
          )}
          name="email"
        />
        {errors.email && (
          <AppText color="danger">{errors.email.message}</AppText>
        )}
        <Spacing />
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <AppTextinput
              placeholder={t('password')}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry
              testID="password-input"
            />
          )}
          name="password"
        />
        {errors.password && (
          <AppText color="danger">{errors.password.message}</AppText>
        )}
        <Spacing />
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <AppTextinput
              placeholder={t('confirmPassword')}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry
              testID="confirm-password-input"
            />
          )}
          name="confirmPassword"
        />
        {errors.confirmPassword && (
          <AppText color="danger">{errors.confirmPassword.message}</AppText>
        )}
        {register.error && (
          <AppText style={styles.centeredText} color="danger">
            {t('errorMessage')}
          </AppText>
        )}
        {register.isPending && <LoadingSpinner />}
        <AppButton
          disabled={register.isPending}
          label={t('createAccount')}
          testID="register-button"
          onPress={handleSubmit(onRegister)}
        />

        <View style={styles.centeredRowView}>
          <AppText size="body2">{t('alreadyHaveAccount')}</AppText>
          <AppText size="body2"> </AppText>
          <AppText
            color="highlight"
            size="body2"
            weight="bold"
            onPress={() => {
              navigation.goBack();
            }}>
            {t('login')}
          </AppText>
        </View>
      </View>

      <View style={styles.centeredRowView}>
        <AppText size="body2" color="light">
          {t('footer1register')}
        </AppText>
        <AppText
          size="body2"
          color="highlightSecondary"
          weight="bold"
          onPress={() => Linking.openURL(TERMS_OF_USE_URL)}>
          {t('footer2')}
        </AppText>
        <AppText size="body2" color="light">
          {t('footer3')}
        </AppText>
        <AppText
          size="body2"
          color="highlightSecondary"
          weight="bold"
          onPress={() => Linking.openURL(PRIVACY_POLICY_URL)}>
          {t('footer4')}
          {'.'}
        </AppText>
      </View>
    </SafeAreaView>
  );
};
