<template>
  <div class="invoice-history">
    <div v-if="dataList && !dataList.length" class="no-data">
      <img src="@/assets/img/no-data.png" alt="">
      <p>还没有开票记录哦</p>
    </div>
    <ul class="pd-3" v-infinite-scroll="loadMore" infinite-scroll-disabled="infiniteScrollDisabled" infinite-scroll-distance="10">
      <li v-for="(item, index) in dataList" :key="index" class="bg-white mb-3" @click="handleShowDetail(item.sn)">
        <div class="invoice-item pt-3 pl-4 pb-3 pr-4">
          <div class="item-top flex-row justify-content-between">
            <div class="date flex-row align-items-center">
              <img class="mr-2" src="@/assets/img/icon-time.png" alt="">
              <span class="fz-13 color-gray">{{item.applyTime | timeFilter('cn')}}</span>
            </div>
            <div class="item-status has-arrow fz-14 color-gray">
              {{item.status | statusFilter}}
            </div>
          </div>
          <div class="item-bottom flex-row justify-content-between align-items-center mt-3">
            <div class="invoice-type fz-14 color-gray">
              {{item.type | invoiceFilter}}
            </div>
            <div class="invoice-money fz-22">
              {{item.money | moneyFilter}}<span class="fz-13 color-gray">元</span>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <div class="common-loading" v-show="!allLoaded">
      <mt-spinner type="snake"></mt-spinner>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataList: null,
      page: 1,
      loading: false,
      allLoaded: false,
    }
  },

  computed: {
    infiniteScrollDisabled() {
      return this.loading || this.allLoaded
    }
  },

  created() {
    // this.$service.getInvoiceHistory().then(res => {
    //   this.dataList = res.data.records
    // })
  },

  filters: {
    statusFilter(val) {
      if (val == 'pending') {
        return '待处理'
      }
      if (val == 'processed') {
        return '已完成'
      }
      return ''
    },
    invoiceFilter(val) {
      if (val == 'paper') {
        return '纸质发票'
      }
      if (val == 'electronic') {
        return '电子发票'
      }
      return ''
    }
  },

  methods: {
    loadMore() {
      this.loading = true
      this.$service.getInvoiceHistory(this.page).then(res => {
        let result = res.data
        if (!this.dataList) {
          this.dataList = []
        }
        this.dataList = this.dataList.concat(result.records)
        if (result.totalPages <= this.page) {
          this.allLoaded = true
        } else {
          this.page++
        }
        this.loading = false
      }).catch(err => {
        this.loading = false
        this.allLoaded = true
      })
    },
    handleShowDetail(sn) {
      this.$router.push({
        name: 'invoiceDetail',
        query: {
          sn
        }
      })
    }
  }
}
</script>

<style lang="scss">
.invoice-history {
  li {
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.05);
  }
  .invoice-item {
    .date {
      img {
        width: px2vw(13);
      }
    }
  }
}
</style>
