import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './index.less';

class NotifyModal extends PureComponent {
  handleCancel = () => {
    if (typeof this.props.handleCancel === 'function') {
      this.props.handleCancel();
    }
    this.destroy();
  };

  destroy = () => {
    if (typeof this.props.destroy === 'function') {
      this.props.destroy();
    }
  };

  handleOk = () => {
    if (typeof this.props.handleOk === 'function') {
      this.props.handleOk();
    }
    this.destroy();
  };

  getBackgroundStyle = () => {
    const { backgroundImg } = this.props;
    if (backgroundImg) {
      return {
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: 'cover',
      };
    }
    return {};
  };

  onMaskClose = (e) => {
    const { maskClosable } = this.props;
    if (maskClosable && e.target === this.mask) {
      this.handleCancel();
    }
  };

  render() {
    const { title, subTitle, btnText, frontImg, wrapClassName, btnClassName } = this.props;
    const backGroundStyle = this.getBackgroundStyle();
    return (
      <div
        className="guide-modal-mask"
        onClick={this.onMaskClose}
        ref={(el) => {
          this.mask = el;
        }}
      >
        <div className={classNames('guide-modal-wrapper', wrapClassName)} style={backGroundStyle}>
          <div className="guide-modal-header">
            <span className="close" onClick={this.handleCancel}>
              <svg
                viewBox="64 64 896 896"
                focusable="false"
                data-icon="close"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" />
              </svg>
            </span>
          </div>
          <div className="notify-modal-content">
            <p className="notify-modal-title text-center">{title}</p>
            <p className="notify-modal-subtitle text-center">{subTitle}</p>
            <div className="notify-modal-btn" onClick={this.handleOk}>
              {btnText}
            </div>
            <div className={classNames('notify-modal-frontImg', btnClassName)}>
              <img src={frontImg} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

NotifyModal.defaultProps = {
  btnText: '我知道啦',
  title: '',
  subTitle: '',
  maskClosable: true,
  backgroundImg:
    'https://img.alicdn.com/imgextra/i2/O1CN01GJsphR1EcsO94HonT_!!6000000000373-2-tps-1340-882.png',
  frontImg:
    'https://img.alicdn.com/imgextra/i2/O1CN014V6A8N28NrtV2Ksf3_!!6000000007921-2-tps-844-528.png',
};

NotifyModal.propTypes = {
  backgroundImg: PropTypes.string,
  frontImg: PropTypes.string,
  btnText: PropTypes.string,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  wrapClassName: PropTypes.string,
  btnClassName: PropTypes.string,
  handleOk: PropTypes.func,
  destroy: PropTypes.func,
  maskClosable: PropTypes.bool,
};

export default NotifyModal;
