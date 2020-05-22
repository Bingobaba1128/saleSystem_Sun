<template>
  <div>
    <div
      class="box1"
      style="width:100%;height:60px;lineHeight:60px;color:#ccc;borderBottom:1px solid #ccc;"
    >
      <span>基础信息配置：</span>
      <el-select v-model="chooseType" @change="showClick">
        <el-option label="ShimpmentTerm" value="ShimpmentTerm"></el-option>
        <el-option label="PartialShipment" value="PartialShipment"></el-option>
        <el-option label="起运港" value="起运港"></el-option>
        <el-option label="目的港" value="目的港"></el-option>
        <el-option label="装运方式" value="装运方式"></el-option>
        <el-option label="出口汇率" value="出口汇率"></el-option>
        <el-option label="不出口汇率" value="不出口汇率"></el-option>
        <el-option label="客户活跃度期限" value="客户活跃度期限"></el-option>
        <el-option label="运费选项" value="运费选项"></el-option>
        <el-option label="币种" value="币种"></el-option>
      </el-select>
    </div>
    <div class="box2" style="marginTop:20px;">
      <div class="add_Infrastructure" @click="addInfrastructure">
        <i class="el-icon-circle-plus-outline"></i>
        新增
      </div>
      <el-table
        :border="true"
        :row-style="{height:'20px'}"
        :cell-style="{padding:'0px'}"
        style="width: 100%"
        max-height="500"
        :data="infoList"
      >
        <el-table-column type="index" label="序号" align="center"></el-table-column>
        <el-table-column property="name" label="名称" align="center"></el-table-column>
        <el-table-column property="style" label="分类" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="260">
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
      :visible.sync="pzVisible"
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
          <el-form-item label="名称">
            <el-input v-model="ruleForm.name" style="width:auto;"></el-input>
          </el-form-item>
          <el-form-item label="分类">
            <el-input v-model="ruleForm.style" style="width:auto;" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item class="sub1">
            <el-button @click="closeOuterVisible" style="width:auto">取消</el-button>
            <el-button type="primary" @click="submitInfo('ruleForm')" style="width:auto;">提交</el-button>
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
  name: "jcxxpz",
  data() {
    return {
      chooseType: "",
      submitTitle: "",
      submitstatus: "",
      pzVisible: false,
      closeOnClickModal: false,
      closeOnPressEscape: false,
      infoList: [],
      ruleForm: {}
    };
  },
  methods: {
    // 新增
    addInfrastructure() {
      if (this.chooseType) {
        this.ruleForm = {};
        this.pzVisible = true;
        this.submitstatus = 1;
        this.submitTitle = "基础信息新增";
        this.$set(this.ruleForm, "orderNo", this.infoList.length + 1);
        this.$set(this.ruleForm, "style", this.chooseType);
      } else {
        this.$message({ message: "请先选择基础信息配置", duration: 2000 });
      }
    },
    // 编辑
    editorClick(row) {
      this.pzVisible = true;
      this.submitstatus = 2;
      this.submitTitle = "基础信息修改";
      let _data = {
        guid: row.guid
      };
      jcszApi
        .getSearchInfo(_data)
        .then(res => {
          this.ruleForm = res.data[0];
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 删除
    deleteClick(row) {
      this.$confirm("确认删除该条配置?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let _data = {
            style: this.chooseType,
            guid: row.guid
          };
          jcszApi
            .postdelBasic(querystring.stringify(_data))
            .then(res => {
              if (res.code == 200) {
                this.$message({ message: "删除成功", duration: 2000 });
                this.pzVisible = false;
                this.showClick(this.chooseType);
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
    // 取消
    closeOuterVisible() {
      this.pzVisible = false;
    },
    // 新增、编辑提交
    submitInfo() {
      if (this.submitstatus == 1) {
        if (this.ruleForm.name) {
          let _data = this.ruleForm;
          jcszApi
            .postaddBasic(_data)
            .then(res => {
              if (res.code == 200) {
                this.$message({ message: "新增成功", duration: 2000 });
                this.pzVisible = false;
                this.showClick(this.chooseType);
              } else {
                this.$message({ message: res.msg, duration: 2000 });
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          this.$message({ message: "请填写名称", duration: 2000 });
        }
      } else {
        if (this.ruleForm.name) {
          let _data = this.ruleForm;
          jcszApi
            .posteditBasic(_data)
            .then(res => {
              if (res.code == 200) {
                this.$message({ message: "修改成功", duration: 2000 });
                this.pzVisible = false;
                this.showClick(this.chooseType);
              } else {
                this.$message({ message: res.msg, duration: 2000 });
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          this.$message({ message: "请填写名称", duration: 2000 });
        }
      }
    },
    // 切换配置选项
    showClick(chooseType) {
      let _data = {
        style: chooseType
      };
      jcszApi
        .getSearchInfo(_data)
        .then(res => {
          this.infoList = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {}
};
</script>

<style scoped>
.add_Infrastructure {
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