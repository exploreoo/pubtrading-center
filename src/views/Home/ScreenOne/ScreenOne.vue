<template>
  <section class="f-else f-con">
    <section class="f-else f-con f-d-c" style="padding: 0">
      <div class="row-1 f-con j-sb a-c">
        <div class="part-1">
          <div class="col-1-2">
            <div class="nor-lab">交易主体情况<span>（2021）</span></div>
            <div class="chart-con" id="chart1"></div>
          </div>
          <div class="col-1-2">
            <div class="nor-lab">中标下浮率趋势</div>
            <div class="chart-con" id="chart2"></div>
          </div>
        </div>
        <div class="part-2 f-else">
          <div class="nav f-con j-sb a-c">
            <div :class="['nav-item', 'nav-' + (index + 1)]" v-for="(item, index) in navList" :key="index">
              <span class="n-title">{{ item.name }}</span>
              <span class="n-value">{{ transAmount(item.value) }}</span>
              <span v-if="item.name == '排污权成交金额' || item.name == '综合交易成交金额'">万元</span>
              <span v-else>亿元</span>
            </div>
          </div>
          <div class="center f-con a-c">
            <div class="map f-else">
              <i class="map-inner" @mouseover="mapAtuoStop()" @mouseleave="mapAutoPlay()">
                <!-- <div class="marker">
                      <div class="txt f-con a-c">
                        <img
                          src="@/assets/large-screen/part-one/marker.png"
                          alt=""
                        />
                        <span>东莞市公共资源交易中心</span>
                      </div>
                      <i class="mark-icon"></i>
                    </div> -->
                <i
                  class="area-active"
                  v-for="(item, index) in mapDotArr"
                  :key="index"
                  :style="{
                    top: item.areaActivePosition.top + 'px',
                    left: item.areaActivePosition.left + 'px'
                  }"
                  v-show="currentArea && currentArea.name == item.name"
                >
                  <img :src="require('@/assets/large-screen/part-one/area/' + index + '.png')" alt="" />
                </i>
                <i
                  :class="['mark-icon', currentArea && currentArea.name == item.name ? 'mark-active' : '']"
                  v-for="(item, index) in mapDotArr"
                  :key="index"
                  :style="{
                    top: item.dotPosition.top + 'px',
                    left: item.dotPosition.left + 'px'
                  }"
                  @click="chooseArea(item)"
                >
                  <span>{{ item.name }}</span>
                </i>
              </i>
            </div>
            <div class="message">
              <div class="mess-con f-con f-d-c" v-for="(item, index) in messageList" :key="index">
                <div class="ms-head f-con a-c">
                  <span class="w-1"></span>
                  <span class="w-2">宗数</span>
                  <span class="w-3">{{ index == 1 ? '面积' : index == 2 ? '出证数量' : index == 3 ? '起始价' : '投资/预算金额' }}</span>
                  <span class="w-4">参投企业人数</span>
                </div>
                <div class="ms-section f-con a-c f-else">
                  <div class="w-1">{{ item.title }}</div>
                  <div class="w-2 f-con f-d-c a-c">
                    <div class="ms-value">{{ transAmount(item.zs) }}</div>
                    <div>(个)</div>
                  </div>
                  <div class="w-3 f-con f-d-c a-c">
                    <div class="ms-value">{{ transAmount(item.tz) }}</div>
                    <div>({{ index == 1 ? '平方千米' : index == 2 ? '个' : '万元' }})</div>
                  </div>
                  <div class="w-4 f-con f-d-c a-c">
                    <div class="ms-value">{{ transAmount(item.cj) }}</div>
                    <div>(万元)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row-2 f-else f-con">
        <div class="nor-lab lab-need-posit">当年交易总额<span>（万元）</span></div>
        <!-- <div class="r2-sel">
              <el-select
                v-model="transYear"
                class="m-2"
                placeholder="Select"
                size="large"
              >
                <el-option
                  v-for="item in yearOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div> -->
        <div class="chart-con" id="chart3"></div>
      </div>
    </section>
    <section style="padding: 0">
      <div class="row-3 col-1-2">
        <div class="r3-con part-3 f-con f-d-c">
          <div class="nor-lab">各要素交易节资及增值情况<span>（万元）</span></div>
          <div class="chart-con" style="position: relative">
            <div id="chart4"></div>
            <i></i>
          </div>
          <div class="jjzj f-con a-c">节约资金<span>（万元）</span></div>
          <div class="mess-con f-con f-d-c">
            <div class="ms-head f-con a-c">
              <span class="w-1">建设工程</span>
              <span class="w-2">国土资源</span>
              <span class="w-3">排污权交易</span>
              <span class="w-4">综合交易</span>
            </div>
            <div class="ms-section f-con a-c f-else">
              <div class="w-1 f-con f-d-c">
                <div class="ms-value">{{ transAmount(monSave.gcjs) }}</div>
              </div>
              <div class="w-2 f-con f-d-c">
                <div class="ms-value">{{ transAmount(monSave.gtjy) }}</div>
              </div>
              <div class="w-3 f-con f-d-c a-c">
                <div class="ms-value">{{ transAmount(monSave.pwqjy) }}</div>
              </div>
              <div class="w-4 f-con f-d-c a-c">
                <div class="ms-value">{{ transAmount(monSave.zhjy) }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="r3-con part-4 f-con f-d-c">
          <div class="nor-lab">全市工程建设项目各行业投资分布图</div>
          <div class="chart-con" id="chart5"></div>
        </div>
      </div>
      <div class="row-3 col-1-2">
        <div class="r3-con part-5 f-con f-d-c">
          <div class="nor-lab">投标保证电子保函占比</div>
          <div class="chart-con" id="chart6"></div>
        </div>
        <div class="r3-con part-6 f-con f-d-c">
          <div class="nor-lab">市属-镇街(园区)投资额占比</div>
          <div class="chart-con" style="position: relative">
            <div class="chart-con" id="chart7"></div>
            <i class="c-7-bg"></i>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script lang="ts" setup>
import { ref, getCurrentInstance, onBeforeMount, onMounted, onUnmounted, toRaw, shallowRef } from 'vue'
import { useRouter } from 'vue-router'
import Header from '@/components/header.vue'

import * as echarts from 'echarts'
import Highcharts from 'highcharts/highstock'
import HighchartsMore from 'highcharts/highcharts-more'
import HighchartsDrilldown from 'highcharts/modules/drilldown'
import Highcharts3D from 'highcharts/highcharts-3d'
import Highmaps from 'highcharts/modules/map'

import { tools } from '@/utils/chartAutoPlay'
import { transAmount } from '@/utils/amountSplit'
import * as tool from '../tool'
import * as areaTool from '../areaTool'

HighchartsMore(Highcharts)
HighchartsDrilldown(Highcharts)
Highcharts3D(Highcharts)
Highmaps(Highcharts)

const router = useRouter()

function routerLink(name: any) {
  router.push({ name: name, params: {} })
}

onMounted(() => {
  initChart1()
  initChart2()
  initChart3()
  initChart4()
  initChart5()
  initChart6()
  initChart7()
  mapAutoPlay()
})

onUnmounted(() => {
  // 清除定时器
  clearInterval(mapAutoPlayTimer)
  clearInterval(chart4Timer)
  chartAutoRunTimers.value.forEach((item: any) => {
    item.value.clearLoop()
  })
})

// 地图散点筛选
const mapDotArr = ref(tool.mapDot)
const currentArea: any = ref(tool.mapDot[0])
let mapAutoPlayTimer: any
let autoIndex = 0

// 手动选点
function chooseArea(item: any) {
  currentArea.value = item
}

// 地图自动播放
function mapAutoPlay() {
  console.log('run_start')
  mapAutoPlayTimer = setInterval(() => {
    // console.log(autoIndex, currentArea.value)
    // if (autoIndex == 3) {
    if (autoIndex == mapDotArr.value.length - 1) {
      autoIndex = 0
    } else {
      autoIndex++
    }
    currentArea.value = mapDotArr.value[autoIndex]

    /* 动态改变 messageList值 */
    // let temp: Array<string | number> = new Array([])
    // let temp: any = areaTool.tender.find(i=> currentArea.value.name.includes(i.name))
    // if(temp) {
    //   messageList.value[0] = Object.assign(temp.js, { title: '建设工程' })
    //   messageList.value[0] = Object.assign(temp.gt, { title: '国土资源' })
    //   messageList.value[0] = Object.assign(temp.pw, { title: '排污权交易' })
    //   messageList.value[0] = Object.assign(temp.zh, { title: '综合交易' })
    //   console.log(messageList.value)
    // }
  }, 3000)
}

function mapAtuoStop() {
  if (mapAutoPlayTimer) {
    console.log('run_stop')
    clearInterval(mapAutoPlayTimer)
    mapAutoPlayTimer = null
  }
}

// 地图区域筛选对应数据展示
const navList = ref([
  { name: '建设工程交易金额', value: '450.0' },
  { name: '国土资源成交金额', value: '593.7' },
  { name: '排污权成交金额', value: '614.31' },
  { name: '综合交易成交金额', value: '3019' }
])

const messageList = ref([
  { title: '建设工程', zs: 34, tz: 21635.01, cj: 1171743 },
  { title: '国土资源', zs: 34, tz: 21635.01, cj: 1171743 },
  { title: '排污权交易', zs: 34, tz: 2163, cj: 1171743 },
  { title: '综合交易', zs: 34, tz: 21635.01, cj: 1171743 }
])

const chartAutoRunTimers: any = ref([])

// 清除Echarts默认添加的属性
function removeChartAttr(chartDom: any) {
  try {
    chartDom.removeAttribute('_echarts_instance_')
  } catch (error) {
    console.log(error)
  }
}

// 交易主体情况(2021)
const chart1 = ref()
function initChart1() {
  const chartDom = document.getElementById('chart1')!
  chart1.value = echarts.init(chartDom)
  const chart = toRaw(chart1.value)
  removeChartAttr(chartDom)

  let data = [655, 1637, 931]
  let data2 = [1984, 3278, 3357]
  let y2Data: any = [],
    pictorialBarData: any = [],
    pictorialBarData2: any = []
  const color = ['rgba(45, 200, 239, 1)', 'rgba(45, 200, 239, 1)', 'rgba(218, 110, 45, 1)', 'rgba(218, 110, 45, 1)']
  data.forEach((item, index) => {
    let all = parseFloat((data[index] + data2[index]).toPrecision(2))
    y2Data.push(all)
    pictorialBarData.push(item)
    pictorialBarData2.push(all)
  })
  let option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      backgroundColor: 'rgba(256,256,256,.8)',
      textStyle: {
        color: '#333',
        fontWeight: 'bold'
      },
      formatter: function (parmas: any) {
        let temp = '' + parmas[0].axisValue + '<br/>'
        parmas.forEach((item: any) => {
          if (item.componentSubType !== 'pictorialBar') {
            temp +=
              '<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color: ' +
              color[item.seriesIndex] +
              ';"></span><span>' +
              item.seriesName +
              '：</span>' +
              transAmount(item.value) +
              '<br/>'
          }
        })
        return temp
      }
    },
    grid: {
      top: '18%',
      left: -30,
      right: 60,
      bottom: '8%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      name: '交易主体家数',
      nameTextStyle: {
        color: 'rgba(184, 220, 229, 1)',
        fontSize: 14
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: 'rgba(33, 99, 123, 1)'
        }
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(33, 99, 123, 1)'
        }
      },
      axisLabel: {
        color: 'rgba(184, 220, 229, 1)',
        fontSize: 18,
        padding: [10, 0, 0, 0]
      }
    },
    yAxis: [
      {
        type: 'category',
        axisLine: {
          symbol: ['none', 'arrow'],
          symbolOffset: [0, 8],
          symbolSize: [7, 10],
          lineStyle: {
            color: 'rgba(33, 99, 123, 1)'
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          color: 'rgba(184, 220, 229, 1)',
          fontSize: 18,
          align: 'left',
          margin: 70
        },
        data: ['东莞市', '广东省', '外省']
      },
      {
        type: 'category',
        axisLine: {
          lineStyle: {
            color: 'rgba(33, 99, 123, 1)'
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          fontSize: 18,
          color: '#fff',
          fontFamily: 'PangMenZhengDao',
          padding: [0, 0, 0, 20]
        },
        data: y2Data
      }
    ],
    legend: {
      show: true,
      top: 10,
      right: 20,
      textStyle: {
        color: '#fff',
        fontSize: 18,
        height: 16,
        rich: {}
      },
      itemWidth: 16,
      itemHeight: 16,
      data: [
        {
          name: '活跃',
          icon: 'roundRect',
          itemStyle: {
            color: 'rgba(45, 200, 239, 1)'
          }
        },
        {
          name: '非活跃',
          icon: 'roundRect',
          itemStyle: {
            color: 'rgba(218, 110, 45, 1)'
          }
        }
      ]
    },
    series: [
      {
        name: '活跃',
        type: 'pictorialBar',
        symbol: 'rect',
        symbolSize: [4, 20],
        symbolOffset: [0, 0],
        symbolPosition: 'end',
        z: 12,
        itemStyle: {
          color: 'rgba(125, 241, 255, 1)'
        },
        data: pictorialBarData
      },
      {
        name: '活跃',
        stack: 'total',
        type: 'bar',
        barWidth: 20,
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(45, 200, 239, .1)' // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(45, 200, 239, 1)' // 100% 处的颜色
              }
            ],
            global: false // 缺省为 false
          }
        },
        label: {
          show: true,
          position: 'insideRight',
          fontSize: 14,
          fontWeight: 'bold',
          color: '#FFFFFF',
          lineHeight: 20,
          padding: [0, 3, 0, 0]
        },
        data: data
      },
      {
        name: '非活跃',
        type: 'pictorialBar',
        symbol: 'rect',
        symbolSize: [4, 20],
        symbolOffset: [0, 0],
        symbolPosition: 'end',
        z: 12,
        itemStyle: {
          color: 'rgba(255, 173, 124, 1)'
        },
        data: pictorialBarData2
      },
      {
        name: '非活跃',
        stack: 'total',
        type: 'bar',
        barWidth: 20,
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(218, 110, 45, 1)' // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(218, 110, 45, 1)' // 100% 处的颜色
              }
            ],
            global: false // 缺省为 false
          }
        },
        label: {
          show: true,
          position: 'insideRight',
          fontSize: 14,
          fontWeight: 'bold',
          color: '#FFFFFF',
          lineHeight: 20,
          padding: [0, 3, 0, 0]
        },
        data: data2
      }
    ]
  }

  chart.setOption(option)
  chartAutoRunTimers.value.push({
    name: 'chart1',
    value: tools.loopShowTooltip(chart, option, { loopSeries: true })
  })
}

// 中标下浮率趋势
const chart2 = ref()
function initChart2() {
  const chartDom = document.getElementById('chart2')!
  chart2.value = echarts.init(chartDom)
  const chart = toRaw(chart2.value)
  removeChartAttr(chartDom)

  let axisData: any = ['2019年', '2020年', '2021年', '2022年']
  let seriesTemp: any = []
  let data = [
    {
      name: '简易招标',
      color: 'rgba(27, 183, 86, 1)',
      emphasisBorderColor: 'rgba(27, 183, 86, .4)',
      data: [13.79, 9.87, 8.97, 8.52]
    },
    {
      name: '综合评估',
      color: 'rgba(61, 122, 232, 1)',
      emphasisBorderColor: 'rgba(61, 122, 232, .4)',
      data: [13.65, 7.51, 6.84, 6.71]
    },
    {
      name: '其他',
      color: 'rgba(222, 211, 53, 1)',
      emphasisBorderColor: 'rgba(222, 211, 53, .4)',
      data: [22.45, 11.8, 8.34, 6.15]
    }
  ]
  data.forEach((item) => {
    seriesTemp.push({
      z: 100,
      name: item.name,
      type: 'line',
      symbol: '',
      symbolSize: 12,
      itemStyle: {
        color: item.color
      },
      lineStyle: {
        shadowBlur: 15,
        shadowColor: item.color,
        shadowOffsetX: 0,
        shadowOffsetY: 5
      },
      emphasis: {
        itemStyle: {
          borderColor: item.emphasisBorderColor,
          borderWidth: 10,
          borderType: 'solid'
        }
      },
      data: item.data
    })
  })
  let option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      valueFormatter: (value: any) => {
        return transAmount(value)
      },
      backgroundColor: 'rgba(256,256,256,.7)',
      textStyle: {
        color: '#333',
        fontWeight: 'bold'
      }
    },
    legend: {
      show: true,
      top: 16,
      right: 20,
      textStyle: {
        color: '#fff',
        fontSize: 18
      }
    },
    grid: {
      top: 75,
      left: 25,
      right: 20,
      bottom: '5%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      axisLine: {
        show: true,
        lineStyle: {
          color: 'rgba(33, 99, 123, 1)'
        }
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: 'rgba(33, 99, 123, 1)'
        }
      },
      axisLabel: {
        color: 'rgba(184, 220, 229, 1)',
        fontSize: 18,
        padding: [5, 0, 0, 0]
      },
      data: axisData
    },
    yAxis: {
      type: 'value',
      name: '下浮率（%）',
      nameGap: 20,
      nameTextStyle: {
        color: '#B8DCE6',
        fontSize: 14
      },
      axisLine: {
        show: true,
        symbol: ['none', 'arrow'],
        symbolOffset: [0, 8],
        symbolSize: [7, 10],
        lineStyle: {
          color: 'rgba(33, 99, 123, 1)'
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: 'solid',
          width: 1,
          color: 'rgba(33, 99, 123, 1)'
        }
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: 'rgba(184, 220, 229, 1)',
        fontSize: 18
      }
    },
    series: seriesTemp
  }

  chart.setOption(option)
  chartAutoRunTimers.value.push({
    name: 'chart2',
    value: tools.loopShowTooltip(chart, option, { loopSeries: true })
  })
}

// 当年交易总额
const yearOptions = ref([
  {
    value: '2020',
    label: '2020'
  },
  {
    value: '2021',
    label: '2021'
  },
  {
    value: '2022',
    label: '2022'
  }
])
const transYear = ref({
  value: '2022',
  label: '2022'
})
const chart3 = ref()
function initChart3() {
  const chartDom = document.getElementById('chart3')!
  chart3.value = echarts.init(chartDom)
  const chart = toRaw(chart3.value)
  removeChartAttr(chartDom)

  let axisData: any = [],
    makeLineData: any = [],
    axisList: any = ['2021年7月', '8月', '9月', '10月', '11月', '12月', '2022年1月', '2月', '3月', '4月', '5月', '6月']
  axisList.forEach((i: string) => {
    axisData.push(i)
    makeLineData.push({ xAxis: i })
  })

  let seriesTemp: any = []
  let data = [
    {
      name: '建设工程',
      color: 'rgba(45, 184, 218, 1)',
      areaColor: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: 'rgba(45, 184, 218, .5)' // 0% 处的颜色
          },
          {
            offset: 1,
            color: 'rgba(33, 99, 123, 0)' // 100% 处的颜色
          }
        ],
        global: false // 缺省为 false
      },
      data: [356612.36, 292632.67, 365672.44, 363381.19, 230151.57, 560904.92, 298358.17, 269198.7, 414899.94, 227269.07, 621917.17, 498745.81]
    },
    {
      name: '国土资源',
      color: 'rgba(218, 110, 45, 1)',
      areaColor: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: 'rgba(218, 110, 45, .5)' // 0% 处的颜色
          },
          {
            offset: 1,
            color: 'rgba(33, 99, 123, 0)' // 100% 处的颜色
          }
        ],
        global: false // 缺省为 false
      },
      data: [721870.07, 1551098.12, 756768.45, 296459.0, 40425.0, 295333.0, 94836.0, 27033.0, 104459.0, 779478.0, 32295.0, 1236668.56]
    },
    {
      name: '排污权交易',
      color: 'rgba(241, 176, 47, 1)',
      areaColor: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: 'rgba(241, 176, 47, .5)' // 0% 处的颜色
          },
          {
            offset: 1,
            color: 'rgba(33, 99, 123, 0)' // 100% 处的颜色
          }
        ],
        global: false // 缺省为 false
      },
      data: [147.94, 19.32, 50.21, 16.24, 24.13, 44.95, 36.14, 34.9, 74.6, 115.32, 16.35, 34.19]
    },
    {
      name: '综合交易',
      color: 'rgba(159, 64, 248, 1)',
      areaColor: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: 'rgba(159, 64, 248, .5)' // 0% 处的颜色
          },
          {
            offset: 1,
            color: 'rgba(33, 99, 123, 0)' // 100% 处的颜色
          }
        ],
        global: false // 缺省为 false
      },
      data: [1950.0, 0, 7.42, 0, 7.42, 501.61, 226.56, 0, 234.48, 0.0032, 91.82, 0]
    }
  ]
  data.forEach((item) => {
    seriesTemp.push({
      name: item.name,
      type: 'line',
      symbol: '',
      symbolSize: 12,
      areaStyle: {
        color: item.areaColor
      },
      itemStyle: {
        color: item.color
      },
      emphasis: {
        itemStyle: {
          borderColor: 'rgba(0,0,0,.3)',
          borderWidth: 10,
          borderType: 'solid'
        }
      },
      markLine: {
        symbol: ['none', 'none'],
        label: { show: false },
        lineStyle: {
          type: 'solid',
          width: 1,
          color: 'rgba(33, 99, 123, 1)'
        },
        data: makeLineData
      },
      data: item.data
    })
  })
  let option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      valueFormatter: (value: any) => {
        return transAmount(value)
      },
      backgroundColor: 'rgba(256,256,256,.7)',
      textStyle: {
        color: '#333',
        fontWeight: 'bold'
      }
    },
    legend: {
      show: true,
      top: 16,
      right: 240,
      textStyle: {
        color: '#fff',
        fontSize: 18
      }
    },
    grid: {
      top: 70,
      left: 70,
      right: 0,
      bottom: '5%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      axisLine: {
        show: true,
        lineStyle: {
          color: 'rgba(33, 99, 123, 1)'
        }
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: 'rgba(33, 99, 123, 1)'
        }
      },
      axisLabel: {
        color: 'rgba(184, 220, 229, 1)',
        fontSize: 18
      },
      data: axisData
    },
    yAxis: {
      type: 'value',
      axisLine: {
        show: true,
        symbol: ['none', 'arrow'],
        symbolOffset: [0, 8],
        symbolSize: [7, 10],
        lineStyle: {
          color: 'rgba(33, 99, 123, 1)'
        }
      },
      splitLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: 'rgba(184, 220, 229, 1)',
        fontSize: 18
      }
    },
    series: seriesTemp
  }

  chart.setOption(option)
  chartAutoRunTimers.value.push({
    name: 'chart3',
    value: tools.loopShowTooltip(chart, option, { loopSeries: true })
  })
}

// 各要素交易节资及增值情况
let chart4Timer: any = null
function initChart4() {
  const color = ['#f1b02f', '#AD41E4', '#DA6E2D', '#30C1E5']
  // 初始化 Highcharts 图表
  let chart4 = new Highcharts.Chart('chart4', {
    chart: {
      backgroundColor: 'transparent',
      type: 'pie',
      options3d: {
        enabled: true,
        alpha: 55
      },
      events: {
        // load，图表加载完成时触发
        load: function () {
          let chart = this
          let points = chart.series[0].points
          let len = points.length
          let i = 0
          chart4Timer = setInterval(function () {
            autoTooltip(points[i])
            i++
            if (i === len) {
              i = 0
            }
          }, 2000)
        }
      }
    },
    credits: {
      enabled: false
    },
    title: {
      text: ''
    },
    subtitle: {
      text: ''
    },
    plotOptions: {
      pie: {
        center: ['50%', '40%'],
        size: 300,
        innerSize: 250,
        depth: 45,
        allowPointSelect: true,
        cursor: 'pointer',
        shadow: true,
        dataLabels: {
          enabled: true,
          // 通过 format 或 formatter 来格式化数据标签显示
          formatter: function () {
            return (
              '<b style="font-size:18px;">' +
              this.point.name +
              '</b><br/><b style="color:' +
              color[this.point.index] +
              ';font-size:22px;font-family:PangMenZhengDao;line-height: 30px">' +
              this.percentage.toFixed(2) +
              '%</b>'
            )
          },
          style: {
            color: '#fff',
            lineHeight: 28
          }
        },
        tooltip: {
          pointFormat: '<span style="color:{point.color}">\u25CF</span> <b>{point.y}</b><br/>'
        }
      }
    },
    colors: color,
    tooltip: {
      style: {
        color: '#333',
        fontWeight: 'bold'
      }
    },
    series: [
      {
        name: '',
        data: [
          ['排污权交易', 70.45],
          ['综合交易', 693.04],
          ['国土资源', 507305.2],
          ['建设工程', 260671.47]
        ]
      }
    ]
  })

  function autoTooltip(point: any) {
    chart4.tooltip.refresh(point)
  }
}

// 节约资金
const monSave = ref({
  gcjs: 4196.82,
  gtjy: 21635.01,
  pwqjy: 11717438.19,
  zhjy: 24196.82
})

// 全市工程建设项目各行业投资分布图
const chart5 = ref()
function initChart5() {
  const chartDom = document.getElementById('chart5')!
  chart5.value = echarts.init(chartDom)
  const chart = toRaw(chart5.value)
  removeChartAttr(chartDom)

  let color = [
    { s: '#15CB8D', e: '#1B977B' },
    { s: '#9A5AFA', e: '#6D0CC7' },
    { s: '#5A87FA', e: '#0C30C7' },
    { s: '#F07803', e: '#BC5800' },
    { s: '#F0AB03', e: '#9F7100' },
    { s: '#5ABBFA', e: '#0C66C7' }
  ]
  let data: any = [
    { name: '市政工程', value: 396 },
    { name: '房建工程', value: 954 },
    { name: '园林绿化', value: 35 },
    { name: '水务工程', value: 253 },
    { name: '公路工程', value: 14 },
    { name: '其他工程', value: 389 }
  ]

  data.forEach((item: any, index: number) => {
    item.itemStyle = {
      color: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: color[index].s // 0% 处的颜色
          },
          {
            offset: 1,
            color: color[index].e // 100% 处的颜色
          }
        ],
        global: false // 缺省为 false
      }
    }
  })

  let option = {
    backgroundColor: 'transparent',
    title: {
      text: '各行业投资',
      top: 'center',
      left: '32%',
      textStyle: {
        color: '#B4D7E1',
        fontSize: 20
      }
    },
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(256,256,256,.7)',
      textStyle: {
        color: '#333',
        fontWeight: 'bold'
      }
    },
    legend: {
      orient: 'vertical',
      top: 20,
      right: 10,
      itemWidth: 16,
      itemHeight: 16,
      itemGap: 15,
      textStyle: {
        height: 16,
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        rich: {}
      }
    },
    series: [
      {
        name: '',
        type: 'pie',
        radius: ['40%', '60%'],
        center: ['40%', '50%'],
        clockwise: false,
        avoidLabelOverlap: false,
        itemStyle: {
          borderColor: '#12292f',
          borderWidth: 5
        },
        emphasis: {
          scaleSize: 15
        },
        label: {
          show: true,
          formatter: function (parmas: any) {
            const { name, value, dataIndex } = parmas
            let temp
            switch (dataIndex) {
              case 0:
                temp = '{b1|' + value + '亿元}'
                break
              case 1:
                temp = '{b2|' + value + '亿元}'
                break
              case 2:
                temp = '{b3|' + value + '亿元}'
                break
              case 3:
                temp = '{b4|' + value + '亿元}'
                break
              case 4:
                temp = '{b5|' + value + '亿元}'
                break
              case 5:
                temp = '{b6|' + value + '亿元}'
                break
            }
            return '{a|' + name + '}\n' + temp
          },
          rich: {
            a: {
              fontSize: 18,
              fontWeight: 'bold',
              color: '#fff'
            },
            b1: {
              fontSize: 26,
              lineHeight: 40,
              fontFamily: 'PangMenZhengDao',
              fontWeight: 'bold',
              color: '#1AA17E'
            },
            b2: {
              fontSize: 26,
              lineHeight: 40,
              fontFamily: 'PangMenZhengDao',
              fontWeight: 'bold',
              color: '#8D44EC'
            },
            b3: {
              fontSize: 26,
              lineHeight: 40,
              fontFamily: 'PangMenZhengDao',
              fontWeight: 'bold',
              color: '#426CEA'
            },
            b4: {
              fontSize: 26,
              lineHeight: 40,
              fontFamily: 'PangMenZhengDao',
              fontWeight: 'bold',
              color: '#EF7803'
            },
            b5: {
              fontSize: 26,
              lineHeight: 40,
              fontFamily: 'PangMenZhengDao',
              fontWeight: 'bold',
              color: '#E7A503'
            },
            b6: {
              fontSize: 26,
              lineHeight: 40,
              fontFamily: 'PangMenZhengDao',
              fontWeight: 'bold',
              color: '#4DACF1'
            }
          }
        },
        labelLine: {
          show: true,
          lineStyle: {
            cap: 'round'
          }
        },
        data: data
      }
    ]
  }

  chart.setOption(option)
  chartAutoRunTimers.value.push({
    name: 'chart5',
    value: tools.loopShowTooltip(chart, option, { loopSeries: true })
  })
}

// 投标保证电子保函占比
const chart6 = ref()
function initChart6() {
  const chartDom = document.getElementById('chart6')!
  chart6.value = echarts.init(chartDom)
  const chart = toRaw(chart6.value)
  removeChartAttr(chartDom)

  let data: any = [
    {
      name: '保证金',
      value: 96.21,
      itemStyle: {
        color: '#2DC7ED',
        shadowBlur: 30,
        shadowColor: 'rgba(49, 202, 252, .5)'
      }
    },
    {
      name: '电子保函',
      value: 67.74,
      itemStyle: {
        color: '#458AD7',
        shadowBlur: 30,
        shadowColor: 'rgba(49, 202, 252, .5)'
      }
    }
  ]
  data = rebuildPeiSpace(data)
  let option = {
    color: ['#2DC7ED', '#D76E45', '#458AD7'],
    backgroundColor: 'transparent',
    title: {
      text: '金额占比',
      top: 'center',
      left: 'center',
      textStyle: {
        color: '#B4D7E1',
        fontSize: 20
      }
    },
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(256,256,256,.7)',
      formatter: function (parmas: any) {
        const { marker, name, value } = parmas
        if (name) {
          return marker + name + '：' + value + '亿元'
        }
      },
      textStyle: {
        color: '#333',
        fontWeight: 'bold'
      }
    },
    series: [
      {
        name: '',
        type: 'pie',
        radius: ['50%', '62%'],
        avoidLabelOverlap: false,
        emphasis: {
          scaleSize: 12
        },
        label: {
          show: true,
          formatter: function (parmas: any) {
            const { name, dataIndex } = parmas
            if (name) {
              return '{a|' + name + '}\n{b' + (Math.floor(dataIndex / 2) + 1) + '|' + data[dataIndex].percent + '%}'
            }
          },
          rich: {
            a: {
              fontSize: 18,
              fontWeight: 'bold',
              color: '#fff'
            },
            b1: {
              fontSize: 28,
              fontWeight: 'bold',
              lineHeight: 40,
              fontFamily: 'PangMenZhengDao',
              color: '#2DC7ED'
            },
            b2: {
              fontSize: 28,
              fontWeight: 'bold',
              lineHeight: 40,
              fontFamily: 'PangMenZhengDao',
              color: '#458AD7'
            },
            b3: {
              fontSize: 28,
              fontWeight: 'bold',
              lineHeight: 40,
              fontFamily: 'PangMenZhengDao',
              color: '#458AD7'
            }
          }
        },
        labelLine: {
          show: true,
          length: 30
        },
        data: data
      }
    ]
  }
  chart.setOption(option)
  chartAutoRunTimers.value.push({
    name: 'chart6',
    value: tools.loopShowTooltip(chart, option, { loopSeries: true })
  })
}

// 市属-镇街(园区)投资额占比
const chart7 = ref()
function initChart7() {
  const chartDom = document.getElementById('chart7')!
  chart7.value = echarts.init(chartDom)
  const chart = toRaw(chart7.value)
  removeChartAttr(chartDom)

  let data: any = [
    {
      name: '市属项目',
      value: 1368.71,
      itemStyle: {
        color: 'rgba(37, 185, 234, 0.6)',
        borderColor: '#31CAFC',
        shadowBlur: 50,
        shadowColor: 'rgba(49, 202, 252, .5)'
      }
    },
    {
      name: '镇街（园区）项目',
      value: 672.42,
      itemStyle: {
        color: 'rgba(228, 166, 45, 0.6)',
        borderColor: '#F8B93F',
        shadowBlur: 50,
        shadowColor: 'rgba(248, 185, 63, .5)'
      }
    }
  ]
  data = rebuildPeiSpace(data)
  let option = {
    backgroundColor: 'transparent',
    title: {
      text: '投资额占比',
      top: 'center',
      left: '26.5%',
      textStyle: {
        color: '#B4D7E1',
        fontSize: 20
      }
    },
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(256,256,256,.7)',
      formatter: function (parmas: any) {
        const { marker, name, value } = parmas
        if (name) {
          return marker + name + '：' + value
        }
      },
      textStyle: {
        color: '#333',
        fontWeight: 'bold'
      }
    },
    legend: {
      top: 60,
      right: 15,
      itemWidth: 16,
      itemHeight: 16,
      itemGap: 15,
      width: 80,
      formatter: function (v: any) {
        let temp = '{a|' + v + '}\n'
        data.forEach((item: any, index: number) => {
          if (v == item.name) {
            if (index == 1) {
              temp += '{b1|' + transAmount(item.value) + '}{c|亿元}\n{b1|' + item.percent + '%}'
            }
            if (index == 3) {
              temp += '{b2|' + transAmount(item.value) + '}{c|亿元}\n{b2|' + item.percent + '%}'
            }
          }
        })
        return temp
      },
      textStyle: {
        height: 16,
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        rich: {
          a: {
            fontSize: 18,
            fontWeight: 'bold',
            padding: [0, 0, 0, 8]
          },
          b1: {
            fontSize: 24,
            fontFamily: 'PangMenZhengDao',
            fontWeight: 'bold',
            color: ' #2DC7ED',
            lineHeight: 40,
            padding: [15, 0, 0, -20]
          },
          b2: {
            fontSize: 24,
            fontFamily: 'PangMenZhengDao',
            fontWeight: 'bold',
            color: '#F8B93F',
            lineHeight: 40,
            padding: [15, 0, 0, -20]
          },
          c: {
            fontSize: 14,
            color: '#B0D3DD',
            padding: [25, 0, 0, 15]
          }
        }
      }
    },
    series: [
      {
        name: '',
        type: 'pie',
        radius: ['50%', '62%'],
        center: ['35%', '50%'],
        itemStyle: {
          borderWidth: 3
        },
        emphasis: {
          scaleSize: 12
        },
        label: {
          show: false,
          position: 'center'
        },
        labelLine: {
          show: false
        },
        data: data
      }
    ]
  }
  chart.setOption(option)
  chartAutoRunTimers.value.push({
    name: 'chart7',
    value: tools.loopShowTooltip(chart, option, { loopSeries: true })
  })
}

// 添加隔断
function rebuildPeiSpace(seriesData: any) {
  let all = 0,
    max = seriesData[0].value
  for (let i = seriesData.length - 1; i >= 0; i--) {
    all += seriesData[i].value
    if (seriesData[i].value > max) max = seriesData[i].value
    seriesData.splice(i, 0, {
      name: '',
      value: 0,
      itemStyle: {
        color: 'transparent',
        borderColor: 'transparent'
      }
    })
  }
  seriesData.forEach((item: any) => {
    if (!item.name) {
      item.value = Math.ceil(max * 0.02)
    } else {
      item.percent = ((item.value / all) * 100).toFixed(2)
    }
  })
  return seriesData
}
</script>
<style lang="scss" scoped src="../Home.scss"></style>
