import React, { Component } from 'react';
import { View, Text } from 'react-native';
class EntryDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    const { entryId } = navigation.state.params;
    const date = entryId.split('-');

    const year = date[0];
    const month = date[1];
    const day = date[2];
    return {
      title: `${day}/${month}/${year}`,
    };
  };
  render() {
    return (
      <View>
        <Text>
          Entry Detail -{' '}
          {JSON.stringify(this.props.navigation.state.params.entryId)}
        </Text>
      </View>
    );
  }
}

export default EntryDetail;
