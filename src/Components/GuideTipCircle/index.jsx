import React, { PureComponent } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './index.less';

class GuideTipCircle extends PureComponent {
  render() {
    const { style, innerWidth, className, color } = this.props;
    const outWidth = innerWidth * 2;
    return (
      <span
        className={classNames('guide-tip-pulsating-circle', className)}
        style={{ width: outWidth, height: outWidth, ...style }}
      >
        <span
          className="guide-tip-pulsating-outer"
          style={{ width: outWidth, height: outWidth, background: color }}
        />
        <span
          className="guide-tip-pulsating-inner"
          style={{ width: innerWidth, height: innerWidth, background: color }}
        />
      </span>
    );
  }
}

GuideTipCircle.defaultProps = {
  innerWidth: 8,
  color: '#1890ff',
};

GuideTipCircle.propTypes = {
  innerWidth: PropTypes.number,
  className: PropTypes.string,
  color: PropTypes.string,
};

export default GuideTipCircle;
