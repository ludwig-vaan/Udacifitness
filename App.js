import React from 'react';
import { View, Text } from 'react-native';
import AddEntry from './components/AddEntry';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';

import devToolsEnhancer from 'remote-redux-devtools';
const store = createStore(reducer, devToolsEnhancer());

if (__DEV__) {
	global.XMLHttpRequest = global.originalXMLHttpRequest
	  ? global.originalXMLHttpRequest
	  : global.XMLHttpRequest;
	global.FormData = global.originalFormData ? global.originalFormData : global.FormData;
  + global.Blob = global.originalBlob ? global.originalBlob : global.Blob;
  + global.FileReader = global.originalFileReader ? global.originalFileReader : global.FileReader;
  }

export default class App extends React.Component {
  state = {
    value: 0,
  };
  render() {
    return (
      <Provider store={store}>
        <View
          style={{
            flex: 1,
            marginLeft: 10,
            marginRight: 10,
            alignItems: 'stretch',
            justifyContent: 'center',
          }}
        >
          <AddEntry />
        </View>
      </Provider>
    );
  }
}
