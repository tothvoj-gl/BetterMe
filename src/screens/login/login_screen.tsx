import React from 'react';
import {Text, View} from 'react-native';
import {AppTextinput} from '../../components/text-input';
import {StyleSheet} from 'react-native-unistyles';
import {AppButton} from '../../components/button';
import {Controller, useForm} from 'react-hook-form';

import {AppText} from '../../components/text';
import {Spacing} from '../../components/spacing';
import {useLogin} from '../../api/auth/useAuth';
import {LoadingSpinner} from '../../components/loading-spinner';

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
  const onSubmit = (data: FormData) => {
    login.mutate({email: data.email, password: data.password});
  };

  console.log(errors);

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
            placeholder="Email"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="email"
      />
      {errors.email && <AppText color="danger">This is required.</AppText>}
      <Spacing />
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <AppTextinput
            placeholder="Password"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry
          />
        )}
        name="password"
      />
      {errors.password && <AppText color="danger">This is required.</AppText>}
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
        onPress={handleSubmit(onSubmit)}
      />
      {/* <AppText color="light" size="body2">
        Login
      </AppText> */}
    </View>
  );
};
