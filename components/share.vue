<template>
    <div class="share">
        <a class="jiathis_button_fb" :href="shareData.facebook" target="_blank" title="Facebook"></a>
        <a class="jiathis_button_twitter" :href="shareData.twitter" target="_blank" title="Twitter"></a>
        <a class="jiathis_button_pinterest" :href="shareData.pinterest" target="_blank" title="Pinterest"></a>
        <a class="jiathis_button_linkedin" :href="shareData.linkedin" target="_blank" title="LinkedIn"></a>
    </div>
</template>

<script>
export default {
  data () {
    return {
      shareData: {}
    }
  },
  mounted () {
    var share = {
      title: '',
      url: encodeURIComponent(location.href),
      desc: ''
    }
    share.title = encodeURIComponent(document.title)
    share.desc = encodeURIComponent(document.querySelector('[data-hid="description"]').content)

    share.facebook = this.$filter.shareLinks('facebook', share)
    share.linkedin = this.$filter.shareLinks('linkedin', share)
    share.twitter = this.$filter.shareLinks('twitter', share)
    share.pinterest = this.$filter.shareLinks('pinterest', share)

    this.shareData = share
  }
}
</script>

<style lang="scss" type="text/scss">
.share {
  a{
    width: 18px;
    height: 18px;
    display: inline-block;
    margin-right: 8px;
  }
  .jiathis_button_fb{
    background:url(~assets/img/icon/share-fa.png) no-repeat;
    &:hover{
      background:url(~assets/img/icon/share-fa-active.png) no-repeat;
    }
  }
  .jiathis_button_twitter{
    background:url(~assets/img/icon/share-tw.png) no-repeat;
    &:hover{
      background:url(~assets/img/icon/share-tw-active.png) no-repeat;
    }
  }
  .jiathis_button_pinterest{
    background:url(~assets/img/icon/share-pn.png) no-repeat;
    &:hover{
      background:url(~assets/img/icon/share-pn-active.png) no-repeat;
    }
  }
  .jiathis_button_linkedin{
    background:url(~assets/img/icon/share-in.png) no-repeat;
    &:hover{
      background:url(~assets/img/icon/share-in-active.png) no-repeat;
    }
  }
  
}
</style>



