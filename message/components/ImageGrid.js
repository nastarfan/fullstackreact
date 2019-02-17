import React, { Component } from 'react';
import {
  CameraRoll,
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import { Permissions } from 'expo';
import PropTypes from 'prop-types';

import Grid from './Grid';

const keyExtractor = ({ uri }) => uri;

export default class ImageGrrid extends Component {
  static propTypes = {
    onPressImage: PropTypes.func,
  };

  static defaultProps = {
    onPressImage: () => {},
  };

  state = {
    images: [],
  };

  componentDidMount() {
    this.getImages();
  }

  getImages = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if (status !== 'granted') {
      console.log('CameraRoll permission denied');
    }

    const results = await CameraRoll.getPhotos({
      first: 20,
    });

    const { edges } = results;

    const loadedImages = edges.map(item => item.node.image);

    this.setState({ images: loadedImages });
  };

  renderItem = ({ item: { uri }, size, marginTop, marginLeft }) => {
    const style = {
      width: size,
      height: size,
      marginLeft,
      marginTop,
    };

    return <Image source={{ uri }} style={[style, styles.image]} />;
  };

  render() {
    const { images } = this.state;
    return (
      <Grid
        data={images}
        renderItem={this.renderItem}
        keyExtractor={keyExtractor}
        numColumns={4}
      />
    );
  }
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
});
