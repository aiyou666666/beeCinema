import Vue from 'vue'
import address from '~/config'

import defaultPicture from '~/assets/img/default.png'
// import * as filters from '~/services/filters'

// 用到的函数
function escape2Html (str) {
  var arrEntities = {'lt': '<', 'gt': '>', 'nbsp': ' ', 'amp': '&', 'quot': '"'}
  return str.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) {
    return arrEntities[t]
  })
}

const filters = {
  // 字符串截取
  cutStr (str = '', L = 8) {
    if (!(typeof str === 'string') || !str) {
      return ''
    }

    let result = ''
    let strlen = str.length // 字符串长度
    let chrlen = str.replace(/[^\x00-\xff]/g, '**').length // 字节长度

    if (chrlen <= L) {
      return str
    }

    for (let i = 0, j = 0; i < strlen; i++) {
      let chr = str.charAt(i)
      if (/[\x00-\xff]/.test(chr)) {
        j++ // ascii码为0-255，一个字符就是一个字节的长度
      } else {
        j += 2 // ascii码为0-255 以外，一个字符就是两个字节的长度
      }
      if (j <= L) { // 当加上当前字符以后，如果总字节长度小于等于L，则将当前字符真实的+在result后
        result += chr
      } else { // 反之则说明result已经是不拆分字符的情况下最接近L的值了，直接返回
        let strItem = result.trim().split(' ')
        if (strItem.length > 1) {
          strItem.pop()
        }
        result = strItem.join(' ')
        return result + '...'
      }
    }
  },

  // 图片cdn
  imgCdn (val) {
    if (val) {
      return address.IMG_ADDRESS + val
    } else {
      return val
    }
  },

  imgFilter (str) {
    if (str) {
      if (str.substr(0, 6) === 'http://' || str.substr(0, 7) === 'https://') {
        return str
      } else {
        return address.IMG_ADDRESS + str
      }
    } else {
      return defaultPicture
    }
  },

  // 字符串处理
  strJob (str, end) {
    if (str) {
      let s = String(str)
      let len = s.length
      if (Number.isInteger(end) && end < len) {
        return s.slice(0, end) + '...'
      } else {
        return s
      }
    }
  },

  // html安全过滤
  htmlFilter (html) {
    return html
  },

  // 过滤html标签
  delHtmlTag (html) {
    if (html) {
      return escape2Html((html + '').replace(/<\/?[^>]+(>|$)/g, '')).trim() // 去掉所有的html标记
    }
    return ''
  },

  // 日期转换成 May. 23, 2017
  dateFormat (val) {
    let monthStr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    let dayStr = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun']
    var _date = new Date(val)
    var _year = _date.getFullYear(),
      _month = _date.getMonth(),
      _day = _date.getDate(),
      _hour = _date.getHours(),
      _minute = _date.getMinutes()
    return `${monthStr[_month]}. ${_day}, ${_year}`
  },

  // 给搜索关键字加强调色，用 <b color="red"></b> 包裹
  keywordAddWrap (str, keyword) {
    if (typeof str !== 'string' || str === '') return str
    let strRegExp = new RegExp('\\b' + keyword + '\\b', 'ig')
    return str.replace(strRegExp, `<b style="color:red">${keyword}</b>`)
  },

  // 搜索结果html截短并加关键字强调
  searchHtmlCut (html, keyword, length) {
    // 获取html中所有 <b style="color:red;">keyword</b> 中间的keyword，并去除重复字符串
    let matchStr = [...new Set(html.match(/<[^>]*>([^>]*[^>]*)<\/[^>]*>/gi))]
    // 过滤掉html并截短的字符串
    let cutStr = filters.cutStr(filters.delHtmlTag(html), length)
    // 先删除html然后截短再重新加上强调标签
    matchStr.forEach(function (v, k, s) {
      // 配置每个keyword并加上强调样式
      cutStr = filters.keywordAddWrap(cutStr, filters.delHtmlTag(v))
    })
    return cutStr
  },

  // 根据不同环境给域名加不同后缀
  // 传入的host是不带域名后缀的（例如：.com / .test）
  envHostPostfix (host) {
    if (typeof host !== 'string' || host === '') return host
    let env = process.env.NODE_CONFIG
    let hostPostfix = ''
    switch (env) {
      case 'test':
      case 'dev':
        hostPostfix = '.test'
        break
      case 'pre':
        hostPostfix = '.com.pre'
        break
      case 'prod':
        hostPostfix = '.com'
        break
    }
    // 返回拼接后的域名
    return `${host}${hostPostfix}`
  },

  // 图片下载接口地址拼接
  imgDownloadUrl (fileName, fileUrl) {
    let apiUrl = '/api/downLoad/downLoadFile'
    return `${apiUrl}?fileName=${fileName}&fileUrl=${fileUrl}`
  },
  // 分享链接拼接过滤器
  shareLinks (type, options) {
    if (!type || !options) return
    const links = {
      facebook: `//www.facebook.com/sharer.php?s=100&p[title]=${options.title}&p[summary]=${options.desc}&p[url]=${options.url}&p[images]=`,
      twitter: `//twitter.com/intent/tweet?text=${options.desc}&url=${options.url}`,
      pinterest: `//www.pinterest.com/pin/create/bookmarklet/?url=${options.url}&media=${options.image || ''}&title=${options.title}&alt=`,
      linkedin: `//www.linkedin.com/sharing/share-offsite?mini=true&ro=true&url=${options.url}&title=${options.title}&summary=${options.desc}&source=&armin=armin`
    }
    return links[type]
  }

}

// use fiters
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))
Vue.prototype.$filter = filters
