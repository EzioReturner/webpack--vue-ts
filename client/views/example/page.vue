<template>
  <section class="infoTable">
    <header class="tableHeader">
      <span class="title">优惠券方案类型</span>
      <el-select v-model="value" placeholder="请选择" style="margin-right:24px;">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <span class="title">细分维度</span>
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-button
        class="btn btn-blue search"
        style="margin-left:24px;height: 30px;"
        size="mini"
        @click="handleApplyCondition"
      >
        <span>应用</span>
      </el-button>
      <el-button
        class="btn btn-blue search"
        icon="el-icon-download"
        style="margin-left:16px;height: 30px;"
        size="mini"
        @click="handleDownloadCsv"
      >
        <span>下载</span>
      </el-button>
    </header>
    <div style="width:1000px;"></div>
  </section>
</template>

<script>
export default {
  name: 'sectionTable',
  data() {
    return {
      value: '',
      options: [{ label: '全部', value: 0 }],
      tableData: [],
      tableColumn: [
        {
          label: '折扣区间',
          prop: 'interval'
        },
        {
          label: '发券量',
          prop: 'sendNum'
        },
        {
          label: '用券量',
          prop: 'usedNum'
        },
        {
          label: '用券新用户数',
          prop: 'firstUsedNum'
        },
        {
          label: '可用券数',
          prop: 'useableNum'
        }
      ]
    };
  },
  methods: {
    handleApplyCondition() {},
    handleDownloadCsv() {}
  },
  mounted() {
    this.tableData = Array(20)
      .fill(1)
      .map(res => ({
        id: Math.random()
          .toString(36)
          .substr(2),
        interval: Math.floor(Math.random() * 10),
        sendNum: Math.floor(Math.random() * 1000000),
        usedNum: Math.floor(Math.random() * 100000),
        firstUsedNum: Math.floor(Math.random() * 10000),
        useableNum: Math.floor(Math.random() * 1000),
        children: [
          {
            id: Math.random()
              .toString(36)
              .substr(2),
            interval: Math.floor(Math.random() * 10),
            sendNum: Math.floor(Math.random() * 1000000),
            usedNum: Math.floor(Math.random() * 100000),
            firstUsedNum: Math.floor(Math.random() * 10000),
            useableNum: Math.floor(Math.random() * 1000)
          }
        ]
      }));
  }
};
</script>

<style lang="less" scoped>
.infoTable {
  .tableHeader {
    height: 50px;
    display: flex;
    padding: 8px 12px;
    align-items: center;
    .title {
      margin-right: 16px;
    }
    /deep/ .el-input__inner {
      height: 32px;
    }
    /deep/ .el-select .el-input .el-select__caret {
      line-height: 32px;
    }
  }
}
</style>
