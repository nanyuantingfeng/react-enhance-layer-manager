/**************************************************
 * Created by nanyuantingfeng on 07/06/2017 02:31.
 **************************************************/
import React, { Children, Component } from 'react';
import {
  unmountComponentAtNode,
  unstable_renderSubtreeIntoContainer
} from 'react-dom';

export default class RenderOverlay extends Component {

  static defaultProps = {
    overlay: null,
    dom: document.body,
  };

  constructor(...args) {
    super(...args);
  }

  componentWillMount() {
    let {dom} = this.props;
    this.popup = document.createElement('div');
    this.dom = dom;
    this.dom.appendChild(this.popup);
  }

  componentDidMount() {
    this.renderOverlay();
  }

  componentDidUpdate() {
    this.renderOverlay();
  }

  componentWillUnmount() {
    unmountComponentAtNode(this.popup);
    this.dom.removeChild(this.popup);
  }

  renderOverlay() {
    let {overlay} = this.props;
    //if (!overlay) return null
    return unstable_renderSubtreeIntoContainer(this,
      <div>{overlay}</div>, this.popup);
  }

  render() {
    let {children} = this.props;
    return Children.only(children);
  }
}
