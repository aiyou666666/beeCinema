export default {
  contactInfo: {
    servicePhone: '400-990-3311',
    workingTime: '（周一至周五 9:00~17:00）',
    fax: '0571-87359367',
    email: 'customer_global@jumore.com'
  },
  baseinfo: {
    // 总站平台code
    platformCode: 100101,
    // 总站平台Id
    platformId: 12,
    enSiteHost:'https://www.jumoreglobal',
    // 当前网站url
    siteUrl: 'https://www.jumoreglobal.com',
    // 中文站url
    cnSiteUrl: 'https://www.jumore.com',
    cnServerSiteUrl: [
      'https://servicecn.jumoreglobal.{}/suppliers', // 外综服务
      'https://servicecn.jumoreglobal.{}/advancedMembers', // 高级会员
      'https://servicecn.jumoreglobal.{}/exhibition',//营销推广
      'https://servicecn.jumoreglobal.{}/entCertifacation'
    ],
    // 总站英文文服务平台
    enServerSiteUrl: [
      'https://service.jumoreglobal.{}/premiumMembership',
      'https://service.jumoreglobal.{}/advertisingService',
      'https://service.jumoreglobal.{}/targetMarketing',
      'https://service.jumoreglobal.{}/enterpriseCertification'
    ],
    top500Url: 'https://top500.jumoreglobal.{}/'
  },
  // 平台code
  constantCode: {
    // 煤炭平台标识
    CONSTANT_COAL_DATA: 100701,
    // 有色平台标识
    CONSTANT_FERROUS_DATA: 100301,
    // 矿产平台标识 
    CONSTANT_MINERAL_DATA: 100901,
    // 农产品平台标识 
    CONSTANT_AGRICULTURE_DATA: 101001,
    // 钢材平台标识
    CONSTANT_STEEL_DATA: 100801,
    // 消费品平台标识 
    CONSTANT_CONSUMABLE_DATA: 101201,
    // 食品平台标识
    CONSTANT_FOOD_DATA: 101401,
    // 工业品平台标识
    CONSTANT_INDUSTRIAL_DATA: 101101,
    // 机械品平台标识
    CONSTANT_MECHANICS_DATA: 101301,
    // 石油平台标识
    CONSTANT_PETRO_DATA: 102201,
    // 化工平台标识
    CONSTANT_CHEM_DATA: 100201,
    // 总站平台标识
    CONSTANT_MALL_DATA: 100101
  },
  contantID: {
    // 煤炭平台ID
    CONSTANT_COAL_ID: 1,
    // 有色平台ID
    CONSTANT_FERROUS_ID: 2,
    // 矿产平台ID 
    CONSTANT_MINERAL_ID: 3,
    // 农产品平台ID
    CONSTANT_AGRICULTURE_ID: 4,
    // 钢材平台ID
    CONSTANT_STEEL_ID: 5,
    // 消费品平台ID
    CONSTANT_CONSUMABLE_ID: 6,
    // 食品平台ID
    CONSTANT_FOOD_ID: 7,
    // 工业品平台ID
    CONSTANT_INDUSTRIAL_ID: 8,
    // 机械品平台ID
    CONSTANT_MECHANICS_ID: 9,
    // 化工平台ID
    CONSTANT_CHEM_ID: 10,
    // 石油平台ID
    CONSTANT_PETRO_ID: 11,
    // 总站平台ID
    CONSTANT_MALL_ID: 12
  },
  shareUrl: {
    facebook: 'https://www.facebook.com/JumoreOfficial',
    twitter: 'https://www.twitter.com/JumorePlatform',
    youtube: 'https://www.youtube.com/channel/UCIvE6FRXEGK1VoOLFQgc8bw',
    linkin: 'https://www.linkedin.com/in/jumore'
  }
}
