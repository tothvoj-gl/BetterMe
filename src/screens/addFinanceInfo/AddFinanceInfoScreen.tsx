import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
  ViewToken,
} from 'react-native';
import {AppButton} from '../../components/AppButton';
import {StyleSheet, UnistylesRuntime} from 'react-native-unistyles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import {useCallback, useEffect, useRef, useState} from 'react';
import ProgressBar from 'react-native-progress/Bar';
import Toast from 'react-native-toast-message';
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
import {pallette} from '../../util/colors';
import {AppText} from '../../components/AppText';
import {Separator} from '../../components/Separator';
import {useUserData} from '../../api/useUserData';
import {formatRemoteDataError} from '../../util/formatter';
import {LoadingSpinner} from '../../components/LoadingSpinner';

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
  user?: Partial<User> | null;
  goToNextPage: () => void;
  userDataUpdated: React.Dispatch<
    React.SetStateAction<Partial<User> | undefined | null>
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
  keyboardAvoidingView: {flex: 1},
  progressBarContainer: {
    width: UnistylesRuntime.screen.width,
    padding: theme.spacing.m,
    marginTop: theme.spacing.s,
  },
  progressBarText: {
    textAlign: 'center',
    marginTop: theme.spacing.m,
  },
}));

export const AddFinanceInfoScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [requestedPage, setRequestedPage] = useState(0);
  const [validationError, setValidationError] = useState(false);
  const {data: currentUser} = useUserData();
  const [user, setCurrentUser] = useState<Partial<User> | undefined | null>(
    currentUser,
  );
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
    } else if (mutation.error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: formatRemoteDataError(mutation.error),
      });
    }
  }, [mutation.isSuccess, mutation.error, navigation]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      style={styles.keyboardAvoidingView}>
      <SafeAreaView style={styles.container}>
        <View style={styles.progressBarContainer}>
          <ProgressBar
            progress={(currentIndex + 1) / allQuestions.length}
            width={null}
            color={pallette.primary900}
            unfilledColor={pallette.dark50}
            borderWidth={0}
          />

          <Text style={styles.progressBarText}>
            <AppText weight="semiBold" color="highlight">
              {currentIndex + 1}
            </AppText>
            <AppText color="light">
              {' / '}
              {allQuestions.length}
            </AppText>
          </Text>
        </View>
        <Separator />
        <FlatList
          ref={flatListRef}
          data={allQuestions}
          scrollEnabled={false}
          initialNumToRender={4}
          windowSize={3}
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
          {mutation.isPending && <LoadingSpinner />}
          <AppButton
            label={t('next')}
            onPress={() => {
              if (currentIndex < allQuestions.length - 1) {
                setValidationError(false);
                setRequestedPage(currentIndex + 1);
              } else {
                mutation.mutate(user! as User);
              }
            }}
          />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};
