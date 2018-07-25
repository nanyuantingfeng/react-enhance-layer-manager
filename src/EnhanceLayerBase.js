/**************************************************
 * Created by nanyuantingfeng on 2018/7/17 18:27.
 **************************************************/
import React from 'react';

export default class EnhanceLayerBase extends React.Component {

  constructor(props, ...args) {
    super(props, ...args);

    this.state = {
      iN: false,
      visible: props.visible || false,
      loading: false,
      overriddenProps: {}
    };

    this.timeout = props.timeout || 300;
    this.width = props.width || 500;

    this.layer = {
      emitOk: fnOutWrapper.call(this, this.handleOk),
      emitCancel: fnOutWrapper.call(this, this.handleCancel),
      override: this.handleOverride,
    };
  }

  componentDidMount() {
    fnInCall.call(this);
  }

  handleOverrideGetResult = (fn) => {
    this.getResult = fn;
  };

  handleCancel = () => {
    const {onCancel} = this.props;
    fnOutCall.call(this, onCancel);
  };

  handleOk = (data) => {
    const ref = this.refs['REF_ORIGINAL_COMPONENT_LAYER'];

    data = data || (this.getResult ? this.getResult() : ref.getResult());

    if (data === false) {
      return false;
    }

    this.setState({loading: true});

    data = Promise.resolve(data);

    data.then(d => {

      this.setState({loading: false, visible: false});

      if (d !== false) {
        const {onOk} = this.props;
        fnOutCall.call(this, onOk, d);
      }

    }, e => {
      this.setState({loading: false});
    });
  };

  handleOverride = (overriddenProps) => {
    this.setState({overriddenProps});
  };
}

function fnInCall(fn, ...args) {
  this.setState({iN: true}, () => fn && fn(...args));
}

function fnOutCall(fn, ...args) {
  this.setState({iN: false}, () => {
    setTimeout(() => fn && fn(...args), this.timeout);
  });
}

function fnOutWrapper(fn) {
  return (...args) => fnOutCall.call(this, fn, ...args);
}
