import React, { PureComponent } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import GuideTipCircle from '../../Components/GuideTipCircle';
import './index.less';

class GuideFlowTip extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  nextStep = () => {
    if (typeof this.props.onNextStep === 'function') {
      this.props.onNextStep();
    }
  };

  onJump = () => {
    if (typeof this.props.onClose === 'function') {
      this.props.onClose();
    }
  };

  onClose = () => {
    if (typeof this.props.onClose === 'function') {
      this.props.onClose();
    }
  };

  render() {
    const { title, content, page, total, style, placement, icon, color, visible } = this.props;
    const wrapCls = classNames('lark-guide-tooltip', `guide-tooltip-${placement}`, {
      'guide-tip-with-img': !!icon,
    });
    return (
      <div
        className={classNames(wrapCls, visible ? 'guide-show' : 'guide-hide')}
        style={{ backgroundColor: color, ...style }}
      >
        <GuideTipCircle style={{ position: 'absolute' }} color={color} innerWidth={8} />
        <div className="guide-arrow" style={{ backgroundColor: color }} />
        {icon && (
          <div className="guide-img-wrap">
            <img src={icon} />
          </div>
        )}
        <div className="guide-flow-content-container">
          <div className="title">{title}</div>
          <div className="guide-content">{content}</div>
          <div className="content-bottom">
            <div className="guide-page-info">
              <span className="guide-page">{page}</span>
              <span className="guide-page-total">/{total}</span>
            </div>
            {page !== total ? (
              <div>
                <span
                  className="guide-btn guide-next-btn"
                  onClick={this.nextStep}
                  style={{ color }}
                >
                  下一步
                </span>
                <span className="guide-btn guide-next-pass" onClick={this.onJump}>
                  跳过
                </span>
              </div>
            ) : (
              <div>
                <span className="guide-btn guide-next-btn" onClick={this.onClose} style={{ color }}>
                  我知道了
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

GuideFlowTip.defaultProps = {
  visible: true,
};

GuideFlowTip.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  page: PropTypes.number,
  total: PropTypes.number,
  placement: PropTypes.string,
  icon: PropTypes.string,
  onNextStep: PropTypes.func,
  onClose: PropTypes.func,
  color: PropTypes.string,
  visible: PropTypes.bool,
};

export default GuideFlowTip;
