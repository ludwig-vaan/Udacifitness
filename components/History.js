// import React, { Component } from "react";
// import { View, Text } from "react-native";
// import { connect } from "react-redux";
// import { reveiceEntries, addEntry } from "../actions";
// import { timeToString, getDailyReminderValue } from "../utils/helpers";
// import { fetchCalendarResults } from "../utils/api";

// class History extends Component {
//     componentDidMount = () => {
//         const { dispatch } = this.props;
//         fetchCalendarResults()
//             .then(resultFetch => {
//                 console.log("====================================");
//                 console.log("RESULTFETCH");
//                 console.log(resultFetch);
//                 console.log("====================================");
//                 return resultFetch;
//             })
//             .then(entries => dispatch(reveiceEntries(entries)))
//             .then(({ entries }) => {
//                 if (!entries[timeToString()]) {
//                     dispatch(
//                         addEntry({
//                             [timeToString()]: getDailyReminderValue()
//                         })
//                     );
//                 }
//             });
//     };

//     render() {
//         return (
//             <View>
//                 <Text>{JSON.stringify(this.props)}</Text>
//             </View>
//         );
//     }
// }
// const mapStateToProps = entries => ({
//     entries
// });
// export default connect(mapStateToProps)(History);

import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Platform,
    TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import { receiveEntries, addEntry } from "../actions";
import { timeToString, getDailyReminderValue } from "../utils/helpers";
import { fetchCalendarResults } from "../utils/api";
import UdaciFitnessCalendar from "udacifitness-calendar";
import { white } from "../utils/colors";
import DateHeader from "./DateHeader";
import MetricCard from "./MetricCard";

const styles = StyleSheet.create({
    item: {
        backgroundColor: white,
        borderRadius: Platform.OS === "ios" ? 16 : 2,
        padding: 20,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 17,
        justifyContent: "center",
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: "(rgba(0,0,0,0.24)",
        shadowOffset: {
            witdh: 0,
            height: 3
        }
    },
    noDataText: {
        fontSize: 20,
        paddingTop: 20,
        paddingBottom: 20
    }
});
class History extends Component {
    componentDidMount() {
        console.log("componentDidMount");
        const { dispatch } = this.props;
        fetchCalendarResults()
            .then(entries => {
                console.log(entries);
                return dispatch(receiveEntries(entries));
            })
            .then(({ entries }) => {
                if (!entries[timeToString()]) {
                    dispatch(
                        addEntry({
                            [timeToString()]: getDailyReminderValue()
                        })
                    );
                }
            })
            .then(() => this.setState(() => ({ ready: true })));
    }

    renderItem = ({ today, ...metrics }, formattedDate, key) => (
        <View style={styles.item}>
            {today ? (
                <View>
                    <DateHeader date={formattedDate} />
                    <Text style={styles.noDataText}>{today}</Text>
                </View>
            ) : (
                <TouchableOpacity onPress={() => console.log("pressed!")}>
                    <MetricCard date={formattedDate} metrics={metrics} />
                </TouchableOpacity>
            )}
        </View>
    );

    renderEmptyDate(formattedDate) {
        return (
            <View style={styles.item}>
                <DateHeader date={formattedDate} />
                <Text style={styles.noDataText}>
                    You didn't log any data on this day.
                </Text>
            </View>
        );
    }

    render() {
        const { entries } = this.props;

        return (
            <UdaciFitnessCalendar
                items={entries}
                renderItem={this.renderItem}
                renderEmptyDate={this.renderEmptyDate}
            />
        );
    }
}

function mapStateToProps(entries) {
    return {
        entries
    };
}

export default connect(mapStateToProps)(History);
