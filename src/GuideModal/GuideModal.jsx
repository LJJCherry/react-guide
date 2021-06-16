import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './index.less';

class GuideModal extends PureComponent {
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
    const { title, textArray, btnText, frontImg, wrapClassName } = this.props;
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
          <div className="guide-modal-content">
            <div className="guide-modal-content-left">{frontImg ? <img src={frontImg} /> : ''}</div>
            <div className="guide-modal-content-right">
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
              <div className="title">
                {Array.isArray(title) && title.map((item, idx) => <div key={idx}>{item}</div>)}
              </div>
              <div className="guide-modal-text">
                {textArray && textArray.length && (
                  <div className="text-list">
                    {textArray.map((text, idx) => (
                      <div className="text-item" key={idx}>
                        {text}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="guide-modal-btn" onClick={this.handleOk}>
                {btnText}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

GuideModal.defaultProps = {
  btnText: '快速使用',
  maskClosable: true,
  frontImg: 'https://img.alicdn.com/tfs/TB1ld1Gp9R26e4jSZFEXXbwuXXa-686-962.png',
};

GuideModal.propTypes = {
  backgroundImg: PropTypes.string,
  frontImg: PropTypes.string,
  btnText: PropTypes.string,
  wrapClassName: PropTypes.string,
  handleOk: PropTypes.func,
  destroy: PropTypes.func,
  maskClosable: PropTypes.bool,
};

export default GuideModal;
