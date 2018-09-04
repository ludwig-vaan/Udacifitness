import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { white } from '../utils/colors';
import MetricCard from './MetricCard';
import { addEntry } from '../actions';
import { removeEntry } from '../utils/api';
import { getDailyReminderValue, timeToString } from '../utils/helpers';
import TextButton from '../components/TextButton';

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

  reset = () => {
    const { remove, goBack, entryId } = this.props;
    remove();
    goBack();
    removeEntry(entryId);
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.metrics !== null && !nextProps.metrics.today;
  }

  render() {
    const { entryId } = this.props.navigation.state.params;
    const { metrics } = this.props;

    return (
      <View style={styles.container}>
        <MetricCard date={entryId} metrics={metrics} />
        <TextButton onPress={this.reset} style={{ margin: 20 }}>
          RESET
        </TextButton>
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

const mapDispatchToProps = (dispatch, { navigation }) => {
  const { entryId } = navigation.state.params;

  return {
    remove: () =>
      dispatch(
        addEntry({
          [entryId]:
            timeToString() === entryId ? getDailyReminderValue() : null,
        })
      ),
    goBack: () => navigation.goBack(),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EntryDetail);
