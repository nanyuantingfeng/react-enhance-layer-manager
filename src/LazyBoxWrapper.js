/************************************************
 * Created By nanyuantingfeng On 7/3/16 02:55.
 ************************************************/
import React, { Children, PureComponent } from 'react';

export default class LazyBoxWrapper extends PureComponent {

  constructor() {
    super();
    this.isFirstLoadChild = true;
  }

  renderWrap() {
    return Children.only(this.props.children);
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

