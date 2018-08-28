import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { getMetricMetaInfo, timeToString } from "../utils/helpers";
import UdaciSlider from "./UdaciSlider";
import UdaciSteppers from "./UdaciSteppers";
import DateHeader from "./DateHeader";
import { Ionicons } from "@expo/vector-icons";
import TextButton from "./TextButton";

const SubmitBtn = ({ onPress }) => {
	return (
		<TouchableOpacity onPress={onPress}>
			<Text>SUBMIT</Text>
		</TouchableOpacity>
	);
};

export default class AddEntry extends Component {
	state = {
		run: 0,
		bike: 0,
		swim: 0,
		sleep: 0,
		eat: 0
	};

	increment = metric => {
		const { max, step } = getMetricMetaInfo(metric);
		this.setState(state => {
			const count = state[metric] + step;
			return {
				...state,
				[metric]: count > max ? max : count
			};
		});
	};
	decrement = metric => {
		this.setState(state => {
			const count = state[metric] - getMetricMetaInfo(metric).step;
			return {
				...state,
				[metric]: count < 0 ? 0 : count
			};
		});
	};

	slider = (metric, value) => {
		this.setState(() => ({
			[metric]: value
		}));
	};

	submit = () => {
		const key = timeToString();
		const entry = this.state;

		// update redux
		this.setState(() => ({
			run: 0,
			bike: 0,
			swim: 0,
			sleep: 0,
			eat: 0
		}));
		// navigate to home

		// save to db

		// clearn local notification
	};

	reset = () => {
		const key = timeToString();

		// update redux

		// navigate to home

		// save to db
	};

	render() {
		const metaInfo = getMetricMetaInfo();

		if (this.state.alreadyLogged) {
			return (
				<View>
					<Ionicons name="ios-happy-outline" size={100} />
					<Text>You already logged your information for today</Text>
					<TextButton onPress={this.reset}>reset</TextButton>
				</View>
			);
		}
		return (
			<View>
				<DateHeader date={new Date().toLocaleDateString("fr-FR")} />
				{Object.keys(metaInfo).map(key => {
					const { getIcon, type, ...rest } = metaInfo[key];
					const value = this.state[key];
					return (
						<View key={key}>
							{getIcon()}
							{type === "slider" ? (
								<UdaciSlider
									value={value}
									onChange={value => this.slider(key, value)}
									{...rest}
								/>
							) : (
								<UdaciSteppers
									{...rest}
									value={value}
									onIncrement={() => this.increment(key)}
									onDecrement={() => this.decrement(key)}
								/>
							)}
						</View>
					);
				})}
				<SubmitBtn onPress={this.submit} />
			</View>
		);
	}
}
