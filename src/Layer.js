/**************************************************
 * Created by nanyuantingfeng on 8/29/16 11:17.
 **************************************************/
import '../style/layer.less';
import React from 'react';

export default class Layer extends React.Component {

  static displayName = 'LayerView';

  static defaultProps = {
    style: {}
  };

  constructor(props) {
    super(props);
    this.state = {visible: props.visible || false,};
  }

  componentWillReceiveProps(nextProps) {
    this.setState({visible: nextProps.visible,});
  }

  render() {
    const {visible} = this.state;
    const {style, children} = this.props;

    return (
      <div className={`layer_wrapper ${visible ? 'css_animate' : ''}`}
           style={style}>
        <div className="ekb-layer-content-wrapper">
          {children}
        </div>
      </div>
    );
  }

}

