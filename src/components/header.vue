<template>
  <header class="f-con j-e a-c">
    <span>{{ currentDate }}</span>
    <el-divider direction="vertical" />
    <span>{{ currentTime }}</span>
    <el-divider direction="vertical" />
    <span>{{ currentWeek }}</span>
  </header>
</template>

<script lang="ts" setup>
import {
  ref,
  getCurrentInstance,
  onBeforeMount,
  onMounted,
  onUnmounted,
  toRaw,
  shallowRef,
} from "vue";
// dayjs
const { proxy } = getCurrentInstance() as any;
const day = proxy.day;

// 日期-时间-星期
let currentDate = ref(day(new Date()).format("YYYY-MM-DD"));
const weekList = [
  "星期一",
  "星期二",
  "星期三",
  "星期四",
  "星期五",
  "星期六",
  "星期日",
];
const currentWeek = ref(weekList[day(new Date()).day() - 1]);
let currentTime = ref(day(new Date().getTime()).format("HH:mm:ss"));
let baseTimer = setInterval(() => {
  let temp = new Date().getTime();
  currentTime.value = day(temp).format("HH:mm:ss");
  currentDate.value = day(new Date()).format("YYYY-MM-DD");
  currentWeek.value = weekList[day(new Date()).day() - 1];
}, 1000);

onUnmounted(() => {
  clearInterval(baseTimer);
});
</script>

<style lang="scss" scoped>
header {
  height: 80px;
  background: url("../assets/large-screen/part-one/title.png") no-repeat;
  background-size: 100% 100%;
  padding: 5px 20px 0;
  box-sizing: border-box;
  font-size: 22px;
  font-family: SimHei;
  font-weight: bold;
  color: #8bd8f5;
}
</style>
