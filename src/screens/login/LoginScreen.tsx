import React from 'react';
import {Linking, View} from 'react-native';
import {AppTextinput} from '../../components/AppTextInput';
import {StyleSheet} from 'react-native-unistyles';
import {AppButton} from '../../components/AppButton';
import {Controller, useForm} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {AppText} from '../../components/AppText';
import {Spacing} from '../../components/Spacing';
import {useLogin} from '../../api/auth/useAuth';
import {LoadingSpinner} from '../../components/LoadingSpinner';
import {loginScreen} from '../../util/strings';
import {getRemoteConfigValue, RemoteConfigKey} from '../../api/remoteConfig';
import {PRIVACY_POLICY_URL, TERMS_OF_USE_URL} from '../../util/constant';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

const styles = StyleSheet.create(theme => ({
  container: {
    flex: 1,
    paddingHorizontal: theme.spacing.m,
    backgroundColor: theme.colors.background,
    justifyContent: 'space-between',
  },
  buttonText: {
    textAlign: 'center',
    margin: 10,
  },
  centeredText: {textAlign: 'center'},
  centeredRowView: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
}));

const schema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
  })
  .required();
type FormData = z.infer<typeof schema>;

export const LoginScreen = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const navigation = useNavigation();

  const login = useLogin();
  const onLogin = (data: FormData) => {
    login.mutate({email: data.email, password: data.password});
  };

  const onDemoLogin = () => {
    login.mutate({
      email: getRemoteConfigValue(RemoteConfigKey.DemoEmail),
      password: getRemoteConfigValue(RemoteConfigKey.DemoPassword),
    });
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
              placeholder={loginScreen.email}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
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
              placeholder={loginScreen.password}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry
            />
          )}
          name="password"
        />
        {errors.password && (
          <AppText color="danger">{errors.password.message}</AppText>
        )}
        <Spacing size="extraLarge" />
        {login.error && (
          <AppText style={styles.centeredText} color="danger">
            {login.error.message}
          </AppText>
        )}
        {login.isPending && <LoadingSpinner />}
        <AppButton
          disabled={login.isPending}
          label={loginScreen.login}
          onPress={handleSubmit(onLogin)}
        />
        <AppText style={styles.centeredText} color="light" size="body2">
          {loginScreen.or}
        </AppText>

        <AppButton
          disabled={login.isPending}
          label={loginScreen.loginDemo}
          onPress={onDemoLogin}
        />

        <View style={styles.centeredRowView}>
          <AppText size="body2">{loginScreen.dontHaveAccount}</AppText>
          <AppText size="body2"> </AppText>
          <AppText
            color="highlight"
            size="body2"
            weight="bold"
            onPress={() => {
              navigation.navigate('Register');
            }}>
            {loginScreen.createAccount}
          </AppText>
        </View>
      </View>

      <View style={styles.centeredRowView}>
        <AppText size="body2" color="light">
          {loginScreen.footer1}
        </AppText>
        <AppText
          size="body2"
          color="highlightSecondary"
          weight="bold"
          onPress={() => Linking.openURL(TERMS_OF_USE_URL)}>
          {loginScreen.footer2}
        </AppText>
        <AppText size="body2" color="light">
          {loginScreen.footer3}
        </AppText>
        <AppText
          size="body2"
          color="highlightSecondary"
          weight="bold"
          onPress={() => Linking.openURL(PRIVACY_POLICY_URL)}>
          {loginScreen.footer4}
          {'.'}
        </AppText>
      </View>
    </SafeAreaView>
  );
};
