<template>
  <div>
    <div class="box1">
      <el-form label-width="auto" class="demo-ruleForm form1" :inline="true">
        <el-form-item label="区号:">
          <el-select v-model="quNo" placeholder="请选择区号" @change="quNoClick">
            <el-option
              v-for="item in list1"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="行号:">
          <el-select
            v-model="rowNo"
            placeholder="请选择行号"
            @change="rowNoClick"
            :disabled="rowNoDisabled"
          >
            <el-option
              v-for="item in list2"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="列号:">
          <el-select
            v-model="columnNo"
            placeholder="请选择列号"
            @change="columnNoClick"
            :disabled="columnNoDisabled"
          >
            <el-option
              v-for="item in list3"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上下:">
          <el-select
            v-model="shangXia"
            placeholder="请选择上下"
            @change="shangXiaClick"
            :disabled="shangXiaDisabled"
          >
            <el-option
              v-for="item in list4"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="marginLeft:40px;">
          <el-button type="primary" @click.native="searchForm">检索</el-button>
          <el-button @click.native="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="box2" style="marginTop:20px;">
      <el-table
        :border="true"
        :row-style="{height:'20px'}"
        :cell-style="{padding:'0px'}"
        style="width: 100%"
        :data="cangkuList"
        max-height="500"
      >
        <el-table-column type="index" label="序号" align="center"></el-table-column>
        <el-table-column property="cangku" label="卡位号" align="center"></el-table-column>
        <el-table-column label="状态" align="center" width="200">
          <template slot-scope="scope">
            <div :class="scope.row.state == 1? 'active':'native'">{{scope.row.state == 1?"占用":"空闲"}}</div>
          </template>
        </el-table-column>
        <el-table-column label="详情" width="200px" fixed="right" align="center">
          <template slot-scope="scope">
            <el-button
              @click.native="detailClick(scope.row)"
              type="primary"
              size="mini"
              style="margin:2px -10px;width:190px;"
            >查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      width="60%"
      title="库位详情"
      :visible.sync="cangkuDetailVisible"
      append-to-body
      :closeOnClickModal="closeOnClickModal"
      :closeOnPressEscape="closeOnPressEscape"
    >
      <el-table
        style="width: 100%"
        :border="true"
        :row-style="{height:'20px'}"
        :cell-style="{padding:'0px'}"
        :data="cangkuDetailList"
      >
        >
        <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
        <el-table-column property="jNo" label="卷号" width="120" align="center"></el-table-column>
        <el-table-column property="clothId" label="布编" width="120" align="center"></el-table-column>
        <el-table-column property="lot" label="LOT" width="120" align="center"></el-table-column>
        <el-table-column property="maQuanity" label="码数" width="120" align="center"></el-table-column>
        <el-table-column property="cangku" label="卡位" align="center"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import * as kfglApi from "@/api/warehouseApi.js";
import querystring from "querystring";

export default {
  name: "kwsscx",
  data() {
    return {
      quNo: "",
      rowNo: "",
      columnNo: "",
      shangXia: "",
      signDate_1: "",
      signDate_2: "",
      cangkuDetailVisible: false,
      closeOnClickModal: false,
      closeOnPressEscape: false,
      rowNoDisabled: true,
      columnNoDisabled: true,
      shangXiaDisabled: true,
      cangkuList: [],
      cangkuDetailList: [],
      list1: [
        {
          value: "A"
        },
        {
          value: "B"
        },
        {
          value: "C"
        },
        {
          value: "D"
        },
        {
          value: "E"
        },

        {
          value: "F"
        },
        {
          value: "G"
        },
        {
          value: "H"
        },
        {
          value: "I"
        },
        {
          value: "J"
        },
        {
          value: "K"
        },
        {
          value: "L"
        },
        {
          value: "M"
        },
        {
          value: "N"
        },
        {
          value: "O"
        },
        {
          value: "P"
        },
        {
          value: "Q"
        },
        {
          value: "R"
        },
        {
          value: "S"
        },
        {
          value: "T"
        },
        {
          value: "U"
        },
        {
          value: "V"
        },
        {
          value: "W"
        },
        {
          value: "X"
        },
        {
          value: "Y"
        },
        {
          value: "Z"
        }
      ],
      list2: [
        {
          value: "0"
        },
        {
          value: "1"
        },
        {
          value: "2"
        },
        {
          value: "3"
        },
        {
          value: "4"
        },

        {
          value: "5"
        },
        {
          value: "6"
        },
        {
          value: "7"
        },
        {
          value: "8"
        },
        {
          value: "9"
        }
      ],
      list3: [
        {
          value: "0"
        },
        {
          value: "1"
        },
        {
          value: "2"
        },
        {
          value: "3"
        },
        {
          value: "4"
        },

        {
          value: "5"
        },
        {
          value: "6"
        },
        {
          value: "7"
        },
        {
          value: "8"
        },
        {
          value: "9"
        }
      ],
      list4: [
        {
          value: "上"
        },
        {
          value: "下"
        }
      ]
    };
  },
  methods: {
    // 查看详情
    detailClick(row) {
      this.cangkuDetailVisible = true;
      this.cangkuDetailList = row.listS;
    },
    // 区号
    quNoClick() {
      this.rowNoDisabled = false;
    },
    // 行号
    rowNoClick() {
      this.columnNoDisabled = false;
    },
    // 列号
    columnNoClick() {
      this.shangXiaDisabled = false;
    },
    // 上下
    shangXiaClick() {},
    // 检索
    searchForm() {
      let _data = {
        quNo: this.quNo,
        rowNo: this.rowNo,
        columnNo: this.columnNo,
        shangXia: this.shangXia
      };
      kfglApi
        .getshishishow(_data)
        .then(res => {
          if (res.code == "301") {
            this.$message({ message: res.msg, duration: 2000 });
            this.quNo = "";
            this.rowNo = "";
            this.columnNo = "";
            this.shangXia = "";
            this.rowNoDisabled = true;
            this.columnNoDisabled = true;
            this.shangXiaDisabled = true;
          }
          if (res.code == "200") {
            this.cangkuList = res.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 重置
    resetForm() {
      this.quNo = "";
      this.rowNo = "";
      this.columnNo = "";
      this.shangXia = "";
      this.rowNoDisabled = true;
      this.columnNoDisabled = true;
      this.shangXiaDisabled = true;
    }
  },
  created() {}
};
</script>

<style scoped>
.form1 {
  height: 45px;
  margin: auto;
  border: 1px solid #ccc;
  display: flex;
  flex-wrap: wrap;
  padding: 7px;
}

.active {
  background: red;
  color: #fff;
}
.native {
  background: green;
  color: #fff;
}
</style>