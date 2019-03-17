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
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default class MessagingContainer extends Component {
  static propTypes = {
    // from KeyboardState
    containerHeight: PropTypes.number.isRequired,
    contentHeight: PropTypes.number.isRequired,
    keyboardHeight: PropTypes.number.isRequired,
    keyboardVisible: PropTypes.boolean.isRequired,
    keyboardWillShow: PropTypes.boolean.isRequired,
    keyboardWillHide: PropTypes.boolean.isRequired,
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
          return true;
        }

        return false;
      },
    );
  }

  componentWillReceiveProps(nextProps) {
    const { onChangeInputMethod } = this.props;

    if (!this.props.keyboardVisible && nextProps.keyboardVisible) {
      // keyboard should be shown
      onChangeInputMethod(INPUT_METHOD.KEYBOARD);
    } else if (
      // keyboard should be hiddne
      this.props.keyboardVisible &&
      !nextProps.keyboardVisible &&
      this.props.inputMethod !== INPUT_METHOD.CUSTOM
    ) {
      onChangeInputMethod(INPUT_METHOD.NONE);
    }

    // this.props.keyboardVisible && !nextProps.keyboardVisible
    // && this.props.inputMethod == INPUT_METHOD.CUSTOM

    const { keyboardAnimationDuration } = nextProps;

    const animation = LayoutAnimation.create(
      keyboardAnimationDuration,
      Platform.OS === 'android' ? LayoutAnimation.Types.easeInEaseOut : LayoutAnimation.Types.keyboard,
      LayoutAnimation.Properties.opacity,
    );
    LayoutAnimation.configureNext(animation);
  }

  componentWillUnmount() {
    this.subscription.remove();
  }

  render(){
    const {
      children,
      renderInputMethodEditor,
      inputMethod,
      containerHeight,
      contentHeight,
      keyboardHeight,
      keyboardWillShow,
      keyboardWillHide,
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

    // keyboardHeight is 0 when hardware keyboard is connected, we still want to show custom IME if that's the case
    const inputStyle = {
      height: showCustomInput ? keyboardHeight || 250 : 0,
    };

    return (
      <View style={containerStyle}>
      {children}
      <View style={inputStyle}>{renderInputMethodEditor()}</View>
      </View>
    );
  }
}
