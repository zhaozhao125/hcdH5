<template>
  <div class="invoice-detail pd-4">
    <section>
      <h2>发票类型</h2>
      <div class="select-box">
        <div class="select-item">电子发票</div>
      </div>
      <p class="fz-12 color-gray-light mt-3">目前仅支持开具电子发票，电子发票与纸质发票具有同等法律效力，可支持报销入账</p>
    </section>
    <section class="invoice-info">
      <h2>发票信息</h2>
      <div class="select-box">
        <div class="select-item" v-if="invoiceType == 'company'">企业发票</div>
        <div class="select-item" v-if="invoiceType == 'personal'">个人发票</div>
      </div>
      <div class="form" v-if="invoiceType == 'company'">
        <mt-field label="发票抬头" :value="invoiceTitle" readonly></mt-field>
        <mt-field label="识别号:" :value="taxNumber" readonly></mt-field>
        <mt-field label="发票内容:" :value="content" readonly></mt-field>
        <mt-field label="发票金额:" readonly disableClear class="invoice-money">
          <p class="color-gray-light"><span class="color-main">{{invoiceMoney|moneyFilter}}</span>元</p>
        </mt-field>
        <mt-field label="申请时间:" :value="applyTime | timeFilter('week')" readonly></mt-field>
      </div>
      <div class="form" v-if="invoiceType == 'personal'">
        <mt-field label="发票抬头" :value="invoiceTitle" readonly></mt-field>
        <mt-field label="发票内容:" :value="content" readonly></mt-field>
        <mt-field label="发票金额:" readonly disableClear class="invoice-money">
          <p class="color-gray-light"><span class="color-main">{{invoiceMoney|moneyFilter}}</span>元</p>
        </mt-field>
        <mt-field label="申请时间:" :value="applyTime | timeFilter('week')" readonly></mt-field>
      </div>

    </section>
    <section>
      <h2 style="margin-bottom:0">接收方式</h2>
      <div class="form">
        <mt-field label="电子邮箱" placeholder="用于发送电子发票" v-model="email"></mt-field>
      </div>
    </section>
  </div>
</template>

<script>
import { Field } from 'mint-ui'
export default {
  components: {
    mtField: Field,
  },
  data() {
    return {
      invoiceType: 'company',
      invoiceTitle: '',
      taxNumber: '',
      content: '',
      invoiceMoney: '',
      email: '',
      applyTime: ''
    }
  },

  created() {
    this.$service.getInvoiceDetail(this.$route.query.sn).then(res => {
      console.log('====res====', res)
      this.invoiceType = res.data.titleType
      this.invoiceTitle = res.data.title
      this.taxNumber = res.data.taxNumber
      this.content = res.data.content
      this.invoiceMoney = res.data.money
      this.email = res.data.email
      this.applyTime = res.data.applyTime
    })
  }
}
</script>

<style lang="scss">
@import '@/views/invoice/invoice.scss';
.invoice-detail {
  @include invoice;
}
</style>
