import React from "react";
import { View, Text } from "react-native";
import AddEntry from "./components/AddEntry";

export default class App extends React.Component {
	state = {
		value: 0
	};
	render() {
		return (
			<View
				style={{
					flex: 1,
					marginLeft: 10,
					marginRight: 10,
					alignItems: "stretch",
					justifyContent: "center"
				}}
			>
				<AddEntry />
			</View>
		);
	}
}
