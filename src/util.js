import React from 'react';
import ReactDOM from 'react-dom';

const wrapperId = 'func-dialog-wrapId';
class Component {
  constructor(Comp, props) {
    const mergedProps = { ...props, destroy: this.destroy };
    const target = document.getElementById(wrapperId);
    if (target) {
      ReactDOM.render(<Comp {...mergedProps} />, target);
    } else {
      const container = document.createElement('div');
      container.id = wrapperId;
      document.body.appendChild(container);
      ReactDOM.render(<Comp {...mergedProps} />, container);
    }
  }

  destroy() {
    const target = document.getElementById(wrapperId);
    if (target) {
      ReactDOM.unmountComponentAtNode(target);
      target.parentNode.removeChild(target);
    }
  }
}

export const createFunctionalComponent = (Comp, props) => new Component(Comp, props);

class ComponentWithChild {
  constructor(Wrap, child, props, insOptions) {
    const mergedProps = { ...props, destroy: this.destroy };
    const target = document.getElementById(wrapperId);
    if (target) {
      ReactDOM.render(
        <Wrap {...insOptions}>{React.cloneElement(child, { ...mergedProps })}</Wrap>,
        target,
      );
    } else {
      const container = document.createElement('div');
      container.id = wrapperId;
      document.body.appendChild(container);
      ReactDOM.render(
        <Wrap {...insOptions}>{React.cloneElement(child, { ...mergedProps })}</Wrap>,
        container,
      );
    }
  }

  destroy() {
    const target = document.getElementById(wrapperId);
    if (target) {
      ReactDOM.unmountComponentAtNode(target);
      target.parentNode.removeChild(target);
    }
  }
}
// 弹窗 -> 弹窗内容
export const createNestFnComponent = (modalConstruction, defaultProps = {}) => {
  return (children, props = {}, insOptions) =>
    new ComponentWithChild(
      modalConstruction,
      children,
      {
        ...defaultProps,
        ...props,
      },
      insOptions,
    );
};
