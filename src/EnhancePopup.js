/************************************************
 * Created By nanyuantingfeng On 6/17/16 16:35.
 ************************************************/
import styles from '../style/transition.module.less';
import React from 'react';
import { Transition } from 'react-transition-group';
import Popup from './Popup';
import { Portal } from 'react-portal';

import EnhanceLayerBase from './EnhanceLayerBase';

export function EnhancePopup(config = {}) {

  return (Component) => class extends EnhanceLayerBase {
    static displayName = 'EnhancePopup';

    constructor(props, ...args) {
      super(props, ...args);

      this.timeout = props.timeout || config.timeout || 300;
      this.width = props.width || config.width || 500;
    }

    render() {
      const {overriddenProps, visible, iN} = this.state;
      const {className, ...others} = this.props;
      const {timeout, width} = this;

      return (
        <Portal>
          <Transition in={iN} timeout={timeout}>
            {(status) => (
              <div className={`${styles.fade} ${className}`}
                   style={buildStyle(timeout, width, status)}>
                <Popup {...config} {...others} {...overriddenProps}
                       onCancel={this.handleCancel}>
                  <Component {...others} {...overriddenProps}
                             ref="REF_ORIGINAL_COMPONENT_LAYER"
                             visible={visible}
                             overrideGetResult={this.handleOverrideGetResult}
                             layer={this.layer}/>
                </Popup>
              </div>
            )}
          </Transition>
        </Portal>
      );
    }
  };
}

function buildStyle(timeout, width, status) {

  const tStyle = {
    entering: {right: 0},
    entered: {right: 0},
  };

  return {
    transition: `all ${timeout}ms ease`,
    right: (width - 70) * -1,
    width,
    ...tStyle[status]
  };
}

export default EnhancePopup;
