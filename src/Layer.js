/**************************************************
 * Created by nanyuantingfeng on 8/29/16 11:17.
 **************************************************/
import '../style/layer.less';
import React, { PureComponent } from 'react';

/**
 *
 title: PropTypes.string,
 footer: PropTypes.element,
 data: PropTypes.object,
 width: PropTypes.number,
 loading: PropTypes.bool,
 loadingText: PropTypes.string,
 *
 *
 *
 *
 */

export default class LayerView extends PureComponent {

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
    let {visible} = this.state;
    let {style, children} = this.props;
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

