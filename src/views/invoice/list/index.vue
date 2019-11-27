<template>
  <div class="invoice-list">
    <div v-if="dataList && !dataList.length" class="no-data">
      <img src="@/assets/img/no-data.png" alt="">
      <p>暂无充值流水</p>
    </div>
    <div class="list-container">
      <ul class="pt-3 pl-3 pr-3" v-infinite-scroll="loadMore" infinite-scroll-disabled="infiniteScrollDisabled" infinite-scroll-distance="10">
        <li v-for="(item, index) in dataList" :key="index" class="bg-white mb-3" @click="handleCheck(item)">
          <div class="invoice-item flex-row align-items-center">
            <div class="checkbox ml-3 mr-3" :class="{checked: isChecked(item.id)}">
              <div class="checkbox-core"></div>
            </div>
            <div class="item-content">
              <div class="money fz-13 color-gray mt-3"><strong class="fz-22 font-weight-normal color-dark mr-1">{{item.invoiceMoney | moneyFilter}}</strong>元</div>
              <div class="date flex-row align-items-center ml-1 mt-2 mb-3">
                <img class="mr-2" src="@/assets/img/icon-time.png" alt="">
                <span class="fz-13 color-gray">{{item.orderTime | timeFilter('cn')}}</span>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div class="common-loading" v-show="!allLoaded">
        <mt-spinner type="snake"></mt-spinner>
      </div>
    </div>

    <div v-if="dataList && dataList.length" class="bottom-container position-fixed bottom-0 width-100 bg-white">
      <div class="overview fz-12 flex-row align-items-center pl-5 color-gray">
        <span class="color-main">{{checkedList.size}}</span>笔充值流水，共<span class="color-main">{{selectedCount}}</span>元
      </div>
      <div class="operation flex-row justify-content-between align-items-center pl-3">
        <div class="check-all flex-row align-items-center pd-3" @click="handleCheckAll">
          <div class="checkbox" :class="{checked: allChecked}">
            <div class="checkbox-core mr-3"></div>
          </div>
          <span class="fz-13 color-gray">全选</span>
        </div>
        <div class="next fz-16 bg-main color-white height-100 text-center" @click="handleNext">下一步</div>
      </div>
    </div>
  </div>
</template>

<script>
// 申请开发票最低金额限制
const MIN_MONEY = 100
export default {
  data() {
    return {
      dataList: null,
      checkedList: new Set(),
      allChecked: false,
      selectedCount: 0,
      page: 1,
      loading: false,
      allLoaded: false,
      totalDataSize: 0
    }
  },

  computed: {
    infiniteScrollDisabled() {
      return this.loading || this.allLoaded
    }
  },

  created() {
    // this.$service.getAvailableInvoiceList().then(res => {
    //   this.dataList = res.data.records
    // })
  },

  methods: {
    loadMore() {
      this.loading = true
      this.$service.getAvailableInvoiceList(this.page).then(res => {
        let result = res.data
        if (!this.dataList) {
          this.dataList = []
        }
        this.dataList = this.dataList.concat(result.records)
        this.totalDataSize = result.totalElements
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
    updateOverview() {
      let count = this.dataList.filter(item => this.checkedList.has(item.id)).reduce((pre, cur) => pre + cur.invoiceMoney, 0)
      count = count.toFixed(2)
      this.selectedCount = count
    },
    handleCheck(item) {
      if (this.checkedList.has(item.id)) {
        this.checkedList.delete(item.id)
      } else {
        this.checkedList.add(item.id)
      }
      this.allChecked = this.dataList.length && (this.dataList.length == this.checkedList.size)
      this.updateOverview()
      this.$forceUpdate()
    },
    handleCheckAll() {
      if (!this.allChecked) {
        if (this.dataList.length < this.totalDataSize) {
          this.loading = true
          this.page = 1
          this.$service.getAvailableInvoiceList(this.page, this.totalDataSize).then(res => {
            let result = res.data
            this.dataList = result.records
            this.totalDataSize = result.totalElements
            this.allLoaded = true
            this.loading = false

            this.checkAllData()
          }).catch(err => {
            this.loading = false
            this.allLoaded = true
          })
        } else {
          this.checkAllData()
        }
      } else {
        console.log('====else====')
        this.checkedList.clear()
        this.allChecked = false
        this.updateOverview()
        this.$forceUpdate()
      }
    },
    checkAllData() {
      this.dataList.forEach(item => {
        this.checkedList.add(item.id)
      })
      this.allChecked = true
      this.updateOverview()
      this.$forceUpdate()
    },
    isChecked(id) {
      return this.checkedList.has(id)
    },
    handleNext() {
      if (this.selectedCount < MIN_MONEY) {
        this.$message.alert(`申请金额不足${MIN_MONEY}元，暂不能申请开票`)
        return
      }
      this.$service.confirmInvoice(Array.from(this.checkedList)).then(res => {
        console.log('====res====', res)
        if (res.code == 0) {
          this.$router.push({
            name: 'applyInvoice',
            params: {
              orderIds: res.data.orderIds,
              content: res.data.content,
              money: res.data.money
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="scss">
.invoice-list {
  .no-data {
    margin-top: 30vw;
    img {
      width: px2vw(90);
    }
  }
  .list-container {
    margin-bottom: 25vw;
  }
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
  .bottom-container {
    .overview {
      height: px2vw(30);
      border-top: 1px solid #d8d8d8;
    }
    .operation {
      height: px2vw(50);
      border-top: 1px solid #d8d8d8;
      .next {
        width: px2vw(140);
        line-height: px2vw(50);
      }
    }
  }
}
</style>
