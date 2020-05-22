<template>
  <div class="ckrb_wrap">
    <div
      style="display:flex;border:1px solid #ccc;padding:5px 15px;margin:0 0 10px 0;borderRadius:5px;"
    >
      <div>
        <span>日期：</span>
        <el-date-picker
          v-model="allDate"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="dateClick"
        ></el-date-picker>
      </div>
      <div style="margin:0 10px">
        <el-button type="primary" @click.native="searchForm('ruleForm')">检索</el-button>
        <el-button @click.native="resetForm">重置</el-button>
      </div>
    </div>
    <div class="clothtable1">
      <el-table
        :border="true"
        :row-style="{height:'20px'}"
        :cell-style="{padding:'0px'}"
        style="width: 100%"
        :data="list"
        max-height="500"
      >
        <el-table-column type="index" label="序号" align="center"></el-table-column>
        <el-table-column property="updateTime" label="更新时间" align="center" width="180"></el-table-column>
        <el-table-column label="细码单类型" align="center" width="180">
          <template
            slot-scope="scope"
          >{{ scope.row.style == 1?'入库':'出库'}}</template>
        </el-table-column>
        <el-table-column property="storageNo" label="细码单" align="center" width="180"></el-table-column>
        <el-table-column property="quNo" label="区号" align="center" width="180"></el-table-column>
        <el-table-column property="cangku" label="卡位号" align="center" width="180"></el-table-column>
        <el-table-column property="produceNo" label="生产单号" align="center" width="180"></el-table-column>
        <el-table-column property="gangHao" label="缸号" align="center" width="180"></el-table-column>
        <el-table-column property="clothId" label="布编" align="center" width="120"></el-table-column>
        <el-table-column property="jNo" label="卷数" align="center" width="120"></el-table-column>
        <el-table-column property="maQuanity" label="码长" align="center" width="120"></el-table-column>
        <el-table-column property="state" label="状态" align="center" width="120">
          <!-- <template
            slot-scope="scope"
          >{{ scope.row.state == '0'?'已入库':'已出库'}}</template> -->
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import * as kfglApi from "@/api/warehouseApi.js";
import querystring from "querystring";

export default {
  name: "crkrb",
  data() {
    return {
      allDate: "",
      timeList: [],
      list: [],
    };
  },
  methods: {
    // 模糊搜索 修改时间格式并获取
    dateClick() {
      let starttime = this.allDate[0];
      let endtime = this.allDate[1];
      let start =
        starttime.getFullYear() +
        "-" +
        this.p(starttime.getMonth() + 1) +
        "-" +
        this.p(starttime.getDate());
      let end =
        endtime.getFullYear() +
        "-" +
        this.p(endtime.getMonth() + 1) +
        "-" +
        this.p(endtime.getDate());
      this.$set(this.timeList, "start", start);
      this.$set(this.timeList, "end", end);
    },
    // 时间的补 0
    p(s) {
      return s < 10 ? "0" + s : s;
    },
    // 模糊搜索
    searchForm() {
      let _data = this.timeList;
      kfglApi
        .postSelStorageShow(querystring.stringify(_data))
        .then(res => {
          this.list = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 重置
    resetForm() {
      this.timeList = JSON.parse(JSON.stringify(this.defaultForm));
      this.allData = "";
    }
  },
  created() {
    this.defaultForm = JSON.parse(JSON.stringify(this.timeList));
  },
  mounted() {}
};
</script>

<style scoped>
</style>