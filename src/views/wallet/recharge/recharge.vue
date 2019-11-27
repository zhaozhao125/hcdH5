<template>
  <div class="pay flex-col">
    <div class="choose-money">
      <div class="title">请选择充值金额</div>
      <v-choose-money :hasBonus="true" :moneyList="moneyList" :default-index="0" ref="chooseMoney"></v-choose-money>
    </div>
    <div class="choose-method">
      <div class="title">请选择支付方式</div>
      <!-- <v-radio align="right" title="右对齐" v-model="payMethod" :options="payOptions">
      </v-radio> -->
      <!-- 支付方式切换 -->
      <div class="choose-method-define">
        <div class="v-radiolist">
          <ul>
            <li v-for="(option, index) in payOptions" :key="index">
              <div class="v-radiolist-label" @click="methodsChange(index)">
                <span :class="{'is-right': align === 'right'}"
                      class="v-radio">
                  <input
                    class="v-radio-input"
                    type="radio"
                    v-model="currentValue"
                    :disabled="option.disabled"
                    :value="option.value || option">
                  <span class="v-radio-core" :class="{'active-style': chooseIndex === index}" ></span>
                </span>
                <img v-if="option.icon"
                    :src="imagePath(option.icon)"
                    alt=""
                    class="v-radio-icon">
                <span class="v-radio-label"
                      v-text="option.label || option"></span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="pay-btn">
      <mt-button type="primary" size="large" @click="pay">立即充值</mt-button>
      <p>
        <small>点击“立即充值”即代表您已阅读并同意
          <router-link :to="{name: 'rechargeAgreement'}">《和充电充值协议》</router-link>
        </small>
      </p>
    </div>
  </div>

</template>

<script>
// import vRadio from '@/components/radio'
import vChooseMoney from './components/choose-money.vue'

export default {
  name: 'pay',

  components: {
    // vRadio,
    vChooseMoney
  },

  data() {
    return {
      moneyList: [],
      payMethod: 'alipayMobilePlugin',
      payOptions: [{
        value: 'alipayMobilePlugin',
        label: '支付宝支付',
        icon: 'icon-alp.png'
      }, {
        value: 'weixinpayMobilePlugin',
        label: '微信支付',
        icon: 'icon-wx.png'
      }],
      align: 'right',
      currentValue: 'alipayMobilePlugin',
      // 默认支付方式
      chooseIndex: 0
    }
  },

  computed: {
    payResult() {
      return this.$store.getters.payResult
    }
  },

  mounted() {
    this.$service.getRechargeList().then(res => {
      console.log('====res====', res)
      this.moneyList = res.data.map(item => {
        let ret = {
          money: item.stepAmount
        }
        if (item.content) {
          ret.bonus = item.content
        }
        return ret
      })
    })
  },

  watch: {
    payResult() {
      this.$message.close()
      this.handlePayResult(this.payResult.isSuccess, this.payResult.message)
    }
  },

  methods: {
    imagePath(imgName) {
      return imgName ? require('@/assets/img/' + imgName) : ''
    },
    // 切换支付方式
    methodsChange(index) {
      this.chooseIndex = index
      this.currentValue = this.payOptions[index].value
    },
    pay() {
      let params = {
        amount: this.money || this.$refs.chooseMoney.getMoney(),
        paymentPluginId: this.currentValue,
      }
      console.log(params, 'params')
      this.$service
        .balanceRecharge(params.amount, params.paymentPluginId)
        .then(res => {
          let result = res.data
          let data = result.parameters
          if (this.$bridge) {
            let handlerName =
              params.paymentPluginId == 'alipayMobilePlugin'
                ? 'jsCallPayZFB'
                : 'jsCallPayWX'
            this.$bridge.callHandler(handlerName, data)
            this.$message.alert('正在进行支付...')
          } else {
            this.$toast('支付失败：no bridge')
            this.$message.close()
          }
        })
    },
    handlePayResult(success, message) {
      if (success) {
        this.$toast({
          message: '支付成功',
          iconClass: 'pay-success-icon'
        })
        setTimeout(() => {
          this.$router.go(-1)
        }, 1500)
      } else {
        this.$toast(message || '支付失败')
      }
    }
  }
}
</script>

<style lang="scss">
.choose-method-define{
  li {
    align-items: center;
    display: flex;
    font-size: px2vw(14);
    line-height: 1;
    min-height: inherit;
    overflow: hidden;
    padding: 0 3vw;
    width: 100%;
    min-height: 14vw;
    &:last-of-type {
      border: 0px;
    }
  }
  .v-radiolist-label {
    display: block;
    flex: 1;
  }
  .v-radio-label {
    vertical-align: middle;
    margin-left: 1.6vw;
  }
  .v-radio-icon {
    width: 5.6vw;
    vertical-align: middle;
  }
  .v-radio {
    &.is-right {
      float: right;
    }
    .v-radio-input {
      display: none;
      &:checked {
        +.v-radio-core {
          background-color: $color-main;
          border-color: $color-main;
          &::after {
            border-color: $color-white;
            transform: rotate(45deg) scale(1);
          }
        }
      }
      &[disabled]+.v-radio-core {
        background-color: $color-gray;
        border-color: #ccc;
      }
    }
    .v-radio-core {
      box-sizing: border-box;
      display: inline-block;
      background-color: $color-white;
      border-radius: 100%;
      border: 1px solid #ccc;
      position: relative;
      width: 6vw;
      height: 6vw;
      vertical-align: middle;
      &::after {
        border: 0.6vw solid transparent;
        border-left: 0;
        border-top: 0;
        content: " ";
        position: absolute;
        top: 0.6vw;
        left: 1.8vw;
        width: 1.5vw;
        height: 2.7vw;
        transform: rotate(45deg) scale(0);
        transition: transform .2s;
      }
    }
  }
}


.pay {
  width: 100%;
  height: 100%;
  padding: 2vw;
  .title {
    margin: 3vw 0;
    font-size: 3.7333vw;
    padding-left: 3vw;
  }
  .certain-money {
    text-align: center;
    h3 {
      font-size: 3.5vw;
      margin: 3vw 0 7vw;
      color: $color-gray-light;
    }
    p {
      font-size: 6.25vw;
      margin-bottom: 16vw;
      color: $color-dark;
    }
  }
  .pay-btn {
    margin-top: auto;
    margin-bottom: 2vw;
    button {
      font-size: 4.3vw;
      width: 100%;
    }
    p {
      font-size: px2vw(10);
      margin-top: 1vw;
      color: $color-gray-light;
      text-align: center;
    }
    a {
      color: $color-main;
    }
  }
}
</style>
