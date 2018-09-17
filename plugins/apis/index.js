import axios  from './axios'
import zfjApis from './zfjApis'
import ayApis from './ayApis'

// 数据api接口列表
const dataApis = {
  // 获取站点底部数据
  getSiteFooter () {
    return axios.get(`/index/findFooter`)
  },
  // 获取RSA公钥
  getRSAKey () {
    return axios.post(`/getPublicKey`)
  },  
  // 用户登录
  doLogin (params) {
    return axios.post(`/doLogin`, params)
  },
  // 检测用户是否当天第一次登陆，并获取新增积分
  checkFirstLoginAndTotalPoints (params) {
    return axios.get(`/checkFirstLoginAndTotalPoints`)
  },

  // 获取用户信息
  getUserInfo () {
    return axios.get(`/checkLoginStatus`)
  },

  // 发送未激活邮件
  nonactivatedEmail (params) {
    return axios.get(`/sendLoginerificationCode`, {
      params: params
    })
  },

  // 获取首页基本信息
  getVoList () {
    return axios.get(`/index/voList`)
  },
  // 获取产品详情
  getProductDetail (params) {
    return axios.get(`/goods/${params.id}`)
  },
  validateContactNowSelf (params) {
    return axios.get(`/contactNowSendInquiry/contactNowSelf`, {
      params: params
    })
  },
  validateOrderSelf (params) {
    return axios.get(`/placeOrder/orderSelf`, {
      params: params
    })
  },
  // 全品类
  getAllCategories () {
    return axios.get(`/index/findAllCategoryList`)
  },
  // 产品页获取hotCategory menu
  getHotCategoryMenu () {
    return axios.get(`/goods/getHotCategory`)
  },
  // 产品页banner
  getProductsBanner () {
    return axios.get(`/news/ProductsCarouselAd`)
  },
  // 热卖商品
  getHotSellingProducts () {
    return axios.get(`/goods/hotSellingProducts`)
  },
  // 趋势商品
  getTrendingProducts () {
    return axios.get(`/goods/selectedTrendingProducts`)
  },
  // Hot Categories
  getHotCategories () {
    return axios.get(`/goods/productHotCategories`)
  },
  // 企业页TopSuppliersAndBrandSelection
  getTopSuppliersAndBrandSelection (params) {
    return axios.get(`/suppliers/findTopSuppliersAndBrandSelection`)
  },
  // 企业页铂金会员推荐
  getPreSupRecList (params) {
    return axios.get(`/suppliers/getPreSupRecList`)
  },
  // 商品加入或者删除收藏
  addOrDeleteFavorite (params) {
    return axios.post(`/goods/createCollectionProduct/${params.goodsId}/${params.type}`)
  },
  // 查询企业收藏状态
  checkFavoriteStatus: function (params) {
    return axios.get(`/goods/goodsIsCheck`, {
      params: params
    })
  },
  // buyrequest detail
  getRequestDetail: function (params) {
    return axios.get(`/buyingRequests/getRequestDetail/${params.id}`, {
      params: params
    })
  },
  // Related Buying Requests
  getRelatedRequest: function (params) {
    return axios.get(`/buyingRequests/otherBuyingRequests/5`)
  },
  validatebuyingRequestSelf: function (params) {
    return axios.get(`/buyingRequests/buyingRequestSelf`, {
      params: params
    })
  },
  contactNowSendInquiry: function (params) {
    return axios.get(`/contactNowSendInquiry/${params.productsId}`, {
      params: params
    })
  },
  // 获取上传文件uploadToken
  getUploadToken: function (params) {
    return axios.get(`/getUploadToken?t=${(new Date()).valueOf()}`, {
      params: params
    })
  },
  // 获取上传文件的信息
  getFile: function (params) {
    return axios.post(`/getFile?uuid=${params.fileUUIDs[0]}`)
  },
  // sendContactNowMessage
  sendContactNowMessage: function (params) {
    return axios.post(`/message/newMessageSendMore`, params)
  },
  sendQuoteNowMessage: function (params) {
    return axios.post(`/message/newMessageSend`, params)
  },
  getProductRecommend: function (params) {
    return axios.get(`/goods/getProductLastByPlatform`)
  },
  companydetailOverview: function (params) {
    return axios.get(`/company/companyBasic/${params.id}`)
  },
  companyMessageSend: function (params) {
    return axios.post(`/message/newMessageSend`, params)
  },
  // 新闻页列表
  getNewsList (params) {
    return axios.get(`/news/pageArtcle`, {
      params: params
    })
  },

  // 新闻推荐
  getNewsRecommend (params) {
    return axios.get(`/news/listArtcle`, {
      params: params
    })
  },

  // 新闻详情
  getNewsDetail (params) {
    return axios.get(`/news/findArtcle/${params.id}`)
  },

  // 获取用户未读消息
  getUserMsg () {
    return axios.get(`/index/queryMessageCount`)
  },

  // 展会status
  getTradeStatus () {
    return axios.get(`/tradeShow/getBaseData`)
  },

  // 展会列表
  getTradeList (params) {
    return axios.get(`/tradeShow/findTradeShowPageList`, {
      params: params
    })
  },

  // 展会轮播图
  getTradeCarouselList (params) {
    return axios.get(`/news/TradeShowCarouselAd`)
  },

  // 展会详情
  findTradeShowDetail (params) {
    return axios.get(`/tradeShow/findTradeShowDetailById/${params.id}`)
  },

  // 展会详情右侧
  findTradeShowDetailRight () {
    return axios.get(`/tradeShow/findTradeShowListLimit`)
  },

  // 帮助中心侧边栏
  articleAsideList () {
    return axios.get(`/index/article/queryCategory`)
  },

  // 帮助中心内容列表
  articleContentList (params) {
    return axios.get(`/index/article/pageArtcleForHelpCenter`, {
      params: params
    })
  },

  // 帮助中心文章
  findArtcle (params) {
    return axios.get(`/news/findArtcle/${params}`)
  },

  // 反馈信息提交
  insertFeedback (params) {
    return axios.post(`/message/insertFeedback`, params)
  },

  // 登录信息错误三次验证码
  checkVeryfyCode (params) {
    return axios.post(`/checkVeryfyCode`, params)
  },

  // 获取订单页面的价格单位
  priceUnit () {
    return axios.get(`/buyingRequests/getDictonary`)
  },

  // 获取行业分类
  getIndustryType () {
    return axios.get(`/categories/industryList`)
  },

  // 获取行业分类子分类
  getIndustryTypeChild (params) {
    return axios.get(`/categories/chemList`, {
      params: params
    })
  },

  // 提交采购表单
  postBuyRequest (params) {
    return axios.post(`/buyingRequests/save`, params)
  },

  // 下单页面基础数据
  orderBaseData (params) {
    return axios.get(`/placeOrder/getPlaceOrder`, {
      params: params
    })
  },

  // 提交订单
  postOrdreInfo (params) {
    return axios.post(`/placeOrder/createSubmitPlaceOrder`, params)
  },

  // 采购成功页面的商品列表
  getHotProductLast (params) {
    return axios.get(`/goods/getHotProductLast`, {
      params: params
    })
  },

  // 单点登录页面基础信息
  getCountryRegion () {
    return axios.get(`/findBaseData`)
  },

  saveInformation (params) {
    return axios.post(`/doRegister`, params)
  },

  sendEmail (params) {
    return axios.post(`/sendEmail`, params)
  },
  // 前端激活
  doActive (params) {
    return axios.get(`/doActive`, {
      params: params
    })
  },
  // 获取用户消息
  getUserMsg () {
    return axios.get(`/index/queryMessageCount`)
  },
  // 获取首页顶部banner
  getHomeBanners () {
    return axios.get('api/home/impAndExpENBanner', {
      params: {
        'platformCode': '100101'
      }
    })
  },
  // 获取首页推荐供应商数据
  getHomeTradeServices () {
    return axios.get(`/news/tradeServices`)
  },
  // 获取首页推荐供应商数据
  getHomeRecSuppliers () {
    return axios.get(`/index/getTopRecSupList`)
  },
  // 获取首页购买需求左侧搜索关键字
  getHomeBuyingRequestHotKeywords () {
    return axios.get(`/index/findBuyingRequestsCategoryList`)
  },
  // 获取首页购买需求列表数据
  getHomeBuyingRequests () {
    return axios.get(`/news/LatestBuyingRequests`)
  },
  // 获取首页展会数据
  getHomeTradeShows () {
    return axios.get(`/index/getTradeShowsList`)
  },
  // 获取首页新闻数据
  getHomeNews () {
    return axios.get(`/index/getNews`)
  },
  // 获取所有分类数据
  getAllCategory () {
    return axios.get(`/index/findCategoryList`)
  },
  // 获取首页热门分类数据
  getHomeHotCategory () {
    return axios.get(`/goods/hotCategories`)
  },
  // 获取首页选择产品数据
  getHomeSelProducts () {
    return axios.get(`/goods/selectedProducts`)
  },

  // 检查产品是否存在
  checkGood (id) {
    return axios.get(`/goods/goodsIsCheck?goodsId=${id}`)
  },
  // 获取产品搜索选项
  getProductSearchOptions (params) {
    return axios.get(`/search/goodsScreen`, {
      params: params
    })
  },
  // 获取搜索产品
  searchProducts (params) {
    return axios.get(`/search/goods`, {
      params: params
    })
  },
  // 检查产品收藏状态
  productIsFavo (goodsId) {
    return axios.get(`/goods/goodsIsCheck?goodsId=${goodsId}`)
  },
  // 添加或取消产品收藏
  addProductFavo (goodsId, type) {
    return axios.post(`/goods/createCollectionProduct/${goodsId}/${type}`)
  },

  // 获取需求搜索选项
  getRequestSearchOptions (params) {
    return axios.get(`/search/demandScreen`, {
      params: params
    })
  },
  // 搜索需求数据
  searchBuyRequests (params) {
    return axios.get(`/search/demand`, {
      params: params
    })
  },

  // 获取公司搜索选项
  getCompanySearchOptions (params) {
    return axios.get(`/search/companyListScreen`, {
      params: params
    })
  },
  // 搜索公司数据
  searchCompanies (params) {
    return axios.get(`/search/companyGoodsList`, {
      params: params
    })
  },
  // 检查公司收藏状态
  companyIsFavo (compId) {
    return axios.get(`/company/companyFavorite/${compId}`)
  },
  // 添加或取消公司收藏
  addCompanyFavo (compId) {
    return axios.get(`/company/addCompanyFavorite/${compId}`)
  },
  // 判断是否是自己的公司
  isSelfCompany (compId) {
    return axios.get(`/company/companySelf?companyId=${compId}`)
  },
  // 获取服务申请分类
  getServerType (params) {
    return axios.get(`/home/findServiceRequestType`, {
      params:params
    })
  },
   // 新增服务申请
    addServerRequest (params) {
      return axios.post(`/home/insertServiceRequest`, params)
    },
  // 页脚订阅Api
  subscribInfo (params) {
    return axios.post(`/home/subscriptionInformation`, params)
  }
}

const allApis = Object.assign({}, dataApis, zfjApis, ayApis)

if (!process.browser) {
  global.JM_Webapi = allApis
  global.axios = axios
} else {
  window.JM_Webapi = allApis
  window.axios = axios
}

export default axios
