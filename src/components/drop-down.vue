<template>
  <div id="drop-down">
    <div id="drop-down-name" @click.stop="openTab">
      <slot v-if="$slots.dropDownName" name="dropDownName"> </slot>
      <span v-else class="drop-down-link">
        <slot></slot>
      </span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    listName: {
      type: Array,
      default() {
        return ['企业主页', '个人主页']
      }
    },
    // 偏移量
    offset: {
      type: Number,
      default: 0
    },
    // 仅用于企业主页
    isOffset: false,
    // 是否插入到body上
    appendToBody: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      itemIndex: 0
    }
  },
  mounted() {
    document.body.onclick = () => {
      let tabContent = document.getElementById('tab-content')
      if (tabContent) {
        tabContent.style.display = 'none'
        let body = document.body
        // 删除节点
        body.removeChild(tabContent)
      }
    }
  },
  methods: {
    getLabel() {
      let ula = document.createElement('ul')
      ula.setAttribute('id', 'tab-content')
      ula.style.width = '25.33vw'
      ula.style.display = 'block'
      this.listName.forEach((item, index) => {
        let lia = document.createElement('li')
        lia.setAttribute('class', 'lia')
        ula.appendChild(lia)
        if (index !== this.listName.length - 1) {
          lia.className = 'lia add-after'
        }
        lia.innerHTML = item

        if (index === this.itemIndex) {
          lia.style.background = '#F4F9FF'
        }

        lia.addEventListener('click', (e) => {
          this.itemIndex = index
          this.$emit('command', index)
        }, true)
      })
      if (this.appendToBody) {
        document.body.appendChild(ula)
      } else {
        document.querySelector('.router').appendChild(ula)
      }
    },
    openTab() {
      // 第一次不走这
      if (document.getElementById('tab-content')) {
        let tabContent = document.getElementById('tab-content')
        let body = document.body
        body.removeChild(tabContent)
      } else {
        // 创建节点
        this.getLabel()
        // 改变定位
        let tabContent = document.getElementById('tab-content')
        // 屏幕宽度除以100
        let screenVw = document.body.offsetWidth / 100
        let clientRect = document.getElementById('drop-down-name').getBoundingClientRect()
        let offsetWidth = parseFloat(tabContent.style.width) * 3.75 // 获取元素宽度
        tabContent.style.top = clientRect.bottom + 'px'
        // 60
        tabContent.style.left = clientRect.right - offsetWidth + this.offset + 'px'
        // 仅适用于企业用车页面
        if (clientRect.right / screenVw >= 87 && this.isOffset) {
          tabContent.style.left = 71.13333333333334 + 'vw'
        }
      }
    }
  }
}
</script>
<style  lang='scss'>
// 切换页
#tab-content {
  position: absolute;
  height: auto;
  background: #ffffff;
  box-shadow: 0 0 px2vw(6) 0 #d6d6d6;
  border-radius: px2vw(2);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 999;
  // background: red;
  > li {
    width: 100%;
    flex: 1;
    font-size: px2vw(14);
    color: #3d3d3d;
    font-weight: normal;
    margin: 0;
    text-align: center;
    line-height: px2vw(44);
    // &:first-child {
    // }
  }
  .add-after {
    position: relative;
    &::after {
      content: '';
      display: block;
      position: absolute;
      right: 0;
      height: 1px;
      width: 100%;
      z-index: 999;
      background: #efefef;
    }
  }
}
#drop-down {
  #drop-down-name {
    width: auto;
  }
  .drop-down-link {
    &:after {
      content: '';
      display: inline-block;
      width: 0;
      height: 0;
      border: 1vw solid transparent;
      border-top-color: #3d3d3d;
      border-top-width: 1.5vw;
      position: relative;
      top: 0.5vw;
      margin-left: 1vw;
    }
  }
}
</style>
