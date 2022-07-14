<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p>{{ resPonseData }}</p>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import * as api from "@/utils/request/test";

const resPonseData = ref();
onMounted(() => {
  api
    .test({
      limit: 10,
    })
    .then((res) => {
      console.log(res);
      resPonseData.value = JSON.stringify(res);
    });
});
</script>