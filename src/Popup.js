/************************************************
 * Created By nanyuantingfeng On 6/7/16 11:48.
 ************************************************/
import styles from '../style/popup.module.less';
import React, { Children, cloneElement, Component } from 'react';
import { Icon } from 'antd';

export default class Popup extends Component {

  constructor(props, ...args) {
    super(props, ...args);
    this.state = {visible: props.visible || false};
  }

  componentWillReceiveProps(nextProps) {
    this.setState({visible: nextProps.visible});
  }

  handleCancel = () => {
    let {onCancel} = this.props;
    onCancel && onCancel();
  };

  render() {
    let {width, title, footer, children, style} = this.props;
    let {visible} = this.state;
    let styleWrap = {width, zIndex: 999};
    let ff = false;

    if (footer && footer.length > 0) {
      ff = true;
      footer = Children.map(footer, (line, key) => {
        return cloneElement(line, {key});
      });
    }

    return (
      <div style={styleWrap}
           className={`${styles['popup_wrapper']} ${visible ? styles['show-wrap'] : ''}`}>
        <div className="popup-header">
          <div className="popup-header-title">{title}</div>
          <a className="popup-header-close" onClick={this.handleCancel}>
            <Icon type="cross"/>
          </a>
        </div>
        <div className={`popup-content ${!ff ? 'no-footer' : ''}`}
             style={style}>
          {children}
        </div>
        {ff && <div className="popup-footer"> {footer} </div>}
      </div>
    );
  }
}

