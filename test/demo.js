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
import PP from './pp';
import LL from './LL.lazy';
import DD from './dd';

@EnhanceLayerManager([
  {key: 'M0', component: M0,},
  {key: 'M1', component: M1,},
  {key: 'M2', component: M2,},
  {key: 'PP', component: PP},
  {key: 'LL', getComponent: LL},
  {key: 'DD', component: DD},
])
export default class DEMO extends PureComponent {

  handleOpenModal0 = async () => {
    const {layerManager} = this.props;

    const data = await layerManager.push('M0');

    console.log('getResult:M0:=>', data);

  };

  handleOpenModal1 = async () => {
    const {layerManager} = this.props;
    const data = await  layerManager.push('LL');

    console.log('getResult:LL:=>', data);

  };

  handleOpenModal2 = async () => {
    const {layerManager} = this.props;

    const data = await  layerManager.push('PP');

    console.log('getResult:PP:=>', data);
  };

  handleOpenModal3 = async () => {
    const {layerManager} = this.props;

    const data = await layerManager.push('DD', {
      footer: [<button onClick={layerManager.close}> close </button>]
    });

    console.log('getResult:DD:=>', data);

    const data2 = await layerManager.push('M0');

    console.log('getResult:M0:=>', data2);

  };

  render() {
    return (
      <div className="layout-content">

        <Button onClick={this.handleOpenModal0}> OpenModal </Button>
        <Button onClick={this.handleOpenModal1}> OpenModal(Lazy) </Button>
        <Button onClick={this.handleOpenModal2}> OpenPopup </Button>
        <Button onClick={this.handleOpenModal3}> OpenDrawer </Button>

      </div>
    );
  }

}

