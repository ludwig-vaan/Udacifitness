import React from 'react';
import { View, Text, Platform, StatusBar } from 'react-native';
import AddEntry from './components/AddEntry';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import History from './components/History';
import {
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation';
import { purple, white } from './utils/colors';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { Constants } from 'expo';
import EntryDetail from './components/EntryDetail';

import styled from 'styled-components/native';

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

// const Home = () => (
//   <View>
//     <Text>HOME</Text>
//   </View>
// );
// const Dashboard = () => (
//   <View>
//     <Text>Dashboard</Text>
//   </View>
// );

const Tabs = createBottomTabNavigator(
  {
    History: History,
    AddEntry: AddEntry,
  },
  {
    navigationOptions: ({ navigation }) => ({
      header: null,
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;
        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return routeName === 'History' ? (
          <Ionicons name="ios-bookmarks" size={30} color={tintColor} />
        ) : (
          <FontAwesome name="plus-square" size={30} color={tintColor} />
        );
      },
    }),
    tabBarOptions: {
      showIcon: true,
      labelStyle: {
        fontSize: 14,
        fontWeight: 'bold',
      },
      activeTintColor: Platform.OS === 'ios' ? white : purple,
      style: {
        height: 56,
        backgroundColor: Platform.OS === 'ios' ? purple : white,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowRadius: 6,
        shadowOpacity: 1,
      },
    },
  }
);

const UdaciStatusBar = ({ backgroundColor, ...props }) => {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
};

const MainNavigator = createStackNavigator({
  home: {
    screen: Tabs,
    navigationOptions: {
      header: null,
    },
  },
  // EntryDetail: {
  //   screen: EntryDetail,
  //   navigationOptions: {
  //     headerTintColor: white,
  //     headerStyle: {
  //       backgroundColor: purple,
  //     },
  //   },
  // },
  EntryDetail: {
    screen: EntryDetail,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      },
    },
  },
});

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <UdaciStatusBar backgroundColor={purple} barStyle="light-content" />
          <MainNavigator />
          {/* <History /> */}
          {/* <AddEntry /> */}
        </View>
      </Provider>
    );
  }
}
