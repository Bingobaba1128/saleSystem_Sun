<template>
  <div>
    <div>
      <span>类型：</span>
      <el-select v-model="value" placeholder="请选择">
        <el-option v-for="item in optionsList" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
      <span style="marginLeft:15px;">单号：</span>
      <el-input type="text" style="width:200px;"></el-input>
      <el-button type="primary" @click.native="searchList" style="marginLeft:15px;">查询</el-button>
    </div>

    <div style="marginTop:20px;">
      <el-table
        :border="true"
        :row-style="{height:'20px'}"
        :cell-style="{padding:'0px'}"
        highlight-current-row
        style="width: 100%"
        :data="loadchukuList"
        max-height="270"
        @row-click="chukuStorageOut"
      >
        <el-table-column type="index" label="序号" align="center"></el-table-column>
        <el-table-column property="ckNo" label="出库单号" align="center"></el-table-column>
        <el-table-column property="totalQuanity" label="总码数" align="center"></el-table-column>
        <el-table-column property="totalJianShu" label="总件数" align="center"></el-table-column>
        <el-table-column label="状态" align="center">
          <template
            slot-scope="scope"
          >{{scope.row.state == 0?"未出库,未确认":scope.row.state == 1?"已出库,待确认":"已出库,已确认"}}</template>
        </el-table-column>
        <el-table-column label="快递单号" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.kuaiDiNo" size="mini" :disabled="scope.row.state !== '1'"></el-input>
          </template>
        </el-table-column>
        <el-table-column property="operateName" label="操作人" align="center"></el-table-column>
        <el-table-column label="操作" width="150px" fixed="right" align="center">
          <template slot-scope="scope">
            <el-button
              @click.native="confirmClick(scope.row)"
              type="success"
              size="mini"
              style="margin:2px -8px;width:140px;"
              :disabled="scope.row.state !== '1'"
            >{{scope.row.state == 2?"已确认":"确认"}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div style="marginTop:20px;">
      <el-table
        :border="true"
        :row-style="{height:'20px'}"
        :cell-style="{padding:'0px'}"
        style="width: 100%"
        max-height="270"
        :data="chukuDetailList"
      >
        <el-table-column type="index" label="序号" align="center"></el-table-column>
        <el-table-column property="jNo" label="卷号" align="center"></el-table-column>
        <el-table-column property="clothId" label="布编" align="center"></el-table-column>
        <el-table-column property="factQuanity" label="码数" align="center"></el-table-column>
        <el-table-column property="lot" label="LOT" align="center"></el-table-column>
        <el-table-column property="cangku" label="卡位" align="center"></el-table-column>
        <el-table-column property="gangHao" label="缸号" align="center"></el-table-column>
        <el-table-column label="状态" align="center">
          <template
            slot-scope="scope"
          >{{scope.row.state == 0?"待出库":scope.row.state == 1?"已出库":"已确认"}}</template>
        </el-table-column>
        <el-table-column label="操作" width="150px" fixed="right" align="center">
          <template slot-scope="scope">
            <el-button
              @click.native="outboundClick(scope.row)"
              type="success"
              size="mini"
              style="margin:2px -8px;width:140px;"
              :disabled="scope.row.state !== 0"
            >{{scope.row.state == 0?"出库":scope.row.state == 1?"已出库":"已确认"}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import * as kfglApi from "@/api/warehouseApi.js";
import querystring from "querystring";

export default {
  name: "ckqr",
  data() {
    return {
      value: "", // 检索里边的model
      selectckNo: "",
      optionsList: [
        {
          name: "大货出库",
          value: 1,
          id: 1
        },
        {
          name: "大货出库",
          value: 2,
          id: 2
        },
        {
          name: "大货出库",
          value: 3,
          id: 3
        },
        {
          name: "大货出库",
          value: 4,
          id: 4
        },
        {
          name: "大货出库",
          value: 5,
          id: 5
        },
        {
          name: "大货出库",
          value: 6,
          id: 6
        },
        {
          name: "大货出库",
          value: 7,
          id: 7
        }
      ],
      loadchukuList: [],
      chukuDetailList: []
    };
  },
  methods: {
    // 主表确认
    confirmClick(row) {
      if(row.kuaiDiNo){
        let id = sessionStorage.getItem("id");
        let _data = {
          ckNo: row.ckNo,
          kuaiDiNo: row.kuaiDiNo,
          personId: id,
        };
        kfglApi
          .posteditstorageOutState(querystring.stringify(_data))
          .then(res => {
            this.$message({ message: res.msg, duration: 2000 });
            this.searchList()
          })
          .catch(err => {
            console.log(err);
          });
      }else{
        this.$message({ message: "请填写快递单号", duration: 2000 });
      }
    },
    // 子表出库
    chuku(xmd) {
      let id = sessionStorage.getItem("id");
      let _data = {
        xMD: xmd,
        personId: id,
      };
      kfglApi
        .postchuku(querystring.stringify(_data))
        .then(res => {
          this.$message({ message: res.msg, duration: 2000 });
          this.chukuStorageOutDetail(this.selectckNo)
          this.refreshFunction(this.selectckNo)
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 点击出库
    outboundClick(row) {
      this.chuku(row.bxmd);
    },
    // 刷新出库细码单对应的主表
    refreshFunction(selectckNo){
      let _data = {
        ckNo: selectckNo,
      };
      kfglApi
        .postLoadChukuQueRen(querystring.stringify(_data))
        .then(res => {
          this.loadchukuList = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 出库快递单查询加载
    searchList() {
      kfglApi
        .postLoadChukuQueRen()
        .then(res => {
          this.loadchukuList = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 快递单号单击下
    chukuStorageOut(row) {
      this.selectckNo = row.ckNo;
      this.chukuStorageOutDetail(this.selectckNo)
    },
    // 快递单号单击详情
    chukuStorageOutDetail(selectckNo){
      let _data = {
        ckNo: selectckNo,
      };
      kfglApi
        .postChukuStorageOut(querystring.stringify(_data))
        .then(res => {
          this.chukuDetailList = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
  },
  created() {},
  mounted() {}
};
</script>

<style scoped>
</style>