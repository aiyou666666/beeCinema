<template>
    <nuxt-link v-check-link="link" v-if="!isOutLink" :to="{ path: `${linkC}`}" >
      <slot></slot>
    </nuxt-link>   
    <a v-else :href="linkC" v-check-link="link" >
       <slot></slot>
    </a>

</template>

<script>
  export default {
    props: ['link'],
    // data () {
    //   return {
    //   }
    // },
    // methods: {
    // },
    // mounted () {
    // },
    computed: {
      isLink () {
        return this.link !== undefined // link 有可能是null或者''
      },
      isOutLink () {
        // console.log(/^(http:\/\/|https:\/\/)/.test('http://ww.baid.com'))
  
        return /^(http:\/\/|https:\/\/|www\.)/.test(this.link)
      },
      linkC () {
        if (/^(www\.)/.test(this.link)) {
          return '//' + this.link
        } else {
          return this.link
        }
      }
  
    }
  
  }
</script>

<style lang="scss" type="text/scss">
</style>
