<template>
  <mt-popup v-model="popupVisible" position="bottom" class="wx-share overflow-hidden width-100">
    <div class="share-container bg-white">
      <div class="share-title fz-16 text-center color-gray">分享至</div>
      <div class="share-buttons flex-row justify-content-center">
        <div class="share-button text-center" @click="handleClickShare('wechatTimeline')">
          <img src="@/assets/img/icon-timeline.png" alt="">
          <p class="color-dark">朋友圈</p>
        </div>
        <div class="share-button text-center" @click="handleClickShare('wechatMessage')">
          <img src="@/assets/img/icon-wechat.png" alt="">
          <p class="color-dark">微信好友</p>
        </div>
      </div>
      <div class="cancel text-center color-gray" @click="popupVisible=false">
        取消
      </div>
    </div>
  </mt-popup>
</template>

<script>
import { Popup } from 'mint-ui'
export default {
  props: {
    // 显示分享弹框
    visible: {
      type: Boolean,
      default: false
    },
    // 分享URL
    shareURL: {
      type: String,
      required: true
    },
    // 分享卡片标题
    shareTitle: {
      type: String,
      default: '一步用车'
    },
    // 分享卡片内容
    shareContent: {
      type: String,
      default: '一步用车'
    },
    // 分享卡片图片地址
    shareImg: {
      type: String,
      default: 'https://h5.1byongche.com/static/img/logo.png'
    },
    // 分享成功后时候显示toast提示
    showToast: {
      type: Boolean,
      default: true
    }
  },

  components: {
    mtPopup: Popup
  },

  data() {
    return {
      popupVisible: false
    }
  },

  created() {
    this.popupVisible = this.visible
  },

  watch: {
    popupVisible(val) {
      this.$emit('update:visible', val)
    },
    visible(val) {
      this.popupVisible = val
    }
  },

  methods: {
    handleShareResult(res, type) {
      if (res.result == 'success') {
        if (this.showToast) {
          this.$toast('分享成功')
        }
        this.$emit('shareSuccess', type)
      } else {
        this.$emit('shareFailed', type)
      }
    },
    handleClickShare(type) {
      let shareParams = {
        url: this.shareURL,
        shareTitle: this.shareTitle, // 分享标题
        shareContent: this.shareContent, // 分享内容
        shareImg: this.shareImg // 分享图标
      }
      if (type == 'wechatMessage') {
        this.$callHandler('shareWechatMessage', shareParams).then(res => {
          this.handleShareResult(res, type)
        })
      }
      if (type == 'wechatTimeline') {
        this.$callHandler('shareWechatTimeline', shareParams).then(res => {
          this.handleShareResult(res, type)
        })
      }
      this.popupVisible = false
      this.$emit('share', type)
    }
  }
}
</script>

<style lang="scss">
.wx-share {
  .share-container {
    padding: 4vw 0 0;
    .share-buttons {
      margin-top: 4vw;
      margin-bottom: 4vw;
      .share-button {
        padding: 0 5vw;
        img {
          width: 15vw;
          margin-bottom: 2vw;
        }
      }
    }
    .cancel {
      line-height: 13vw;
      border-top: 1px solid #eee;
    }
  }
}
</style>
