/**************************************************
 * Created by nanyuantingfeng on 02/08/2017 19:38.
 **************************************************/
import './demo.less';
import { Button } from 'antd';
import React, { PureComponent } from 'react';
import { EnhanceLayerManager } from '../src';

import M0 from './m0';
import M1 from './m1';
import M2 from './m2';
import M3 from './m3';

import LL from './LL.lazy';

@EnhanceLayerManager([
  {key: 'M0', component: M0,},
  {key: 'M1', component: M1,},
  {key: 'M2', component: M2,},
  {key: 'M3', component: M3},
  {key: 'LL', getComponent: LL},
])
export default class DEMO extends PureComponent {

  handleOpenModal() {
    let {layerManager} = this.props;

    layerManager.push('LL').then(data => {
      console.log('getResult:LL:=>', data);

      layerManager.push('M0').then(data => {
        console.log('getResult:M0:=>', data);
      });
    });
  }

  render() {
    return (
      <div className="layout-content">
        <Button onClick={::this.handleOpenModal}> OpenModal </Button>
      </div>
    );
  }

}

