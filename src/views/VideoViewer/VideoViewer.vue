<template>
  <div class="outer">
    <div class="video-con f-con j-c">
      <video id="videoRef" style="height: 100%" controls preload="auto" oncanplaythrough="play()">
        <source src="@/assets/20220714_video.mp4" type="video/mp4" />
        您的浏览器不支持 video 标签。
      </video>
    </div>
    <div class="back f-con j-e a-c">
      <el-button type="primary" @click="routerLink('cover')">返回主页</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

function routerLink(name: any) {
  router.push({ name: name, params: {} })
}
onMounted(() => {})
</script>
<style lang="scss" scoped>
.outer {
  width: 3840px;
  height: 1080px;
  box-sizing: border-box;
  padding: 0 50px;
  background: #000;

  .el-button {
    width: 180px;
    height: 50px;
    font-size: 20px;
  }
  .back {
    display: none;
    height: 100px;
    position: fixed;
    right: 40px;
    bottom: 60px;
    &:hover {
      display: block;
    }
  }

  .video-con {
    height: 100%;

    &:hover + .back {
      display: block;
    }
  }
}
</style>
