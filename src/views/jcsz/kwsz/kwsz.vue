<template>
  <div>
    <div class="box1">
      <el-form label-width="auto" class="demo-ruleForm form1" :inline="true">
        <el-form-item label="区号:">
          <el-select
            v-model="quNo"
            placeholder="请选择区号"
            @change="quNoClick"
            :disabled="quNoDisabled"
            style="width:130px"
          >
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
            style="width:130px"
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
            style="width:130px"
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
            style="width:130px"
          >
            <el-option
              v-for="item in list4"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类:">
          <el-select
            v-model="fenlei"
            placeholder="请选择分类"
            @change="fenleiClick"
            :disabled="fenleiDisabled"
          >
            <el-option v-for="item in list5" :key="item.name" :label="item.name" :value="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="marginLeft:40px;">
          <el-button type="primary" @click.native="searchForm">检索</el-button>
          <el-button @click.native="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="box2" style="marginTop:20px;">
      <div class="add_kw" @click="addstorage">
        <i class="el-icon-circle-plus-outline"></i>
        新增
      </div>
      <el-table
        :border="true"
        :row-style="{height:'20px'}"
        :cell-style="{padding:'0px'}"
        style="width: 100%"
        max-height="500"
        :data="kwList"
      >
        <el-table-column type="index" label="序号" align="center"></el-table-column>
        <el-table-column property="fact" label="卡位号" align="center"></el-table-column>
        <el-table-column property="style" label="分类" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="200">
          <template slot-scope="scope">
            <el-button
              @click.native="editorClick(scope.row)"
              type="info"
              size="mini"
              style="margin:2px;"
            >编辑</el-button>
            <el-button @click.native="deleteClick(scope.row)" type="danger" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      :title="submitTitle"
      width="50%"
      :visible.sync="ckAddVisible"
      :closeOnClickModal="closeOnClickModal"
      :closeOnPressEscape="closeOnPressEscape"
    >
      <div>
        <el-form :model="ruleForm" label-width="120px" class="form3">
          <el-form-item label="序号">
            <el-input
              type="number"
              min="0"
              v-model="ruleForm.orderNo"
              style="width:auto;"
              :disabled="true"
            ></el-input>
          </el-form-item>
          <el-form-item label="区号">
            <el-select v-model="ruleForm.quNo">
              <el-option
                v-for="item in list1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="行号">
            <el-select v-model="ruleForm.row">
              <el-option
                v-for="item in list2"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="列号">
            <el-select v-model="ruleForm.cell">
              <el-option
                v-for="item in list3"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上下">
            <el-select v-model="ruleForm.updown">
              <el-option
                v-for="item in list4"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="库房分类">
            <el-select v-model="ruleForm.style" :disabled="ckflDisabled">
              <el-option
                v-for="item in list5"
                :key="item.name"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="sub1">
            <el-button @click="closeOuterVisible" style="width:auto">取消</el-button>
            <el-button type="primary" @click="submitProcess('ruleForm')" style="width:auto;">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as jcszApi from "@/api/basisApi.js";
import querystring from "querystring";

export default {
  name: "kwsz",
  data() {
    return {
      quNo: "",
      rowNo: "",
      columnNo: "",
      shangXia: "",
      fenlei: "",
      submitStatus: "",
      submitTitle: "",
      quNoDisabled: false,
      rowNoDisabled: true,
      columnNoDisabled: true,
      shangXiaDisabled: true,
      fenleiDisabled: false,
      ckflDisabled: false,
      closeOnClickModal: false,
      closeOnPressEscape: false,
      ckAddVisible: false,
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
      ],
      list5: [],
      kwList: [],
      ruleForm: {}
    };
  },
  methods: {
    closeOuterVisible() {},
    // 新增库房提交
    submitProcess() {
      if (this.submitStatus == 1) {
        let _data = this.ruleForm;
        jcszApi
          .postaddconfigStorage(_data)
          .then(res => {
            if (res.code == 200) {
              this.ckAddVisible = false;
              this.loadkwList();
              this.$message({ message: "新增成功", duration: 2000 });
            } else {
              this.$message({ message: res.msg, duration: 2000 });
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        let _data = this.ruleForm;
        jcszApi
          .posteditconfigStorage(_data)
          .then(res => {
            if (res.code == 200) {
              this.ckAddVisible = false;
              this.loadkwList();
              this.$message({ message: "修改成功", duration: 2000 });
            } else {
              this.$message({ message: res.msg, duration: 2000 });
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    // 卡位号编辑
    editorClick(row) {
      this.submitStatus = 2;
      this.submitTitle = "修改流程";
      this.ckflDisabled = true;
      let _data = {
        guid: row.guid
      };
      jcszApi
        .getkwInfo(_data)
        .then(res => {
          if (res.code == 200) {
            this.ruleForm = res.data[0];
            this.ckAddVisible = true;
          } else {
            this.$message({ message: res.msg, duration: 2000 });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 卡位号删除
    deleteClick(row) {
      this.$confirm("确认删除该条卡位配置?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let _data = {
            condition: "guid='" + row.guid + "'"
          };
          jcszApi
            .postdeleteconfigStorage(querystring.stringify(_data))
            .then(res => {
              if (res.code == 200) {
                this.$message({ message: "删除成功", duration: 2000 });
                this.loadkwList();
              } else {
                this.$message({ message: res.msg, duration: 2000 });
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          return false;
        });
    },
    // 新增
    addstorage() {
      this.ruleForm = {};
      this.ckAddVisible = true;
      this.submitStatus = 1;
      this.submitTitle = "新增流程";
      this.ckflDisabled = false;
      this.$set(this.ruleForm, "orderNo", this.kwList.length + 1);
    },
    // 区号
    quNoClick() {
      if (this.quNo) {
        this.fenleiDisabled = true;
      } else {
        this.fenleiDisabled = false;
      }
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
    // 分类
    fenleiClick() {
      if (this.fenlei) {
        this.quNoDisabled = true;
      } else {
        this.quNoDisabled = false;
      }
    },
    // 检索
    searchForm() {
      let _data = {
        quNo: this.quNo,
        rowNo: this.rowNo,
        columnNo: this.columnNo,
        shangXia: this.shangXia,
        style: this.fenlei
      };
      jcszApi
        .getkwInfo(_data)
        .then(res => {
          if (res.code == "301") {
            this.$message({ message: res.msg, duration: 2000 });
            this.quNo = "";
            this.rowNo = "";
            this.columnNo = "";
            this.shangXia = "";
            this.fenlei = "";
            this.quNoDisabled = false;
            this.rowNoDisabled = true;
            this.columnNoDisabled = true;
            this.shangXiaDisabled = true;
            this.fenleiDisabled = false;
          }
          if (res.code == "200") {
            this.kwList = res.data;
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
      this.fenlei = "";
      this.quNoDisabled = false;
      this.rowNoDisabled = true;
      this.columnNoDisabled = true;
      this.shangXiaDisabled = true;
      this.fenleiDisabled = false;
    },
    // 初始化加载卡位列表信息
    loadkwList() {
      jcszApi
        .getkwInfo()
        .then(res => {
          this.kwList = res.data;
          //   this.$message({ message: "删除成功", duration: 1500 });
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 初始化加载分类
    loadfenlei() {
      let _data = {
        style: "仓库管理"
      };
      jcszApi
        .getselBasic(_data)
        .then(res => {
          this.list5 = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.loadkwList();
    this.loadfenlei();
  }
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
.add_kw {
  width: 80px;
  padding: 5px;
  background: #009688;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  margin: 10px 0;
  text-align: center;
}
.form3 {
  margin: auto;
  padding: 0 150px;
}
.sub1 {
  margin-top: 20px;
}
</style>