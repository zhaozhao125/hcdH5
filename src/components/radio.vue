<template>
<div class="v-radiolist"
     @change="$emit('change', currentValue)">
  <ul>
    <li v-for="(option, index) in options" :key="index">
      <label class="v-radiolist-label">
        <span :class="{'is-right': align === 'right'}"
              class="v-radio">
          <input
            class="v-radio-input"
            type="radio"
            v-model="currentValue"
            :disabled="option.disabled"
            :value="option.value || option">
          <span class="v-radio-core"></span>
        </span>
        <img v-if="option.icon"
             :src="imagePath(option.icon)"
             alt=""
             class="v-radio-icon">
        <span class="v-radio-label"
              v-text="option.label || option"></span>
      </label>
    </li>
  </ul>
</div>

</template>

<script>
export default {
  name: 'radio',

  props: {
    title: String,
    align: String,
    options: {
      type: Array,
      required: true
    },
    value: String
  },

  data() {
    return {
      currentValue: this.value
    }
  },

  methods: {
    imagePath(imgName) {
      return imgName ? require('@/assets/img/' + imgName) : ''
    }
  },

  watch: {
    value(val) {
      this.currentValue = val
    },

    currentValue(val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style lang="scss">
.v-radiolist {
  li {
    align-items: center;
    display: flex;
    font-size: px2vw(14);
    line-height: 1;
    min-height: inherit;
    overflow: hidden;
    padding: 0 3vw;
    width: 100%;
    min-height: 14vw;
    &:last-of-type {
      border: 0px;
    }
  }
  .v-radiolist-label {
    display: block;
    flex: 1;
  }
  .v-radio-label {
    vertical-align: middle;
    margin-left: 1.6vw;
  }
  .v-radio-icon {
    width: 5.6vw;
    vertical-align: middle;
  }
  .v-radio {
    &.is-right {
      float: right;
    }
    .v-radio-input {
      display: none;
      &:checked {
        +.v-radio-core {
          background-color: $color-main;
          border-color: $color-main;
          &::after {
            border-color: $color-white;
            transform: rotate(45deg) scale(1);
          }
        }
      }
      &[disabled]+.v-radio-core {
        background-color: $color-gray;
        border-color: #ccc;
      }
    }
    .v-radio-core {
      box-sizing: border-box;
      display: inline-block;
      background-color: $color-white;
      border-radius: 100%;
      border: 1px solid #ccc;
      position: relative;
      width: 6vw;
      height: 6vw;
      vertical-align: middle;
      &::after {
        border: 0.6vw solid transparent;
        border-left: 0;
        border-top: 0;
        content: " ";
        position: absolute;
        top: 0.6vw;
        left: 1.8vw;
        width: 1.5vw;
        height: 2.7vw;
        transform: rotate(45deg) scale(0);
        transition: transform .2s;
      }
    }
  }
}
</style>
