/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Config from './src/util/unistyles';
import './src/locales/i18n';

AppRegistry.registerComponent(appName, () => App);
