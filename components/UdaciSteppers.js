import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const UdaciSteppers = ({
	max,
	unit,
	step,
	value,
	onIncrement,
	onDecrement
}) => (
	<View>
		<View>
			<TouchableOpacity onPress={onDecrement}>
				<FontAwesome name="minus" size={30} color="black" />
			</TouchableOpacity>
			<TouchableOpacity onPress={onIncrement}>
				<FontAwesome name="plus" size={30} color="black" />
			</TouchableOpacity>
		</View>
		<View>
			<Text>{value}</Text>
			<Text>{unit}</Text>
		</View>
	</View>
);

export default UdaciSteppers;
