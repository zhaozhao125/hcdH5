<template>
<div class="coupon-expired">
  <coupon-list coupon-type="2"></coupon-list>
</div>
</template>

<script>
import couponList from './coupon-component.vue'
export default {
  components: {
    couponList
  },

  data() {
    return {}
  },

  created() {
  }
}
</script>

<style lang="scss">

</style>
