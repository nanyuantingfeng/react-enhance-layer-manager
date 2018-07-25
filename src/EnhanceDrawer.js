/************************************************
 * Created By nanyuantingfeng On 6/17/16 16:35.
 ************************************************/
import React from 'react';

import EnhanceLayerBase from './EnhanceLayerBase';
import { Drawer } from 'antd';

export function EnhanceDrawer(config = {}) {

  return (Component) => class extends EnhanceLayerBase {
    static displayName = 'EnhanceDrawer';

    render() {
      //iN 这个state 是为了修补模态框的动画
      const {overriddenProps, visible, iN} = this.state;
      const {footer, ...others} = this.props;

      return (
        <Drawer {...config} {...others} {...overriddenProps}
                destroyOnClose={false}
                visible={iN}
                onClose={this.handleCancel}>

          <Component {...others} {...overriddenProps}
                     ref="REF_ORIGINAL_COMPONENT_LAYER"
                     visible={visible}
                     overrideGetResult={this.handleOverrideGetResult}
                     layer={this.layer}/>

          <Footer footer={footer}/>

        </Drawer>
      );
    }
  };
}

/**
 * @return {null}
 */
function Footer(props) {

  let {footer} = props;

  if (!footer || !footer.length) {
    return null;
  }

  footer = React.Children.map(footer, (line, key) => React.cloneElement(line, {key}), null);

  return (
    <div style={{
      position: 'absolute',
      bottom: 0,
      width: '100%',
      borderTop: '1px solid #e8e8e8',
      padding: '10px 16px',
      textAlign: 'right',
      left: 0,
      background: '#fff',
      borderRadius: '0 0 4px 4px',
    }}>
      {footer}
    </div>
  );
}

export default EnhanceDrawer;
