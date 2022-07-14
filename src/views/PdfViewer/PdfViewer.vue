te
<template>
  <div class="outer">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide f-con j-c a-c" :data-swiper-autoplay="returnTime(index)" v-for="(item, index) in 31" :key="index">
          <img class="preview-img" :src="require('@/assets/PPT-0705/' + (index + 1) + '.png')" alt="" />
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>

      <!-- 如果需要导航按钮 -->
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>
    <div class="back f-con j-e a-c">
      <el-button @click="togglePlay">{{ modalTxt }}</el-button>
      <el-button type="primary" @click="routerLink('cover')">返回主页</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import Swiper from 'swiper'
import { useRouter } from 'vue-router'

const router = useRouter()

function routerLink(name: any) {
  router.push({ name: name, params: {} })
}

onMounted(() => {
  initSwiper()
})

const swiperInstance = ref()
const modalTxt = ref('手动模式')

function initSwiper() {
  swiperInstance.value = new Swiper('.swiper-container', {
    loop: true, // 循环模式选项
    preventClicksPropagation: true,
    autoplay: {
      disableOnInteraction: false,
      delay: 10000
    },

    // 如果需要分页器
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },

    // 如果需要前进后退按钮
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    on: {
      doubleTap: function () {
        togglePlay()
      }
    }
  })
}

function returnTime(i: number) {
  switch (i + 1) {
    case 1:
    case 2:
    case 3:
    case 20:
    case 25:
      return 3000
    default:
      return 10000
  }
}

function togglePlay() {
  if (swiperInstance.value.autoplay.running) {
    console.log('stop')
    modalTxt.value = '轮播模式'
    swiperInstance.value.autoplay.stop()
  } else {
    console.log('auto')
    swiperInstance.value.autoplay.start()
    modalTxt.value = '手动模式'
  }
}
</script>
<style lang="scss" scoped>
.outer {
  width: 3840px;
  height: 1080px;
  box-sizing: border-box;
  padding: 0 50px;

  .el-button {
    width: 180px;
    height: 50px;
    font-size: 20px;
  }
  .back {
    width: 100%;
    height: 100px;
  }

  .swiper-container {
    height: calc(100% - 100px);
    .preview-img {
      height: 95%;
    }
  }

  :deep(.swiper-pagination-bullet) {
    width: 30px;
    height: 8px;
    border-radius: 5px;
    margin: 0 5px;
  }
  :deep(.swiper-container-horizontal > .swiper-pagination-bullets) {
    bottom: 0;
  }
}
</style>
