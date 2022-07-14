<template>
  <section class="screen-2 f-else f-con f-d-c">
    <div class="nor-col f-con a-c" style="margin-bottom: 20px">
      <div class="card-1-4 f-con f-d-c">
        <div class="nor-lab">投标人中标率TOP10</div>
        <div class="tab-con f-else f-con a-c">
          <el-table :data="tableData">
            <el-table-column
              type="index"
              label="序号"
              width="70"
              align="center"
            />
            <el-table-column
              prop="name"
              label="企业名称"
              show-overflow-tooltip="true"
            />
            <el-table-column prop="count" label="中标次数" width="150" />
            <el-table-column
              prop="num"
              label="中标金额（亿元）"
              width="200"
              :formatter="numFormatter"
            />
          </el-table>
        </div>
      </div>
      <div class="card-3-8">
        <div class="nor-lab">全年各行业企业投标活跃度</div>
      </div>
      <div class="card-3-8">
        <div class="nor-lab">各评标办法企业投标活跃度</div>
      </div>
    </div>
    <div class="nor-col f-con a-c">
      <div class="card-1-4">
        <div class="nor-lab">招标代理承接业务TOP10</div>
        <div class="tab-con f-else f-con a-c">
          <el-table :data="tableData2">
            <el-table-column
              type="index"
              label="序号"
              width="70"
              align="center"
            />
            <el-table-column
              prop="name"
              label="企业名称"
              show-overflow-tooltip="true"
            />
            <el-table-column prop="count" label="承接业务量" width="150" />
            <el-table-column
              prop="num"
              label="预算金额（亿元）"
              width="200"
              :formatter="numFormatter"
            />
          </el-table>
        </div>
      </div>
      <div class="card-1-4">
        <div class="nor-lab">市场主体异常行为横向监测</div>
      </div>
      <div class="card-1-4">
        <div class="nor-lab">市场主体异常行为纵向监测</div>
      </div>
      <div class="card-1-4">
        <div class="nor-lab">专家行为偏离度检测</div>
      </div>
    </div>
  </section>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { transAmount } from "@/utils/amountSplit";

// 投标人中标率TOP10
const tableData = ref([
  {
    name: "东莞华贝电子科技有限公司东莞华贝电子科技有限公司东莞华贝电子科技有限公司东莞华贝电子科技有限公司",
    count: 3,
    num: 123435,
  },
  {
    name: "东莞华贝电子科技有限公司",
    count: 3,
    num: 123435,
  },
  {
    name: "东莞华贝电子科技有限公司",
    count: 3,
    num: 123435,
  },
  {
    name: "东莞华贝电子科技有限公司",
    count: 3,
    num: 123435,
  },
  {
    name: "东莞华贝电子科技有限公司",
    count: 3,
    num: 123435,
  },
  {
    name: "东莞华贝电子科技有限公司",
    count: 3,
    num: 123435,
  },
  {
    name: "东莞华贝电子科技有限公司",
    count: 3,
    num: 123435,
  },
  {
    name: "东莞华贝电子科技有限公司",
    count: 3,
    num: 123435,
  },
  {
    name: "东莞华贝电子科技有限公司",
    count: 3,
    num: 123435,
  },
  {
    name: "东莞华贝电子科技有限公司",
    count: 3,
    num: 123435,
  },
]);

// 招标代理承接业务TOP10
const tableData2 = ref([
  {
    name: "东莞华贝电子科技有限公司东莞华贝电子科技有限公司东莞华贝电子科技有限公司东莞华贝电子科技有限公司",
    count: 3,
    num: 123435,
  },
  {
    name: "东莞华贝电子科技有限公司",
    count: 3,
    num: 123435,
  },
  {
    name: "东莞华贝电子科技有限公司",
    count: 3,
    num: 123435,
  },
  {
    name: "东莞华贝电子科技有限公司",
    count: 3,
    num: 123435,
  },
  {
    name: "东莞华贝电子科技有限公司",
    count: 3,
    num: 123435,
  },
  {
    name: "东莞华贝电子科技有限公司",
    count: 3,
    num: 123435,
  },
  {
    name: "东莞华贝电子科技有限公司",
    count: 3,
    num: 123435,
  },
  {
    name: "东莞华贝电子科技有限公司",
    count: 3,
    num: 123435,
  },
  {
    name: "东莞华贝电子科技有限公司",
    count: 3,
    num: 123435,
  },
  {
    name: "东莞华贝电子科技有限公司",
    count: 3,
    num: 123435,
  },
]);

const numFormatter = (row: any, column: any, cellValue: any, index: any) => {
  return transAmount(cellValue);
};
</script>
<style lang="scss" scoped src="./ScreenTwo.scss"></style>
