<template>
  <div class="choose-money">
    <ul class="flex-row flex-wrap">
      <li v-for="(item, index) in moneyList" :class="size" :key="index">
        <div class="money text-center" @click="selectMoney(index)" :class="{active: index == currentMoneyIndex}">
          <div class="money-with-bonus width-100 height-100 flex-col align-items-center justify-content-center" v-if="hasBonus">
            <p class="original-money fz-18">{{item.money}}元</p>
            <p class="bonus-money fz-10 color-gray" v-if="item.bonus">{{item.bonus}}</p>
          </div>
          <div class="money-normal width-100 fz-18" v-else>
            {{item}}元
          </div>
        </div>
      </li>
      <li v-if="customizable" :class="size">
        <div class="custom-money position-relative width-100 text-center fz-15 rounded-0" :class="{active: currentMoneyIndex == -1}">
          <input type="number" v-model="customMoney" @focus="handleFocusCustom" @blur="handleBlurCustom" class="plain-input display-block opacity-0 position-absolute left-0 right-0 width-100 height-100 text-center fz-15" placeholder="其它金额" :class="{focused: focused}">
          <div v-if="hasBonus" class="custom-money-bonus">
            <div v-if="customMoney" class="money text-center">
              <div class="money-with-bonus width-100 height-100 flex-col align-items-center justify-content-center" v-if="customMoney>=100">
                <p class="original-money fz-15">{{customMoney}}元</p>
                <p class="bonus-money fz-10 color-gray">{{bonusMoney}}</p>
              </div>
              <div class="money-normal width-100" v-else>
                {{customMoney}}元
              </div>
            </div>
            <span v-else>其他</span>
          </div>
          <div v-else class="custom-money-text">
            <span v-if="customMoney">{{customMoney}}</span>
            <span v-else>其他</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {

  name: 'choose-money',

  props: {
    // 可供选择的金额列表
    moneyList: {
      type: Array,
      default: () => []
    },
    // 是否支持自定义金额
    customizable: {
      type: Boolean,
      default: true
    },
    // 选择方格的大小
    size: {
      type: String,
      default: 'normal'
    },
    // bonus
    hasBonus: {
      type: Boolean,
      default: false
    },
    defaultIndex: {
      type: Number,
      default: 0
    }
  },

  created() {
    if (this.defaultIndex) {
      this.currentMoneyIndex = this.defaultIndex
    }
  },

  data() {
    return {
      currentMoneyIndex: 0,
      customMoney: '',
      tmpIndex: 0,
      focused: false
    }
  },

  computed: {
    bonusMoney() {
      if (!this.customMoney) {
        return 0
      }
      for (let index = 1; index < this.moneyList.length; index++) {
        if (this.customMoney < this.moneyList[index].money) {
          return this.moneyList[index - 1].bonus
        }
      }
      return this.moneyList[this.moneyList.length - 1].bonus
    }
  },

  filters: {
    moneyFilter(value) {
      if (isNaN(value)) {
        return 0
      }
      return Number(value).toFixed(2)
    }
  },

  methods: {
    selectMoney(index) {
      this.currentMoneyIndex = index
      this.customMoney = ''
      this.$emit('change', this.getMoney())
    },
    handleFocusCustom() {
      this.focused = true
      this.$emit('focusMoney')
      if (this.currentMoneyIndex > -1) {
        this.tmpIndex = this.currentMoneyIndex
      }
      this.currentMoneyIndex = -2
    },
    handleBlurCustom() {
      this.focused = false
      let moneyReg = /^(([1-9]\d*)|0)(\.\d{1,2})?$/
      if (this.customMoney && String(this.customMoney).length <= 8 && !isNaN(this.customMoney) && this.customMoney > 0 && moneyReg.test(this.customMoney)) {
        this.currentMoneyIndex = -1
      } else {
        if (this.customMoney) {
          if (String(this.customMoney).length > 8) {
            this.$toast('金额最多为8位数')
          } else {
            this.$toast('您输入的金额不正确')
          }
        }
        // if (this.customMoney !== '') {
        this.customMoney = 0
        this.$nextTick(() => {
          this.customMoney = ''
        })
        // }
        this.currentMoneyIndex = this.tmpIndex
      }
      this.$emit('blurMoney')
      this.$emit('change', this.getMoney())
    },
    getMoney() {
      if (this.currentMoneyIndex == -1) {
        return this.customMoney
      }
      if (this.hasBonus) {
        return this.moneyList[this.currentMoneyIndex].money
      }
      return this.moneyList[this.currentMoneyIndex]
    }
  }
}
</script>
<style lang="scss">
$boxHeight: px2vw(60);
.choose-money {
  ul {
    li {
      width: 50%;
      padding: 1vw;
      &.small {
        width: 33.33%;
      }
      .money {
        height: $boxHeight;
        background-color: #eee;
        font-size: 4vw;
        &.active {
          @include main-bg;
          color: #fff;
          box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
          .bonus-money{
            color: #fff;
          }
        }
        .money-normal {
          line-height: $boxHeight;
        }
      }
      .custom-money {
        height: $boxHeight;
        background-color: #eee;
        border: 1px solid transparent;
        &.active {
          @include main-bg;
          color: #fff;
          .bonus-money{
            color: #fff;
          }
          .custom-money-bonus{
            .money{
              background-color: transparent;
            }
          }
        }
        .custom-money-text {
          line-height: $boxHeight;
        }
        .custom-money-bonus {
          > span {
            line-height: $boxHeight;
          }
        }
        input {
          &::-webkit-input-placeholder {
            color: $color-dark;
          }
          &:focus::-webkit-input-placeholder {
            color: transparent;
            visibility: hidden;
            display: none;
          }
          &:focus {
            opacity: 1;
            background-color: $color-white;
            color: $color-dark;
          }
          &.focused {
            opacity: 1;
            background-color: $color-white;
            color: $color-dark;
          }
        }
      }
    }
  }
}
</style>
