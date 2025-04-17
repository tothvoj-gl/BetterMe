import {
  FlatList,
  Text,
  useWindowDimensions,
  View,
  ViewToken,
} from 'react-native';
import {AppButton} from '../../components/AppButton';
import {StyleSheet} from 'react-native-unistyles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppText} from '../../components/AppText';
import {AppTextinput} from '../../components/AppTextInput';
import {Spacing} from '../../components/Spacing';
import {Controller, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {useCallback, useEffect, useRef, useState} from 'react';
import {DateOfBirthQuestion} from './questions/DateOfBirthQuestion';
import {IncomeQuestion} from './questions/IncomeQuestion';
import React from 'react';
import {SexQuestion} from './questions/SexQuestion';
import {User} from '../../model/types';
import {CurrencyQuestion} from './questions/CurrencyQuestion';
import {ExpenseQuestion} from './questions/ExpenseQuestion';
import {AssetQuestion} from './questions/AssetQuestion';
import {useAssetTypes} from '../../api/useAssetTypes';
import {LiabilityQuestion} from './questions/LiabilityQuestion';
import {useSetUserData} from '../../api/useSetUserData';
import {useNavigation} from '@react-navigation/native';

export enum QuestionType {
  DateOfBirth,
  Sex,
  Income,
  Expense,
  Currency,
  Asset,
  Liability,
}

export type QuestionProps = {
  user?: Partial<User>;
  goToNextPage: () => void;
  userDataUpdated: React.Dispatch<
    React.SetStateAction<Partial<User> | undefined>
  >;
  setValidationError: (isError: boolean) => void;
  requestedPage: number;
  index: number;
  currentIndex: number;
};

const styles = StyleSheet.create(theme => ({
  container: {
    backgroundColor: theme.colors.background,
    flex: 1,
    flexDirection: 'column',
  },
  button: {
    alignSelf: 'flex-end',
    width: '100%',
  },
  text: {
    marginTop: 100,
    fontFamily: 'DMSans-Regular',
  },
}));

export const AddFinanceInfoScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [requestedPage, setRequestedPage] = useState(0);
  const [validationError, setValidationError] = useState(false);
  const [user, setCurrentUser] = useState<Partial<User>>();
  const flatListRef = useRef<FlatList<string> | null>(null);
  const {t} = useTranslation('addFinanceInfoScreen');
  const navigation = useNavigation();

  const {data: assetTypes} = useAssetTypes();

  const basicQuestions = [
    QuestionType.DateOfBirth,
    QuestionType.Sex,
    QuestionType.Currency,
    QuestionType.Income,
    QuestionType.Expense,
    QuestionType.Liability,
  ];

  const assetQuestions: QuestionType[] = [];

  assetTypes?.forEach(() => {
    assetQuestions.push(QuestionType.Asset);
  });

  const allQuestions = [...basicQuestions, ...assetQuestions];

  const onViewableItemsChanged = useCallback(
    ({viewableItems}: {viewableItems: ViewToken[]}) => {
      const index = viewableItems[0]?.index;
      if (index === undefined) {
        return;
      }

      setCurrentIndex(index || 0);
    },
    [setCurrentIndex],
  );

  useEffect(() => {
    if (validationError) {
      setRequestedPage(currentIndex);
    }
  }, [currentIndex, validationError]);

  const goToNextPage = useCallback(() => {
    flatListRef?.current?.scrollToIndex({index: requestedPage});
  }, [requestedPage]);

  const mutation = useSetUserData();

  useEffect(() => {
    if (mutation.isSuccess) {
      navigation.goBack();
    }
  }, [mutation.isSuccess]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={allQuestions}
        scrollEnabled={false}
        onViewableItemsChanged={onViewableItemsChanged}
        renderItem={({item, index}) => (
          <>
            {(item === QuestionType.DateOfBirth && (
              <DateOfBirthQuestion
                user={user}
                userDataUpdated={setCurrentUser}
                goToNextPage={goToNextPage}
                index={index}
                requestedPage={requestedPage}
                currentIndex={currentIndex}
                setValidationError={setValidationError}
              />
            )) ||
              (item === QuestionType.Income && (
                <IncomeQuestion
                  user={user}
                  userDataUpdated={setCurrentUser}
                  goToNextPage={goToNextPage}
                  index={index}
                  requestedPage={requestedPage}
                  currentIndex={currentIndex}
                  setValidationError={setValidationError}
                />
              )) ||
              (item === QuestionType.Liability && (
                <LiabilityQuestion
                  user={user}
                  userDataUpdated={setCurrentUser}
                  goToNextPage={goToNextPage}
                  index={index}
                  requestedPage={requestedPage}
                  currentIndex={currentIndex}
                  setValidationError={setValidationError}
                />
              )) ||
              (item === QuestionType.Sex && (
                <SexQuestion
                  user={user}
                  userDataUpdated={setCurrentUser}
                  goToNextPage={goToNextPage}
                  index={index}
                  requestedPage={requestedPage}
                  currentIndex={currentIndex}
                  setValidationError={setValidationError}
                />
              )) ||
              (item === QuestionType.Expense && (
                <ExpenseQuestion
                  user={user}
                  userDataUpdated={setCurrentUser}
                  goToNextPage={goToNextPage}
                  index={index}
                  requestedPage={requestedPage}
                  currentIndex={currentIndex}
                  setValidationError={setValidationError}
                />
              )) ||
              (item === QuestionType.Asset && (
                <AssetQuestion
                  user={user}
                  userDataUpdated={setCurrentUser}
                  goToNextPage={goToNextPage}
                  index={index}
                  requestedPage={requestedPage}
                  currentIndex={currentIndex}
                  setValidationError={setValidationError}
                  assetType={assetTypes?.[index - basicQuestions.length]!}
                />
              )) ||
              (item === QuestionType.Currency && (
                <CurrencyQuestion
                  user={user}
                  userDataUpdated={setCurrentUser}
                  goToNextPage={goToNextPage}
                  index={index}
                  requestedPage={requestedPage}
                  currentIndex={currentIndex}
                  setValidationError={setValidationError}
                />
              ))}
          </>
        )}
        horizontal
        snapToAlignment="start"
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      />
      <View>
        <AppButton
          label={t('next')}
          onPress={() => {
            if (currentIndex < allQuestions.length - 1) {
              setRequestedPage(currentIndex + 1);
            } else {
              mutation.mutate(user! as User);
            }
          }}
        />
      </View>
    </SafeAreaView>
  );
};
