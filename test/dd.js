/**************************************************
 * Created by nanyuantingfeng on 02/08/2017 19:38.
 **************************************************/
import React, { PureComponent } from 'react';

import { EnhanceDrawer, EnhanceLayerManager } from '../src';
import { Button } from 'antd';

import DDC from './dd-child';

@EnhanceDrawer({
  title: 'DEMO Drawer',
  width: 600
})
@EnhanceLayerManager([
  {key: 'DDC', component: DDC}
])
export default class DD extends PureComponent {

  getResult = () => {
    return 'DD';
  };

  handleClickClose = () => {
    this.props.layer.emitOk(87);
  };

  state = {childrenDrawer: false};

  showChildrenDrawer = () => {
    this.props.layerManager.open('DDC');
  };

  render() {
    return (
      <div>
        <h1> DDD </h1>

        <Button onClick={this.handleClickClose}>emitOk</Button>

        <br/>

        <Button type="primary" onClick={this.showChildrenDrawer}>
          Two-level drawer (DDC)
        </Button>


      </div>
    );
  }
}
