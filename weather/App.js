import React from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  ActivityIndicator,
  StatusBar
} from "react-native";

import { fetchLocationId, fetchWeather } from "./utils/api";
import getImageForWeather from "./utils/getImageForWeather";

import SearchInput from "./components/SearchInput";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isError: false,
      location: "",
      temperature: 0,
      weather: ""
    };
  }

  handleUpdateLocation = city => {
    // handle if city is empty
    if (!city) return;
    this.setState({ isLoading: true }, async () => {
      try {
        // get weather information, update state accordingly
        const locationId = await fetchLocationId(city);
        const { location, weather, temperature } = await fetchWeather(
          locationId
        );
        this.setState({
          isLoading: false,
          isError: false,
          location,
          weather,
          temperature
        });
      } catch (e) {
        // handle error
        this.setState({
          isLoading: false,
          isError: true
        });
      }
    });
  };

  componentDidMount() {
    this.handleUpdateLocation("Jakarta");
  }

  renderContent() {
    const { isError } = this.state;

    return (
      <View>
        {isError && (
          <Text style={[styles.smallText, styles.textStyle]}>
            Could not load weather, please try a different city.
          </Text>
        )}
        {!isError && this.renderInfo()}
      </View>
    );
  }

  renderInfo() {
    const { isError, location, weather, temperature } = this.state;

    return (
      <View>
        <Text style={[styles.largeText, styles.textStyle]}>{location}</Text>
        <Text style={[styles.smallText, styles.textStyle]}>{weather}</Text>
        <Text style={[styles.largeText, styles.textStyle]}>
          {Math.round(temperature)}°
        </Text>
      </View>
    );
  }

  render() {
    const { isLoading, isError, location, weather, temperature } = this.state;
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <StatusBar barStyle="dark-content" />
        <ImageBackground
          source={getImageForWeather(weather)}
          style={styles.imageContainer}
          imageStyle={styles.image}
        >
          <View style={styles.detailsContainer}>
            <ActivityIndicator
              animating={isLoading}
              color="white"
              size="large"
            />

            {!isLoading && (
              <View>
                {this.renderContent()}

                <SearchInput
                  placeholder="Search any city"
                  onSubmit={this.handleUpdateLocation}
                />
              </View>
            )}
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  imageContainer: {
    flex: 1
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "cover"
  },
  detailsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.2)"
  },
  textStyle: {
    textAlign: "center",
    fontFamily: Platform.OS === "ios" ? "AvenirNext-Regular" : "Roboto",
    color: "white"
  },
  largeText: {
    fontSize: 44
  },
  smallText: {
    fontSize: 18
  }
});
