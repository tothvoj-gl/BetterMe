import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import * as RNLocalize from 'react-native-localize';
import AsyncStorage from '@react-native-async-storage/async-storage';
import en from './en.json';
import sk from './sk.json';
import {LANGUAGE_KEY} from '../api/localStorage';

const resources = {
  en,
  sk,
};
const initI18n = async () => {
  let savedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);

  if (!savedLanguage) {
    savedLanguage = RNLocalize.getLocales()[0].languageCode;
  }

  i18n.use(initReactI18next).init({
    resources,
    lng: savedLanguage,
    fallbackLng: 'en',
    debug: true,
  });
};

initI18n();

export default i18n;
