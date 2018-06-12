/************************************************
 * Created By nanyuantingfeng On 6/15/16 10:48.
 ************************************************/
import React, { createElement, PureComponent } from 'react';
import MessageCenter from 'message-center.js';
import RenderOverlay from './RenderOverlay';

function UUID() {
  let i = -1;
  return function (key) {
    i++;
    return `${key}#${i}`;
  };
}

function isFunction(f) {
  return typeof f === 'function';
}

function isPromise(f) {
  return f && isFunction(f.then);
}

function checkPromiseLayer(layers, key) {
  const kk = key.split('#')[0];
  const index = layers.findIndex(line => line.key === kk);
  const layer = layers[index];

  const {getComponent, asyncComponent} = layer;

  if (asyncComponent) {

    let Px = null;
    if (isPromise(getComponent)) {
      Px = Promise.resolve(getComponent);
    } else if (isFunction(getComponent)) {
      Px = getComponent();
    } else {
      throw new Error(`getComponent must be a function or a promise`);
    }

    return Px.then(component => {
      component = component.default || component;
      return layers[index] = {...layer, component};
    });

  }
  //depacete
  if (getComponent) {
    return new Promise(resolve => getComponent(resolve)).then(component => {
      component = component.default || component;
      return layers[index] = {...layer, component};
    });
  }

  return Promise.resolve(null);
}

export const EnhanceLayerManager = (layers) => (Component) => class extends PureComponent {

  static displayName = 'EnhanceLayerManager';

  bus = new MessageCenter();
  uuid = UUID();
  state = {OPEN_MODAL_LAYER: []};
  overriddenProps = {};

  constructor(...args) {
    super(...args);

    this.handleOpen = ::this.handleOpen;
    this.handlePush = ::this.handlePush;
    this.handleClose = ::this.handleClose;

    layers = layers || [];

    if (isFunction(layers)) {
      layers = layers(...args);
    }

    this.layers = layers;

    this.layerManager = {
      open: this.handleOpen,
      push: this.handlePush,
      close: this.handleClose,
    };
  }

  handleOpen(key, props) {
    key = this.uuid(key);

    checkPromiseLayer(this.layers, key).then(() => {
      this.handleOverride(key, props);
      this.setState({OPEN_MODAL_LAYER: [key]});
    });

    return new Promise((resolve) => this.bus.once(key, resolve));
  }

  handlePush(key, props) {
    key = this.uuid(key);
    checkPromiseLayer(this.layers, key).then(() => {
      let {OPEN_MODAL_LAYER} = this.state;
      let openLayers = OPEN_MODAL_LAYER.slice(0);
      openLayers.push(key);
      this.handleOverride(key, props);
      this.setState({OPEN_MODAL_LAYER: openLayers});

    });

    return new Promise((resolve) => this.bus.once(key, resolve));
  }

  handleOverride(key, props) {
    let data = this.overriddenProps[key];
    this.overriddenProps[key] = {...data, ...props};
  }

  handleClose() {
    let {OPEN_MODAL_LAYER} = this.state;
    let openLayers = OPEN_MODAL_LAYER.slice(0);
    openLayers.pop();
    this.setState({OPEN_MODAL_LAYER: openLayers});
  }

  handleOk(key, data) {
    this.handleClose();
    this.bus.emit(key, data);
  }

  renderLayers() {
    let {OPEN_MODAL_LAYER} = this.state;

    if (OPEN_MODAL_LAYER.length === 0) {
      return null; // delete Overlay
    }

    let OML = OPEN_MODAL_LAYER.map(key => key.split('#')[0]);
    let layers = {};

    this.layers.forEach(layer => {
      let {key} = layer;
      if (!!~OML.indexOf(key)) {
        layers[key] = layer;
      }
    });

    return OPEN_MODAL_LAYER.map(uid => {
      let layer = layers[uid.split('#')[0]];
      let {component, key, ...rest} = layer;
      let props = this.overriddenProps[uid];
      let visible = true;
      key = uid; // override key 2 uuid
      let onOk = data => {this.handleOk(key, data);};
      return createElement(component, {
        key,
        ...rest,
        ...props,
        visible,
        onOk,
        onCancel: this.handleClose,
        layerManager: this.layerManager,
      });
    });
  }

  render() {
    let {state, props, layerManager} = this;
    let overlay = this.renderLayers();
    return (
      <RenderOverlay overlay={overlay}>
        <Component {...state} {...props} layerManager={layerManager}/>
      </RenderOverlay>
    );
  }
};

