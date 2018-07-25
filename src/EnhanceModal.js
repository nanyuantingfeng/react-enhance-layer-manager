/************************************************
 * Created By nanyuantingfeng On 6/15/16 10:48.
 ************************************************/
import React from 'react';

import EnhanceLayerBase from './EnhanceLayerBase';
import { Modal } from 'antd';

export function EnhanceModal(config = {}) {

  return (Component) => class extends EnhanceLayerBase {

    static displayName = 'EnhanceModal';

    // 此处 需要注意, Modal:onOk 返回的第一个参数是有值的, 不符合会掉条件
    handleOk2 = () => this.handleOk();

    render() {
      const {...props} = this.props;
      const {visible, loading, overriddenProps, iN} = this.state;

      return (
        <Modal {...config} {...props} {...overriddenProps}
               visible={iN}
               confirmLoading={loading}
               onCancel={this.handleCancel}
               onOk={this.handleOk2}>

          <Component  {...props}
                      ref="REF_ORIGINAL_COMPONENT_LAYER"
                      visible={visible}
                      overrideGetResult={this.handleOverrideGetResult}
                      layer={this.layer}/>

        </Modal>
      );
    }
  };
}

export default EnhanceModal;
