<template>
  <div class="brand_archives_wrap">
    <div class="box1">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="主要品牌">
          <el-input v-model="brandName" placeholder="请输入品牌"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.native="searchList">检索</el-button>
          <el-button type="primary" @click.native="refreshList">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="box2" style="margin:10px 0;">
      <!--  品牌新增  -->
      <div class="add_brand" @click="addBrand">
        <i class="el-icon-circle-plus-outline"></i>
        新增
      </div>
      <el-table
        highlight-current-row
        style="width: 100%"
        max-height="500"
        :border="true"
        :row-style="{height:'20px'}"
        :cell-style="{padding:'0px'}"
        :data="brandList"
      >
        <el-table-column type="index" label="序号" align="center"></el-table-column>
        <el-table-column property="brandNo" label="品牌编号" align="center"></el-table-column>
        <el-table-column property="brandName" label="品牌名称" align="center"></el-table-column>
        <el-table-column property="jName" label="品牌简称" align="center"></el-table-column>
        <el-table-column property="linkman" label="联系人" align="center"></el-table-column>
        <el-table-column property="linktel" label="联系电话" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              @click.native="editorClick(scope.row)"
              type="success"
              size="mini"
              style="margin:2px;"
            >编辑</el-button>
            <el-button @click.native="delClick(scope.row)" type="danger" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      :title="brandTitle"
      :visible.sync="addBrandVisible"
      :closeOnClickModal="closeOnClickModal"
      :closeOnPressEscape="closeOnPressEscape"
      width="70%"
    >
      <div class="contract_con">
        <el-form :model="brandForm" label-width="100px" class="demo-brandForm">
          <el-col :span="6">
            <el-form-item label="品牌编号">
              <el-input v-model="brandForm.brandNo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="品牌名称">
              <el-input v-model="brandForm.brandName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="简称">
              <el-input v-model="brandForm.jName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="客户类型">
              <el-select v-model="brandForm.clientStyle">
                <el-option label="国内" value="国内"></el-option>
                <el-option label="国外" value="国外"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="国家地区">
              <el-select v-model="brandForm.countryPlace">
                <el-option label="亚太地区" value="亚太地区"></el-option>
                <el-option label="欧美地区" value="欧美地区"></el-option>
                <el-option label="日韩地区" value="日韩地区"></el-option>
                <el-option label="非洲地区" value="非洲地区"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="是否主要">
              <el-select v-model="brandForm.master">
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="是否上市">
              <el-select v-model="brandForm.market">
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="是否启用">
              <el-select v-model="brandForm.state">
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="公司名称">
              <el-input v-model="brandForm.companyName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="公司地址">
              <el-input v-model="brandForm.companyAddress"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="公司网址">
              <el-input v-model="brandForm.companyNet"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="联系人">
              <el-input v-model="brandForm.linkman"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="联系方式">
              <el-input v-model="brandForm.linktel"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="Email">
              <el-input v-model="brandForm.email"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="传真">
              <el-input v-model="brandForm.fax"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="工作地址">
              <el-input v-model="brandForm.workPlace"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="品牌销售范围">
              <el-input v-model="brandForm.brandSaleArea" type="textarea" resize="none"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="备注">
              <el-input v-model="brandForm.remarks" type="textarea" resize="none"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <div class="brand_submit">
              <el-button type="primary" @click.native="submitForm" class="submitmht">提交</el-button>
            </div>
          </el-col>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as khglApi from "@/api/customerManageApi.js";
import querystring from "querystring";

export default {
  name: "ppda",
  data() {
    return {
      brandName: "",
      brandTitle: "",
      switchType: "",
      brandList: [],
      brandForm: {},
      addBrandVisible: false,
      closeOnClickModal: false,
      closeOnPressEscape: false
    };
  },
  methods: {
    // 提交 (dialog内)
    submitForm() {
      if (this.brandForm.brandNo) {
        if (this.brandForm.brandName) {
          if (this.switchType == 1) {
            let _data = this.brandForm;
            khglApi
              .postaddBrand(_data)
              .then(res => {
                if (res.code == 200) {
                  this.$message({ message: "新增成功", duration: 2000 });
                  this.addBrandVisible = false;
                  this.loadBrandList();
                } else {
                  this.$message({ message: res.msg, duration: 2000 });
                }
              })
              .catch(err => {
                console.log(err);
              });
          } else {
            let _data = this.brandForm;
            khglApi
              .posteditBrand(_data)
              .then(res => {
                if (res.code == 200) {
                  this.$message({ message: "修改成功", duration: 2000 });
                  this.addBrandVisible = false;
                  this.loadBrandList();
                } else {
                  this.$message({ message: res.msg, duration: 2000 });
                }
              })
              .catch(err => {
                console.log(err);
              });
          }
        } else {
          this.$message({ message: "品牌编号必填", duration: 2000 });
        }
      } else {
        this.$message({ message: "品牌编号必填", duration: 2000 });
      }
    },
    // 取消 (dialog内)
    cancleClick() {
      this.addBrandVisible = false;
    },
    // 新增品牌 (dialog)
    addBrand() {
      this.switchType = 1;
      this.brandTitle = "品牌新增";
      this.addBrandVisible = true;
      this.brandForm = {};
    },
    // 编辑当前条品牌
    editorClick(row) {
      this.switchType = 2;
      this.brandTitle = "品牌修改";
      this.addBrandVisible = true;
      let _data = {
        brandNo: row.brandNo
      };
      khglApi
        .getselBrand(_data)
        .then(res => {
          this.brandForm = res.data[0];
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 删除当前条品牌
    delClick(row) {
      this.$confirm("确认删除该品牌?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let _data = {
            guid: row.guid
          };
          khglApi
            .postdelBrand(querystring.stringify(_data))
            .then(res => {
              if (res.code == 200) {
                this.loadBrandList();
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
    // 检索
    searchList() {
      let _data = {
        brandName: this.brandName
      };
      khglApi
        .getselBrand(_data)
        .then(res => {
          if (res.code == 200) {
            this.brandList = res.data;
          } else {
            this.$message({ message: res.msg, duration: 2000 });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 重置
    refreshList() {
      this.brandName = "";
      this.loadBrandList();
    },
    // 初始化加载品牌档案
    loadBrandList() {
      khglApi
        .getselBrand()
        .then(res => {
          this.brandList = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.loadBrandList();
  }
};
</script>

<style scoped>
.box1 {
  border-bottom: 1px solid #ccc;
}
.add_brand {
  width: 80px;
  padding: 5px;
  background: #009688;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  margin: 5px 0;
  text-align: center;
  margin: 15px 0;
}
.contract_con {
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  padding-top: 5px;
}
.brand_submit {
  text-align: center;
  margin: 10px 0;
}
.submitmht {
  width: 150px;
}
</style>