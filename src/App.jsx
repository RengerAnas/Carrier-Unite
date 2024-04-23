import { View, Text, LogBox } from 'react-native';
import React from 'react';
import RootNavigator from './navigation/RootNavigator';
import { pStore, store } from './Store/Store';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { SripePublicKey } from './constants/API.Constants';
import ErrorBoundaries from './components/Wrapper/ErrorBoundaries';

const App = ({ }) => {
  LogBox.ignoreAllLogs();

  return (
    <ErrorBoundaries key={'app'}>
      <Provider store={store} key={'app'}>
        <PersistGate loading={null} persistor={pStore} key={'app'}>
          <RootNavigator key={'app'} />
        </PersistGate>
      </Provider>
    </ErrorBoundaries>
  );
};

export default App;

