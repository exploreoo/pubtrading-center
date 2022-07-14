import { createApp } from "vue";
import App from "./App.vue";
import "swiper/css/swiper.min.css";
import "./style.scss";
import router from "./router";
import store from "./store";
import axios from "./utils/axios/index";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "echarts-gl";

import ECharts from "vue-echarts";
import { use } from "echarts/core";
// import ECharts modules manually to reduce bundle size
import { CanvasRenderer } from "echarts/renderers";
import { BarChart } from "echarts/charts";
import { GridComponent, TooltipComponent } from "echarts/components";
use([CanvasRenderer, BarChart, GridComponent, TooltipComponent]);

import dayjs from "dayjs";
import "./mock/index";

const app = createApp(App);

// register globally (or you can do it locally)
app.component("v-chart", ECharts);
app.config.globalProperties.day = dayjs; //全局挂载
app.config.globalProperties.$axios = axios;

app.use(store).use(router).use(ElementPlus).mount("#app");
