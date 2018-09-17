/**
 * 需要登录才能进行操作的指令
 *
 * @param {Function} fn 未登录时的click要执行的事件，默认为弹出登录框，会覆盖弹出登录框事件
 * @param {Boolean} preventLink 是否阻止链接跳转，默认为true
 * 
 * 使用方法： 需求登录才能操作的标签上加  v-needLogin="{fn: fnName, preventLink: false}" 属性
 * 
 */
const needLogin = (el, binding, vnode, oldVnode) => {
  // 原理：判断是否登录，如果未登录，则用复制的DOM来替换原来的DOM，绑定的事件不会被触发，链接可重写为空
  // 默认参数
  let options = {
    preventLink: true
  }
  let args = Object.assign({}, options, binding.value)
  // 获取要用到的对象
  let parentEl = el.parentNode
  let cloneNode = el.cloneNode(true)
  let $store = vnode.context.$store
  let $root = vnode.context.$root
  // 标识当前是否是克隆节点
  let isClone = false

  // 默认先做未登录处理
  if (args.preventLink) {
    cloneNode.href = ''
    cloneNode.setAttribute('clone', 'true')
  }
  cloneNode.onclick = (e) => {
    if (args.preventLink) {
      e.preventDefault()
    }

    if (args.fn) {
      args.fn()
    } else {
      $root.$emit('popupLoginBox')
    }
  }

  replaceNode()
  // 首先检测vuex里的登录状态，在登录后跳转页面时起作用
  if ($store.state.login.isLogin) {
    replaceNode(true)
  } else {
    // 检测到未登录时替换
    $root.$on('loginFailed', () => {
      replaceNode(false)
    })
    // 检测到已登录时替换
    $root.$on('loginSuccess', () => {
      replaceNode(true)
    })
  }

  // 替换节点函数
  function replaceNode (isLogin) {
    // 如果已登录，且当前是克隆节点，则将克隆节点替换成原节点
    if (isClone && isLogin) {
      parentEl.replaceChild(el, cloneNode)
      isClone = false
    }

    // 如果未登录，且当前是原节点，则将原节点替换成克隆节点
    if (!isClone && !isLogin) {
      parentEl.replaceChild(cloneNode, el)
      isClone = true
    }
  }
}

export default {
  inserted: needLogin
}
