<template>
  <div>
    <span>类型：</span>
    <el-select v-model="value" placeholder="请选择" @change="switchType">
      <el-option v-for="item in optionslist" :key="item.id" :label="item.name" :value="item.id"></el-option>
    </el-select>
    <div class="addTypeApproval" @click="addTypeApproval">
      <i class="el-icon-circle-plus-outline"></i>
      新增
    </div>
    <el-table
      :data="typeApprovalProcesslist"
      style="width: 100%"
      :border="border"
      max-height="530"
      :row-style="{height:'20px'}"
      :cell-style="{padding:'0px'}"
    >
      <el-table-column type="index" label="序号" align="center"></el-table-column>
      <el-table-column property="style" label="类型" align="center"></el-table-column>
      <el-table-column property="name" label="名称" align="center"></el-table-column>
      <el-table-column property="role" label="部门" align="center"></el-table-column>
      <el-table-column property="personName" label="姓名" align="center"></el-table-column>
      <el-table-column property="state" label="状态" align="center">
        <template slot-scope="scope">
          <span>
            {{scope.row.state =='1'?'启用':'停用'}}
          </span>
        </template>
      </el-table-column>
      <el-table-column property="copyName" label="抄送人" align="center"></el-table-column>
      <el-table-column property="address" label="操作" align="center" width="240">
        <template slot-scope="scope">
          <el-button @click.native="editorClick(scope.row)" type="success" size="mini" style="margin:2px;">编辑</el-button>
          <el-button @click.native="addCopy(scope.row)" type="primary" size="mini">增加抄送</el-button>
          <el-button @click.native="delClick(scope.row)" type="danger" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--  流程新增弹窗  -->
    <el-dialog
      title="流程新增"
      width="50%"
      :visible.sync="processOuterVisible"
      :closeOnClickModal="closeOnClickModal"
      :closeOnPressEscape="closeOnPressEscape"
    >
      <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="form3">
          <el-form-item label="序号">
            <el-input v-model="ruleForm.orderNo" style="width:200px" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-input v-model="ruleForm.style" style="width:200px" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="名称" prop="name">
            <el-input v-model="ruleForm.name" style="width:200px"></el-input>
          </el-form-item>
          <el-form-item label="岗位">
            <el-input v-model="ruleForm.role" style="width:200px" @focus="jobsClick"></el-input>
          </el-form-item>
          <el-form-item label="人员">
            <el-input v-model="ruleForm.personName" style="width:200px" @focus="jobsClick"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="ruleForm.state">
              <el-option
                v-for="item in statelist"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="sub1">
            <el-button @click="closeOuterVisible" style="width:95px">取消</el-button>
            <el-button type="primary" @click="submitProcess('ruleForm')" style="width:95px;">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!--  流程新增子弹窗  -->
      <el-dialog
        width="50%"
        title="岗位选择"
        :visible.sync="processInnerVisible"
        :closeOnClickModal="closeOnClickModal"
        :closeOnPressEscape="closeOnPressEscape"
        append-to-body
      >
        <div class="post_top">
          <el-select v-model="value1" disabled>
            <el-option
              v-for="item in postlist"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-form
            :rules="rules"
            :inline="true"
            :model="searchname"
            ref="searchname"
            style="marginLeft:15px;"
          >
            <el-form-item label="搜索框" prop="employeeName">
              <el-input autocomplete="off" v-model="searchname.employeeName" placeholder="请输入名称"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click.native="searchName('searchname')">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="post_bottom">
          <el-table
            :data="personInfolist"
            style="width: 100%"
            :border="border"
            :row-style="{height:'20px'}"
            :cell-style="{padding:'0px'}"
            @row-dblclick="switchPersonInfo"
          >
            <el-table-column type="index" label="序号" align="center"></el-table-column>
            <el-table-column property="employeeId" label="编号" align="center"></el-table-column>
            <el-table-column property="employeeName" label="姓名" align="center"></el-table-column>
            <el-table-column property="department" label="部门" align="center"></el-table-column>
            <el-table-column property="duty" label="岗位" align="center"></el-table-column>
          </el-table>
        </div>
      </el-dialog>
    </el-dialog>

    <!--  增加抄送人弹窗  -->
    <el-dialog
      title="增加抄送人"
      :visible.sync="addCopyVisible"
      width="50%"
      :closeOnClickModal="closeOnClickModal"
      :closeOnPressEscape="closeOnPressEscape"
    >
      <div class="copy_top">
        <el-form :rules="rules" :inline="true" :model="searchname" ref="searchname">
          <el-form-item label="搜索框" prop="employeeName">
            <el-input autocomplete="off" v-model="searchname.employeeName" placeholder="请输入名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click.native="searchName('searchname')">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="copy_bottom">
        <el-table
          :data="personInfolist"
          style="width: 100%"
          :border="border"
          :row-style="{height:'20px'}"
          :cell-style="{padding:'0px'}"
          @row-dblclick="switchCopyPerson"
        >
          <el-table-column type="index" label="序号" align="center"></el-table-column>
          <el-table-column property="employeeId" label="编号" align="center"></el-table-column>
          <el-table-column property="employeeName" label="姓名" align="center"></el-table-column>
          <el-table-column property="department" label="部门" align="center"></el-table-column>
          <el-table-column property="duty" label="岗位" align="center"></el-table-column>
        </el-table>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as jcszApi from "@/api/approvalApi.js";
import querystring from "querystring";

export default {
  name: "spsz",
  data() {
    return {
      statelist: [
        {
          value: 1,
          label: "启用"
        },
        {
          value: 2,
          label: "停用"
        }
      ],
      postlist: [
        {
          value: "1",
          label: "按照角色"
        },
        {
          value: "2",
          label: "按照组织架构"
        },
        {
          value: "3",
          label: "按照名称"
        }
      ],
      optionslist: [],
      typeApprovalProcesslist: [],
      contractList: [],
      selectStatus: "",
      value: "",
      value1: "3",
      border: true,
      processOuterVisible: false,
      processInnerVisible: false,
      closeOnClickModal: false,
      closeOnPressEscape: false,
      addCopyVisible: false,
      ruleForm: {
        name: "",
        personId: "",
        role: "",
        personName: "",
        state: "1",
        orderNo: "",
        style: "",
        copyId: "",
        copyName: ""
      },
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        employeeName: [
          { required: true, message: "名称不能为空", trigger: "blur" }
        ]
      },
      searchname: {
        employeeName: ""
      },
      personInfolist: [],
    };
  },
  methods: {
    //编辑
    editorClick(row) {
      this.personInfolist = [];
      this.searchname.employeeName = "";
      this.selectStatus = "2";
      // 编辑查看
      let _data = {
        guid: row.guid
      };
      jcszApi
        .getEditApproveDetail(_data)
        .then(res => {
          this.processOuterVisible = true;
          this.ruleForm = res.data[0];
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 删除
    delClick(row) {
      this.$confirm("确认删除该条审批配置?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let _data = {
            guid: row.guid
          };
          jcszApi
            .postDeleteMsg(querystring.stringify(_data))
            .then(res => {
              this.typeApprovalProcess(this.ruleForm.id);
              this.$message({ message: "删除成功", duration: 1500 });
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {});
    },
    // 双击增加抄送人
    switchCopyPerson(row) {
      // console.log(row.employeeName, row.employeeId);
      let _data = {
        copyId: this.ruleForm.copyId + " " + row.employeeId,
        copyName: this.ruleForm.copyName + " " + row.employeeName,
        style: this.ruleForm.style
      };
      jcszApi
        .getApprovalProcessCopy(querystring.stringify(_data))
        .then(res => {
          // console.log(res);
          this.typeApprovalProcess(this.ruleForm.style);
          this.typeApprovalProcess(this.ruleForm.id);
          this.$message({ message: "添加成功", duration: 1500 });
          this.addCopyVisible = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 增加抄送人操作
    addCopy(row) {
      this.addCopyVisible = true;
      // console.log(row.copyId, row.copyName);
      this.ruleForm.copyId = row.copyId;
      this.ruleForm.copyName = row.copyName;
    },
    // 双击选择人物详情
    switchPersonInfo(row) {
      this.ruleForm.role = row.duty;
      this.ruleForm.personName = row.employeeName;
      this.ruleForm.personId = row.employeeId;
      this.processInnerVisible = false;
    },
    // 人物按名字查询
    searchName(searchname) {
      this.$refs[searchname].validate(valid => {
        if (valid) {
          let _data = {
            symbol: 1,
            employeeName: this.searchname.employeeName
          };
          jcszApi
            .getPersonInfo(querystring.stringify(_data))
            .then(res => {
              if (res.code == "301") {
                this.$message({
                  message: "没有查到所需要的信息",
                  duration: 1500
                });
              }
              this.personInfolist = res.data;
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          return false;
        }
      });
    },
    // 取消新增
    closeOuterVisible() {
      this.processOuterVisible = false;
    },
    //岗位选择
    jobsClick() {
      this.processInnerVisible = true;
    },
    // 流程新增提交
    submitProcess(ruleForm) {
      // 从新增进来提交
      if (this.selectStatus = "1") {
        this.$refs[ruleForm].validate(valid => {
          if (valid) {
            jcszApi
              .getProcessInfo(this.ruleForm)
              .then(res => {
                this.$message({ message: "添加成功", duration: 1500 });
                this.processOuterVisible = false;
                this.typeApprovalProcess(this.ruleForm.id);
              })
              .catch(err => {
                console.log(err);
              });
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      } else {
        // 从编辑进来提交
        this.$refs[ruleForm].validate(valid => {
          if (valid) {
              jcszApi
                .postEditApproveDetail(this.ruleForm)
                .then(res => {
                  this.$message({ message: "修改成功", duration: 1500 });
                  this.processOuterVisible = false;
                  this.typeApprovalProcess(this.ruleForm.id);
                })
                .catch(err => {
                  console.log(err);
                });
          } else {
            return false;
          }
        });
      }
    },
    // 新增弹窗
    addTypeApproval() {
      this.personInfolist = [];
      this.searchname.employeeName = "";
      this.selectStatus == "1";
      if (this.ruleForm.style == "") {
        this.alertMessage();
      } else {
        this.processOuterVisible = true;
        this.ruleForm.name = "";
        this.ruleForm.role = "";
        this.ruleForm.personName = "";
        this.ruleForm.personId = "";
        this.ruleForm.state = "启用";
      }
    },
    // 类型为空提示
    alertMessage() {
      this.$message({ message: "请选择类型", duration: 1500 });
    },
    // 加载类型下拉列表
    typeApproval() {
      jcszApi
        .getTypeApproval()
        .then(res => {
          this.optionslist = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 选择类型 对应审批内容
    typeApprovalProcess(id) {
      let _data = {
        id: id
      };
      jcszApi
        .getTypeApprovalProcess(_data)
        .then(res => {
          this.ruleForm.orderNo = "";
          this.typeApprovalProcesslist = res.data;
          this.ruleForm.orderNo = this.typeApprovalProcesslist.length + 1;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 类型下拉选择
    switchType(val) {
      let selectedWorkName = {};
      selectedWorkName = this.optionslist.find(item => {
        return item.id === val;
      });

      this.typeApprovalProcess(selectedWorkName.id);
      this.ruleForm.style = selectedWorkName.name;
      this.ruleForm.id = selectedWorkName.id;
    }
  },
  mounted() {
    this.typeApproval();
  }
};
</script>

<style scoped>
.addTypeApproval {
  width: 80px;
  background: chocolate;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  margin: 10px 0;
  line-height: 25px;
  text-align: center;
}
.form3 {
  margin: auto;
  padding: 0 150px;
}
.sub1 {
  margin-top: 20px;
}
.post_top {
  display: flex;
  justify-content: left;
}
</style>