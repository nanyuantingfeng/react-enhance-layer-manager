/************************************************
 * Created By nanyuantingfeng On 7/3/16 02:55.
 ************************************************/
import React from 'react';

export default class LazyBoxWrapper extends React.Component {

  isFirstLoadChild = true;

  renderWrap() {
    return React.Children.only(this.props.children);
  }

  render() {

    if (!this.isFirstLoadChild) {
      return this.renderWrap();
    }

    if (this.props.visible) {
      this.isFirstLoadChild = false;
      return this.renderWrap();
    }

    return null;
  }
}

