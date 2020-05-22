<template>
  <div class="warehouse">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="入库细码单">
        <el-input v-model="XMD" placeholder="请输入单号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.native="yardSingleSearch">查询</el-button>
      </el-form-item>
    </el-form>

    <el-form :inline="true" label-width="82px" class="demo-ruleForm" :model="fourList">
      <el-form-item label="合同单号:">
        <el-input v-model="fourList.contractNo" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="生产单号:">
        <el-input v-model="fourList.produceNo" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="布编号:">
        <el-input v-model="fourList.clothId" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="缸号:">
        <el-input v-model="fourList.gangHao" :disabled="true"></el-input>
      </el-form-item>
    </el-form>

    <el-form :inline="true" class="demo-ruleForm">
      <el-col :span="6">
        <el-form-item label="匹条存放位置:">
          <el-select v-model="factList1.fact" @change="depositClick1" :disabled="disabled1">
            <el-option v-for="item in factList1" :key="item.value" :value="item.fact">{{item.fact}}</el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="布存放位置:">
          <el-select v-model="factList2.fact" @change="depositClick2" :disabled="disabled1">
            <el-option v-for="item in factList2" :key="item.value" :value="item.fact">{{item.fact}}</el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="备注:">
          <el-input v-model="remarks" type="textarea" resize="none" :disabled="disabled1"></el-input>
        </el-form-item>
      </el-col>
    </el-form>
    <el-col :span="6">
      <div>
        <!-- <el-button type="warning" :disabled="disabled2">编辑</el-button> -->
        <el-button type="primary" @click.native="yardSingleSubmit" :disabled="disabled2">提交</el-button>
        <el-button type="success" @click.native="yardSingleReset">重置</el-button>
      </div>
    </el-col>
    <el-table
      :border="true"
      :row-style="{height:'20px'}"
      :cell-style="{padding:'0px'}"
      style="width: 100%"
      class="grnTable"
      max-height="300"
      :data="singleCodeList"
    >
      <el-table-column type="index" label="序号" align="center"></el-table-column>
      <el-table-column property="jNo" label="卷号" align="center"></el-table-column>
      <el-table-column property="maQuanity" label="码数" align="center"></el-table-column>
      <el-table-column property="lot" label="LOT" align="center"></el-table-column>
      <el-table-column property="cangku" label="卡位" align="center">
        <!-- <template>
          <span>{{otherList.cangku}}</span>
        </template>-->
      </el-table-column>
      <el-table-column property="ptcangku" label="匹条" align="center">
        <!-- <template>
          <span>{{otherList.ptcangku}}</span>
        </template>-->
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import * as kfglApi from "@/api/warehouseApi.js";
import querystring from "querystring";

export default {
  data() {
    return {
      //   xmdList: {
      //     XMD: ""
      //   },
      XMD: "",
      fourList: {}, // 细码单主要信息四个
      singleCodeList: [],
      factList1: {},
      factList2: {},
      disabled1: false,
      disabled2: false,
      remarks: "",
      pending: "", // 判断走提交接口 还是 编辑接口
      stateSelect: "",
      value1: "",
      value2: "",
      value3: "",
      value4: ""
    };
  },
  methods: {
    // 匹条存放位置
    depositClick1(cangku) {
      let cang_ku = cangku;
      for (var i = 0; i < this.singleCodeList.length; i++) {
        Object.assign(this.singleCodeList[i], { cangku: cang_ku });
      }
    },
    // 布存放位置
    depositClick2(ptcangku) {
      let ptcang_ku = ptcangku;
      for (var i = 0; i < this.singleCodeList.length; i++) {
        Object.assign(this.singleCodeList[i], { ptcangku: ptcang_ku });
      }
    },
    // 时间的补 0
    p(s) {
      return s < 10 ? "0" + s : s;
    },
    // 提交入库细码单
    yardSingleSubmit() {
      let time1 = new Date();
      let a =
        time1.getFullYear() +
        "-" +
        this.p(time1.getMonth() + 1) +
        "-" +
        this.p(time1.getDate());
      let b =
        this.p(time1.getHours()) +
        ":" +
        this.p(time1.getMinutes()) +
        ":" +
        this.p(time1.getSeconds());
      let inDate = a + "-" + b;
      for (var i = 0; i < this.singleCodeList.length; i++) {
        Object.assign(this.singleCodeList[i], {
          inDate: inDate,
          inPerson: "10001",
          no: i + 1,
          remarks: this.remarks
        });
      }
      let _data = this.singleCodeList;
      if (this.pending == "1") {
        // console.log("提交");
        kfglApi
          .postLargeCargoWarehouse(_data)
          .then(res => {
            if (res.code == 200) {
              this.$message({ message: "入库成功", duration: 2000 });
              this.pending = "1";
              this.yardSingleSearch();
              // this.singleCodeList = JSON.parse(JSON.stringify(this.defaultList1));
              // this.fourList = JSON.parse(JSON.stringify(this.defaultList2));
              // this.$set(this.factList1, "fact", "");
              // this.$set(this.factList2, "fact", "");
              // this.remarks = "";
              // this.xmdList.XMD = "";
            } else {
              this.$message({ message: res.msg, duration: 2000 });
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        console.log("编辑");
        kfglApi
          .postInHouse(_data)
          .then(res => {
            if (res.code == 200) {
              this.$message({ message: "提交成功", duration: 2000 });
              this.yardSingleSearch();
              // this.singleCodeList = JSON.parse(JSON.stringify(this.defaultList1));
              // this.fourList = JSON.parse(JSON.stringify(this.defaultList2));
              // this.$set(this.factList1, "fact", "");
              // this.$set(this.factList2, "fact", "");
              // this.remarks = "";
              // this.xmdList.XMD = "";
            } else {
              this.$message({ message: res.msg, duration: 2000 });
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    // 重置入库细码单
    yardSingleReset() {
      this.singleCodeList = JSON.parse(JSON.stringify(this.defaultList1));
      this.fourList = JSON.parse(JSON.stringify(this.defaultList2));
      this.$set(this.factList1, "fact", "");
      this.$set(this.factList2, "fact", "");
      this.remarks = "";
      xmdList.XMD = "";
    },
    // 查询入库细码单
    yardSingleSearch() {
      this.pending = "";
      this.disabled1 = false;
      let _data = {
        XMD: this.XMD
      };
      kfglApi
        .getStorageDetailCode(_data)
        .then(res => {
          if (res.code == 200) {
            this.warehouseScreens1();
            this.warehouseScreens2();
            let {
              contractNo,
              gangHao,
              clothId,
              produceNo,
              cangku,
              state
            } = res.data[0];
            this.$set(this.fourList, "contractNo", contractNo);
            this.$set(this.fourList, "gangHao", gangHao);
            this.$set(this.fourList, "clothId", clothId);
            this.$set(this.fourList, "produceNo", produceNo);
            //   console.log(state)
            if (state == "2") {
              //已审批
              this.disabled1 = true;
              this.disabled2 = true;
              // console.log("11");
            } else if (state == "0") {
              // 待入库
              this.pending = "1";
              this.disabled1 = false;
              this.disabled2 = false;
              // console.log("22");
            } else if (state == "1") {
              // 待审批
              this.disabled1 = false;
              this.disabled2 = false;
              // console.log("33");
            }
            this.stateSelect = state;
            this.singleCodeList = res.data;
          } else {
            this.$message({ message: res.msg, duration: 2000 });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 加载皮条
    warehouseScreens1() {
      let _data = {
        condition: "1=1",
        symbol: "1"
      };
      kfglApi
        .getWarehouseScreens(_data)
        .then(res => {
          this.factList1 = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 加载卡位
    warehouseScreens2() {
      let _data = {
        condition: "1=1",
        symbol: "0"
      };
      kfglApi
        .getWarehouseScreens(_data)
        .then(res => {
          this.factList2 = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.defaultList1 = JSON.parse(JSON.stringify(this.singleCodeList));
    this.defaultList2 = JSON.parse(JSON.stringify(this.fourList));
  },
  mounted() {
    this.XMD = sessionStorage.getItem("XMD")
  }
};
</script>

<style scoped>
.grnTable {
  margin-top: 15px;
}
</style>