const checkLink = (el, binding, vnode, oldVnode) => {
  if (!binding.value) {
    el.addEventListener('click', (e) => {
      e.preventDefault()
    }, false)
  }
}

export default {
  bind: checkLink,
  update: checkLink,
  unbind: (el, binding, vnode) => {
    el.removeEventListener('click', (e) => {
      e.preventDefault()
    }, false)
  }
}
