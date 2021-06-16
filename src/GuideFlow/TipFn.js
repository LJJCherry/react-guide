/**
 * 通用TipFn类
 */
export default class TipFn {
  constructor(config) {
    this.defaultConfig = {
      borderPadding: 2,
      safeDistance: 250,
      circleDistance: 10,
      gap: 40, // 指示标点大小
      offset: [0, 0, 0, 0],
    };
    this.config = Object.assign({}, this.defaultConfig, config);
  }

  setConfig(config) {
    this.config = Object.assign({}, this.config, config);
  }

  getConfig() {
    return this.config;
  }

  // 获取高亮样式元素的位置
  getHighlightPos = (current) => {
    const { left, top, width, height } = current;
    const { borderPadding } = this.config;
    const clientRect = {
      left: left - borderPadding,
      top: top - borderPadding,
      width: width + 2 * borderPadding,
      height: height + 2 * borderPadding,
    };
    return clientRect;
  };
  getTipPosByEle(current, placement) {
    const { bottom, right } = current;
    const { borderPadding, gap, offset } = this.config;
    let tipPos = {};
    let toolTipClass = '';
    const borderPos = {
      ...this.getHighlightPos(current),
      bottom: bottom + borderPadding,
      right: right + borderPadding,
    };
    const [offsetTop, offsetRight, offsetBottom, offsetLeft] = offset;
    switch (placement) {
      case 'leftTop':
        tipPos = { right: borderPos.width + gap + offsetRight, top: offsetTop };
        toolTipClass = 'leftTop';
        break;
      case 'leftBottom':
        tipPos = { right: borderPos.width + gap + offsetRight, bottom: offsetBottom };
        toolTipClass = 'leftBottom';
        break;
      case 'left':
        tipPos = {
          right: borderPos.width + gap + offsetRight,
          top: borderPos.height / 2 + offsetTop,
          transform: 'translateY(-50%)',
        };
        toolTipClass = 'left';
        break;
      case 'right':
        tipPos = {
          left: borderPos.width + gap + offsetLeft,
          top: borderPos.height / 2 + offsetTop,
          transform: 'translateY(-50%)',
        };
        toolTipClass = 'right';
        break;
      case 'rightTop':
        tipPos = { left: borderPos.width + gap + offsetLeft, top: offsetTop };
        toolTipClass = 'rightTop';
        break;
      case 'rightBottom':
        tipPos = { left: borderPos.width + gap + offsetLeft, bottom: offsetBottom };
        toolTipClass = 'rightBottom';
        break;
      case 'top':
        tipPos = {
          bottom: borderPos.height + gap + offsetBottom,
          transform: 'translateX(-50%)',
          left: borderPos.width / 2 + offsetLeft,
        };
        toolTipClass = 'top';
        break;
      case 'topLeft':
        tipPos = { bottom: borderPos.height + gap + offsetBottom, left: offsetLeft };
        toolTipClass = 'topLeft';
        break;
      case 'topRight':
        tipPos = { bottom: borderPos.height + gap + offsetBottom, right: offsetRight };
        toolTipClass = 'topRight';
        break;
      case 'bottom':
        tipPos = {
          top: borderPos.height + gap + offsetTop,
          transform: 'translateX(-50%)',
          left: borderPos.width / 2 + offsetLeft,
        };
        toolTipClass = 'bottom';
        break;
      case 'bottomRight':
        tipPos = { top: borderPos.height + gap + offsetTop, right: offsetRight };
        toolTipClass = 'bottomRight';
        break;
      default:
        tipPos = { top: borderPos.height + gap + offsetTop, left: offsetLeft };
        toolTipClass = 'bottomLeft';
        break;
    }
    return { tipPos, toolTipClass };
  }

  scroll(scrollElement, el) {
    const rect = el.getBoundingClientRect();
    const { winH: winHeight } = this.getWindowInfo();
    const { top } = rect;
    if (top < 0 || el.clientHeight > winHeight) {
      scrollElement.scrollBy(0, rect.top - (winHeight / 2 - rect.height / 2) - 30);
    } else {
      // 30px padding from edge to look nice
      scrollElement.scrollBy(0, rect.top - (winHeight / 2 - rect.height / 2) + 30);
    }
  }

  inViewport(el) {
    // 检查元素是否在视口中
    const rect = el.getBoundingClientRect();

    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom + 80 <= window.innerHeight &&
      rect.right <= window.innerWidth
    );
  }
  // 获取tip的位置, 相对于高亮框
  getTipPos(current) {
    const { bottom, right } = current;
    const { winW, winH } = this.getWindowInfo();
    const { borderPadding, gap, safeDistance } = this.config;
    let tipPos = {};
    let toolTipClass = '';
    const borderPos = {
      ...this.getHighlightPos(current),
      bottom: bottom + borderPadding,
      right: right + borderPadding,
    };
    if (winH - borderPos.bottom > safeDistance && winW - borderPos.left > safeDistance) {
      toolTipClass = 'bottom';
      tipPos = { top: borderPos.height + gap, left: 0 }; // bottom
    } else if (winW - borderPos.right > safeDistance && winH - borderPos.top > safeDistance) {
      toolTipClass = 'right';
      tipPos = { left: borderPos.width + gap, top: 0 }; // right
    } else if (borderPos.left > safeDistance && winH - borderPos.top > safeDistance) {
      toolTipClass = 'left';
      tipPos = { right: borderPos.width + gap, top: 0 }; // left
    } else if (borderPos.top > safeDistance && winW - borderPos.left > safeDistance) {
      toolTipClass = 'top';
      tipPos = { bottom: borderPos.height + gap, left: 0 }; // top
    }
    return { toolTipClass, tipPos };
  }

  getWindowInfo() {
    return {
      winW: window.innerWidth,
      winH: window.innerHeight,
    };
  }

  addClass(node, cls) {
    // https://developer.mozilla.org/zh-CN/docs/Web/API/Element/classList
    if (!this.hasClass(node, cls)) node.classList.add(cls);
  }

  removeClass(node, cls) {
    if (this.hasClass(node, cls)) {
      node.classList.remove(cls);
    }
  }

  hasClass(node, cls) {
    return node.classList.contains(cls);
  }
}
