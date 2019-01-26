import React from "react";
import { Constants } from "expo";
import { StyleSheet, Text, View } from "react-native";

import Card from "./components/Card";
import AuthorRow from "./components/AuthorRow";

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Card
          fullName={"Aulia Sabri"}
          linkText={"Comments"}
          onPressLinkText={() => {
            console.log("Link pressed");
          }}
          image={{ uri: "https://unsplash.it/600/600" }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: "#fff",
  }
});
