import React from "react";
import { SafeAreaView, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";

import NavigationBar from "../components/NavigationBar";
import CommentInput from "../components/CommentInput";
import CommentList from "../components/CommentList";

export default function Comments({
  comments,
  onSubmitComment,
  onClose,
  style
}) {
  return (
    <SafeAreaView style={style}>
      <NavigationBar
        title="Comments"
        leftText="Close"
        onPressLeftText={onClose}
      />
      <CommentInput placeholder="Leave a comment" onSubmit={onSubmitComment} />
      <CommentList items={comments} />
    </SafeAreaView>
  );
}

Comments.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSubmitComment: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  style: ViewPropTypes.style
};

Comments.defaultProps = {
  style: null
};
