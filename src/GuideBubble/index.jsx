import React, { PureComponent } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

class GuideBubble extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { className, type } = this.props;
    const cls = classNames(
      'guide-bubble',
      {
        [`guide-bubble-${type}`]: type,
      },
      className,
    );
    return <div className={cls} />;
  }
}

GuideBubble.propTypes = {
  className: PropTypes.string,
  type: PropTypes.oneOf(['new', 'update', 'custom']),
};

export default GuideBubble;
