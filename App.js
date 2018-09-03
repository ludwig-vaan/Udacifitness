import React from 'react';
import { View } from 'react-native';
import AddEntry from './components/AddEntry';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import History from './components/History';
// import styled from 'styled-components/native';

const store = createStore(
  reducer /* preloadedState, */,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
// exemple styledComponents
// const CenterView = styled.View`
//   flex: 1;
//   align-items: center;
//   justify-content: center;
//   background: #333;
// `;

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <View style={{ height: 20 }} />
          <History />
          {/* <AddEntry /> */}
        </View>
      </Provider>
    );
  }
}
