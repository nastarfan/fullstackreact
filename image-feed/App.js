import React from "react";
import { Constants } from "expo";
import { StyleSheet, View } from "react-native";

import CardList from "./components/CardList";

const items = [
  { id: 0, author: "Aulia Sabri" },
  { id: 1, author: "Benjamin Button" }
];

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <CardList items={items} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: "#fff"
  }
});
