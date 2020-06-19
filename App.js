import  'react-native-gesture-handler';
import React, { Component } from 'react';
import {YellowBox} from 'react-native';
import Routes from './Routes';
import ErrorBoundary from './src/components/Common/ErrorBoundary';
import { Provider } from 'react-redux';
// import AsyncStorage from '@react-native-community/async-storage';

//redux persist
import {PersistGate} from 'redux-persist/es/integration/react';
import {store, persistor} from './src/redux/store';

console.disableYellowBox = true;

YellowBox.ignoreWarnings([
  'VirtualizedLists should never be nested', // TODO: Remove when fixed
  'Possible Unhandled Promise Rejection'
])


export default class App extends Component {

  // async componentDidMount(){
  //   try {
  //     await AsyncStorage.clear()
  //   } catch(e) {
  //     // clear error
  //   }
  // }

  render() {
    return (
      <Provider store={store}>
          <PersistGate
            loading={null}
            persistor={persistor}
          >
              <ErrorBoundary>
                <Routes />
              </ErrorBoundary>
          </PersistGate>
      </Provider>
    );
  }
}

