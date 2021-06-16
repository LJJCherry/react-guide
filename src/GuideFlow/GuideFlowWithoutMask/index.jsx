import React, { PureComponent } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import GuideFlowTip from '../GuideFlowTip/index';
import TipFn from '../TipFn';
import { deepEqual, isEmptyObject, isElement } from '../util';
import './index.less';

class GuideFlowWithoutMask extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      tipObj: {},
      guideBorderStyle: {},
      tipStyle: {},
      visible: true,
      toolTipClass: '',
    };
    this.steps = props.steps;
    this.scrollElement = props.scrollElement || window;
    this.tipFn = new TipFn();
    this.interval = '';
    this.timer = 0;
  }

  componentDidMount() {
    this.domArray = this.getGuideDomInfo();
    setTimeout(() => {
      this.onStepChange(0);
    }, this.props.timeout);
    // 轮询查看页面元素的位置信息
    this.interval = setInterval(() => {
      const { index } = this.state;
      this.timer += 1;
      if (this.timer === 10) {
        clearInterval(this.interval);
      }
      if (!deepEqual(this.getDomInfo(this.steps[index]), this.domArray[index])) {
        this.domArray = this.getGuideDomInfo();
        this.onStepChange(0);
      }
    }, 300);
    // 监听窗口变化
    window.addEventListener('resize', this.onResizeWindow, false);
    this.scrollElement.addEventListener('scroll', this.onResizeWindow, false);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.visible !== nextProps.visible) {
      this.setState({
        visible: nextProps.visible,
      });
    }
    this.domArray = this.getGuideDomInfo();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResizeWindow, false);
    this.scrollElement.removeEventListener('scroll', this.onResizeWindow, false);
  }

  // 获取需要引导元素的位置信息
  getGuideDomInfo() {
    const domArray = this.steps.map((item) => {
      return this.getDomInfo(item);
    });
    const tempArr = domArray.filter((item) => item !== '');
    // 当前页面中查找不到某一个引导的元素，不展示引导功能
    if (tempArr.length < this.steps.length) {
      return [];
    }
    return tempArr;
  }

  getDomInfo = (item) => {
    const ele = isElement(item.selector)
      ? item.selector
      : document.querySelector(`${item.selector}`);
    if (!ele) return '';
    const { left, top, width, height } = ele.getBoundingClientRect();
    const w = item.width || width;
    return {
      ele,
      left,
      top,
      bottom: top + height,
      right: left + w,
      width: w,
      height,
    };
  };

  onResizeWindow = () => {
    const { index } = this.state;
    this.domArray = this.getGuideDomInfo();
    this.onStepChange(index);
  };

  // 设置当前引导元素
  setActivePos = (current) => {
    if (!current) return;
    const { ele } = current;
    const { borderPadding } = this.tipFn.getConfig();
    const clientRect = this.tipFn.getHighlightPos(current);
    const rect = Object.assign({}, clientRect);
    // 存在滚动条的情况
    if (this.props.autoFixed && !this.tipFn.inViewport(ele)) {
      const { scrollElement } = this;
      this.tipFn.scroll(scrollElement, ele);
      const { top } = ele.getBoundingClientRect();
      rect.top = top - borderPadding;
    }
    this.setState({
      guideBorderStyle: rect,
    });
  };

  // 设置tips的样式
  setTipStyle = (current, curStep) => {
    const { placement } = curStep;
    let tipPosition;
    let toolTipCls;
    if (placement) {
      const { tipPos, toolTipClass } = this.tipFn.getTipPosByEle(current, placement);
      tipPosition = tipPos;
      toolTipCls = toolTipClass;
    } else {
      const { tipPos } = this.tipFn.getTipPos(current);
      tipPosition = tipPos;
    }
    this.setState({
      tipStyle: tipPosition,
      toolTipClass: toolTipCls,
    });
  };
  // 设置tips的文案
  setTipText = (index) => {
    this.setState({
      tipObj: this.steps[index],
    });
  };

  setConfig = (curStep) => {
    const { borderPadding, offset } = curStep;
    if (borderPadding) this.tipFn.setConfig({ borderPadding });
    if (offset) this.tipFn.setConfig({ offset });
  };
  // step: number当前的步骤
  onStepChange(step) {
    const current = this.domArray[step]; // 当前引导的元素
    const curStep = this.steps[step]; // 当前step的配置信息

    if (!current) return;

    // 设置当前配置元素的config
    this.setConfig(curStep);
    // 设置需要引导内容位置信息
    this.setActivePos(current, curStep);
    // 设置引导tips的样式
    this.setTipStyle(current, curStep);
    // 设置当前引导内容
    this.setTipText(step);
  }
  // 下一步
  onNextStep = () => {
    const { index } = this.state;
    const step = index + 1;
    this.onStepChange(step);
    // 设置当前引导的index
    this.setState({
      index: step,
    });
  };
  // 跳过 或 关闭
  onJump = () => {
    this.setState({
      index: 0,
      visible: false,
    });
    if (typeof this.props.onClose === 'function') {
      this.props.onClose();
    }
    // 函数式调用传入的destroy方法
    this.props.destroy && this.props.destroy();
  };

  render() {
    const { guideBorderStyle, tipObj, index, visible, tipStyle, toolTipClass } = this.state;
    if (isEmptyObject(guideBorderStyle)) return null;
    return (
      <div className={classNames('guide-flow-without-mask', visible ? 'guide-show' : 'guide-hide')}>
        <div className="guide-border" style={guideBorderStyle}>
          <GuideFlowTip
            icon={tipObj.icon}
            title={tipObj.title}
            style={{ zIndex: this.props.zIndex, ...tipStyle }}
            placement={toolTipClass}
            onClose={this.onJump}
            onNextStep={this.onNextStep}
            content={tipObj.content}
            page={index + 1}
            total={this.steps.length}
          />
        </div>
      </div>
    );
  }
}

GuideFlowWithoutMask.defaultProps = {
  autoFixed: false,
  timeout: 0,
  zIndex: 0,
};

GuideFlowWithoutMask.propTypes = {
  autoFixed: PropTypes.bool,
  timeout: PropTypes.number,
  zIndex: PropTypes.number,
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      selector: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      icon: PropTypes.string,
      width: PropTypes.number,
      destroy: PropTypes.func,
      borderPadding: PropTypes.number,
      placement: PropTypes.oneOf([
        'top',
        'topLeft',
        'topRight',
        'leftTop',
        'leftBottom',
        'left',
        'bottom',
        'bottomRight',
        'bottomLeft',
        'right',
        'rightTop',
        'rightBottom',
      ]),
    }),
  ),
};

export default GuideFlowWithoutMask;
