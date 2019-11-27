<template>
  <div class="settings-page flex-col">
    <div class="cell-container pl-5 pr-5 bg-white">
      <mt-cell title="用户协议" :is-link="true" to="/user-center/user-agreement"></mt-cell>
      <mt-cell title="关于和充电" :value="version"></mt-cell>
    </div>
    <mt-button type="primary" class="logout-btn" @click="handleLogout">退出</mt-button>
  </div>
</template>

<script>
import { Cell } from 'mint-ui'
export default {
  components: {
    mtCell: Cell
  },

  data() {
    return {}
  },

  computed: {
    version() {
      let user = this.$store.getters.user
      if (user && user.version) {
        let version = user.version
        if (!isNaN(Number(version))) {
          if (version < 10) {
            version = version * 100
          }
          return '版本v' + Array.from(String(version)).join('.')
        } else {
          return version
        }
      } else {
        return ''
      }
    }
  },

  methods: {
    handleLogout() {
      this.$message.confirm('确认是否退出登录?').then(action => {
        this.$callHandler('logout')
      })
    }
  }
}
</script>

<style lang="scss">
.settings-page {
  .logout-btn {
    width: 90%;
    margin: auto auto 4vw;
  }
  .mint-cell {
    &:last-of-type {
      border: 0;
    }
  }
}
</style>
