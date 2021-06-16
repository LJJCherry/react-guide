import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import GuideTipCircle from '../Components/GuideTipCircle';
import GuideTip from './GuideTip';
import './index.less';

class GuideTipWithCircle extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  componentDidMount() {
    this.setState({
      visible: this.props.visible,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.visible !== nextProps.visible) {
      this.setState({
        visible: nextProps.visible,
      });
    }
  }

  handleClose = () => {
    this.setState({
      visible: false,
    });
    if (typeof this.props.handleClose === 'function') {
      this.props.handleClose();
    }
  };

  render() {
    const { color, circleStyle, ...others } = this.props;
    const { visible } = this.state;
    return (
      <span className="guide-tip-with-circle">
        <GuideTip {...others} handleClose={this.handleClose}>
          {visible && <GuideTipCircle color={color} style={circleStyle} />}
        </GuideTip>
      </span>
    );
  }
}

GuideTipWithCircle.defaultProps = {
  text: '',
  placement: 'bottom',
};

GuideTipWithCircle.propTypes = {
  text: PropTypes.string,
  placement: PropTypes.string,
  color: PropTypes.string,
  handleClose: PropTypes.func,
  visible: PropTypes.bool,
};

export default GuideTipWithCircle;
