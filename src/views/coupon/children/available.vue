<template>
<div class="coupon-available">
  <coupon-list coupon-type="0"></coupon-list>
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
