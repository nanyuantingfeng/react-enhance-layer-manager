/**************************************************
 * Created by nanyuantingfeng on 02/08/2017 19:38.
 **************************************************/
import React from 'react';
import { render } from 'react-dom';
import DEMO from './demo';

window.addEventListener('DOMContentLoaded', () => {
  let el = document.createElement('div');
  el.id = 'app';
  document.body.appendChild(el);
  render(<DEMO/>, el);
});
