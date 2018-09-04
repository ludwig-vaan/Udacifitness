import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { white } from '../utils/colors';
import MetricCard from './MetricCard';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 15,
  },
});

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
    const { entryId } = this.props.navigation.state.params;
    const { metrics } = this.props;

    return (
      <View style={styles.container}>
        <MetricCard date={entryId} metrics={metrics} />
        <Text>Entry Detail - {JSON.stringify(this.props.metrics)}</Text>
      </View>
    );
  }
}

const mapStateToProps = (state, { navigation }) => {
  const { entryId } = navigation.state.params;
  return {
    entryId,
    metrics: state[entryId],
  };
};

export default connect(mapStateToProps)(EntryDetail);
