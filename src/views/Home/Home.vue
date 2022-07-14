<template>
  <div class="outer">
    <div :class="['inner', 'f-con', 'f-d-c', currentComponent == ScreenTwo ? 'inner-bg2' : '']">
      <Header />
      <keep-alive>
        <component :is="currentComponent"></component>
      </keep-alive>
      <!-- 底部滚动轮播 -->
      <!-- <footer>
        <div class="marquee-outer-wrapper">
          <div class="marquee-inner-wrapper">
            <span
              :class="{
                'first-marquee': index == 0,
                'second-marquee': index == 1,
                'three-marquee': index == 2,
              }"
              v-for="index in [0, 1, 2]"
              :key="index"
            >
              <span>网上全公开&nbsp;&nbsp;&nbsp;&nbsp;网下无交易</span>
              <span>规范统一&nbsp;&nbsp;&nbsp;&nbsp;互联互通</span>
              <span
                >整合共享资源&nbsp;&nbsp;&nbsp;&nbsp;统一制度规则&nbsp;&nbsp;&nbsp;&nbsp;创新机制体制</span
              >
              <span
                >统一&nbsp;&nbsp;&nbsp;&nbsp;开放&nbsp;&nbsp;&nbsp;&nbsp;规则&nbsp;&nbsp;&nbsp;&nbsp;有序</span
              >
              <span
                >规则统一&nbsp;&nbsp;&nbsp;&nbsp;公开透明&nbsp;&nbsp;&nbsp;&nbsp;服务高效&nbsp;&nbsp;&nbsp;&nbsp;监督规范</span
              >
              <span>网上全公开&nbsp;&nbsp;&nbsp;&nbsp;网下无交易</span>
              <span>规范统一&nbsp;&nbsp;&nbsp;&nbsp;互联互通</span>
              <span
                >整合共享资源&nbsp;&nbsp;&nbsp;&nbsp;统一制度规则&nbsp;&nbsp;&nbsp;&nbsp;创新机制体制</span
              >
              <span
                >统一&nbsp;&nbsp;&nbsp;&nbsp;开放&nbsp;&nbsp;&nbsp;&nbsp;规则&nbsp;&nbsp;&nbsp;&nbsp;有序</span
              >
              <span
                >规则统一&nbsp;&nbsp;&nbsp;&nbsp;公开透明&nbsp;&nbsp;&nbsp;&nbsp;服务高效&nbsp;&nbsp;&nbsp;&nbsp;监督规范</span
              >
            </span>
          </div>
        </div>
      </footer> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, getCurrentInstance, onBeforeMount, onMounted, onUnmounted, toRaw, shallowRef } from 'vue'
import { useRouter } from 'vue-router'
import Header from '@/components/header.vue'
import ScreenOne from './ScreenOne/ScreenOne.vue'
import ScreenTwo from './ScreenTwo/ScreenTwo.vue'

const components = [ScreenOne, ScreenTwo]
const currentComponent = shallowRef(ScreenTwo)

// setTimeout(() => {
//   currentComponent.value = components[0]
// }, 5000)
</script>
<style lang="scss" scoped src="./Home.scss"></style>
