// 公共函数
const utils = {

  parseParams (params = {}, key) {
    return params[key] ? params[key].replace('.html', '').split('_') : []
  },

  checkParams (params = {}, key) {
    return params[key].replace('.html', '') === key
  },

  // 用来抛出错误提示
  throwError (err) {
    if (process.browser) {
      throw `ERROR: ${err}`
    } else {
      console.log(`ERROR: ${err}`)
    }
  },

  // 如果数组不支持remove方法，则添加
  arrayRemoveFn () {
    if (!Array.prototype.remove) {
      Array.prototype.remove = function (item) {
        if (!this.length) return
        var index = this.indexOf(item)
        if (index > -1) {
          this.splice(index, 1)
          return this
        }
      }
    }
  },

  // 检测未登录  _this = 组件的this  rediectPath = 要重定向到的页面，默认为登录页
  checkNotLogin (_this, redirectPath = '/login') {
    // 当登录失败时统一跳转到登录页
    JM_Webapi.getUserInfo().then(res => {
      if (!res.data) {
        _this.$router.push(redirectPath)
      }
    })
  },

  // cookie相关操作
  cookie: {
    /**
    * 设置Cookie
    * @author zhoul
    * @param {string} name 设置的Cookie属性
    * @param {string} val  设置的Cookie值
    * @param {string} path 设置的Cookie的路径
    * @param {number} date 设置的Cookie的过期时间(天数)
    */
    setCookie: function (name, val, path, date) {
      var oDate = new Date()
      oDate.setDate(oDate.getDate() + (date || 30))
      var sDate = ';expires=' + oDate
      var Path = ';path=' + (path || '/')
      document.cookie = name + '=' + val + sDate + Path
    },

    /**
     * 获取Cookie
     * @author zhoul
     * @param   {string} name 需要获取的Cookie属性
     * @returns {string} 获取到的Cookie值
     */
    getCookie: function (name) {
      var sCookies = document.cookie
      var arr = sCookies.split('; ')
      for (var i = 0; i < arr.length; i++) {
        var arr2 = arr[i].split('=')
        if (arr2[0] == name) {
          return arr2[1]
        }
      }
    },

    /**
     * 删除Cookie
     * @author zhoul
     * @param {string} name 需要删除的Cookie
     */
    delCookie: function (name) {
      this.setCookie(name, '', '', -1)
    },

    /**
     * 获取Cookie的个数
     * @author zhoul
     * @returns {number} Cookie的个数
     */
    cookieLength: function () {
      var sCookie = document.cookie
      var arr = sCookie.split('; ')
      if (!sCookie) {
        return 0
      }
      return arr.length
    }
  },

  /* 
*只允许输入两位小数的正整数
*/
clearNoNum (inputStr) {
  inputStr = inputStr + ''
  inputStr = inputStr.replace(/[^\d.]/g, '') // 清除“数字”和“.”以外的字符
  inputStr = inputStr.replace(/\.{2,}/g, '.') // 只保留第一个. 清除多余的
  inputStr = inputStr.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
  inputStr = inputStr.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3')// 只能输入两个小数\
  if (inputStr.indexOf('.') == 0 && inputStr != '') {
    inputStr = ''
    return inputStr
  }
  if (inputStr.indexOf('.') < 0 && inputStr != '') { // 以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
    inputStr = parseFloat((inputStr + '').substring(0,9))
    return inputStr
  }
  if (inputStr.indexOf('.') > 0 && inputStr != '') {
    let num = inputStr.indexOf('.')
    if(num > 9){
      num = 9
    }
    inputStr = inputStr.substring(0,num)+inputStr.substring(inputStr.indexOf('.'))
    return inputStr
  }
}

}

// 将类型判断方法加到utils对象
// isArray(),isObject()....
let objTypes = ['Object', 'Function', 'Array', 'String', 'Number', 'Undefined', 'Null']
objTypes.forEach(function (v, k, s) {
  utils['is' + v] = function (obj) {
    return {}.toString.call(obj).slice(1, -1).split(' ')[1] === v
  }
})

// 将公共函数分别挂载到node和浏览器环境
if (!process.browser) {
  global.JM_Utils = utils
} else {
  window.JM_Utils = utils
}
