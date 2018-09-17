/* eslint-disable */

// 旧的谷歌统计代码
// export default ({ app }) => {
//   /*
//   ** Only run on client-side and only in production mode
//   */
//   if (process.env.NODE_CONFIG !== 'prod') return
//   /*
//   ** Include Google Analytics Script
//   */
//   (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
//   (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
//   m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
//   })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
//   /*
//   ** Set the current page
//   */
//   ga('create', 'UA-60144933-23', 'auto')
//   /*
//   ** Every time the route changes (fired on initialization too)
//   */
//   app.router.afterEach((to, from) => {
//     /*
//     ** We tell Google Analytics to add a `pageview`
//     */
//     ga('set', 'page', to.fullPath)
//     ga('send', 'pageview')
//   })
// }


export default ({ app }) => {
  /*
  ** Only run on client-side and only in production mode
  */
  if (process.env.NODE_CONFIG !== 'prod') return
  /*
  ** Include Google Analytics Script
  */
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.googletagmanager.com/gtag/js?id=UA-92017020-1','ga');
  /*
  ** Set the current page
  */
  window.dataLayer = window.dataLayer || []
  function gtag(){dataLayer.push(arguments)}
  gtag('js', new Date())

  gtag('config', 'UA-92017020-1')
  /*
  ** Every time the route changes (fired on initialization too)
  */
  app.router.afterEach((to, from) => {
    /*
    ** We tell Google Analytics to add a `pageview`
    */
    // gtag('set', 'page', to.fullPath)
    // gtag('event', 'page_view')
  })
}