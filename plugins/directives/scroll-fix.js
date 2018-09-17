/**
 * 当页面滚动时固定内容
 *
 * @param {Number} scrollTop 滚动到该位置将内容位置固定
 * @param {String} className 固定时要添加的样式类名
 */
const scrollFix = (el, binding) => {
  // 获取用户传递的参数
  let { scrollTop, className } = binding.value
  let classAdded = false
  // 固定内容的函数
  const fixFn = () => {
    let top = Math.max(document.body.scrollTop, document.documentElement.scrollTop)
    if (top >= scrollTop) {
      !classAdded && (el.className = el.className + ' ' + className)
      classAdded = true
    }
    if (top < scrollTop) {
      el.className = el.className.replace(className, '')
      classAdded = false
    }
  }
  // 第一次载入时先执行一次
  fixFn()
  // 监听window滚动事件
  window.addEventListener('scroll', () => {
    fixFn()
  })
}

export default scrollFix
