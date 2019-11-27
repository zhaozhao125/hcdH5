<template>
  <div class="apply-invoice pd-4 flex-col">
    <section>
      <h2>发票类型</h2>
      <div class="select-box">
        <div class="select-item active">电子发票</div>
      </div>
      <p class="fz-12 color-gray-light mt-3">目前仅支持开具电子发票，电子发票与纸质发票具有同等法律效力，可支持报销入账</p>
    </section>
    <section class="invoice-info">
      <h2>发票信息</h2>
      <div class="select-box">
        <div class="select-item" :class="{active: activeTab=='company'}" @click="activeTab='company'">企业发票</div>
        <div class="select-item" :class="{active: activeTab=='personal'}" @click="activeTab='personal'">个人发票</div>
      </div>
      <mt-tab-container v-model="activeTab" :swipeable="false">
        <mt-tab-container-item id="company">
          <div class="form">
            <mt-field label="发票抬头" placeholder="请输入发票抬头" v-model="invoiceTitle"></mt-field>
            <mt-field label="识别号:" placeholder="请填写纳税人识别号" v-model="taxNumber"></mt-field>
            <mt-field label="发票内容:" :value="content" readonly disableClear class="invoice-content"></mt-field>
            <mt-field label="发票金额:" readonly disableClear class="invoice-money">
              <p class="color-gray-light"><span class="color-main">{{invoiceMoney|moneyFilter}}</span>元</p>
            </mt-field>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="personal">
          <div class="form">
            <mt-field label="发票抬头" placeholder="请填写单位名称" v-model="invoiceTitle"></mt-field>
            <mt-field label="发票内容:" :value="content" readonly disableClear class="invoice-content"></mt-field>
            <mt-field label="发票金额:" readonly disableClear class="invoice-money">
              <p class="color-gray-light"><span class="color-main">{{invoiceMoney|moneyFilter}}</span>元</p>
            </mt-field>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>

    </section>
    <section>
      <h2 style="margin-bottom:0">接收方式</h2>
      <div class="form">
        <mt-field label="电子邮箱" placeholder="用于发送电子发票" v-model="email"></mt-field>
      </div>
    </section>
    <mt-button class="submit-btn" type="primary" size="large" :disabled="btnDisabled" @click="handleSubmit">提交</mt-button>
  </div>
</template>

<script>
import { Field, TabContainer, TabContainerItem } from 'mint-ui'
export default {
  components: {
    mtField: Field,
    mtTabContainer: TabContainer,
    mtTabContainerItem: TabContainerItem
  },
  data() {
    return {
      invoiceTitle: '', // 发票抬头
      taxNumber: '', // 识别号
      invoiceMoney: 0, // 发票金额
      email: '', // 电子邮箱
      activeTab: 'company', // 发票类型tab,
      orderIds: null,
      content: ''
    }
  },

  computed: {
    btnDisabled() {
      if (!this.invoiceTitle || !this.email) {
        return true
      }
      if (this.activeTab == 'company' && !this.taxNumber) {
        return true
      }
      return false
    }
  },

  created() {
    console.log('====route====', this.$route.params)
    this.orderIds = this.$route.params.orderIds
    this.content = this.$route.params.content
    this.invoiceMoney = this.$route.params.money
  },

  methods: {
    handleSubmit() {
      if (!this.invoiceTitle) {
        this.$toast('请输入发票抬头')
        return
      }
      if (!this.email) {
        this.$toast('请输入电子邮箱')
        return
      }
      let params = {
        orderIds: this.orderIds.join(','),
        type: 'electronic',
        orderType: 'personal',
        titleType: this.activeTab,
        money: this.invoiceMoney,
        title: this.invoiceTitle,
        content: '充电服务费',
        email: this.email
      }
      if (this.activeTab == 'company') {
        if (!this.taxNumber) {
          this.$toast('请输入识别号')
          return
        }
        params.taxNumber = this.taxNumber
      }
      this.$service.submitInvoice(params).then(res => {
        console.log('====res====', res)
        this.$message.alert('开票成功')
        this.$router.go(-1)
        setTimeout(() => {
          this.$router.replace({
            name: 'invoiceHistory'
          })
        }, 500)
      }).catch(err => {

      })
    }
  }
}
</script>

<style lang="scss">
@import '@/views/invoice/invoice.scss';
.apply-invoice {
  @include invoice;
  .submit-btn {
    margin-top: auto;
  }
}
</style>
