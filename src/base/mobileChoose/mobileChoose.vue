<template>
  <div class="mobileChoose">
    <div class="text">一.手机参数</div>
    <div class="box">
      <span class="name">1.当前时间:</span>
      <el-time-picker v-model="mobile.time" placeholder="任意时间点" value-format="HH:mm">
      </el-time-picker>
      <span class="margin"></span>
      <span class="name">2.当前信号：</span>
      <el-select v-model="mobile.signal" placeholder="请选择">
        <el-option v-for="(item,index) in signal" :key="index" :label="item" :value="item">
        </el-option>
      </el-select>
      <span class="margin"></span>
      <span class="name">3.当前网络：</span>
      <el-select v-model="mobile.network" placeholder="请选择">
        <el-option v-for="item in network" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <span class="margin"></span>
      <span class="name">4.当前运营商：</span>
      <el-select v-model="mobile.operator" placeholder="请选择">
        <el-option v-for="(item,index) in operator" :key="index" :label="item" :value="item">
        </el-option>
      </el-select>
    </div>
    <div class="box">
      <span class="name">5.当前电量：{{mobile.quantity}}%</span>
      <el-slider v-model="mobile.quantity"></el-slider>
      <el-checkbox-group v-model="mobile.quantityList">
        <el-checkbox :label="isShowQuantity">是否显示充电</el-checkbox>
        <el-checkbox :label="isAddQuantity">是否显示电量</el-checkbox>
      </el-checkbox-group>
    </div>
    <div class="box">
      <span class="name margin-bottom">6.当前图标</span>
      <el-checkbox-group v-model="mobile.icon">
        <el-checkbox :label="item.value" v-for="(item,index) in icon" :key="index">{{item.label}}</el-checkbox>
      </el-checkbox-group>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapGetters, mapActions } from 'vuex'
import { isShowQuantity, isAddQuantity, network, icon, operator, signal } from '../../assets/data/mobile'
export default {
  name: 'mobileChoose',
  data () {
    return {
      mobile: {
        time: '14:46',
        quantity: 100,
        quantityList: [],
        signal: [],
        network: [],
        font: ['苹果字体'],
        icon: [],
        operator: []
      },
      // 是否显示电量
      isShowQuantity: isShowQuantity,
      // 是否充电
      isAddQuantity: isAddQuantity,
      // 信号
      signal: signal,
      // 网络
      network: network,
      // 运营商
      operator: operator,
      // 图标
      icon: icon
    }
  },
  computed: {
    ...mapGetters(['mobileChoose'])
  },
  watch: {
    mobile: {
      handler (newVal, oldVal) {
        let obj = Object.assign({}, this.mobileChoose, newVal)
        this.setMobileChoose(obj)
      },
      deep: true
    }
  },
  methods: {
    ...mapActions([
      'setMobileChoose'
    ])
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../assets/stylus/variable'
.mobileChoose
  box-sizing border-box
  padding 20px
  .text
    font-size $font-size-big
    color $bg-small
  .box
    box-sizing border-box
    padding 20px
    .margin
      width 20px
      display inline-block
    .name
      font-size $font-size-normal
      color $bg-small
      &.margin-bottom
        margin-bottom 20px
        display inline-block
</style>
G
