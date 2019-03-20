import React, { Component } from 'react';
import {
  BackHandler,
  View,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import PropTypes from 'prop-types';

export const INPUT_METHOD = {
  NONE: 'NONE',
  KEYBOARD: 'KEYBOARD',
  CUSTOM: 'CUSTOM',
};

if (
  Platform.OS === 'android'
  && UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default class MessagingContainer extends Component {
  static propTypes = {
    // from KeyboardState
    containerHeight: PropTypes.number.isRequired,
    contentHeight: PropTypes.number.isRequired,
    keyboardHeight: PropTypes.number.isRequired,
    keyboardVisible: PropTypes.bool.isRequired,
    keyboardWillHide: PropTypes.bool.isRequired,
    keyboardWillShow: PropTypes.bool.isRequired,
    keyboardAnimationDuration: PropTypes.number.isRequired,

    // managing the IME type
    inputMethod: PropTypes.oneOf(Object.values(INPUT_METHOD)).isRequired,
    onChangeInputMethod: PropTypes.func,

    // rendering content
    children: PropTypes.node,
    renderInputMethodEditor: PropTypes.func.isRequired,
  };

  static defaultProps = {
    children: null,
    onChangeInputMethod: () => {},
  };

  componentDidMount() {
    this.subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        const { onChangeInputMethod, inputMethod } = this.props;

        if (inputMethod === INPUT_METHOD.CUSTOM) {
          onChangeInputMethod(INPUT_METHOD.NONE);
          console.log('hiding the custom IME');
          return true;
        }

        return false;
      },
    );
  }

  componentWillReceiveProps(nextProps) {
    const { onChangeInputMethod } = this.props;

    console.log("Current props: " + this.props.inputMethod + "Next props: " + nextProps.inputMethod);
    if (!this.props.keyboardVisible && nextProps.keyboardVisible) {
      // keyboard should be shown
      console.log("changing input method to keyboard");
      onChangeInputMethod(INPUT_METHOD.KEYBOARD);
    } else if (
      // keyboard should be hiddne
      this.props.keyboardVisible &&
      !nextProps.keyboardVisible &&
      this.props.inputMethod !== INPUT_METHOD.CUSTOM
    ) {
      onChangeInputMethod(INPUT_METHOD.NONE);
    }

    // change to INPUT_METHOD.CUSTOM is done directly on App.js

    // this.props.keyboardVisible && !nextProps.keyboardVisible
    // && this.props.inputMethod == INPUT_METHOD.CUSTOM

    const { keyboardAnimationDuration } = nextProps;

    const animation = LayoutAnimation.create(
      keyboardAnimationDuration,
      Platform.OS === 'android'
        ? LayoutAnimation.Types.easeInEaseOut
        : LayoutAnimation.Types.keyboard,
      LayoutAnimation.Properties.opacity,
    );
    LayoutAnimation.configureNext(animation);
  }

  componentWillUnmount() {
    this.subscription.remove();
  }

  render() {
    const {
      children,
      renderInputMethodEditor,
      inputMethod,
      containerHeight,
      contentHeight,
      keyboardHeight,
      keyboardWillShow,
      keyboardWillHide,
      keyboardVisible,
    } = this.props;

    // `containerHeight` is when the keyboard is not visible or not going to (keyboardWillShow == false)
    // `contentHeight` is when the keyboard is visible or are going to be shown
    const useContentHeight =
      inputMethod === INPUT_METHOD.KEYBOARD || keyboardWillShow;

    const containerStyle = {
      height: useContentHeight ? contentHeight : containerHeight,
    };

    const showCustomInput =
      inputMethod === INPUT_METHOD.CUSTOM && !keyboardWillShow;

    // keyboardHeight is 0 when hardware keyboard is connected,
    // we still want to show custom IME if that's the case
    const inputStyle = {
      height: showCustomInput ? keyboardHeight || 250 : 0,
    };

    // console.log(inputMethod);

    return (
      <View style={containerStyle}>
        {children}
        <View style={inputStyle}>{renderInputMethodEditor()}</View>
      </View>
    );
  }
}
