// 判断对象是否相等
export const deepEqual = (x, y) => {
    // 指向同一内存时
    if (x === y) {
      return true;
    } else if (typeof x === 'object' && x != null && typeof y === 'object' && y != null) {
      if (Object.keys(x).length != Object.keys(y).length) return false;
      for (const prop in x) {
        if (y.hasOwnProperty(prop)) {
          if (!deepEqual(x[prop], y[prop])) return false;
        } else return false;
      }
      return true;
    } else return false;
  };
  // 判断对象是否为空对象
export const isEmptyObject = (obj) => {
    return Object.keys(obj).length === 0
};

export const isElement = (obj) => {
  return !!(obj && (obj.nodeType == 1 || obj.nodeType == 9));
}
  