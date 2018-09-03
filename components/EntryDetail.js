import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class EntryDetail extends Component {
  render() {
    return (
      <View>
        <Text>Entry Detail - {this.props.navigation.state.params.entryId}</Text>
      </View>
    );
  }
}
