<template>
  <div class="shipments_wrap">
    <!--  发货申请，合同  -->
    <div class="box1">
      <el-table
        highlight-current-row
        style="width: 100%;height:300px;"
        max-height="300"
        row-key="id"
        :border="true"
        :row-style="{height:'20px'}"
        :cell-style="{padding:'0px'}"
        @row-click="detailClick"
        :data="constractList"
      >
        <el-table-column type="index" label="序号" align="center"></el-table-column>
        <el-table-column property="contractNo" label="合同编号" align="center"></el-table-column>
        <el-table-column property="customer" label="客户" align="center" width="250px"></el-table-column>
        <el-table-column property="signPlace" label="地点" align="center"></el-table-column>
        <el-table-column property="saleStyle" label="销售类型" align="center"></el-table-column>
        <el-table-column property="signDate" label="签约日期" align="center"></el-table-column>
        <el-table-column property="contractBoby" label="公司" width="220" align="center"></el-table-column>
        <el-table-column property="classify" label="布料" align="center">
          <template
            slot-scope="scope"
          >{{ scope.row.classify == '0'?'牛仔布':scope.row.classify == '1'?'染色布':'针织布' }}</template>
        </el-table-column>
        <el-table-column property="brand" label="品牌" align="center"></el-table-column>
        <!-- <el-table-column property label="签约人"></el-table-column>
        <el-table-column property label="定金"></el-table-column>-->
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              @click.native="checkInventory(scope.row)"
              type="primary"
              size="mini"
              style="margin:2px;"
            >查看库存</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!--  发货申请，申请单  -->
    <div class="box2" style="marginTop:20px;">
      <el-table
        highlight-current-row
        style="width: 100%;height:300px;"
        max-height="300"
        row-key="id"
        :border="true"
        :row-style="{height:'20px'}"
        :cell-style="{padding:'0px'}"
        :data="applyList"
      >
        <el-table-column type="index" label="序号" align="center"></el-table-column>
        <el-table-column property="applyNo" label="申请单号" align="center"></el-table-column>
        <el-table-column property="applyDate" label="申请日期" align="center"></el-table-column>
        <el-table-column property="clothId" label="布编" align="center"></el-table-column>
        <el-table-column property="quanity" label="发货数量" align="center"></el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.state == '1'?'已审批':'待审批'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="150px" fixed="right">
          <template slot-scope="scope">
            <el-button
              @click.native="editorShippingRequestClick(scope.row)"
              type="success"
              size="mini"
              style="margin:2px;"
            >编辑</el-button>
            <el-button
              @click.native="deleteShippingRequestClick(scope.row)"
              type="danger"
              size="mini"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--  库房查看弹窗  -->
    <el-dialog
      title="库存查看"
      :visible.sync="inventoryVisible"
      :closeOnClickModal="closeOnClickModal"
      :closeOnPressEscape="closeOnPressEscape"
      width="80%"
    >
      <el-table
        :border="true"
        :row-style="{height:'20px'}"
        :cell-style="{padding:'0px'}"
        max-height="300"
        style="width: 100%;height:300px;"
        :data="checkInventoryList"
      >
        <el-table-column type="index" label="序号" align="center"></el-table-column>
        <el-table-column property="clothId" label="布编" align="center"></el-table-column>
        <el-table-column property="contractQuanity" label="合同数量" align="center"></el-table-column>
        <el-table-column property="ruKuQuanity" label="累计入库数量" align="center"></el-table-column>
        <el-table-column property="applyQuanity" label="累计申请数量" align="center"></el-table-column>
        <el-table-column property="deliverQuanity" label="累计发货数量" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="200px">
          <template slot-scope="scope">
            <el-button
              @click.native="applyGoodsClick(scope.row)"
              type="primary"
              size="mini"
              style="margin:2px;"
              :disabled="scope.row.contractQuanity == scope.row.applyQuanity || scope.row.ruKuQuanity == 0"
            >申请发货</el-button>
            <el-button @click.native="zDeleteClick(scope.row)" type="primary" size="mini">提交审批</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <!--  申请发货弹窗  -->
    <el-dialog
      :title="titleType"
      :visible.sync="shippingRequestVisible"
      :closeOnClickModal="closeOnClickModal"
      :closeOnPressEscape="closeOnPressEscape"
      width="80%"
      @close="applyRequestClose"
    >
      <div class="apply_goods">
        <div class="request_top">
          <el-form
            :model="requestInfoList"
            ref="requestInfoList"
            label-width="100px"
            class="demo-requestInfoList form2"
          >
            <el-col :span="6">
              <el-form-item label="发货申请单">
                <el-input v-model="requestInfoList.applyNo" placeholder="自动生成" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="申请日期">
                <el-form-item>
                  <el-date-picker
                    type="date"
                    placeholder="选择日期"
                    v-model="requestInfoList.applyDate"
                    style="width: 100%"
                    :disabled="true"
                  ></el-date-picker>
                </el-form-item>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="是否含税">
                <el-input placeholder="自动生成" v-model="requestInfoList.fax" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="业务部门">
                <el-input v-model="requestInfoList.dept" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="业务员">
                <el-select v-model="requestInfoList.saleManName" :disabled="true">
                  <el-option label="牛仔布" value></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="客户合同">
                <el-input v-model="requestInfoList.contractNo" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="联系人">
                <el-input v-model="requestInfoList.linkman" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="联系电话">
                <el-input placeholder="自动生成" v-model="requestInfoList.linktel" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="发货客户">
                <el-input v-model="requestInfoList.deliveCustomer"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="香港OW">
                <el-input v-model="requestInfoList.ow"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="送货地址">
                <el-input type="textarea" v-model="requestInfoList.address" resize="none"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="是否要发票">
                <el-select v-model="requestInfoList.fP">
                  <el-option label="是" value="1"></el-option>
                  <el-option label="否" value="0"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="信用证收益单位" label-width="150">
                <el-input v-model="requestInfoList.shouYiUnit" style="width:auto;" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="付款单位" style="marginRight:10px">
                <el-input v-model="requestInfoList.payUnit"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <template>
                <span style="color:red;">注意事项：付款单位必须填写全程，开票时按此单位、金额执行开票</span>
              </template>
            </el-col>
            <el-col :span="6">
              <el-form-item label="备注">
                <el-input type="textarea" v-model="requestInfoList.remarks" resize="none"></el-input>
              </el-form-item>
            </el-col>

            <!-- <el-col :span="6">
              <el-form-item label="记录人">
                <el-select v-model="requestInfoList.relatedOrder">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="记录时间">
                <el-select v-model="requestInfoList.deliveryArea">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="限制天数">
                <el-input v-model="requestInfoList.deliveryPlace"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="限制金额">
                <el-select v-model="requestInfoList.choiceOrNot">
                  <el-option label="是" value="1"></el-option>
                  <el-option label="否" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>-->
          </el-form>
        </div>
        <div class="request_bottom">
          <el-table
            highlight-current-row
            style="width: 100%;"
            row-key="id"
            :border="true"
            :row-style="{height:'20px'}"
            :cell-style="{padding:'0px'}"
            :data="contractBasicInfoList"
          >
            <el-table-column type="index" label="序号" align="center"></el-table-column>
            <el-table-column property="contractNo" label="合同编号" align="center" width="120"></el-table-column>
            <el-table-column property="clothId" label="布编" align="center" width="120"></el-table-column>
            <el-table-column property="quantity" label="订单数量" align="center" width="120"></el-table-column>
            <el-table-column label="缸号及分LOT说明" align="center" width="200">
              <el-input autocomplete="off" v-model="contractDeliverList.remarks" :disabled="true"></el-input>
            </el-table-column>
            <el-table-column property label="发货数量" align="center" width="120">
              <template slot-scope>
                <el-input type="number" v-model="countNum" @change="deliveryNum" min="0"></el-input>
              </template>
            </el-table-column>
            <el-table-column property="unitPrice" label="发货单价" align="center" width="120"></el-table-column>
            <el-table-column property="moneyStyle" label="币种" align="center" width="120">
              <!-- <template
                slot-scope="scope"
              >{{ scope.row.moneyStyle == '0'?'RMB':scope.row.moneyStyle == '1'?'港币':'美元' }}</template>-->
            </el-table-column>
            <el-table-column property="exportRate" label="出口汇率" align="center" width="120"></el-table-column>
            <el-table-column property="noExportRate" label="出口汇率" align="center" width="120"></el-table-column>
            <el-table-column property="payTime" label="发货日期" align="center" width="120"></el-table-column>
            <el-table-column property="deliverStyle" label="发货类型" align="center" width="120">
              <template>
                <el-select v-model="contractDeliverList.deliverStyle">
                  <el-option label="A" value="1"></el-option>
                  <el-option label="B" value="2"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column property="classify" label="商品名称" align="center" width="120">
              <template
                slot-scope="scope"
              >{{ scope.row.classify == '0'?'牛仔布':scope.row.classify == '1'?'染色布':'针织布' }}</template>
            </el-table-column>
            <el-table-column property="classify" label="商品类型" align="center" width="120">
              <template
                slot-scope="scope"
              >{{ scope.row.classify == '0'?'牛仔布':scope.row.classify == '1'?'染色布':'针织布' }}</template>
            </el-table-column>
            <el-table-column property="sec" label="规格" align="center" width="120">
              <template>
                <el-input v-model="contractDeliverList.sec"></el-input>
              </template>
            </el-table-column>
            <el-table-column property="fpUnit" label="发票单位" align="center" width="120">
              <template
                slot-scope="scope"
              >{{ scope.row.unit == '码'?'码':scope.row.unit == '米'?'米':scope.row.unit == 'KG'?'KG':'件' }}</template>
            </el-table-column>
            <el-table-column label="发票备注" align="center" width="120">
              <el-input autocomplete="off" v-model="contractDeliverList.fpRemarks"></el-input>
            </el-table-column>
          </el-table>
          <div class="shipping_request_popover">
            <el-button
              type="primary"
              @click.native="submitRequestForm('requestInfoList')"
              style="width:200px;"
            >提交</el-button>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as fhglApi from "@/api/shipmentsApi.js";
import querystring from "querystring";

export default {
  name: "fhsq",
  data() {
    return {
      id: "",
      titleType: "",
      value: "",
      getgangHaoClothId: "",
      selectClothId: "",
      selectContractNo: "",
      selectApplyNo: "",
      inventoryVisible: false,
      closeOnClickModal: false,
      closeOnPressEscape: false,
      shippingRequestVisible: false,
      // 合同列表
      constractList: [],
      // 合同对应的申请单列表
      applyList: [],
      // first 层
      checkInventoryList: [],
      // second 层
      requestInfoList: {},
      // 关于合同的基础信息
      contractBasicInfoList: [],
      // 关于合同要传递的信息
      contractDeliverList: {},
      num1: "",
      countNum: "",
      contractQuanity: "",
      ruKuQuanity: "",
      applyQuanity: "",
      deliverQuanity: "",
      According: "",
      currentClassify: ""
    };
  },
  methods: {
    // 加载布料信息后，请求缸号
    LoadGnagHao() {
      let _data = {
        contractNo: this.selectContractNo,
        clothId: this.getgangHaoClothId
      };
      // console.log(_data)
      fhglApi
        .getLoadGnagHao(querystring.stringify(_data))
        .then(res => {
          // console.log(res)
          this.$set(this.contractDeliverList, "remarks", res.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 当发货数量被修改时
    deliveryNum(value) {
      // console.log(this.contractQuanity,this.ruKuQuanity,this.applyQuanity,this.deliverQuanity)
      // 可以申请首要判断条件 入库数和合同数
      if (Number(this.ruKuQuanity) >= Number(this.contractQuanity)) {
        this.num1 = this.contractQuanity - this.applyQuanity;
        this.countNum = this.num1;
      } else {
        // 判断入库数 是否大于申请数
        if (Number(this.ruKuQuanity) > Number(this.applyQuanity)) {
          // console.log(this.ruKuQuanity,this.applyQuanity)
          this.num1 = this.ruKuQuanity - this.applyQuanity;
        } else {
          this.num1 = 0;
        }
      }
      // 判断输入值和可填数的大小
      if (Number(value) > Number(this.num1)) {
        this.countNum = this.num1;
        this.$message({ message: "订单数量为" + this.num1, duration: 2000 });
      } else {
        this.countNum = value;
      }
    },
    // 提交申请单
    submitRequestForm() {
      // 正常走申请发货单
      if (this.According == "1") {
        this.requestInfoList = Object.assign(this.requestInfoList, {
          ow: this.requestInfoList.ow,
          //   shouYiUnit: this.requestInfoList.shouYiUnit,
          payUnit: this.requestInfoList.payUnit,
          remarks: this.requestInfoList.remarks,
          fP: this.requestInfoList.fP
        });
        //   提交主表 获取成功单号
        let _data = this.requestInfoList;
        fhglApi
          .postAddShippingRequest(_data)
          .then(res => {
            this.successFormAfter(res.data);
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        // 通过编辑进来 直接提交当前发货单内容
        this.requestInfoList = Object.assign(this.requestInfoList, {
          ow: this.requestInfoList.ow,
          //   shouYiUnit: this.requestInfoList.shouYiUnit,
          payUnit: this.requestInfoList.payUnit,
          remarks: this.requestInfoList.remarks,
          fP: this.requestInfoList.fP
        });
        //   提交主表 获取成功单号
        let _data = this.requestInfoList;
        fhglApi
          .postEditorAfterVerify(_data)
          .then(res => {
            this.successFormAfter(this.selectApplyNo);
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    // 当表单提交成功后返回编号 再发送表格内数据
    successFormAfter(applyNo) {
      if (this.According == "1") {
        let id = sessionStorage.getItem("id");
        let name = sessionStorage.getItem("name");
        this.$set(this.contractDeliverList, "applyNo", applyNo);
        let {
          clothId,
          unitPrice,
          payTime,
          classify,
          unit
        } = this.contractBasicInfoList[0];
        this.$set(this.contractDeliverList, "orderNo", "1");
        this.$set(this.contractDeliverList, "state", "0");
        this.$set(this.contractDeliverList, "clothId", clothId);
        this.$set(this.contractDeliverList, "quanity", this.countNum);
        this.$set(this.contractDeliverList, "unit", unitPrice);
        this.$set(this.contractDeliverList, "deliverDate", payTime);
        this.$set(this.contractDeliverList, "personId", id);
        this.$set(this.contractDeliverList, "personName", name);
        if (this.classify == "0") {
          this.$set(this.contractDeliverList, "shopName", "牛仔布");
        } else if (this.classify == "1") {
          this.$set(this.contractDeliverList, "shopName", "染色布");
        } else {
          this.$set(this.contractDeliverList, "shopName", "针织布");
        }
        if (this.unit == "码") {
          this.$set(this.contractDeliverList, "fpUnit", "码");
        } else if (this.unit == "米") {
          this.$set(this.contractDeliverList, "fpUnit", "米");
        } else if (this.unit == "KG") {
          this.$set(this.contractDeliverList, "fpUnit", "KG");
        } else {
          this.$set(this.contractDeliverList, "fpUnit", "件");
        }
        //  通过获取成功后的单号 发送副表内容
        let _data = this.contractDeliverList;
        fhglApi
          .addShippingRequestVice(_data)
          .then(res => {
            this.$message({ message: res.msg, duration: 2000 });
            this.seeInventory(this.selectContractNo);
            this.shippingRequestVisible = false;
            this.contractBasicInfoList = JSON.parse(
              JSON.stringify(this.defaultForm1)
            );
            this.contractDeliverList = JSON.parse(
              JSON.stringify(this.defaultForm2)
            );
            this.requestInfoList = JSON.parse(
              JSON.stringify(this.defaultForm3)
            );
            this.getContractApplyList(this.selectContractNo);
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        let id = sessionStorage.getItem("id");
        let name = sessionStorage.getItem("name");
        this.$set(this.contractDeliverList, "applyNo", applyNo);
        let {
          clothId,
          unitPrice,
          payTime,
          classify,
          unit
        } = this.contractBasicInfoList[0];
        this.$set(this.contractDeliverList, "orderNo", "1");
        this.$set(this.contractDeliverList, "state", "0");
        this.$set(this.contractDeliverList, "clothId", clothId);
        this.$set(this.contractDeliverList, "quanity", this.countNum);
        this.$set(this.contractDeliverList, "unit", unitPrice);
        this.$set(this.contractDeliverList, "deliverDate", payTime);
        this.$set(this.contractDeliverList, "personId", id);
        this.$set(this.contractDeliverList, "personName", name);
        if (this.classify == "0") {
          this.$set(this.contractDeliverList, "shopName", "牛仔布");
        } else if (this.classify == "1") {
          this.$set(this.contractDeliverList, "shopName", "染色布");
        } else {
          this.$set(this.contractDeliverList, "shopName", "针织布");
        }
        if (this.unit == "码") {
          this.$set(this.contractDeliverList, "fpUnit", "码");
        } else if (this.unit == "米") {
          this.$set(this.contractDeliverList, "fpUnit", "米");
        } else if (this.unit == "KG") {
          this.$set(this.contractDeliverList, "fpUnit", "KG");
        } else {
          this.$set(this.contractDeliverList, "fpUnit", "件");
        }
        //  通过获取成功后的单号 发送副表内容
        let _data = this.contractDeliverList;
        fhglApi
          .postEditorAfterVerifyS(_data)
          .then(res => {
            this.$message({ message: res.msg, duration: 2000 });
            this.seeInventory(this.selectContractNo);
            this.shippingRequestVisible = false;
            this.contractBasicInfoList = JSON.parse(
              JSON.stringify(this.defaultForm1)
            );
            this.contractDeliverList = JSON.parse(
              JSON.stringify(this.defaultForm2)
            );
            this.requestInfoList = JSON.parse(
              JSON.stringify(this.defaultForm3)
            );
            this.getContractApplyList(this.selectContractNo);
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
    // 弹窗的 x
    applyRequestClose() {
      if (this.According == "1") {
        this.inventoryVisible = true;
      } else {
        this.shippingRequestVisible = false;
      }
    },
    // 申请发货弹窗
    applyGoodsClick(row) {
      this.titleType = "发货申请单新增";
      this.According = "1";
      // 合同数
      this.contractQuanity = row.contractQuanity;
      // 入库数
      this.ruKuQuanity = row.ruKuQuanity;
      // 申请数
      this.applyQuanity = row.applyQuanity;
      // 发货数
      this.deliverQuanity = row.deliverQuanity;

      this.contractBasicInfoList = JSON.parse(
        JSON.stringify(this.defaultForm1)
      );
      this.countNum = "";
      this.contractDeliverList = JSON.parse(JSON.stringify(this.defaultForm2));
      this.requestInfoList = JSON.parse(JSON.stringify(this.defaultForm3));
      this.inventoryVisible = false; // first
      this.shippingRequestVisible = true; // second
      // 获取 top部分信息
      let _data1 = {
        contractNo: row.contractNo
      };
      fhglApi
        .getContractBasicInfo(querystring.stringify(_data1))
        .then(res => {
          let {
            contractNo,
            saleManId,
            departmentId,
            departmentName,
            linktel,
            linkman,
            deliverPlace,
            saleType,
            clientName,
            clientId,
            classify
          } = res.data;
          this.currentClassify = classify;
          this.$set(this.requestInfoList, "contractNo", contractNo);
          this.$set(this.requestInfoList, "signer", saleManId);
          this.$set(this.requestInfoList, "contractCustomer", departmentName);
          this.$set(this.requestInfoList, "dept", departmentId);
          this.$set(this.requestInfoList, "linkman", linkman);
          this.$set(this.requestInfoList, "linktel", linktel);
          this.$set(this.requestInfoList, "address", deliverPlace);
          this.$set(this.requestInfoList, "deliveCustomer", clientName);
          this.$set(this.requestInfoList, "contractCustomer", clientId);
          this.$set(this.requestInfoList, "approveStyle", saleType);
          if ((saleType = "内销合同")) {
            this.$set(this.requestInfoList, "fax", "不含税");
          } else {
            this.$set(this.requestInfoList, "fax", "含税");
          }
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
          this.$set(this.requestInfoList, "applyDate", resDate + " " + resTime);
          // console.log(saleType)
          //   console.log(this.requestInfoList.applyDate)
        })
        .catch(err => {
          console.log(err);
        });
      // 获取 bottom部分信息
      this.getgangHaoClothId = "";
      let _data2 = {
        contractNo: row.contractNo,
        clothId: row.clothId
      };
      fhglApi
        .getcloth(_data2)
        .then(res => {
          this.getgangHaoClothId = res.data[0].clothId;
          this.contractBasicInfoList = res.data;
          this.$set(
            this.contractBasicInfoList[0],
            "classify",
            this.currentClassify
          );
          this.LoadGnagHao();
        })
        .catch(err => {
          console.log(err);
        });
    },
    //查看当前合同的库存弹窗
    checkInventory(row) {
      this.inventoryVisible = true;
      this.seeInventory(row.contractNo);
    },
    // 查看库存
    seeInventory(contractNo) {
      this.selectContractNo = contractNo;
      let _data = {
        contractNo: contractNo
      };
      fhglApi
        .shippingRequestToViewInventory(_data)
        .then(res => {
          this.checkInventoryList = res;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 点击当前合同 ，调用获取对应申请单方法
    detailClick(row) {
      this.selectContractNo = row.contractNo;
      this.getContractApplyList(row.contractNo);
    },
    // 获取合同下申请单
    getContractApplyList(contractNo) {
      this.applyList = [];
      let _data = {
        contractNo: contractNo
      };
      fhglApi
        .getShippingRequestDetail(_data)
        .then(res => {
          this.applyList = res;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 根据布编、合同编号 获取当前库存
    shippingRequestToViewInventory(row) {
      let _data2 = {
        contractNo: row.contractNo,
        clothId: row.clothId
      };
      fhglApi
        .shippingRequestToViewInventory(_data2)
        .then(res => {
          let {
            contractQuanity,
            ruKuQuanity,
            applyQuanity,
            deliverQuanity
          } = res[0];
          this.contractQuanity = contractQuanity;
          this.ruKuQuanity = ruKuQuanity;
          this.applyQuanity = applyQuanity;
          this.deliverQuanity = deliverQuanity;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 编辑前验证
    editorBeforeVerify(applyNo) {
      this.titleType = "发货申请单编辑";
      let _data = {
        applyNo: applyNo
      };
      fhglApi
        .editorBeforeVerify(_data)
        .then(res => {
          if ((res.code = "200")) {
            this.lookEditorDetaile();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 编辑验证通过后 获取表单top内容
    lookEditorDetaile() {
      let _data1 = {
        applyNo: this.selectApplyNo
      };
      fhglApi
        .editorShippingRequest(_data1)
        .then(res => {
          this.shippingRequestVisible = true;
          this.requestInfoList = res.data[0];
          let {
            quanity,
            fpUnit,
            fpRemarks,
            sec,
            remarks,
            deliverStyle
          } = res.data[0].applyS[0];
          this.countNum = quanity;
          this.$set(this.contractDeliverList, "fpUnit", fpUnit);
          this.$set(this.contractDeliverList, "fpRemarks", fpRemarks);
          this.$set(this.contractDeliverList, "sec", sec);
          this.$set(this.contractDeliverList, "remarks", remarks);
          this.$set(this.contractDeliverList, "deliverStyle", deliverStyle);
        })
        .catch(err => {
          console.log(err);
        });

      let _data2 = {
        contractNo: this.selectContractNo,
        clothId: this.selectClothId
      };
      fhglApi
        .getcloth(_data2)
        .then(res => {
          this.contractBasicInfoList = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 编辑申请单
    editorShippingRequestClick(row) {
      this.selectClothId = row.clothId;
      this.selectApplyNo = row.applyNo;
      this.According = "2";
      this.shippingRequestToViewInventory(row);
      this.editorBeforeVerify(row.applyNo);
    },
    // 删除申请单
    deleteShippingRequestClick(row) {
      this.$confirm("确认删除该条申请单?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let _data = {
            applyNo: row.applyNo
          };
          fhglApi
            .deleteShippingRequest(querystring.stringify(_data))
            .then(res => {
              if ((res.code = "200")) {
                this.getContractApplyList(this.selectContractNo);
                this.$message({ message: "删除成功", duration: 2000 });
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {});
    },
    // 获取完成审批的合同列表
    completeApprovalContract() {
      let id = sessionStorage.getItem("id");
      let _data = {
        personId: id,
      };
      fhglApi
        .getCompleteApprovalContract(querystring.stringify(_data))
        .then(res => {
          if (res.code == 200) {
            this.constractList = res.data;
          } else {
            this.$message({ message: res.msg, duration: 2000 });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.defaultForm1 = JSON.parse(JSON.stringify(this.contractBasicInfoList));
    this.defaultForm2 = JSON.parse(JSON.stringify(this.contractDeliverList));
    this.defaultForm3 = JSON.parse(JSON.stringify(this.requestInfoList));
    //调用获取合同列表接口
    this.completeApprovalContract();
  },
  mounted() {}
};
</script>

<style scoped>
.apply_goods {
  width: 100%;
  height: 100%;
  z-index: 1000;
  border: 1px solid #ccc;
  padding: 5px;
}

.form2 {
  padding-right: 10px;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  padding-top: 5px;
}
.shipping_request_popover {
  text-align: center;
  margin: 40px 0 10px;
  /* margin-bottom: 10px; */
  /* margin-left: 20px; */
}
.request_bottom {
  margin-top: 20px;
}
</style>