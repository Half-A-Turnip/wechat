<template>
  <div class="phone">
    <div class="ceshi">
      <div class="text">实时数据显示</div>
      <div class="line">时间：{{mobileChoose.time}}</div>
      <div class="line">信号：{{mobileChoose.signal}}</div>
      <div class="line">网络：{{mobileChoose.network}}</div>
      <div class="line">运营商：{{mobileChoose.operator}}</div>
      <div class="line">电量：{{mobileChoose.quantity}}</div>
      <div class="line">是否显示充电：{{mobileChoose.quantityList&&mobileChoose.quantityList.indexOf('isShowQuantity')!=-1}}</div>
      <div class="line">是否显示电量：{{mobileChoose.quantityList&&mobileChoose.quantityList.indexOf('isAddQuantity')!=-1}}</div>
      <div class="line">当前图标：{{mobileChoose.icon}}</div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
// import { icon } from '../../assets/data/mobile'
export default {
  name: 'phone',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'mobileChoose'
    ])
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
