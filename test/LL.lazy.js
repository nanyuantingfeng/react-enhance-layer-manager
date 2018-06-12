/**************************************************
 * Created by nanyuantingfeng on 01/01/2018 01:07.
 **************************************************/
import React, { PureComponent } from 'react'
import { EnhanceModal } from '../src'

@EnhanceModal()
export default class LL extends PureComponent {

  constructor(props, context) {
    super(props, context)
    
  }

  getResult = () => {
    return 'LL'
  }

  componentWillMount() {

  }

  componentWillUnmount() {

  }

  render() {

    return (
      <div>
        LL
      </div>
    )
  }
}
