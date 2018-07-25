/************************************************
 * Created By nanyuantingfeng On 6/15/16 10:48.
 ************************************************/
import React from 'react';
import MessageCenter  from 'message-center.js';

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

function checkPromiseLayer(layers, key) {
  const kk = key.split('#')[0];
  const index = layers.findIndex(line => line.key === kk);
  const layer = layers[index];

  const {getComponent} = layer;

  if (getComponent) {
    return new Promise(resolve => getComponent(resolve))
      .then(component => layers[index] = {...layer, component});
  }

  return Promise.resolve(null);
}

export function EnhanceLayerManager(layers) {

  return (Component) => class extends React.Component {

    static displayName = 'EnhanceLayerManager';

    bus = new MessageCenter();

    uuid = UUID();
    state = {OPEN_MODAL_LAYER: []};

    overriddenProps = {};

    constructor(...args) {
      super(...args);

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

    handleOpen = (key, props) => {
      key = this.uuid(key);

      checkPromiseLayer(this.layers, key).then(() => {
        this.handleOverride(key, props);
        this.setState({OPEN_MODAL_LAYER: [key]});
      });

      return new Promise((resolve) => this.bus.once(key, resolve));
    };

    handlePush = (key, props) => {
      key = this.uuid(key);

      checkPromiseLayer(this.layers, key).then(() => {
        const {OPEN_MODAL_LAYER} = this.state;
        const openLayers = OPEN_MODAL_LAYER.slice(0);
        openLayers.push(key);
        this.handleOverride(key, props);
        this.setState({OPEN_MODAL_LAYER: openLayers});
      });

      return new Promise((resolve) => this.bus.once(key, resolve));
    };

    handleOverride = (key, props) => {
      const data = this.overriddenProps[key];
      this.overriddenProps[key] = {...data, ...props};
    };

    handleClose = () => {
      const {OPEN_MODAL_LAYER} = this.state;
      const openLayers = OPEN_MODAL_LAYER.slice(0);
      openLayers.pop();
      this.setState({OPEN_MODAL_LAYER: openLayers});
    };

    handleOk = (key, data) => {
      this.handleClose();
      this.bus.emit(key, data);
    };

    renderLayers = () => {
      const {OPEN_MODAL_LAYER} = this.state;

      if (OPEN_MODAL_LAYER.length === 0) {
        return null; // delete Overlay
      }

      const OML = OPEN_MODAL_LAYER.map(key => key.split('#')[0]);
      const layers = {};

      this.layers.forEach(layer => {
        const {key} = layer;
        if (!!~OML.indexOf(key)) {
          layers[key] = layer;
        }
      });

      return OPEN_MODAL_LAYER.map(uid => {
        const layer = layers[uid.split('#')[0]];
        const {component: L, key: _, ...others} = layer;
        const props = this.overriddenProps[uid];
        const visible = true;
        const key = uid; // override key 2 uuid

        return (
          <L key={key} {...others} {...props}
             visible={visible}
             onOk={data => this.handleOk(key, data)}
             onCancel={this.handleClose}
             layerManager={this.layerManager}
          />);
      });
    };

    render() {
      const {state, props, layerManager} = this;
      const overlay = this.renderLayers();

      return (
        <React.Fragment>
          {overlay}
          <Component {...state} {...props}
                     layerManager={layerManager}/>
        </React.Fragment>
      );
    }
  };
}

export default EnhanceLayerManager;
