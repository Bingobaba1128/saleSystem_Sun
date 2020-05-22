<template>
  <div class="delivery_detail_order">
    <div class="box1">
      <el-table
        highlight-current-row
        style="width: 100%;height:300px;"
        max-height="300"
        :border="true"
        :row-style="{height:'20px'}"
        :cell-style="{padding:'0px'}"
        :data="applyList"
        @row-click="detailClick"
      >
        <el-table-column type="index" label="序号" align="center"></el-table-column>
        <el-table-column property="applyNo" label="申请单号" align="center"></el-table-column>
        <el-table-column property="contractNo" label="合同编号" align="center"></el-table-column>
        <el-table-column property="applyDate" label="申请日期" align="center"></el-table-column>
        <el-table-column property="personName" label="申请人" align="center"></el-table-column>
        <el-table-column property="clothId" label="布编" align="center"></el-table-column>
        <el-table-column property="applyQuanity" label="发货数量" align="center"></el-table-column>
      </el-table>
    </div>
    <div class="box2" style="marginTop:20px;">
      <div style="display:flex;">
        <el-button class="add_invoice" @click="invoiceClick" :disabled="addDisabled">
          <i class="el-icon-circle-plus-outline"></i>
          新增发货单
        </el-button>
        <el-button
          class="editor_invoice"
          @click="editorInvoice"
          style="marginLeft:10px;"
          :disabled="editorDisabled"
        >
          <i class="el-icon-document"></i>
          编辑发货单
        </el-button>
        <el-button class="delete_invoice" @click="deleteOutBound" style="marginLeft:10px;">
          <i class="el-icon-document"></i>
          删除发货单
        </el-button>
      </div>
      <el-table
        highlight-current-row
        style="width: 100%;height:300px;"
        max-height="300"
        :border="true"
        :row-style="{height:'20px'}"
        :cell-style="{padding:'0px'}"
        :data="invoiceList"
      >
        <el-table-column type="index" label="序号" align="center"></el-table-column>
        <el-table-column property="ckNo" label="出库单号" align="center"></el-table-column>
        <el-table-column property="jNo" label="卷号" align="center"></el-table-column>
        <el-table-column property="clothId" label="布编" align="center"></el-table-column>
        <!-- <el-table-column property="produceNo" label="生产单号" align="center"></el-table-column> -->
        <el-table-column property="gangHao" label="缸号" align="center"></el-table-column>
        <el-table-column property="lOT" label="LOT" align="center"></el-table-column>
        <el-table-column property="cangku" label="库位" align="center"></el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.state == '0'?'未出库':scope.row.state == '1'?'已出库':'已确认'}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      :title="titleType"
      :visible.sync="invoiceVisible"
      :closeOnClickModal="closeOnClickModal"
      :closeOnPressEscape="closeOnPressEscape"
      width="80%"
      @close="applyRequestClose"
    >
      <div class="apply_goods">
        <el-col :span="24">
          <div class="request_top">
            <el-form
              label-width="100px"
              class="demo-formDetailPackingList form2"
              :model="formDetailPackingList"
              :ref="formDetailPackingList"
            >
              <el-col :span="6">
                <el-form-item label="发货申请单号">
                  <el-input
                    v-model="formDetailPackingList.applyNo"
                    placeholder="自动生成"
                    :disabled="true"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="申请发货日期">
                  <el-form-item>
                    <el-date-picker
                      v-model="formDetailPackingList.applyDate"
                      type="date"
                      style="width: 100%"
                      :disabled="true"
                    ></el-date-picker>
                  </el-form-item>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="送货地址">
                  <el-input
                    v-model="formDetailPackingList.address"
                    placeholder="自动生成"
                    :disabled="true"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="业务员">
                  <el-input v-model="formDetailPackingList.employeeName" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="客户">
                  <el-input v-model="formDetailPackingList.clientName" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="品牌">
                  <el-input v-model="formDetailPackingList.brand" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="联系人">
                  <el-input v-model="formDetailPackingList.linkman" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="联系电话">
                  <el-input
                    v-model="formDetailPackingList.linktel"
                    placeholder="自动生成"
                    :disabled="true"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="是否含税">
                  <el-input v-model="formDetailPackingList.fax" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="发货备注">
                  <el-input
                    v-model="formDetailPackingList.fHremarks"
                    type="textarea"
                    resize="none"
                    :disabled="true"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="布编">
                  <el-input v-model="formDetailPackingList.clothId" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="缸号">
                  <el-input v-model="formDetailPackingList.gangHao" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="申请数量">
                  <el-input v-model="formDetailPackingList.applyQuanity" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="分LOT或缸">
                  <el-input v-model="formDetailPackingList.fenGang" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-form>
          </div>
        </el-col>
        <el-col :span="24">
          <div class="request_middle" style="marginTop:20px;">
            <el-form
              label-width="100px"
              class="demo-requestInfoList form2"
              :model="detailPackingList"
              :ref="detailPackingList"
            >
              <el-col :span="6">
                <el-form-item label="出库编号">
                  <el-input placeholder="自动生成" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="发货人">
                  <el-input v-model="detailPackingList.personId" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="出口状态">
                  <el-input v-model="detailPackingList.nW"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="编织袋">
                  <el-select v-model="detailPackingList.bZD">
                    <el-option label="塑料" value="1"></el-option>
                    <el-option label="布" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="送货地址">
                  <el-input v-model="detailPackingList.deliverAddress"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="报关口岸">
                  <el-input v-model="detailPackingList.bGKA"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="运费方式">
                  <el-input v-model="detailPackingList.feeStyleA"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="运费单价">
                  <el-input v-model="detailPackingList.feeStyleB"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="是否带匹条">
                  <el-select v-model="detailPackingList.pT">
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="0"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="备注">
                  <el-input type="textarea" resize="none" v-model="detailPackingList.remarks"></el-input>
                </el-form-item>
              </el-col>
            </el-form>
          </div>
        </el-col>
        <el-col :span="24">
          <div class="request_bottom" style="marginTop:15px;">
            <div style="display:flex;">
              <div class>
                <el-button
                  type="primary"
                  @click.native="gHQuery"
                  style="marginBottom:10px;"
                  :disabled="gangHaoDisabled"
                >选择缸号</el-button>
              </div>
              <el-form
                style="display:flex;"
                label-width="100px"
                :model="totalList"
                :ref="totalList"
              >
                <el-form-item label="选择码数">
                  <el-input v-model="totalList.totalQuanity" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="选择件数">
                  <el-input v-model="totalList.totalJianShu" :disabled="true"></el-input>
                </el-form-item>
              </el-form>
            </div>
            <el-table
              :data="addGangHaoTableList"
              ref="addGangHaoTableList"
              tooltip-effect="dark"
              style="width: 100%"
              :border="true"
              :row-style="{height:'20px'}"
              :cell-style="{padding:'0px'}"
            >
              <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
              <el-table-column property="gangHao" label="缸号" width="120" align="center"></el-table-column>
              <el-table-column property="jNo" label="卷号" width="120" align="center"></el-table-column>
              <el-table-column property="maQuanity" label="码数" width="120" align="center"></el-table-column>
              <el-table-column property="lot" label="LOT" width="120" align="center"></el-table-column>
              <el-table-column property="clothId" label="布编" width="120" align="center"></el-table-column>
              <el-table-column property="factQuanity" label="实际出库数量" width="120" align="center">
                <template slot-scope="scope">
                  <el-input
                    type="number"
                    min="0"
                    v-model="scope.row.factQuanity"
                    @change="confirmWriteNum(scope.row)"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column property="cangku" label="存放位置" align="center"></el-table-column>
              <el-table-column property="ptcangku" label="匹条位置" align="center"></el-table-column>
              <el-table-column property="state" label="状态" align="center"></el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button @click.native="deleteClick(scope.row)" type="danger" size="mini">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-col>
        <el-col :span="24" style="margin:15px 0 0 0;textAlign:center;">
          <el-button
            @click.native="submitDeliveryForm('detailPackingList')"
            type="primary"
            style="width:150px;"
          >提交</el-button>
        </el-col>
      </div>
      <!--  选择缸号  -->
      <el-dialog
        width="60%"
        title="选择缸号"
        :visible.sync="gangHaoVisible"
        append-to-body
        :closeOnClickModal="closeOnClickModal"
        :closeOnPressEscape="closeOnPressEscape"
      >
        <div>
          <div style="marginBottom:15px;">
            <span style="margin:0 15px;">缸号</span>
            <el-select v-model="gangHaoSelect" @change="gangHaoClick">
              <el-option v-for="item in cutList" :key="item" :value="item"></el-option>
            </el-select>
            <!-- <span style="color:red;margin:0 5px;">*请先勾选后，在填写数量</span> -->
          </div>
          <div class="clothtable1">
            <el-table
              :data="gangHaoTableList"
              ref="gangHaoTableList"
              tooltip-effect="dark"
              style="width: 100%"
              :border="true"
              :row-style="{height:'20px'}"
              :cell-style="{padding:'0px'}"
              @selection-change="handleSelectionChange"
            >
              >
              <el-table-column type="selection" width="55" align="center"></el-table-column>
              <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
              <el-table-column property="jNo" label="卷号" width="120" align="center"></el-table-column>
              <el-table-column property="maQuanity" label="码数" width="120" align="center"></el-table-column>
              <el-table-column property="lot" label="LOT" width="120" align="center"></el-table-column>
              <el-table-column property="clothId" label="布编" width="120" align="center"></el-table-column>
              <!-- <el-table-column label="实际出库数量" width="120" align="center">
                <template slot-scope="scope">
                  <el-input
                    type="number"
                    min="0"
                    v-model="scope.row.factQuanity"
                    @change="writeNum(scope.row)"
                  ></el-input>
                </template>
              </el-table-column>-->
              <el-table-column property="cangku" label="存放位置" align="center"></el-table-column>
              <el-table-column property="ptcangku" label="匹条位置" align="center"></el-table-column>
              <el-table-column property="state" label="状态" align="center"></el-table-column>
            </el-table>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancleTable">取消</el-button>
          <el-button type="primary" @click.native="addTable">添加</el-button>
        </div>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import * as fhglApi from "@/api/shipmentsApi.js";
import querystring from "querystring";

export default {
  name: "fhxmd",
  data() {
    return {
      id: "",
      poorNum: "",
      maxQuantity: "",
      chooseSum: 0,
      value: "",
      titleType: "",
      selectApplyNo: "",
      gangHaoSelect: "",
      selectContractNo: "",
      selectckNo: "",
      fromWhich: "", // 判断从新增还是编辑弹开窗口
      cutList: [],
      applyList: [],
      invoiceList: [],
      formDetailPackingList: {},
      detailPackingList: {},
      totalList: {
        totalQuanity: "",
        totalJianShu: ""
      },
      addGangHaoTableList: [],
      gangHaoTableList: [],
      chooseList: [],
      saveList: [],
      newFhsqList: {},
      formInline: {},
      gangHaoDisabled: false,
      addDisabled: false,
      editorDisabled: false,
      flag: false,
      invoiceVisible: false,
      closeOnClickModal: false,
      closeOnPressEscape: false,
      gangHaoVisible: false
    };
  },
  methods: {
    // 删除 选择缸号信息
    deleteClick(row) {
      this.$confirm("确认删除该条卷号?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.addGangHaoTableList.forEach((item, index) => {
            if (item.jNo == row.jNo) {
              this.addGangHaoTableList.splice(index, 1);
            }
          });
        })
        .catch(() => {});
    },
    // 取消
    cancleTable() {
      this.gangHaoVisible = false;
    },
    // 将选中的缸号添加到申请表格里 （不能有重复的布，通过布细码单去重） bxmd
    addTable() {

      let _data = {
          gangHao: this.selectApplyNo,
          bxmd:"",
        };
        fhglApi
          .postgangHaoJudge(querystring.stringify(_data))
          .then(res => {
            console.log(res)
          })
          .catch(err => {
            console.log(err);
          });

      if (this.chooseList[0]) {
        for (let q = 0; q < this.chooseList[0].length; q++) {
          this.addGangHaoTableList.push(this.chooseList[0][q]);
        }
        // 进行数组去重，去掉相同 bxmd的布
        const bxmd = "bxmd";
        this.addGangHaoTableList = this.addGangHaoTableList.reduce(
          (all, next) =>
            all.some(atom => atom[bxmd] == next[bxmd]) ? all : [...all, next],
          []
        );

        this.$set(
          this.addGangHaoTableList,
          "totalJianShu",
          this.addGangHaoTableList.length
        );
        this.$set(
          this.totalList,
          "totalJianShu",
          this.addGangHaoTableList.length
        );

        this.gangHaoVisible = false;
        this.gangHaoTableList = [];
        for (let j = 0; j < this.addGangHaoTableList.length; j++) {
          this.$set(
            this.addGangHaoTableList[j],
            "storageNo",
            this.selectApplyNo
          );
        }
      } else {
        this.$message({ message: "请选择后再添加", duration: 2000 });
      }
    },
    // 选择缸号
    gHQuery() {
      this.gangHaoVisible = true;
      this.gangHaoSelect = "";
      this.chooseList = [];
      this.gangHaoTableList = [];
    },
    // 删除发货细码单(子列表)
    deleteOutBound() {
      console.log("删除");
      console.log(this.selectckNo);
      if (this.selectckNo) {
        this.$confirm("确认删除该条发货细码单?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            let _data = {
              ckNo: this.selectckNo
            };
            fhglApi
              .deleteShippingDetailOrder(querystring.stringify(_data))
              .then(res => {
                this.requestDetail();
                this.addDisabled = false;
                this.editorDisabled = true;
              })
              .catch(err => {
                console.log(err);
              });
          })
          .catch(() => {});
      }
    },
    // 新增/编辑 主发货单提交
    submitDeliveryForm() {
      if (this.fromWhich == 1) {
        // 新增
        if (
          Number(this.maxQuantity) ==
          Number(this.addGangHaoTableList.totalQuanity)
        ) {
          // let id = sessionStorage.getItem("id");
          let name = sessionStorage.getItem("name");
          this.$set(
            this.newFhsqList,
            "remarks",
            this.detailPackingList.remarks
          );
          this.$set(
            this.newFhsqList,
            "fhsqNo",
            this.formDetailPackingList.applyNo
          );
          this.$set(
            this.newFhsqList,
            "applyDate",
            this.formDetailPackingList.applyDate
          );
          this.$set(
            this.newFhsqList,
            "applyPerson",
            this.formDetailPackingList.employeeId
          );
          this.$set(
            this.newFhsqList,
            "client",
            this.formDetailPackingList.clientId
          );
          this.$set(this.newFhsqList, "personId", name);
          this.$set(this.newFhsqList, "dept", "");
          this.$set(
            this.newFhsqList,
            "clothId",
            this.formDetailPackingList.clothId
          );
          this.$set(
            this.newFhsqList,
            "gangHao",
            this.formDetailPackingList.gangHao
          );
          this.$set(this.newFhsqList, "nW", this.detailPackingList.nW);
          this.$set(this.newFhsqList, "bZD", this.detailPackingList.bZD);
          this.$set(this.newFhsqList, "maQuanity", "0");
          this.$set(this.newFhsqList, "jQuanity", "0");
          this.$set(this.newFhsqList, "pT", this.detailPackingList.pT);
          this.$set(this.newFhsqList, "recordman", "");
          this.$set(this.newFhsqList, "recordDate", "");
          this.$set(this.newFhsqList, "style", "大货出库");
          this.$set(
            this.newFhsqList,
            "deliverAddress",
            this.detailPackingList.deliverAddress
          );
          this.$set(this.newFhsqList, "bGKA", this.detailPackingList.bGKA);
          this.$set(
            this.newFhsqList,
            "feeStyleA",
            this.detailPackingList.feeStyleA
          );
          this.$set(
            this.newFhsqList,
            "feeStyleB",
            this.detailPackingList.feeStyleB
          );
          this.$set(this.newFhsqList, "kuaiDiNo", "");
          this.$set(this.newFhsqList, "pDF", "");
          this.$set(this.newFhsqList, "state", "0");
          this.$set(this.newFhsqList, "guid", "");
          this.$set(this.newFhsqList, "ckNo", "");
          this.$set(this.newFhsqList, "ckDate", "");

          let _data = this.newFhsqList;
          fhglApi
            .postAddDeliveryDetailOrderMain(_data)
            .then(res => {
              if ((res.code = "200")) {
                this.DeliveryForm(res.data);
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log(this.addGangHaoTableList);
          if (this.addGangHaoTableList.length == 0) {
            this.$message({
              message: "请先选择缸号",
              duration: 2500
            });
          } else {
            if (Number(this.maxQuantity) > Number(this.chooseSum)) {
              this.poorNum = Number(this.maxQuantity) - Number(this.chooseSum);
              this.$message({
                message:
                  "发货总数量必须与申请数量相等,还少" + this.poorNum + "码",
                duration: 2500
              });
            } else {
              this.poorNum = Number(this.chooseSum) - Number(this.maxQuantity);
              this.$message({
                message:
                  "发货总数量必须与申请数量相等,多了" + this.poorNum + "码",
                duration: 2500
              });
            }
          }
        }
      } else {
        // 编辑
        if (Number(this.maxQuantity) == Number(this.totalList.totalQuanity)) {
          // let id = sessionStorage.getItem("id");
          let name = sessionStorage.getItem("name");
          this.$set(
            this.newFhsqList,
            "remarks",
            this.detailPackingList.remarks
          );
          this.$set(
            this.newFhsqList,
            "fhsqNo",
            this.formDetailPackingList.applyNo
          );
          this.$set(
            this.newFhsqList,
            "applyDate",
            this.formDetailPackingList.applyDate
          );
          this.$set(
            this.newFhsqList,
            "applyPerson",
            this.formDetailPackingList.employeeId
          );
          this.$set(
            this.newFhsqList,
            "client",
            this.formDetailPackingList.clientId
          );
          this.$set(this.newFhsqList, "personId", name);
          this.$set(this.newFhsqList, "dept", "");
          this.$set(
            this.newFhsqList,
            "clothId",
            this.formDetailPackingList.clothId
          );
          this.$set(
            this.newFhsqList,
            "gangHao",
            this.formDetailPackingList.gangHao
          );
          this.$set(this.newFhsqList, "nW", this.detailPackingList.nW);
          this.$set(this.newFhsqList, "bZD", this.detailPackingList.bZD);
          this.$set(this.newFhsqList, "maQuanity", "0");
          this.$set(this.newFhsqList, "jQuanity", "0");
          this.$set(this.newFhsqList, "pT", this.detailPackingList.pT);
          this.$set(this.newFhsqList, "recordman", "");
          this.$set(this.newFhsqList, "recordDate", "");
          this.$set(this.newFhsqList, "style", "大货出库");
          this.$set(
            this.newFhsqList,
            "deliverAddress",
            this.detailPackingList.deliverAddress
          );
          this.$set(this.newFhsqList, "bGKA", this.detailPackingList.bGKA);
          this.$set(
            this.newFhsqList,
            "feeStyleA",
            this.detailPackingList.feeStyleA
          );
          this.$set(
            this.newFhsqList,
            "feeStyleB",
            this.detailPackingList.feeStyleB
          );
          this.$set(this.newFhsqList, "kuaiDiNo", "");
          this.$set(this.newFhsqList, "pDF", "");
          this.$set(this.newFhsqList, "state", "0");
          this.$set(this.newFhsqList, "guid", "");
          this.$set(this.newFhsqList, "ckNo", this.selectckNo);
          this.$set(this.newFhsqList, "ckDate", "");

          let _data = this.newFhsqList;
          fhglApi
            .posteditstorageOutD(_data)
            .then(res => {
              if ((res.code = "200")) {
                this.DeliveryForm(this.selectckNo);
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          if (Number(this.maxQuantity) > Number(this.chooseSum)) {
            this.poorNum = Number(this.maxQuantity) - Number(this.chooseSum);
            this.$message({
              message:
                "发货总数量必须与申请数量相等,还少" + this.poorNum + "码",
              duration: 2500
            });
          } else {
            this.poorNum = Number(this.chooseSum) - Number(this.maxQuantity);
            this.$message({
              message:
                "发货总数量必须与申请数量相等,多了" + this.poorNum + "码",
              duration: 2500
            });
          }
        }
      }
    },
    // 新增/编辑 副发货单提交
    DeliveryForm(ckNo) {
      if (this.fromWhich == 1) {
        // 新增
        for (let j = 0; j < this.addGangHaoTableList.length; j++) {
          this.$set(this.addGangHaoTableList[j], "ckNo", ckNo);
          this.$set(this.addGangHaoTableList[j], "state", 0);
          this.$set(
            this.addGangHaoTableList[j],
            "totalJianShu",
            this.addGangHaoTableList.totalJianShu
          );
          this.$set(
            this.addGangHaoTableList[j],
            "totalQuanity",
            this.addGangHaoTableList.totalQuanity
          );
        }
        let _data = this.addGangHaoTableList;
        fhglApi
          .postAddDeliveryDetailOrderVice(_data)
          .then(res => {
            if ((res.code = "200")) {
              this.$message({ message: res.msg, duration: 2000 });
              this.invoiceVisible = false;
              this.requestDetail();
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        // 编辑
        for (let j = 0; j < this.addGangHaoTableList.length; j++) {
          this.$set(this.addGangHaoTableList[j], "ckNo", ckNo);
          this.$set(this.addGangHaoTableList[j], "state", 0);
          this.$set(
            this.addGangHaoTableList[j],
            "totalJianShu",
            this.totalList.totalJianShu
          );
          this.$set(
            this.addGangHaoTableList[j],
            "totalQuanity",
            this.totalList.totalQuanity
          );
        }
        let _data = this.addGangHaoTableList;
        fhglApi
          .posteditstorageOutd(_data)
          .then(res => {
            if ((res.code = "200")) {
              this.$message({ message: res.msg, duration: 2000 });
              this.invoiceVisible = false;
              this.requestDetail();
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    // 时间的补 0
    p(s) {
      return s < 10 ? "0" + s : s;
    },
    // 确认缸号卷数的数量
    confirmWriteNum(row) {
      this.chooseSum = 0;
      if (Number(row.factQuanity) > Number(row.maQuanity)) {
        this.$message({ message: "不能大于当前码数", duration: 2000 });

        this.addGangHaoTableList.forEach((item, index) => {
          if (item.factQuanity == row.factQuanity) {
            item.factQuanity = 0;
          }
        });
        for (let i = 0; i < this.addGangHaoTableList.length; i++) {
          this.chooseSum += Number(this.addGangHaoTableList[i].factQuanity);
        }
        this.$set(this.addGangHaoTableList, "totalQuanity", this.chooseSum);
        this.$set(this.totalList, "totalQuanity", this.chooseSum);
      } else {
        if (this.addGangHaoTableList[0]) {
          for (let i = 0; i < this.addGangHaoTableList[0].length; i++) {
            this.chooseSum += Number(
              this.addGangHaoTableList[0][i].factQuanity
            );
          }
          // console.log(this.chooseSum, "已选择的数量");
          if (this.maxQuantity <= this.chooseSum) {
            this.$message({ message: "不能大于总申请码数", duration: 2000 });
            this.addGangHaoTableList[0].forEach((item, index) => {
              if (item.factQuanity == row.factQuanity) {
                item.factQuanity = 0;
              }
            });
          } else {
            for (let i = 0; i < this.addGangHaoTableList.length; i++) {
              this.chooseSum += Number(this.addGangHaoTableList[i].factQuanity);
            }
            this.$set(this.addGangHaoTableList, "totalQuanity", this.chooseSum);
            this.$set(this.totalList, "totalQuanity", this.chooseSum);
          }
        } else {
          return false;
        }
      }
    },
    // 选中
    handleSelectionChange(val) {
      this.chooseList = [];
      this.chooseList.push(val);
      console.log(val);
      // console.log(this.chooseList);
    },
    // 切换缸号
    gangHaoClick(val) {
      if (!this.chooseList[0]) {
        let _data = {
          condition:
            "gangHao='" +
            val +
            "' and contractNo='" +
            this.selectContractNo +
            "'",
          style: "3"
        };
        fhglApi
          .getGangHaoMsg(_data)
          .then(res => {
            this.gangHaoTableList = res.data;
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        let _data = {
          condition:
            "gangHao='" +
            val +
            "' and contractNo='" +
            this.selectContractNo +
            "'",
          style: "3"
        };
        fhglApi
          .getGangHaoMsg(_data)
          .then(res => {
            this.gangHaoTableList = res.data;
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    // 申请新增的 X 事件
    applyRequestClose() {},
    // 编辑发货单
    editorInvoice() {
      this.gangHaoDisabled = true;
      this.fromWhich = 2;
      this.addGangHaoTableList = [];
      if (this.selectApplyNo !== "") {
        this.newFhsqList = {}; //初始化新增发货申请单 top
        this.titleType = "编辑发货单";
        this.invoiceVisible = true;
        // 点击新增后直接获取 top 内详情并复赋值
        let _data = {
          applyNo: this.selectApplyNo
        };
        fhglApi
          .getStorageDetail(querystring.stringify(_data))
          .then(res => {
            this.formDetailPackingList = res.data;
            this.cutList = this.formDetailPackingList.gangHao.split("-");
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.$message({ message: "请先选择申请单", duration: 2000 });
      }
      this.editorMiddle();
      this.editorbottom();
    },
    // 编辑获取中间数据
    editorMiddle() {
      let _data = {
        condition: "ckNo='" + this.selectckNo + "'",
        style: 2
      };
      fhglApi
        .getselstorageOut(_data)
        .then(res => {
          this.detailPackingList = res.data[0];
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 编辑获取下边表格数据
    editorbottom() {
      let _data = {
        condition: "ckNo='" + this.selectckNo + "'"
      };
      fhglApi
        .getselstorageOutD(_data)
        .then(res => {
          // console.log(res.data[0]);
          this.addGangHaoTableList = res.data;
          this.totalList.totalQuanity = res.data[0].totalQuanity;
          this.totalList.totalJianShu = res.data[0].totalJianShu;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 新增发货单
    invoiceClick() {
      this.gangHaoDisabled = false;
      this.fromWhich = 1; // 新增为 1
      this.addGangHaoTableList = [];
      // this.formDetailPackingList = {};detailPackingList
      this.detailPackingList = {};
      this.totalList.totalQuanity = "";
      this.totalList.totalJianShu = "";
      if (this.selectApplyNo !== "") {
        this.newFhsqList = {}; //初始化新增发货申请单 top
        this.titleType = "新增发货单";
        this.invoiceVisible = true;
        // 点击新增后直接获取 top 内详情并复赋值
        let _data = {
          applyNo: this.selectApplyNo
        };
        fhglApi
          .getStorageDetail(querystring.stringify(_data))
          .then(res => {
            this.formDetailPackingList = res.data;
            this.cutList = this.formDetailPackingList.gangHao.split("-");
            // let id = sessionStorage.getItem("id");
            let name = sessionStorage.getItem("name");
            this.detailPackingList.personId = name;
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.$message({ message: "请先选择申请单", duration: 2000 });
      }
    },
    // 点击当前申请单，获取申请单编号
    detailClick(row) {
      this.selectApplyNo = row.applyNo;
      this.selectContractNo = row.contractNo;
      this.maxQuantity = row.applyQuanity;
      this.addDisabled = false;
      this.editorDisabled = false;
      this.requestDetail();
    },
    // 通过当前申请单号，获取下边表格详情
    requestDetail() {
      let _data = {
        applyNo: this.selectApplyNo
      };
      fhglApi
        .postOrderDetail(querystring.stringify(_data))
        .then(res => {
          this.invoiceList = res.data;
          if (res.data.length !== 0) {
            this.selectckNo = res.data[0].ckNo;
            this.editorDisabled = false;
            this.addDisabled = true;
          } else {
            this.editorDisabled = true;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取主表数据
    deliveryDetailOrder() {
      fhglApi
        .getDeliveryDetailOrder()
        .then(res => {
          this.applyList = res.data;
          // console.log(res.data)
        })
        .catch(err => {
          return false;
        });
    }
  },
  created() {
    this.deliveryDetailOrder();
  },
  mounted() {}
};
</script>

<style scoped>
.add_invoice {
  width: 120px;
  padding: 10px;
  background: #009688;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  margin: 5px 0;
  text-align: center;
}
.editor_invoice {
  width: 120px;
  padding: 10px;
  background: #009688;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  margin: 5px 0;
  text-align: center;
}
.delete_invoice {
  width: 120px;
  padding: 5px;
  background: red;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  margin: 5px 0;
  text-align: center;
}
.form2 {
  padding-right: 10px;
  margin: auto;
  border: 1px solid #ccc;
  display: flex;
  flex-wrap: wrap;
  padding-top: 5px;
}
.apply_goods {
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  padding-top: 5px;
}
</style>