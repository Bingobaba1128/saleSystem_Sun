<template>
  <div>
    <div class="product_wrap">
      <!--  生产通知单列表模糊搜索  -->
      <div class="product_search">
        <el-form
          :model="ruleForm"
          ref="ruleForm"
          label-width="80px"
          class="demo-ruleForm product_form"
        >
          <el-form-item label="签约日期:">
            <el-date-picker
              v-model="allData"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="dataClick"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="客户:">
            <el-input v-model="ruleForm.clientName"></el-input>
          </el-form-item>
          <el-form-item label="合同编号:">
            <el-input v-model="ruleForm.contractNo"></el-input>
          </el-form-item>
          <el-form-item label="布编:">
            <el-input v-model="ruleForm.textileNo"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click.native="productSearchForm('ruleForm')">检索</el-button>
            <el-button @click.native="productResetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!--  新增  -->
      <div class="product" @click="addProduct">
        <i class="el-icon-circle-plus-outline"></i>
        新增
      </div>
      <!--  生产通知单列表  -->
      <el-table
        :data="productlist"
        highlight-current-row
        style="width: 100%"
        max-height="480"
        row-key="id"
        :border="true"
        :row-style="{height:'20px'}"
        :cell-style="{padding:'0px'}"
      >
        <el-table-column type="index" label="序号" align="center"></el-table-column>
        <el-table-column property="clientName" label="客户" width="240" align="center"></el-table-column>
        <el-table-column property="contractNo" label="合同编号" align="center" width="120"></el-table-column>
        <el-table-column property="produceRequestNo" label="申请编号" align="center"></el-table-column>
        <el-table-column property="requestDate" label="申请日期" align="center"></el-table-column>
        <el-table-column property="saleManName" label="业务员" align="center"></el-table-column>
        <el-table-column property="textileNo" label="布编" align="center"></el-table-column>
        <el-table-column property="producePlace" label="分类" align="center"></el-table-column>
        <el-table-column property="state" label="审核情况" align="center"></el-table-column>
        <el-table-column property="address" label="操作" align="center" width="210">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click.native="productClick(scope.row)">生产</el-button>

            <el-button
              type="success"
              size="mini"
              style="margin:2px;"
              @click.native="productEditorClick(scope.row)"
            >编辑</el-button>
            <el-button
              type="danger"
              size="mini"
              @click.native="productDeleteClick(scope.row)"
              style="marginLeft:10px;"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--  新增生产通知单弹窗  -->
    <el-dialog
      title="新建生产通知单"
      :visible.sync="productVisible"
      :closeOnClickModal="closeOnClickModal"
      :closeOnPressEscape="closeOnPressEscape"
      width="80%"
    >
      <div class="product_con">
        <el-form
          :model="productForm2"
          ref="productForm2"
          label-width="100px"
          class="demo-productForm2 product_form2"
        >
          <el-col :span="6">
            <el-form-item label="申请日期">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="productForm2.requestDate"
                style="width: 100%;"
                :disabled="disabled"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="申请单编号">
              <el-input
                placeholder="自动生成"
                v-model="productForm2.produceRequestNo"
                :disabled="disabled"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="欠款情况">
              <el-input v-model="productForm2.arrearsSituation" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="销售类型">
              <el-select v-model="productForm2.saleType" :disabled="disabled">
                <el-option v-for="item in productContractList" :key="item" value="item"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="合同编号">
              <el-select
                v-model="productForm2.contractNo"
                @change="selectContract"
                :disabled="selDisabled"
              >
                <el-option v-for="item in productContractList" :key="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="布编">
              <el-select
                v-model="productForm2.textileNo"
                @change="selectCloth"
                :disabled="selDisabled"
              >
                <el-option
                  v-for="item in contractInfoCloth"
                  :key="item.clothId"
                  :value="item.clothId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="颜色">
              <el-input v-model="contractClothDetail2.colour" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="成品幅宽">
              <el-input v-model="contractClothDetail2.width" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="业务部门">
              <el-input v-model="productForm2.departmentName" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="业务员">
              <el-input v-model="productForm2.saleManName" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="客户">
              <el-input v-model="productForm2.clientName" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="成品数量(码)">
              <el-input v-model="productForm2.produceNumber" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="数量范围">
              上
              <el-input v-model="productForm2.rangeZheng" style="width: 70px;" :disabled="disabled"></el-input>下
              <el-input v-model="productForm2.rangeFu" style="width: 70px;" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="交货日期">
              <el-date-picker
                :picker-options="pickerOptions"
                v-model="productForm2.jiaoHuoDate"
                :disabled="disabled"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="单价">
              <el-input v-model="contractClothDetail1.unitPrice" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="纬向缩水">
              <el-input v-model="contractClothDetail2.weiXiangSuo" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="经向缩水">
              <el-input v-model="contractClothDetail2.jingXiangSuo" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="标板">
              <el-select v-model="productForm2.biaoBan">
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="后整方式">
              <el-input v-model="contractClothDetail2.finishing" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="船头板">
              <el-input v-model="productForm2.board" type="number" min="0"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="铍滌要求份">
              <el-input v-model="productForm2.piDiYaoQiu" type="number" min="0"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="是否出口退税">
              <el-select v-model="productForm2.shiFouChuKouTuishui">
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="唛头">
              <el-select v-model="productForm2.maiTou">
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="客户确认缸号">
              <el-input v-model="productForm2.keHuGangHao" required></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="分LOT色方法">
              <el-select v-model="productForm2.lot">
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="物理性要求">
              <el-select v-model="productForm2.wuLiXingYaoQiu">
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="百家衣">
              <el-select v-model="productForm2.baiJiaYi">
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="是否有预订单">
              <el-select v-model="productForm2.yuDingan">
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="预订单编号">
              <el-select v-model="productForm2.yuDingDanNo">
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="包装要求">
              <el-select v-model="productForm2.baoZhuangYaoQiu">
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="验货要求">
              <el-select v-model="productForm2.yanHuoYaoQiu">
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="订单证书要求">
              <el-select v-model="productForm2.dingDanZhengShu">
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="特殊备案">
              <el-select v-model="productForm2.teShuBeiAn">
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="是否需提供交客" label-width="120px">
              <el-select v-model="productForm2.shiFouJiaoKe">
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="备注">
              <el-input type="textarea" v-model="productForm2.note" :resize="resize"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <!-- <el-form-item class="product_submit"> -->
            <div class="product_submit">
              <el-button
                type="primary"
                @click.native="productSubmitForm('productForm2')"
                class="submit_inner"
              >提交</el-button>
            </div>
            <!-- </el-form-item> -->
          </el-col>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as sctzApi from "@/api/productApi.js";
import querystring from "querystring";

export default {
  name: "sctzd",
  data() {
    return {
      resize: "none",
      productForm2: {
        requestDate: "",
        saleType: "",
        contractNo: "",
        textileNo: "",
        departmentName: "",
        departmentId: "",
        saleManName: "",
        clientName: "",
        produceNumber: "",
        rangeZheng: "",
        rangeFu: "",
        jiaoHuoDate: "",
        biaoBan: "",
        board: "",
        piDiYaoQiu: "",
        shiFouChuKouTuishui: "",
        maiTou: "",
        keHuGangHao: "",
        lot: "",
        wuLiXingYaoQiu: "",
        baiJiaYi: "",
        yuDingan: "",
        yuDingDanNo: "",
        baoZhuangYaoQiu: "",
        yanHuoYaoQiu: "",
        dingDanZhengShu: "",
        teShuBeiAn: "",
        shiFouJiaoKe: "",
        note: "",
        overallState: "1",
        contractId: "1",
        departmentId: "",
        saleManId: "",
        clientId: "",
        testileId: "1",
        state: "0",
        applyPersonId: "",
        producePlace: ""
      },
      id: "",
      submitStatus: "",
      showwx: false,
      disabled: true,
      selDisabled: false,
      productVisible: false,
      closeOnClickModal: false,
      closeOnPressEscape: false,
      // 生产通知单列表
      productlist: [],
      // 生产通知单里边的合同列表
      productContractList: [],
      // 合同信息
      contractInfoList: [],
      // 布编信息
      contractInfoCloth: [],
      // 布编详情
      contractClothDetail1: [],
      contractClothDetail2: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      // 生产通知单模糊搜索字段
      allData: "",
      ruleForm: {
        // start: "",
        // end: "",
        // clientName: "",
        // contractNo: "",
        // textileNo: "",
        // applyPersonId: "", // 更换当前账号 id
        // produceRequestNo: ""
      }
    };
  },
  methods: {
    // 生产 (测试用)
    productClick(row) {
      let _data = {
        produceRequestNo: row.produceRequestNo,
        contractNo: row.contractNo
      };
      sctzApi
        .getshengchengRuKuDan(_data)
        .then(res => {
          sessionStorage.setItem("XMD", res.data);
        })
        .catch(err => {
          console.log(err);
        });
    },

    // 模糊搜索的重置
    productResetForm() {
      this.ruleForm = JSON.parse(JSON.stringify(this.defaultForm));
      this.allData = "";
      this.productList();
    },
    // 模糊搜索的检索
    productSearchForm() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          let _data = this.ruleForm;
          sctzApi
            .getProductList(_data)
            .then(res => {
              this.productlist = res.data;
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          return false;
        }
      });
    },
    // 模糊搜索 修改时间格式并获取
    dataClick() {
      let starttime = this.allData[0];
      let endtime = this.allData[1];
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
      this.$set(this.ruleForm, "start", start);
      this.$set(this.ruleForm, "end", end);
    },
    // 生产通知单删除
    productDeleteClick(row) {
      let _data = {
        produceRequestNo: row.produceRequestNo
      };
      sctzApi
        .postDeleteProduct(querystring.stringify(_data))
        .then(res => {
          if (res.code == 200) {
            this.$message({ message: "删除成功", duration: 2000 });
            this.productList();
          }
          this.$message({ message: res.msg, duration: 2000 });
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 选择布编 获取当前布编详情
    selectCloth(cloth) {
      let _data1 = {
        contractNo: this.productlist.contractNo,
        clothId: cloth
      };
      sctzApi
        .getClothMessage1(querystring.stringify(_data1))
        .then(res => {
          this.contractClothDetail1 = res.data[0];
          let { produceNumber, rangeFu, rangeZheng, jiaoHuoDate } = res.data[0];
          this.$set(this.productForm2, "produceNumber", produceNumber);
          this.$set(this.productForm2, "rangeFu", rangeFu);
          this.$set(this.productForm2, "rangeZheng", rangeZheng);
          this.$set(this.productForm2, "jiaoHuoDate", jiaoHuoDate);
        })
        .catch(err => {
          console.log(err);
        });
      // 布料信息 颜色、幅宽、、、
      let _data2 = {
        fabricCode: cloth,
        pageSize: "50",
        pageNum: "1"
      };
      sctzApi
        .getClothMessage2(querystring.stringify(_data2))
        .then(res => {
          this.contractClothDetail2 = res.data[0];
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 时间的补 0
    p(s) {
      return s < 10 ? "0" + s : s;
    },
    // 生产通知提交
    productSubmitForm() {
      if (this.submitStatus == 1) {
        this.$refs["productForm2"].validate(valid => {
          if (valid) {
            let id = sessionStorage.getItem("id")
            this.productForm2.applyPersonId = id;
            this.productForm2.producePlace = "韶关"
            let _data = this.productForm2;
            sctzApi
              .postProductNotify(_data)
              .then(res => {
                this.productVisible = false;
                this.$message({ message: "提交成功", duration: 2000 });
                this.productList();
              })
              .catch(err => {
                console.log(err);
              });
          } else {
            this.$message({ message: "提交失败", duration: 1500 });
            return false;
          }
        });
      } else {
        this.$refs["productForm2"].validate(valid => {
          if (valid) {
            let _data = this.productForm2;
            sctzApi
              .postModifyProduct(_data)
              .then(res => {
                this.productVisible = false;
                this.$message({ message: "提交成功", duration: 2000 });
                this.productList();
              })
              .catch(err => {
                console.log(err);
              });
          } else {
            this.$message({ message: "提交失败", duration: 1500 });
            return false;
          }
        });
      }
    },
    // 生产通知单列表
    productList() {
      let id = sessionStorage.getItem("id");
      let _data = {
        produceRequestNo: null,
        // 当前账号 Id
        applyPersonId: id,
      };
      sctzApi
        .getProductList(_data)
        .then(res => {
          this.productlist = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 生产通知单编辑
    productEditorClick(row) {
      this.submitStatus = 2;
      this.productForm2 = row;
      this.productVisible = true;
      this.selDisabled = true;
      let id = sessionStorage.getItem("id");
      let _data = {
        produceRequestNo: row.produceRequestNo,
        // 当前账号 Id
        applyPersonId: id,
      };
      sctzApi
        .getProductList(_data)
        .then(res => {
          this.constractInfo(row.contractNo);
          this.productlist.contractNo = row.contractNo;
          this.$set(this.productForm2, "contractNo", row.contractNo);
          this.$set(this.productForm2, "textileNo", row.textileNo);
          this.$set(this.productForm2, "requestDate", row.requestDate);
          this.$set(
            this.productForm2,
            "produceRequestNo",
            row.produceRequestNo
          );

          this.selectCloth(row.textileNo);
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取生产通知单下的合同下拉列表
    contractSelect() {
      let _data = {
        approveStyle: "1",
        no: "relateNo"
      };
      sctzApi
        .postContractSelect(querystring.stringify(_data))
        .then(res => {
          this.productContractList = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 切换合同 调用合同信息方法
    selectContract(msg) {
      this.productlist.contractNo = msg;
      this.constractInfo(msg);
    },
    // 根据合同编号 获取合同信息
    constractInfo(msg) {
      let _data = {
        contractNo: msg
      };
      sctzApi
        .getContractMessage(querystring.stringify(_data))
        .then(res => {
          this.contractInfoCloth = res.data.listS;
          let {
            saleType,
            clientName,
            clientId,
            departmentName,
            departmentId,
            saleManName,
            saleManId
          } = res.data;
          this.$set(this.productForm2, "saleType", saleType);
          this.$set(this.productForm2, "clientName", clientName);
          this.$set(this.productForm2, "clientId", clientId);
          this.$set(this.productForm2, "saleManName", saleManName);
          this.$set(this.productForm2, "saleManId", saleManId);
          this.$set(this.productForm2, "departmentId", departmentId);
          this.$set(this.productForm2, "departmentName", departmentName);
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 新增生产通知单弹窗
    addProduct() {
      this.productForm2 = JSON.parse(JSON.stringify(this.defaultForm2));
      this.productVisible = true;
      this.submitStatus = 1;
      this.selDisabled = false;
      this.contractSelect();
      let d = new Date();
      let resDate =
        d.getFullYear() +
        "-" +
        this.p(d.getMonth() + 1) +
        "-" +
        this.p(d.getDate());
      let resTime =
        this.p(d.getHours()) +
        ":" +
        this.p(d.getMinutes()) +
        ":" +
        this.p(d.getSeconds());
      this.productForm2.requestDate = resDate + " " + resTime;
    }
  },
  created() {
    this.defaultForm = JSON.parse(JSON.stringify(this.ruleForm));
    this.defaultForm2 = JSON.parse(JSON.stringify(this.productForm2));
    this.productList();
  },
  mounted() {}
};
</script>

<style scoped>
.product {
  width: 80px;
  padding: 5px;
  background: #009688;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  margin: 10px 0;
  text-align: center;
  margin-left: 10px;
}
.product_form {
  height: 45px;
  margin: auto;
  border: 1px solid #ccc;
  display: flex;
  flex-wrap: wrap;
  padding-top: 5px;
}
.product_form input {
  width: 30px;
}
.product_form .el-form-item .el-input {
  width: 80px;
}
.product_con {
  width: 100%;
  height: 100%;
  z-index: 1000;
}
.product_form2 {
  padding-right: 10px;
  margin: auto;
  border: 1px solid #ccc;
  display: flex;
  flex-wrap: wrap;
  padding-top: 5px;
}
.product_submit {
  text-align: center;
  margin: 0px;
  margin-bottom: 10px;
}
.product_sunmit > .el-form-item__content {
  margin-left: 0px;
}
.submit_inner {
  width: 150px;
}
</style>