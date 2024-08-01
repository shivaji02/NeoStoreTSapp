/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import './gesture-handler';
import '../NeoStoreTSapp/src/Screens/mislenous/gesture-handler.native.js';
AppRegistry.registerComponent(appName, () => App);
