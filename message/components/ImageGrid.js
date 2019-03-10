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
  loading = false;
  cursor = null;

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

  getImages = async (after) => {
    if (this.loading) return;

    this.loading = true;

    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if (status !== 'granted') {
      console.log('CameraRoll permission denied');
    }

    const results = await CameraRoll.getPhotos({
      first: 20,
      after,
    });

    const {
      edges,
      page_info: { has_next_page, end_cursor },
    } = results;

    const loadedImages = edges.map(item => item.node.image);

    this.setState({ images: this.state.images.concat(loadedImages) }, () => {
      this.loading = false;
      this.cursor = has_next_page ? end_cursor : null;
    });
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

  getNextImages = () => {
    if (!this.cursor) return;

    this.getImages(this.cursor);
  };

  render() {
    const { images } = this.state;
    return (
      <Grid
        data={images}
        renderItem={this.renderItem}
        keyExtractor={keyExtractor}
        numColumns={4}
        onEndReached={this.getNextImages}
      />
    );
  }
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
});
