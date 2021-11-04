## 引导组件

   对于复杂的B端系统，用户在使用过程中会存在疑问，新手引导，是可以让用户在短时间内快速了解产品的特色以及产品的使用方式，轻松上手去体验产品的功能，完成自己的目标。同时上线新功能后，往往会给用户一些提示，引导用户去体验新功能，不然在众多功能中，用户很难在短时间内发现更新了哪些内容。
### 安装
```javascript
 npm install react-comp-guide -S
```

## 新功能弹窗
### 1、GuideModal
#### 用法：
```javascript
import { GuideModal, createFunctionalComponent }  from 'react-comp-guide';

createFunctionalComponent(GuideModal, {
  title: ['财富功能已上线', '在线记账更方便'],
  textArray: ['可创建多个版本预算，讨论更方便。', '支持创建各个阶段的预算版本，支持Excel复制站提。']
  handleOk: () => {},
  backgroundImg: '',
  frontImg: '',
  btnText: '',  
})
```
#### API：
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 主标题 | Array |  |
| textArray | 内容区 | Array |  |
| handleOk | 点击按钮的回调 | Function |  |
| backgroundImg | 背景图 url | String |  |
| frontImg | 前景层 url | String |  |
| btnText | 按钮文案 | String | 快速使用 |
| wrapClassName | modal 的 classname | String |  |



### 2、NotifyModal
#### 用法：
```javascript
import { NotifyModal, createFunctionalComponent }  from 'react-comp-guide';

createFunctionalComponent(NotifyModal, {
  title: '总部端换装成功，快去看看',
  subTitle: '全新总部端给您不一样的舒适体验，智能排片更给力',
  handleOk: () => {},
  backgroundImg: '',
  frontImg: '',
  btnText: '',  
})
```
#### API：
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 主标题 | string |  |
| subTitle | 副标题 | string |  |
| handleOk | 点击按钮的回调 | function |  |
| backgroundImg | 背景图 | string  url |  |
| frontImg | 前景层 | string url |  |
| btnText | 按钮文案 | string | 我知道啦 |
| wrapClassName | modal的class | string |  |



## 流程引导
### GuideFlow

#### 用法
```javascript
import { GuideFlow, createFunctionalComponent } from 'react-comp-guide';
const steps = [
  {
    selector: '#first-step', // 在需要引导的html中加上id,或者classname
    title: '权益类型选择',
    width: 500,
    placement: 'right',
    content: '可按照会员等级或持卡/非持卡发放权益，同时只能生效一种',
  },
  {
    selector: '#second-step',
    title: '权益的启用停用',
    placement: 'right',
    width: 600,
    content: '权益启用时需仔细阅读建议说明，避免权益重复发放',
  },
  {
    selector: '#third-step',
    title: '内容设置',
    placement: 'bottom',
    borderPadding: 10,
    content: '权益的内容会影响用户客户端内容，可按需要设置客户端说明内容',
  },
];
// 函数式调用
createFunctionalComponent(GuideFlow, {
   steps,
   scrollElement: document.querySelector('.classname'), // 默认为
});

// 在jsx中加入id或者className
ReactDOM.render(
  <div>
    <div id="first-step">引导内容1</div>
    <div id="econd-step">引导内容2</div>
    <div id="third-step">引导内容2</div>
  </div>
, mountNode);

```
#### API：
GuideFlow的props：

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| steps | 步骤项配置 | string |  |
| scrollElement | 滚动元素 | object | 默认为window |
| onClose | 点击关闭、跳过的时候触发的回调 | function |  |



steps的配置项

| 参数 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| selector | 选择器 | string |  |  |
| title | 标题 | string |  |  |
| width | 引导高亮内容宽度 | number |  |  |
| placement | 引导tip的位置 | string |  |  |
| borderPadding | 引导高亮弹窗与引导内容之间的padding | number |  |  |
| content | 引导内容文案 | string | 
 |  |
| icon | Icon url | string url |  |  |

### GuideFlowWithoutMask
没有遮罩的引导

#### 用法
```javascript
import { GuideFlowWithoutMask, createFunctionalComponent } from 'react-comp-guide';
const steps = [
  {
    selector: '#first-step', // 在需要引导的html中加上id,或者classname
    title: '权益类型选择',
    width: 500,
    content: '可按照会员等级或持卡/非持卡发放权益，同时只能生效一种',
  },
  {
    selector: '.second-step',
    title: '权益的启用停用',
    placement: 'rightBottom',
    content: '权益启用时需仔细阅读建议说明，避免权益重复发放',
  },
  {
    selector: '.third-step',
    title: '内容设置',
    placement: 'right',
    borderPadding: 10,
    content: '权益的内容会影响用户客户端内容，可按需要设置客户端说明内容',
  },
];
// 函数式调用
createFunctionalComponent(GuideFlow, {
   steps,
   scrollElement: document.querySelector('.classname'), // 默认为window
});

// 在jsx中加入id或者className
ReactDOM.render(
  <div>
    <div id="first-step">引导内容1</div>
    <div className="econd-step">引导内容2</div>
    <div className="third-step">引导内容2</div>
  </div>
, mountNode);
```
#### API：
GuideFlow的props：

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| steps | 步骤项配置 | string |  |
| scrollElement | 滚动元素 | object | 默认为window |
| onClose | 点击关闭、跳过的时候触发的回调 | function |  |



steps的配置项

| 参数 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| selector | 选择器 | string |  |  |
| title | 标题 | string |  |  |
| placement | 引导tip的位置 | string |  | 同antd tooltips placemen 气泡框位置，可选 `top` `left` `right` `bottom` `topLeft` `topRight` `bottomLeft` `bottomRight` `leftTop` `leftBottom` `rightTop` `rightBottom` |
| borderPadding | 引导高亮弹窗与引导内容之间的padding | number |  |  |
| content | 引导内容文案 | string | 
 |  |





## 单点引导
GuideTip 和 GuideTipWithCircle 这两个组件的区别是 GuideTipWithCircle 带有高亮圆点，而GuideTip没有；
### 1、GuideTip
> 这个组件新的antd版本也有，可配置背景颜色，antd2的版本没有

### 2、GuideTipWithCircle
### 用法：
```javascript
import { GuideTip，GuideTipWithCircle }  from 'react-comp-guide';

ReactDOM.render(
  <div>
    <GuideTip text="创建线上免费领券后，进入自有渠道-活动页管理配置对应活动页，确保活动在H5/APP可见。" placement="topLeft" toolTipProps={{overlayStyle: {zIndex: 9, width: 300}}}>
      <Button>Align edge / 边缘对齐</Button>
    </GuideTip>
    <GuideTipWithCircle placement="topLeft" text="Prompt Text">
      <Button>Arrow points to center / 箭头指向中心</Button>
    </GuideTipWithCircle>
  </div>
, mountNode);
```
### API：
| 参数 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| text | 文案 | string |  |  |
| placement | 位置 | string |  |  |
| visible | 用于手动控制显示隐藏 | boolean |  |  |
| toolTipProps | antd tooltip的props | object |  | 2.x 版本[https://2x.ant.design/components/tooltip-cn/](https://2x.ant.design/components/tooltip-cn/) |
| handleClose | 点击关闭按钮触发的回调 | function |  |  |

## 组件函数式调用
### createFunctionalComponent
用函数式的方式调用组件，用于类似弹窗挂载到 body 上
#### 用法
该方法可以用在Antd的modal上；
```javascript
// TestModal
class TestModal extends React.Component {
   handleOk = (e) => {
    if (typeof this.props.handleOK === 'function') {
      this.props.handleOK(this.state.selectedRows);
    }
    if (typeof this.props.destroy === 'function') {
      this.props.destroy();
    }
  }
  handleCancel = (e) => {
    if (typeof this.props.destroy === 'function') {
      this.props.destroy();
    }
  }
  render() {
    return (
        <Modal
          title="Basic Modal"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
    );
  }
}

// 调用TestModal
// 函数式调用
createFunctionalComponent(TestModal, {
   props,
});
```


## Utils方法
### GuideStorage
很多的引导组件如果没有后端的支持都会存在本地浏览器的localstorage，用于控制显示隐藏，GuideStorage就是用来保存所有的引导组件的状态的一个localstorage, 保证系统的一致性；
```javascript
import { GuideTipWithCircle, GuideStorage } from 'react-comp-guide';

this.guideStore = new GuideStorage();
// 设置一个tip的状态
this.guideStore.set({ ticketVersionManagementTip: true });
// 获取一个tip的状态
this.guideStore.get('ticketVersionManagementTip')
```




