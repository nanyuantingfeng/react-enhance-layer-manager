/**************************************************
 * Created by nanyuantingfeng on 02/08/2017 19:38.
 **************************************************/
import React, { PureComponent } from 'react'

import { EnhanceModal } from '../src'
import { Button } from 'antd'

@EnhanceModal()
export default class M1 extends PureComponent {

  componentWillMount () {
   // debugger
  }

  getResult = () => {
    return 'M1'
  }

  handleClickOpen = () => {
    this.props.layerManager.push('M2').then(data => {
      this.props.layer.emitOk(data)
    })
  }

  handleClickClose = () => {
    this.props.layer.emitCancel()
  }

  render () {
    return (
      <div>
        <h1> M1 </h1>


        <Button onClick={this.handleClickOpen}>Open M2</Button>
        <Button onClick={this.handleClickClose}>Cancel</Button>
      </div>
    )
  }
}
