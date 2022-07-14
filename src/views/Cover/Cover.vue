<template>
  <div class="outer f-con j-c a-e">
    <div class="link f-con a-c">
      <div class="link-item link-1" @click="routerLink('VideoViewer')"></div>
      <div class="link-item link-2" @click="routerLink('Home')"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function routerLink(name: any) {
  router.push({ name: name, params: {} })
}
</script>
<style lang="scss" scoped>
.outer {
  width: 3840px;
  height: 1080px;
  background: url(../../assets/cover/cover-bg.png) no-repeat;
  background-size: 100% 100%;
  padding: 0 0 120px 0;
  box-sizing: border-box;

  .link {
    .link-item {
      width: 450px;
      height: 450px;
      cursor: pointer;
    }

    .link-1 {
      background: url(../../assets/cover/l-1.png) no-repeat;
      background-size: 100% 100%;
    }

    .link-2 {
      background: url(../../assets/cover/l-2.png) no-repeat;
      background-size: 100% 100%;
      margin-left: 280px;
    }
  }
}
</style>
