import address from '~/config'
import siteConfig from '~/config/site-config'
const env = process.env.NODE_CONFIG

const site = {
  state: {
    // 页面顶部其他网站链接
    topLinks: {
      // 发布环境，用来拼接linkUrl域名后缀
      publishEnv: env,
      linksData: [
        {
          item: 'Transaction Platform',
          links: [
            { linkName: 'Jumore Global', linkUrl: '//www.jumoreglobal' },
            { linkName: 'Jumore Chemical', linkUrl: '//www.jumorechem' },
            { linkName: 'Jumore Non-ferrous', linkUrl: '//www.jumorenonferrous' },
            { linkName: 'Jumore Coal', linkUrl: '//www.jumorecoal' },
            { linkName: 'Jumore Steel', linkUrl: '//www.jumoresteel' },
            { linkName: 'Jumore Mineral', linkUrl: '//www.jumoremineral' },
            { linkName: 'Jumore Agricultural Products', linkUrl: '//www.jumoreagro' },
            { linkName: 'Jumore Petro', linkUrl: '//www.jumorepetro' },
            { linkName: 'Jumore Industrial Products', linkUrl: '//www.jumoreind' },
            { linkName: 'Jumore Machinery', linkUrl: '//www.jumoremachinery' },
            { linkName: 'Jumore Consumer Goods', linkUrl: '//www.jumoreconsumer' },
            { linkName: 'Jumore Food', linkUrl: '//www.jumorefood' }
          ]
        }, {
          item: 'Service Platform',
          links: [
            { linkName: 'Jumore EtransMore', linkUrl: '//www.etransmore' },
            { linkName: 'Jumore Finance', linkUrl: '//www.jumorefinance' },
            { linkName: 'Jumore Technology', linkUrl: '//www.jumoretech' },
            { linkName: 'Jumore Certification', linkUrl: '//www.jumorecert' },
            { linkName: 'Jumore Consultancy', linkUrl: '//www.jumoreconsult' },
            { linkName: 'Jumore Bigdata', linkUrl: '//www.jumoredata' }
          ]
        }, {
          item: 'Featured Pavilions',
          links: [
            { linkName: 'Jumore National Pavilion', linkUrl: 'http://eng.jumore' },
//          { linkName: 'Jumore Brand Pavilion', linkUrl: 'http://global.jumore' }
            { linkName: 'Belt and Road Pavilion', linkUrl: 'https://bnr.jumoreglobal' },
            { linkName: 'AIFC Pavilion', linkUrl: 'http://aifc.jumoreglobal' },
            { linkName: 'Top 500 Pavilion', linkUrl: 'https://top500.jumoreglobal' },
            { linkName: 'Islamic Pavilion', linkUrl: 'https://islamic.jumoreglobal' },
            { linkName: '聚贸国内站', linkUrl: 'https://www.jumore' }

          ]
        }
      ]
    },
    // 中台链接
    centerUrls: {
      // 首页(个人中心)
      home: address.CENTER_ADDRESS,
      // 注册
      register: `${address.CENTER_ADDRESS}/register/register`,
      // 忘记密码
      forgetPW: `${address.CENTER_ADDRESS}/resetPasswordStart`,
      // 积分
      points: `${address.CENTER_ADDRESS}/points/pointsCenter`,
      // 我的账号
      account: `${address.CENTER_ADDRESS}/index?forwardUrl=/account/accountSetting`,
      // 我的收藏
      favorite: `${address.CENTER_ADDRESS}/index?forwardUrl=/productFavorite/myFavorites`,
      // 发布采购
      buyRequest: `${address.CENTER_ADDRESS}/index?forwardUrl=purchase/PostBuiyingRequest`,
      // 我的公司
      company: `${address.CENTER_ADDRESS}/index?forwardUrl=company/companyProfile`,
      // 我的供应订单
      supplyOrder: `${address.CENTER_ADDRESS}/index?forwardUrl=orderSupply/orderListSupply`,
      // 我的购买订单
      purchaseOrder: `${address.CENTER_ADDRESS}/index?forwardUrl=orderPurchase/orderListPurchase`,
      // 消息中心-收到的消息
      inboxMsg: `${address.CENTER_ADDRESS}/index?forwardUrl=message/inMessageSearch`,
      // 消息中心-发出的消息
      outboxMsg: `${address.CENTER_ADDRESS}/index?forwardUrl=message/outMessageSearch`,
      // 产品列表
      products: `${address.CENTER_ADDRESS}/index?forwardUrl=goods/selectCategory`,
      // 采购信息
      purchaseList: `${address.CENTER_ADDRESS}/index?forwardUrl=purchase/ManagementList`,
      // 会员升级页
      membership: `${address.CENTER_ADDRESS}/index?forwardUrl=membership/benefitsView`,
      //中台登录
       signIn: `${address.CENTER_ADDRESS}/ssoLogin`
    },
    // 服务器配置
    address: address,
    // 当前页面的完整盘符
    pageFullPath: ''
  },

  mutations: {
    // SET_FOOTER (state, payload) {
    //   state.footer = payload
    // }
    SET_CUR_PAGEFULLPATH (state, payload) {
      state.pageFullPath = payload
    }
  },

  actions: {
    // async getFooter ({state, commit}) {
    //   const {data} = await JM_Webapi.get(`/webapi/v2/indexBottomMenu`)
    //   commit('SET_FOOTER', data.rows)
    // }
  }
}

// 将config/site-config.js中的站点配置混合进来
Object.assign(site.state, siteConfig)

export default site
