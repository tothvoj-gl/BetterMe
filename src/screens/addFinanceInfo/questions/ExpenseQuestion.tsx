import React, {useCallback} from 'react';
import {AppText} from '../../../components/AppText';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import {StyleSheet, UnistylesRuntime} from 'react-native-unistyles';
import {Spacing} from '../../../components/Spacing';
import {QuestionProps} from '../AddFinanceInfoScreen';
import {AppTextinput} from '../../../components/AppTextInput';
import {getDeviceCurrencySymbol} from '../../../util/data';
import useGoToNextPage from './useGoToNextPage';
import {z} from 'zod';
import {Controller, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';

const styles = StyleSheet.create(theme => ({
  container: {
    width: UnistylesRuntime.screen.width,
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing.m,
  },
  text: {
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export const ExpenseQuestion = ({
  goToNextPage,
  userDataUpdated,
  index,
  user,
  requestedPage,
  currentIndex,
  setValidationError,
}: QuestionProps) => {
  const {t} = useTranslation('addFinanceInfoScreen');
  const schema = z
    .object({
      expense: z.coerce
        .number({message: t('incomeFieldError')})
        .min(0, t('incomeFieldError')),
    })
    .required();
  type FormData = z.infer<typeof schema>;

  const {
    control,
    trigger,
    getValues,
    formState: {errors},
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      expense: user?.finance?.monthlyNetExpense ?? 0,
    },
  });

  const validate = useCallback(async () => {
    const validationResult = await trigger('expense');
    if (validationResult) {
      const expense = Number(getValues('expense'));
      userDataUpdated(prev => ({
        ...prev,
        finance: {
          ...prev?.finance,
          monthlyNetExpense: expense,
        },
      }));
      return true;
    } else {
      return false;
    }
  }, [getValues, trigger, userDataUpdated]);

  useGoToNextPage({
    index,
    currentIndex,
    requestedPage,
    goToNextPage,
    validate,
    setValidationError,
  });

  return (
    <View style={styles.container}>
      <AppText weight="bold" size="header3" style={styles.text}>
        {t('expenseTitle')}
      </AppText>
      <Spacing />
      <AppText size="body2" color="light" style={styles.text}>
        {t('expenseDescription')}
      </AppText>
      <Spacing />
      <View style={styles.inputContainer}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <AppTextinput
              keyboardType="numeric"
              placeholder={'1000'}
              maxWidth={250}
              onBlur={onBlur}
              value={String(value)}
              onChangeText={onChange}
            />
          )}
          name="expense"
        />
        <AppText weight="bold" size="header1" color="highlight">
          {getDeviceCurrencySymbol(user?.currency)}
        </AppText>
      </View>

      {errors.expense && (
        <AppText color="danger">{errors.expense.message}</AppText>
      )}
    </View>
  );
};
