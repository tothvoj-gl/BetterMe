import React from 'react';
import {View} from 'react-native';
import {AppTextinput} from '../../components/AppTextInput';
import {StyleSheet} from 'react-native-unistyles';
import {AppButton} from '../../components/AppButton';
import {Controller, useForm} from 'react-hook-form';

import {AppText} from '../../components/AppText';
import {Spacing} from '../../components/Spacing';
import {useLogin} from '../../api/auth/useAuth';
import {LoadingSpinner} from '../../components/LoadingSpinner';
import {loginScreen} from '../../util/strings';
import {getRemoteConfigValue, RemoteConfigKey} from '../../api/remoteConfig';

const styles = StyleSheet.create(theme => ({
  container: {
    flex: 1,
    padding: theme.spacing.m,
    backgroundColor: theme.colors.background,
  },
  buttonText: {
    textAlign: 'center',
    margin: 10,
  },
  centeredText: {textAlign: 'center'},
}));

type FormData = {
  email: string;
  password: string;
};

export const LoginScreen = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

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
    <View style={styles.container}>
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
        <AppText color="danger">{loginScreen.emailFieldError}</AppText>
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
        <AppText color="danger">{loginScreen.passwordFieldError}</AppText>
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
        label="Login"
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
    </View>
  );
};
