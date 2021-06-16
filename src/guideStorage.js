/**
 * guide Storage 在localStorage存入一个guideTipStore的对象，所有和guide相关的存储都放在该对象中
 */
class GuideStorage {
  constructor(storeKey) {
    this.key = storeKey || 'guideTipStore';
    this.guideStore = this.getGuide();
  }

  set(obj) {
    const data = { ...this.guideStore, ...obj };
    localStorage.setItem(this.key, JSON.stringify(data));
  }

  getGuide() {
    const data = localStorage.getItem(this.key) || '{}';
    let result;
    try {
      result = JSON.parse(data);
    } catch (e) {
      result = {};
    }
    return result;
  }

  get(key) {
    return this.guideStore[key];
  }
  // 是否存在
  isExist(key) {
    return !!this.guideStore[key];
  }

  clear() {
    localStorage.setItem(this.key, '');
  }
}

export default GuideStorage;
