<template>
  <div class="phone">
    <div class="phoneType">
      <span class="text">手机类型：</span>
      <el-select v-model="phoneType" filterable placeholder="请选择" size="large">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="phoneShow">
      <div class="phoneContainer" :style="{ width: myPhone.width + 'px' , height:myPhone.height + 'px' }" ref="phoneShow">
        <img src="../../assets/images/error.svg" alt="">
        fjhghjgjhghjgjhg
      </div>
    </div>
    <div class="phoneOperate">
      <el-button type="primary" @click="look">保存到本地</el-button>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import html2canvas from 'html2canvas'
import { phoneType } from '../../assets/data/phoneType'
import { mapGetters } from 'vuex'
import { getObjByClassName } from '../../assets/js/utils'
// import { icon } from '../../assets/data/mobile'
export default {
  name: 'phone',
  data () {
    return {
      options: phoneType,
      phoneType: '1'
    }
  },
  computed: {
    myPhone: {
      get () {
        return getObjByClassName(this.phoneType, 'value', phoneType)
      },
      set (val) {
        return val
      }
    },
    ...mapGetters([
      'mobileChoose' // 手机参数
    ])
  },
  mounted () {
    console.log(this.myPhone)
  },
  methods: {
    look () {
      html2canvas(this.$refs.phoneShow).then((canvas) => {
        let imgUri = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
        console.log(imgUri)
        window.location.href = imgUri
      })
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../assets/stylus/variable'
.phone
  width 100%
  height 100%
  display flex
  flex-direction column
  padding 20px 0
  box-sizing border-box
  .phoneType
    flex 0 0 50px
    margin-bottom 20px
    .text
      font-size $font-size-normal
  .phoneShow
    flex 1
    display flex
    align-items center
    justify-content center
    .phoneContainer
      background #fff
      border 1px solid #dedede
  .phoneOperate
    flex 0 0 80px
    text-align center
    display flex
    align-items center
    justify-content center
</style>
