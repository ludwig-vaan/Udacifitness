import React from 'react';
import { View, Text } from 'react-native';
import AddEntry from './components/AddEntry';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import History from './components/History';
import {
  TabNavigator,
  StackNavigator,
  DrawerNavigator,
  createMaterialTopTabNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
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

const Home = () => (
  <View>
    <Text>HOME</Text>
  </View>
);
const Dashboard = () => (
  <View>
    <Text>Dashboard</Text>
  </View>
);

// const Tabs = createBottomTabNavigator(
//   {
//     Home: {
//       screen: Home,
//     },
//     Dashboard: {
//       screen: Dashboard,
//     },
//   },
//   {
//     navigationOptions: ({ navigation }) => ({
//       tabBarIcon: () => {
//         const { routeName } = navigation.state;
//         // You can return any component that you like here! We usually use an
//         // icon component from react-native-vector-icons
//         return routeName === 'Home' ? (
//           <FontAwesome name="home" size={30} color="black" />
//         ) : (
//           <FontAwesome name="dashboard" size={30} color="black" />
//         );
//       },
//     }),
//   }
// );

const Tabs = TabNavigator({
  Home: {
    screen: Home,
    navigationOptions: return {
      tabBarIcon: () => (<FontAwesome name='home' size={30} color='black' />)
    },
  },
  Dashboard:{
    screen: Dashboard,
    navigationOptions: return  {
      tabBarIcon: () => <FontAwesome name="dashboard" size={30} color='black' />)
    }
  }
})

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <View style={{ height: 20 }} />
          <Tabs />
          {/* <History /> */}
          {/* <AddEntry /> */}
        </View>
      </Provider>
    );
  }
}
