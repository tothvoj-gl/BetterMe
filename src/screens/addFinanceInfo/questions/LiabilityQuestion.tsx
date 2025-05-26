import React, {useCallback, useEffect, useState} from 'react';
import {AppText} from '../../../components/AppText';
import {useTranslation} from 'react-i18next';
import {ScrollView, View} from 'react-native';
import {StyleSheet, UnistylesRuntime} from 'react-native-unistyles';
import uuid from 'react-native-uuid';
import {Spacing} from '../../../components/Spacing';
import {QuestionProps} from '../AddFinanceInfoScreen';
import {AppTextinput} from '../../../components/AppTextInput';
import {getDeviceCurrencySymbol} from '../../../util/data';
import useGoToNextPage from './useGoToNextPage';
import Slider from '@react-native-community/slider';
import {pallette} from '../../../util/colors';
import DatePicker from 'react-native-date-picker';
import {AppButton} from '../../../components/AppButton';
import {Separator} from '../../../components/Separator';
import {Liability} from '../../../model/types';
import {useForm} from 'react-hook-form';

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
  slider: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export const LiabilityQuestion = ({
  goToNextPage,
  userDataUpdated,
  index,
  user,
  requestedPage,
  currentIndex,
  setValidationError,
}: QuestionProps) => {
  const [liabilities, setLiabilities] = useState<Partial<Liability>[]>(
    user?.finance?.liabilities || [],
  );
  const {t} = useTranslation('addFinanceInfoScreen');

  const {
    trigger,
    register,
    setValue,
    formState: {errors},
  } = useForm();

  useEffect(() => {
    liabilities.forEach((item, itemIndex) => {
      register('name' + itemIndex, {
        required: t('liabilityNameFieldError'),
        minLength: 1,
        value: item.name,
      });
      register('value' + itemIndex, {value: item.value});
    });
  }, [liabilities, register, t]);

  const validate = useCallback(async () => {
    const valid = await trigger();
    console.log({valid});

    if (valid) {
      userDataUpdated(prev => ({
        ...prev,
        finance: {
          ...prev?.finance,
          liabilities: liabilities as Liability[],
        },
      }));
    }

    return valid;
  }, [liabilities, trigger, userDataUpdated]);

  useGoToNextPage({
    index,
    currentIndex,
    requestedPage,
    goToNextPage,
    validate,
    setValidationError,
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <AppText weight="bold" size="header3" style={styles.text}>
        {t('liabilitiesTitle')}
      </AppText>
      <Spacing />
      {liabilities.map((liability, itemIndex) => (
        <View key={itemIndex} style={styles.container}>
          <AppText size="header4" style={styles.text}>
            {t('loanNameDescription')}
          </AppText>
          <Spacing size="small" />
          <View style={styles.inputContainer}>
            <AppTextinput
              placeholder={t('loanNameLabel')}
              maxWidth={250}
              value={liability.name || ''}
              onChangeText={value => {
                setValue('name' + itemIndex, value);
                setLiabilities(oldArray => {
                  const newArray = [...oldArray];
                  newArray[itemIndex].name = value;
                  return newArray;
                });
              }}
            />
          </View>
          {errors['name' + itemIndex]?.message && (
            <AppText color="danger">
              {String(errors['name' + itemIndex]?.message)}
            </AppText>
          )}
          <Spacing size="large" />
          <AppText size="header4" style={styles.text}>
            {t('remainingBalanceLabel')}
          </AppText>
          <Spacing size="small" />
          <View style={styles.inputContainer}>
            <AppTextinput
              keyboardType="numeric"
              placeholder={'1000'}
              maxWidth={250}
              value={String(liability.value)}
              onChangeText={value => {
                setValue('value' + itemIndex, value);

                setLiabilities(oldArray => {
                  const newArray = [...oldArray];
                  newArray[itemIndex].value = isNaN(Number(value))
                    ? oldArray[itemIndex].value
                    : Number(value);
                  return newArray;
                });
              }}
            />
            <AppText weight="bold" size="header1" color="highlight">
              {getDeviceCurrencySymbol(user?.currency)}
            </AppText>
          </View>
          {errors['value' + itemIndex]?.message && (
            <AppText color="danger">
              {String(errors['value' + itemIndex]?.message)}
            </AppText>
          )}
          <Spacing size="large" />
          <AppText size="header4" style={styles.text}>
            {t('interestRateLabel')}
          </AppText>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={25}
            value={liability.annualRate}
            onValueChange={value => {
              setLiabilities(oldArray => {
                const newArray = [...oldArray];
                newArray[itemIndex].annualRate = value;
                return newArray;
              });
            }}
            minimumTrackTintColor={pallette.secondary900}
            maximumTrackTintColor={pallette.primary900}
            step={1}
          />
          <AppText size="header3" style={styles.text}>
            {liability.annualRate}%
          </AppText>
          <Spacing size="large" />
          <AppText size="header4" style={styles.text}>
            {t('loanEndDateLabel')}
          </AppText>
          <DatePicker
            date={liability.endDate!}
            onDateChange={value => {
              setLiabilities(oldArray => {
                const newArray = [...oldArray];
                newArray[itemIndex].endDate = value;
                return newArray;
              });
            }}
            mode="date"
            minimumDate={new Date()}
            theme="light"
          />
          <Spacing />
          <Separator />
        </View>
      ))}

      <AppButton
        label={t('addLoanButtonLabel')}
        onPress={() =>
          setLiabilities([
            ...liabilities,
            {
              id: uuid.v4(),
              value: 0,
              endDate: new Date(),
              annualRate: 3,
              dateModified: new Date(),
            },
          ])
        }
      />
    </ScrollView>
  );
};
