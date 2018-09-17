<template>
    <div class="overbox" :style="{'display':visible?'block':'none'}">
        <div class="overbox-head">
            <h3>Set Industry<span> Product will be displayed in corresponding platform</span></h3>
            <span @click="close">×</span>
        </div>
        <div class="overbox-list">
            <ul>
                <li v-for="item in industryType" :key="item.industryId" :class="{'active':typeChecked == item.industryId}" @click="getIndustry(item.industryId)">{{ item.name }}</li>
            </ul>
        </div>
        <div class="overbox-list">
            <ul>
                <li v-for="(item,index) in industryChildA" :class="{'active':typeCheckedA == index}" :key="item.goodsCateId" @click="getIndustryChild1(index)">{{ item.goodsCateName }}</li>
            </ul>
        </div>
        <div class="overbox-list">
            <ul ref="child2">
                <li v-for="(itemChilds,index) in industryChildB" :key="itemChilds.goodsCateId" @click="getIndustryChild2(index)">{{ itemChilds.goodsCateName }}</li>
            </ul>
        </div>
        <div class="overbox-list" v-show="showChild && industryChildC.length > 0">
            <ul ref="child3">
                <li v-for="(itemChild,index) in industryChildC" :key="itemChild.goodsCateId" @click="getIndustryChild3(index)">{{ itemChild.goodsCateName }}</li>
            </ul>
        </div>
        <div class="overbox-foot">
            <span>Please contact us if you can't find your industry.</span>
            <button @click.prevent="close()">Cancel</button> 
            <button @click.prevent="selectIndustry()">Select</button>   
        </div>                                       
    </div>
</template>
<script>
    export default{
      data () {
        return {
          typeChecked: 10,
          typeCheckedA: 0,
          showChild: false,
          industryChildA: [],
          industryChildB: [],
          industryChildC: [],
          industryId: '',
          topCatgoryId: '',
          secondLevelCategoryId: '',
          thirdLevelCategoryId: '',
          industryIdText: '',
          topCatgoryIdText: '',
          secondLevelCategoryIdText: '',
          thirdLevelCategoryIdText: ''
        }
      },
      props: ['visible', 'industryType'],
      methods: {
        async getIndustry (id) {
          id ? this.typeChecked = id : this.typeChecked
          let res = await JM_Webapi.getIndustryTypeChild({industryId: this.typeChecked})
          this.industryChildA = res.data
          this.industryChildB = this.industryChildA[0].leaveOneChild ? this.industryChildA[0].leaveOneChild : []
          this.industryChildC = this.industryChildB.length > 0 && this.industryChildB[0].leaveTwoChild ? this.industryChildB[0].leaveTwoChild : []
          // 分类的id,name
          this.industryId = this.typeChecked
          this.topCatgoryId = this.industryChildA[0].goodsCateId
          this.industryIdText = this.industryType[this.typeChecked - 1].name
          this.topCatgoryIdText = this.industryChildA[0].goodsCateName
          this.$root.$emit('defaulOverBox',[`${this.industryIdText}>${this.topCatgoryIdText}`, this.industryId, this.topCatgoryId])
          // 重置默认
          this.typeCheckedA = 0
          this.secondLevelCategoryId = ''
          this.thirdLevelCategoryId = ''
          this.secondLevelCategoryIdText = ''
          this.thirdLevelCategoryIdText = ''
        },
        getIndustryChild1 (id) {
          this.showChild = false
          this.typeCheckedA = id
          this.industryChildB = this.industryChildA[id].leaveOneChild ? this.industryChildA[id].leaveOneChild : []
          // 分类的id,name
          this.topCatgoryId = this.industryChildA[id].goodsCateId
          this.topCatgoryIdText = this.industryChildA[id].goodsCateName
          // 重置默认
          for(let ele of this.$refs.child2.children){
            ele.className = ''
          }
          this.secondLevelCategoryId = ''
          this.thirdLevelCategoryId = ''
          this.secondLevelCategoryIdText = ''
          this.thirdLevelCategoryIdText = ''
        },
        getIndustryChild2 (id) {
          for(let ele of this.$refs.child3.children){
            ele.className = ''
          }
          for(let ele of this.$refs.child2.children){
            ele.className = ''
          }
          this.$refs.child2.children[id].className = 'active'
          this.showChild = true
          this.industryChildC = this.industryChildB.length > 0 && this.industryChildB[id].leaveTwoChild ? this.industryChildB[id].leaveTwoChild : []
          // 分类的id
          this.secondLevelCategoryId = this.industryChildB[id].goodsCateId
          this.secondLevelCategoryIdText =  this.industryChildB[id].goodsCateName 

          this.thirdLevelCategoryId = ''
          this.thirdLevelCategoryIdText = ''
        },
        getIndustryChild3 (id) {
          for(let ele of this.$refs.child3.children){
            ele.className = ''
          }
          this.$refs.child3.children[id].className = 'active'
          this.thirdLevelCategoryId = this.industryChildC[id].goodsCateId
          this.thirdLevelCategoryIdText = this.industryChildC[id].goodsCateName
          console.log(`${this.industryIdText}>${this.topCatgoryIdText}>${this.secondLevelCategoryIdText}>${this.thirdLevelCategoryIdText}`)
        },
        close () {
          this.$emit('updata:visible', false)
        },
        selectIndustry () {
          this.$emit('selectedIndustry', [this.selectIndustryAll, this.industryId, this.topCatgoryId, this.secondLevelCategoryId, this.thirdLevelCategoryId])
          this.$emit('updata:visible', false)
        }
      },
      mounted () {
        this.getIndustry()
      },
      computed: {
        selectIndustryAll () {
          return `${this.industryIdText}>${this.topCatgoryIdText}>${this.secondLevelCategoryIdText}>${this.thirdLevelCategoryIdText}`
        }
      }
    }
</script>
<style lang="scss" rel="stylesheet">
.overbox{
    display: none;
    position: absolute;
    z-index: 20;
    top: 38px;
    left: 220px;
    background: #fff;
    border: 1px solid #e5e5e5;
    padding: 12px;
    box-shadow: 2px 2px 5px #969696;
    .overbox-head{
        border-bottom: 1px solid #ddd;
        line-height: 45px;
        &::after{
            content: '';
            display: table;
            clear: both;
        }
        h3{
            float: left;
            font-weight: 700;
            font-size: 16px;
            color: #666;
            span{
                font-weight: 400;
                color: #999;
                line-height: 45px;
                font-size: 14px;
                margin-left: 5px;
            }
        }
        span{
            float: right;
            font-size: 36px;
            cursor: pointer;
            line-height: 20px;
        }
    }
    .overbox-list{
        overflow-y: auto;
        width: 200px;
        height: 275px;
        margin-top: 20px;
        float: left;
        border: 1px solid #e5e5e5;
        margin-right: 20px;
        ul{
            padding: 5px;
            li{
                line-height: 24px;
                cursor: pointer;
                ul{
                    padding: 0;
                }
                &.active{
                    background: #7b7070;
                    color: #fff;
                }
            }
        }
    }
    .overbox-list:nth-last-child(2){
        margin-right: 0;
    }
    .overbox-foot{
        clear: both;
        line-height: 40px;
        span{
            font-size: 12px;
            color: #ff741a; 
        }
        button{
            background: #999;
            width: 100px;
            height: 30px;
            border: none;
            float: right;
            margin-top: 10px;
            color: #fff;
            border-radius: 4px;
            &:last-child{
                background: #269beb;
                margin-right: 25px; 
            }
        }
    }
}
</style>