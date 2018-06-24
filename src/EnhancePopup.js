/************************************************
 * Created By nanyuantingfeng On 6/17/16 16:35.
 ************************************************/
import styles from '../style/transition.module.less';
import React, { Component } from 'react';
import { Transition } from 'react-transition-group';
import Popup from './Popup';

function fnIsPromise(value) {
  return value && typeof value.then === 'function';
}

function fnInCall(fn, ...args) {
  setTimeout(() => {
    this.setState({iN: true}, () => fn && fn(...args));
  }, 16);
}

function fnOutCall(fn, ...args) {
  this.setState({iN: false}, () => {
    setTimeout(() => fn && fn(...args), this.timeout);
  });
}

function fnOutWrapper(fn) {
  return (...args) => fnOutCall.call(this, fn, ...args);
}

function buildStyle(timeout, width, status) {

  let tStyle = {
    entering: {right: 0},
    entered: {right: 0},
  };

  return {
    transition: `all ${timeout}ms ease`,
    right: width * -1,
    width,
    ...tStyle[status]
  };
}

export const EnhancePopup = (config = {}) => (C) => class extends Component {
  static displayName = 'EnhancePopup';

  constructor(props, ...args) {
    super(props, ...args);
    let {visible} = props;

    this.state = {iN: false, visible: visible || false, overriddenProps: {}};
    this.timeout = props.timeout || config.timeout || 1000;
    this.width = props.width || config.width || 500;

    this.layer = {
      emitOk: this::fnOutWrapper(this.handleOk),
      emitCancel: this::fnOutWrapper(this.handleCancel),
      override: this.handleOverride,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({visible: nextProps.visible});
  }

  componentDidMount() {
    this:: fnInCall();
  }

  handleOverrideGetResult = (fn) => {
    this.getResult = fn;
  };

  handleCancel = () => {
    let {onCancel} = this.props;
    this::fnOutCall(onCancel);
  };

  handleOk = (data) => {
    let ref = this.refs['REF_ORIGINAL_COMPONENT_POPUP'];
    data = data || (this.getResult ? this.getResult() : ref.getResult());

    if (data === false) {
      return false;
    }

    if (!fnIsPromise(data)) {
      data = Promise.resolve(data);
    }

    data.then(d => {
      let {onOk} = this.props;

      if (d !== false) {
        fnOutCall.call(this, onOk, d);
      }

    }, e => {});
  };

  handleOverride = (overriddenProps) => {
    this.setState({overriddenProps});
  };

  render() {
    let {overriddenProps, visible, iN} = this.state;
    let {className, ...others} = this.props;
    let {timeout, width} = this;

    return (
      <Transition in={iN} timeout={timeout}>
        {(status) => (
          <div className={`${styles.fade} ${className}`}
               style={buildStyle(timeout, width, status)}>
            <Popup {...config} {...others} {...overriddenProps}
                   onCancel={this.handleCancel}>
              <C {...others} {...overriddenProps}
                 ref="REF_ORIGINAL_COMPONENT_POPUP"
                 visible={visible}
                 overrideGetResult={this.handleOverrideGetResult}
                 layer={this.layer}/>
            </Popup>
          </div>
        )}
      </Transition>
    );
  }
};
