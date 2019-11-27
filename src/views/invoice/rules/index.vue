<template>
  <div class="invoice-rules">
    <ul class="fz-12 color-gray pt-5 pl-4 pr-3">
      <li>开票项目目前仅支持充电服务费。</li>
      <li>开票申请仅支持100元以上金额申请。</li>
      <li>系统目前只支持开具电子发票，电子发票支持报销入账。</li>
      <li>提交开票申请后，财务3个工作日内将电子发票发送至您的邮箱。</li>
      <li>系统暂不支持修改发票信息，提交申请前请仔细核对信息。</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>

<style lang="scss">
.invoice-rules {
  ul {
    margin-left: 5vw;
    list-style: outside;
  }
  li {
    margin-bottom: 1vw;
  }
}
</style>
