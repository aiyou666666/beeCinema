<template>
    <nuxt-link v-check-link="link" v-if="isLink && !isOutLink" class="img-box" target="_blank" :to="{ path: `${link}`}" :style="bg">
       <img :src="$filter.imgCdn(src)" :alt="title" :title="title" />
    </nuxt-link>
    <a v-else-if="isLink && isOutLink" class="img-box" target="_blank" :href="link" v-check-link="link" :style="bg">
       <img :src="$filter.imgCdn(src)" :alt="title" :title="title" />
    </a>
    <div v-else class="img-box" :style="bg">
        <img :src="$filter.imgCdn(src)" :title="title" alt="title" />
    </div>
</template>

<script>
  export default {
    props: ['link', 'src', 'title'],
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
        return /^(http:\/\/|https:\/\/)/.test(this.link)
      },
      bg () {
        return !this.src ? {'background-color': '#D8D8D8'} : ''
      }
    }
  
  }
</script>

<style lang="scss" type="text/scss">
</style>
