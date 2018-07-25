/**************************************************
 * Created by nanyuantingfeng on 2018/7/18 12:00.
 **************************************************/

import React from 'react';
import { EnhanceDrawer } from '../src';

@EnhanceDrawer({
  title: 'DDC'
})
export default class DDC extends React.Component {

  render() {

    return ' This is two-level drawer';
  }
}
