/**************************************************
 * Created by nanyuantingfeng on 02/08/2017 19:38.
 **************************************************/
import React, { PureComponent } from 'react'

import { EnhanceModal } from '../src'
import { Button } from 'antd'

@EnhanceModal()
export default class M2 extends PureComponent {
  componentWillMount () {
    //debugger
  }

  getResult = () => {
    return 'M2'
  }

  handleClickClose = () => {
    this.props.layer.emitOk(87)
  }

  render () {
    return (
      <div>
        <h1> M2</h1>

        <Button onClick={this.handleClickClose}>emitOk</Button>
      </div>
    )
  }
}
