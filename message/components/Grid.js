import React, { Component } from 'react';
import {
  StyleSheet,
  Dimensions,
  FlatList,
  PixelRatio,
} from 'react-native';
import PropTypes from 'prop-types';

export default class Grid extends Component {
  static propTypes = {
    renderItem: PropTypes.func.isRequired,
    numColumns: PropTypes.number,
    itemMargin: PropTypes.number,
  };

  static defaultProps = {
    numColumns: 4,
    itemMargin: StyleSheet.hairlineWidth,
  };

  renderGridItem = (info) => {
    const { renderItem, numColumns, itemMargin } = this.props;
    const { index } = info;

    const { width } = Dimensions.get('window');

    const size = PixelRatio.roundToNearestPixel(
      (width - itemMargin * (numColumns - 1)) / numColumns,
    );

    // apply marginLeft based on itemMargin except the first item of a row
    const marginLeft = index % numColumns === 0 ? 0 : itemMargin;

    // apply marginATop based on itemMargin except the first row of the grid
    const marginTop = index < numColumns ? 0 : itemMargin;

    return renderItem({ ...info, size, marginLeft, marginTop });
  };

  render() {
    return <FlatList {...this.props} renderItem={this.renderGridItem} />;
  }
}
