<template>
  <div class="admin">
    <div class="phoneBox">
      <phone></phone>
    </div>
    <div class="chooseBox">
      <div class="mobileBox">
        <mobileChoose></mobileChoose>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import Phone from '../../base/phone/phone'// 手机组件
import MobileChoose from '../../base/mobileChoose/mobileChoose'
export default {
  name: 'wechat',
  data () {
    return {
    }
  },
  components: {
    Phone,
    MobileChoose
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../assets/stylus/variable'
.admin
  display flex
  width 100%
  .phoneBox
    flex 0 0 500px
    box-sizing border-box
    padding 0  30px
    border-right 1px solid #dedede
    display flex
    justify-content center
    align-items center
  .chooseBox
    flex 1
    .mobileBox
      border 1px solid #dedede
</style>
