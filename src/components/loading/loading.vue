<template>
  <div class="loading-wrapper" v-show="visible" ref="loading-wrapper">
    <div class="loading">
      <!-- <img width="28" height="28" src="./../../assets/img/loading.png">
      <span class="desc">{{title}}</span> -->
      <mt-spinner type="double-bounce" color="#00C6CA"></mt-spinner>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  props: {
    title: String
  },
  mounted() {},
  data() {
    return {
      visible: false
    }
  }
}
</script>
<style lang="scss" scoped>
  .loading-wrapper {
    // 遮罩层
    z-index: 99999;
    width: 100%;
    height: 100%;
    position: fixed;
    background-color:transparent;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center; //  background: #787878;
  }
</style>
