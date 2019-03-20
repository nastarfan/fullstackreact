import React, { Component } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { Constants } from 'expo';
import PropTypes from 'prop-types';

/*
To measure the space MessageList can use
The measurement will be done from below the statusbar to the bottom of the screen

create a container View with a flexible height of 1 and measure it on first render

usage:
<MeasureLayout>
  {layout => <View ... />}
</MeasureLayout>
*/

export default class MeasureLayout extends Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
  };

  state = {
    layout: null,
  };

  handleLayout = (event) => {
    const {
      nativeEvent: { layout },
    } = event;

    console.log(layout);

    // will cause the component to re-render
    this.setState({
      layout: {
        ...layout,
        y:
          layout.y +
          (Platform.OS === 'android' ? Constants.statusBarHeight : 0), // on android layout.y doesnt include statusbar height on its calculation
      },
    });
  };

  render() {
    const { children } = this.props;
    const { layout } = this.state;

    // if there is no layout, create a view with flex: 1 and measure it to get the available space
    // onLayout will be called every time a component updates its dimensions
    if (!layout) {
      return <View onLayout={this.handleLayout} style={styles.container} />;
    }

    // after the view with flex 1 has been measured, render the children
    return children(layout);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
