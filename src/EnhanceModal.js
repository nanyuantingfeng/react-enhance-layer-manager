/************************************************
 * Created By nanyuantingfeng On 6/15/16 10:48.
 ************************************************/
import React, { Component } from 'react';
import { Modal } from 'antd';

function IS_PROMISE(value) {
  return value && typeof value.then === 'function';
}

export const EnhanceModal = (config) => (Component) => class extends Component {

  static displayName = 'EnhanceModal';

  constructor(props, ...args) {
    super(props, ...args);
    let {visible} = props;

    this.state = {
      visible: visible || false,
      loading: false,
      overriddenProps: {}
    };

    this.handleCancel = :: this.handleCancel;
    this.handleOk = :: this.handleOk;
    this.handleOverride = :: this.handleOverride;
    this.handleOverrideGetResult = :: this.handleOverrideGetResult;

    this.layer = {
      emitOk: this.handleOk,
      emitCancel: this.handleCancel,
      override: this.handleOverride,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({visible: nextProps.visible});
  }

  handleOverrideGetResult(fn) {
    this.getResult = fn;
  }

  handleCancel() {
    this.setState({visible: false});
    let {onCancel} = this.props;
    onCancel && onCancel();
  }

  handleOk(data) {
    let ref = this.refs['REF_ORIGINAL_COMPONENT'];
    data = data || (this.getResult ? this.getResult() : ref.getResult());

    if (data === false) {
      return false;
    }

    if (!IS_PROMISE(data)) {
      data = Promise.resolve(data);
    }

    this.setState({loading: true});

    let {onOk} = this.props;

    data.then(d => {
      this.setState({loading: false, visible: false});
      onOk && onOk(d);
    }, e => {
      this.setState({loading: false});
    });
  }

  handleOverride(overriddenProps) {
    this.setState({overriddenProps});
  }

  render() {
    let {...props} = this.props;
    let {visible, loading, overriddenProps} = this.state;

    return (
      <Modal {...config} {...props} {...overriddenProps}
             visible={visible}
             confirmLoading={loading}
             onCancel={this.handleCancel}
             onOk={() => this.handleOk()}>

        <Component  {...props}
                    ref="REF_ORIGINAL_COMPONENT"
                    visible={visible}
                    overrideGetResult={this.handleOverrideGetResult}
                    layer={this.layer}/>

      </Modal>
    );
  }
};

