/**************************************************
 * Created by nanyuantingfeng on 02/08/2017 19:38.
 **************************************************/
import React, { PureComponent } from 'react'

import { EnhancePopup } from '../src'
import { Button } from 'antd'

@EnhancePopup({
  width: 300,
  timeout: 300,
})
export default class M3 extends PureComponent {

  getResult = () => {
    return 'M3'
  }

  handleClickClose = () => {
    this.props.layer.emitOk(87)
  }

  render() {
    return (
      <div>
        <h1> M3</h1>
        <Button onClick={this.handleClickClose}>emitOk</Button>
      </div>
    )
  }
}
