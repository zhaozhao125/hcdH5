export default {
  data() {
    return {
      transitionName: '' // 默认动态路由变化为slide-right
    }
  },

  watch: {
    '$route' (to, from) {
      let isBack = to.query.direction === 'back'
      if (isBack) {
        this.transitionName = 'slide-right'
      } else {
        this.transitionName = 'slide-left'
      }
    }
  }
}
