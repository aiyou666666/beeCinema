<template>
    <div class="industry">
        <div @click="visible = !visible">
            <el-input placeholder="Please select platform(s) index your Company" readonly v-model="choseResult" class="el-icon-caret-top" :class="{'isreverse': visible}"></el-input>
        </div>
        <transition name="fade">
            <div class="scroll-bar" v-show="visible">
                <ul>
                    <li v-for="item in industryData">
                        <el-checkbox :true-label="item.platformName" ref="platform">{{item.platformName}}</el-checkbox>
                        <a v-if="linkShow" :href="'https://www.'+item.platformUrl" target="_blank">{{':' + item.platformUrl}}</a>
                    </li>
                    <li class="text-center">
                        <el-button @click="result" type="primary">confirm</el-button>
                        <el-button @click="visible = false" type="primary">concel</el-button>
                    </li>
                </ul>
            </div>
        </transition>
    </div>
</template>
<script>
    export default{
      data () {
        return {
          visible: false,
          choseResult: ''
        }
      },
      props: {
        industryData: {
          type: Array
        },
        linkShow: {
          type: String
        }
      },
      methods: {
        result () {
          let result = ''
          let platId = ''
          let industryId = []
          this.$refs.platform.map((item, index) => {
            if (item.isChecked) {
              result += item.trueLabel + ','
              platId = this.industryData.filter(ele => ele.platformName === item.trueLabel)
              industryId.push(platId[0].platformId)
            }
          })
          this.choseResult = result.substr(0, result.lastIndexOf(','))
          this.$emit('choseResult', industryId)
          this.visible = false
        }
      }
    }
</script>
<style lang="scss" rel="stylesheet">
.industry{
    .fade-enter-active, .fade-leave-active {
        transition: opacity 0.5s
    }
    .fade-enter, .fade-leave-to {
        opacity: 0
        
    }
    .el-input__inner{
        cursor: pointer;
    }
    .el-icon-caret-top:before{
        position: absolute;
        top: 10px;
        right: 10px;
        color: #d9c4bf;
        font-size: 12px;
        transform: rotate(180deg);
        transition: transform 0.3s;
    }
    .el-icon-caret-top.isreverse:before{
        transform: rotate(360deg);
    }
    .scroll-bar{
        width: 100%;
        position: absolute;
        min-height: 36.5px;
        background: #fff;
        box-shadow: 0 2px 4px rgba(0,0,0,.12), 0 0 6px rgba(0,0,0,.04);
        z-index: 2019;
        margin: 5px 0;
        border: 1px solid #e5d5d1;
        border-radius: 2px;
        ul{
            padding: 6px 0;
            li{
                padding: 0px 10px;
                color: #6a5048;
                a{
                    color: #f64f38; 
                }
            }
        }
        
    }
}
</style>