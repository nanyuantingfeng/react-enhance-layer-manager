/**************************************************
 * Created by nanyuantingfeng on 02/08/2017 19:38.
 **************************************************/
import React, { PureComponent } from 'react';
import { EnhanceModal } from '../src';
import { Button } from 'antd';

@EnhanceModal()
export default class M0 extends PureComponent {

  componentWillMount() {
    // debugger
  }

  getResult = () => {
    return 'M0';
  };

  handleClickOpen = () => {
    this.props.layerManager.push('M1').then(data => {
      this.props.layer.emitOk(data);
    });
  };

  handleClickClose = () => {
    this.props.layer.emitCancel();
  };

  render() {
    return (
      <div>
        <h1> M0 </h1>

        <Button onClick={this.handleClickOpen}>Open M1</Button>
        <Button onClick={this.handleClickClose}>Cancel</Button>

      </div>
    );
  }
}
