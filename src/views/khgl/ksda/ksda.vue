<template>
  <div class="customer_wrap">
    <!--  客商列表模糊搜索  -->
    <div class="box1" style="borderBottom: 1px solid #ccc;">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="客商">
          <el-input v-model="merchants" placeholder="请输入客商"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.native="searchList">检索</el-button>
          <el-button type="primary" @click.native="refreshList">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="box2" style="margin:10px 0;">
      <!--  信息录入  -->
      <div style="display:flex;margin:10px 0;">
        <div class="basic_information_entry" @click="basicInfoEntry">
          <i class="el-icon-edit"></i>
          基础信息录入
        </div>
        <div class="personal_information_entry" @click="personInfoEntry">
          <i class="el-icon-edit"></i>
          个人信息录入
        </div>
      </div>
      <el-table
        highlight-current-row
        style="width: 100%"
        max-height="240"
        :border="true"
        :row-style="{height:'20px'}"
        :cell-style="{padding:'0px'}"
        @row-click="personalDetail"
        :data="merchantsRelationshipList"
      >
        <el-table-column type="index" label="序号" align="center"></el-table-column>
        <el-table-column label="地区" align="center" width="160px">
          <template slot-scope="scope">
            <div>{{scope.row.province}}-{{scope.row.city}}</div>
          </template>
        </el-table-column>
        <el-table-column property="clientNo" label="客商编号" align="center" width="160px"></el-table-column>
        <el-table-column property="clientName" label="客商名称" align="center" width="260px"></el-table-column>
        <el-table-column property="clientStyle" label="客商类型" align="center" width="160px"></el-table-column>
        <el-table-column property="linkman" label="联系人" align="center" width="160px"></el-table-column>
        <el-table-column property="linktel" label="电话" align="center" width="160px"></el-table-column>
        <el-table-column property="fax" label="传真" align="center" width="160px"></el-table-column>
        <el-table-column property="mailingBoardPayStyle" label="寄板限码" align="center" width="160px"></el-table-column>
        <el-table-column label="停用" align="center">
          <template slot-scope="scope">{{ scope.row.state == '1'?'使用':'停用' }}</template>
        </el-table-column>
        <el-table-column property="recently" label="最后的业务日期" align="center" width="180px"></el-table-column>
        <el-table-column property="treasureNo" label="财务编号" align="center" width="160px"></el-table-column>
      </el-table>
    </div>
    <div class="box3" style="marginTop:20px;">
      <el-table
        highlight-current-row
        style="width: 100%"
        max-height="240"
        :border="true"
        :row-style="{height:'20px'}"
        :cell-style="{padding:'0px'}"
        :data="merchantsPersonList"
      >
        <el-table-column type="index" label="序号" align="center"></el-table-column>
        <el-table-column property="totalDays" label="业务部门" align="center"></el-table-column>
        <el-table-column property="totalAmount" label="业务员" align="center"></el-table-column>
        <el-table-column property="daysofarrears" label="欠款天数" align="center"></el-table-column>
        <el-table-column property="amountofarrears" label="欠款额度" align="center"></el-table-column>
        <el-table-column property="remarksofarrears" label="欠款备注" align="center"></el-table-column>
        <el-table-column label="审批状态" align="center">
          <template slot-scope="scope">{{ scope.row.state == '1'?'已审批':'待审批' }}</template>
        </el-table-column>
      </el-table>
    </div>
    <!--  基础信息录入  -->
    <el-dialog
      title="基础信息录入"
      :visible.sync="basicInfoVisible"
      :closeOnClickModal="closeOnClickModal"
      :closeOnPressEscape="closeOnPressEscape"
      width="80%"
    >
      <div class="basic_info">
        <el-divider content-position="left">基础信息</el-divider>
        <el-col :span="24">
          <div class="request_top">
            <el-form
              label-width="100px"
              class="demo-formDetailPackingList form2"
              :model="formDetailPackingList"
              :ref="formDetailPackingList"
            >
              <el-col :span="6">
                <el-form-item label="客商编号">
                  <el-input v-model="formDetailPackingList.clientNo"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="客商类型">
                  <el-select v-model="formDetailPackingList.clientStyle">
                    <el-option label="制衣厂" value="制衣厂"></el-option>
                    <el-option label="品牌商" value="品牌商"></el-option>
                    <el-option label="贸易商" value="贸易商"></el-option>
                    <el-option label="其他" value="其他"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="财务编号">
                  <el-input v-model="formDetailPackingList.treasureNo"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="财务负责人">
                  <el-input v-model="formDetailPackingList.treasurePerson"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="结算方式">
                  <el-input v-model="formDetailPackingList.settlementMethod"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="客商名称">
                  <el-input v-model="formDetailPackingList.clientName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="从属企业">
                  <el-select v-model="formDetailPackingList.followBussiness">
                    <el-option label="AA" value="AA"></el-option>
                    <el-option label="DD" value="DD"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="营业执照证 副本复印件" class="lineHeight">
                  <el-input v-model="formDetailPackingList.yyzzFb"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="税务登记证 副本复印件" class="lineHeight">
                  <el-input v-model="formDetailPackingList.swdjFb"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="传真">
                  <el-input v-model="formDetailPackingList.fax"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="开票地址">
                  <el-input v-model="formDetailPackingList.invoiceAddress"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="纳税人识别号">
                  <el-input v-model="formDetailPackingList.taxpayerSerialNumber"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="账户">
                  <el-input v-model="formDetailPackingList.account"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="电话">
                  <el-input v-model="formDetailPackingList.tel"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="开户行">
                  <el-input v-model="formDetailPackingList.invoiceBank"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="交货地点">
                  <el-input v-model="formDetailPackingList.deliverPlace"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="停用">
                  <el-select v-model="formDetailPackingList.state">
                    <el-option label="使用" value="1"></el-option>
                    <el-option label="停用" value="0"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="企业经理">
                  <el-input v-model="formDetailPackingList.bussinessManager"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="企业电话">
                  <el-input v-model="formDetailPackingList.bussinesstel"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="从属企业客商名称包含过滤" class="lineHeight">
                  <el-input :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="国家">
                  <el-select v-model="formDetailPackingList.province" @change="changeCountry">
                    <el-option
                      v-for="item in countryList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.name"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="地区">
                  <el-select v-model="formDetailPackingList.city">
                    <el-option
                      v-for="item in regionList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.name"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="寄板运费的支付方式选择" class="lineHeight">
                  <el-select v-model="formDetailPackingList.mailingBoardPayStyle">
                    <el-option label="申通到付" value="申通到付"></el-option>
                    <el-option label="申通寄付" value="申通寄付"></el-option>
                    <el-option label="顺丰到付" value="顺丰到付"></el-option>
                    <el-option label="顺丰寄付" value="顺丰寄付"></el-option>
                    <el-option label="其他公司到付" value="其他公司到付"></el-option>
                    <el-option label="其他公司寄付" value="其他公司寄付"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="联系人">
                  <el-input v-model="formDetailPackingList.linkman"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="职务">
                  <el-input v-model="formDetailPackingList.duty"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="联系电话">
                  <el-input v-model="formDetailPackingList.linktel"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="地址">
                  <el-input v-model="formDetailPackingList.address"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="规模产能简述">
                  <el-input v-model="formDetailPackingList.scaleAndcapacity"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="规模">
                  <el-select v-model="formDetailPackingList.scale">
                    <el-option label="200人以下" value="200人以下"></el-option>
                    <el-option label="200-500人" value="200-500人"></el-option>
                    <el-option label="500-1000人" value="500-1000人"></el-option>
                    <el-option label="1000人以上" value="1000人以上"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="产能">
                  <el-select v-model="formDetailPackingList.capacity">
                    <el-option label="5万件以下" value="5万件以下"></el-option>
                    <el-option label="5-15万件" value="5-15万件"></el-option>
                    <el-option label="15-30万件" value="15-30万件"></el-option>
                    <el-option label="30万件以上" value="30万件以上"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="厂房">
                  <el-input v-model="formDetailPackingList.workShop"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="自购">
                  <el-select v-model="formDetailPackingList.zBuy">
                    <el-option label="是" value="是"></el-option>
                    <el-option label="否" value="否"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="生产品牌">
                  <el-input v-model="formDetailPackingList.pBrand"></el-input>
                  <!-- <el-input v-model="formDetailPackingList.pBrand" @focus="addBrand"></el-input> -->
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="渠道">
                  <el-select v-model="formDetailPackingList.channel">
                    <el-option label="出口" value="出口"></el-option>
                    <el-option label="内销" value="内销"></el-option>
                    <el-option label="出口/内销" value="出口/内销"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="备注">
                  <el-input v-model="formDetailPackingList.remarks" type="textarea" resize="none"></el-input>
                </el-form-item>
              </el-col>
            </el-form>
          </div>
        </el-col>
        <el-divider content-position="left">客商评级</el-divider>
        <el-col :span="24">
          <div class="request_middle" style="marginTop:20px;">
            <el-form
              label-width="100px"
              class="demo-requestInfoList form2"
              :model="detailPackingList"
              :ref="detailPackingList"
            >
              <el-col :span="6">
                <el-form-item label="安全">
                  <el-select v-model="detailPackingList.safety">
                    <el-option label="AA" value="AA"></el-option>
                    <el-option label="BB" value="BB"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="信誉保障">
                  <el-select v-model="detailPackingList.creditGuarantee">
                    <el-option label="AA" value="AA"></el-option>
                    <el-option label="BB" value="BB"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="资金回笼">
                  <el-select v-model="detailPackingList.Returnofunds">
                    <el-option label="AA" value="AA"></el-option>
                    <el-option label="BB" value="BB"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="数量">
                  <el-input
                    v-model="detailPackingList.quantity"
                    type="number"
                    min="1"
                    @change="minNum1"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="价钱">
                  <el-select v-model="detailPackingList.unit">
                    <el-option label="AA" value="AA"></el-option>
                    <el-option label="BB" value="BB"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="客商级别">
                  <el-select v-model="detailPackingList.clientLevel">
                    <el-option label="AA" value="AA"></el-option>
                    <el-option label="BB" value="BB"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="寄板上限">
                  <el-input
                    v-model="detailPackingList.boardinglimit"
                    type="number"
                    min="1"
                    @change="minNum2"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-form>
          </div>
        </el-col>
        <el-divider content-position="left">业务部门</el-divider>
        <el-col :span="24">
          <div class="request_bottom" style="marginTop:15px;">
            <el-table
              tooltip-effect="dark"
              style="width: 100%"
              :border="true"
              :row-style="{height:'20px'}"
              :cell-style="{padding:'0px'}"
              :data="InMerchantsPersonList"
            >
              <el-table-column type="index" label="序号" align="center"></el-table-column>
              <el-table-column property="totalDays" label="业务部门" align="center"></el-table-column>
              <el-table-column property="totalAmount" label="业务员" align="center"></el-table-column>
              <el-table-column property="daysofarrears" label="欠款天数" align="center"></el-table-column>
              <el-table-column property="amountofarrears" label="欠款额度" align="center"></el-table-column>
              <el-table-column property="remarksofarrears" label="欠款备注" align="center"></el-table-column>
              <el-table-column property="boardingrestriction" label="寄板限制" align="center"></el-table-column>
            </el-table>
          </div>
        </el-col>
        <el-col :span="24" style="margin:15px 0 0 0;textAlign:center;">
          <el-button @click.native="submitList" type="primary" style="width:150px;">提交</el-button>
        </el-col>
      </div>

      <!--  品牌选择  -->
      <el-dialog
        width="50%"
        title="品牌选择"
        :visible.sync="brandVisible"
        append-to-body
        :closeOnClickModal="closeOnClickModal"
        :closeOnPressEscape="closeOnPressEscape"
      >
        <div>
          <div style="marginBottom:15px;">
            <span style="marginRight:10px;">品牌</span>
            <el-select v-model="formDetailPackingList.channel" @change="switchClick">
              <el-option label="出口" value="出口"></el-option>
              <el-option label="内销" value="内销"></el-option>
              <el-option label="出口/内销" value="出口/内销"></el-option>
            </el-select>
            <el-button
              @click.native="addBrandInfo"
              type="primary"
              size="mini"
              style="marginLeft:15px;"
            >新增</el-button>
          </div>
          <el-table
            style="width: 100%"
            :border="true"
            :row-style="{height:'20px'}"
            :cell-style="{padding:'0px'}"
          >
            >
            <el-table-column type="index" label="序号" align="center"></el-table-column>
            <el-table-column property="jNo" label="品牌编号" align="center"></el-table-column>
            <el-table-column property="maQuanity" label="品牌名称" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button
                  @click.native="zDeleteClick(scope.row)"
                  type="danger"
                  size="mini"
                  style="margin:2px;"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancleTable">取消</el-button>
          <el-button type="primary" @click.native="addTable">添加</el-button>
        </div>
      </el-dialog>
    </el-dialog>
    <!--  业务人员新增  -->
    <el-dialog
      title="业务人员新增"
      width="50%"
      :visible.sync="personInfoVisible"
      :closeOnClickModal="closeOnClickModal"
      :closeOnPressEscape="closeOnPressEscape"
    >
      <div class="person_info_entry">
        <el-form :model="personForm" label-width="120px">
          <el-form-item label="业务部门">
            <el-input v-model="personForm.totalDays" style="width:auto;" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="业务员">
            <el-input v-model="personForm.totalAmount" style="width:auto;" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="联系人">
            <el-input v-model="personForm.linkman" style="width:auto;"></el-input>
          </el-form-item>
          <el-form-item label="联系电话">
            <el-input v-model="personForm.linktel" style="width:auto;"></el-input>
          </el-form-item>
          <el-form-item label="欠款天数">
            <el-input v-model="personForm.daysofarrears" style="width:auto;"></el-input>
          </el-form-item>
          <el-form-item label="欠款额度">
            <el-input v-model="personForm.amountofarrears" @change="changeNum" type="number" min="0" style="width:auto;"></el-input>
          </el-form-item>
          <el-form-item label="寄板限制">
            <el-input v-model="personForm.boardingrestriction" style="width:auto;"></el-input>
          </el-form-item>
          <el-form-item label="欠款备注">
            <el-input
              v-model="personForm.remarksofarrears"
              type="textarea"
              resize="none"
              style="width:auto;"
            ></el-input>
          </el-form-item>
          <el-form-item class="sub1">
            <el-button @click="closeOuterVisible" style="width:auto">取消</el-button>
            <el-button type="primary" @click="submitPersonInfo" style="width:auto;">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as khglApi from "@/api/customerManageApi.js";
import querystring from "querystring";

export default {
  name: "ksda",
  data() {
    return {
      merchants: "",
      selectclientNo: "",
      basicInfoVisible: false,
      closeOnClickModal: false,
      closeOnPressEscape: false,
      brandVisible: false,
      personInfoVisible: false,
      formDetailPackingList: {},
      detailPackingList: {},
      merchantsRelationshipList: [],
      merchantsPersonList: [],
      countryList: [],
      regionList: [],
      InMerchantsPersonList: [],
      personForm: {},
      currentPersonInfo: []
    };
  },
  methods: {
    // 欠款额度只能为数字
    changeNum(val){
      if (Number(val) >= 0) {
        this.$set(this.personForm, "amountofarrears", val);
      } else {
        this.$message({ message: "最小值为0", duration: 2000 });
        this.$set(this.personForm, "amountofarrears", 0);
      }
    },
    // 个人信息录入开启弹窗
    personInfoEntry() {
      if (this.selectclientNo) {
        this.getCurrentPersonInfo();
      } else {
        this.$message({ message: "请先选择客商", duration: 2000 });
      }
    },
    // 获取当前人的个人信息
    getCurrentPersonInfo() {
      let id = sessionStorage.getItem("id");
      let _data = {
        clientNo: this.selectclientNo,
        personId: id
      };
      khglApi
        .getselectEmployeeId(_data)
        .then(res => {
          if (res.code == 200) {
            if (res.data[0].state == 1) {
              this.personInfoVisible = true;
              this.currentPersonInfo = res.data;
              if (this.currentPersonInfo) {
                this.personForm = this.currentPersonInfo[0];
              } else {
                this.personForm = {};
              }
              let name = sessionStorage.getItem("name");
              this.$set(this.personForm, "totalAmount", name);
            } else {
              this.$message({ message: "待审批不允许录入", duration: 2000 });
            }
          } else {
            this.personInfoVisible = true;
            this.personForm = {};
            let name = sessionStorage.getItem("name");
            this.$set(this.personForm, "totalAmount", name);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 个人信息录入提交
    submitPersonInfo() {
      let id = sessionStorage.getItem("id");
      this.$set(this.personForm, "clientNo", this.selectclientNo);
      this.$set(this.personForm, "employeeId", id);
      this.$set(this.personForm, "company", "");
      if(!this.personForm.guid){
        this.$set(this.personForm, "guid", "");
      }
      this.$set(this.personForm, "overduetimes", 0);
      this.$set(this.personForm, "state", 1);
      this.$set(this.personForm, "totalDays", "");
      this.$set(this.personForm, "deptId", "");
      this.$set(this.personForm, "approveStyle", "合同业务员审批");
      let _data = this.personForm;
      console.log(_data)
      khglApi
        .postupdateEmployee(_data)
        .then(res => {
          if (res.code == 200) {
            this.personInfoVisible = false;
            this.loadCustomerList();
            this.getpersonalDetail(this.selectclientNo);
          } else {
            this.$message({ message: res.msg, duration: 2000 });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 关闭个人信息录入dialog
    closeOuterVisible() {
      this.personInfoVisible = false;
    },
    // 基础信息录入 (主表) 提交
    submitList() {
      let _data = this.formDetailPackingList;
      khglApi
        .postupdateByCondition(_data)
        .then(res => {
          if (res.code == 200) {
            this.submitForm();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 基础信息录入 (子表) 提交
    submitForm() {
      this.$set(this.detailPackingList, "clientNo", this.selectclientNo);
      let _data = this.detailPackingList;
      khglApi
        .postupdateClientGrade(_data)
        .then(res => {
          if (res.code == 200) {
            this.basicInfoVisible = false;
            this.$message({ message: "录入成功", duration: 2000 });
            this.loadCustomerList();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 当客商评级的数量发生改变时
    minNum1(val) {
      if (Number(val) >= 1) {
        this.$set(this.detailPackingList, "quantity", val);
      } else {
        this.$message({ message: "最小值为1", duration: 2000 });
        this.$set(this.detailPackingList, "quantity", 1);
      }
    },
    // 当客商评级的寄板上限发生改变时
    minNum2(val) {
      if (Number(val) >= 1) {
        this.$set(this.detailPackingList, "boardinglimit", val);
      } else {
        this.$message({ message: "最小值为1", duration: 2000 });
        this.$set(this.detailPackingList, "boardinglimit", 1);
      }
    },
    //(品牌选择 dialog) 下拉框选中的信息
    switchClick(val) {
      console.log(val);
      // this.addGangHaoTableList.forEach((item, index) => {
      //   if (item.jNo == row.jNo) {
      //     this.addGangHaoTableList.splice(index, 1);
      //   }
      // });

      // this.addGangHaoTableList.forEach((item, index) => {
      //     if (item.factQuanity == row.factQuanity) {
      //       item.factQuanity = 0;
      //     }
      //   });
    },
    // 新增 将select下拉框选中的信息添加到表格中
    addBrandInfo() {},
    //(品牌选择 dialog) 取消 (关闭品牌选择)
    cancleTable() {
      this.brandVisible = false;
    },
    //(品牌选择 dialog) 将表格内品牌名称添加到主表中
    addTable() {},
    //(品牌选择 dialog) 新增品牌
    addBrand() {
      this.brandVisible = true;
    },
    // 通过国家加载城市
    changeCountry(val) {
      if (val == "中国") {
        let _data = {
          parentId: 0
        };
        khglApi
          .getselPronvice(_data)
          .then(res => {
            this.regionList = res.data;
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.$set(this.formDetailPackingList, "city", "");
      }
    },
    // 加载国家列表
    loadCountryList() {
      let _data = {
        parentId: -1
      };
      khglApi
        .getselPronvice(_data)
        .then(res => {
          this.countryList = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取弹窗内要显示的，客商相关人员的表格
    InMerchantsPerson() {
      let _data = {
        clientNo: this.selectclientNo
      };
      khglApi
        .getselectEmployeeId(_data)
        .then(res => {
          this.InMerchantsPersonList = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 基础信息进入 ,获取从表数据
    getMerchantsRating() {
      let _data = {
        clientNo: this.selectclientNo
      };
      khglApi
        .getselectClientGrade(_data)
        .then(res => {
          if (res.code == 200) {
            this.detailPackingList = res.data;
          } else {
            this.detailPackingList = {};
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 基础信息进入 ,获取主表数据
    getBasicInfoEntry() {
      let _data = {
        clientNo: this.selectclientNo
      };
      khglApi
        .getselectClientInformation(_data)
        .then(res => {
          this.formDetailPackingList = res.data[0];
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 基础信息录入
    basicInfoEntry() {
      if (this.selectclientNo) {
        this.basicInfoVisible = true;
        this.getBasicInfoEntry();
        this.loadCountryList();
        this.getMerchantsRating();
        this.InMerchantsPerson();
      } else {
        this.$message({ message: "请先选择客商", duration: 2000 });
      }
    },
    // 保存点击客商编号 请求对应个人信息
    personalDetail(row) {
      this.selectclientNo = row.clientNo;
      this.getpersonalDetail(this.selectclientNo);
    },
    // 查看客商对应个人信息
    getpersonalDetail(selectclientNo) {
      let _data = {
        clientNo: selectclientNo
      };
      khglApi
        .getselectEmployeeId(_data)
        .then(res => {
          this.merchantsPersonList = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 检索客商列表信息
    searchList() {
      let _data={
        clientName: this.merchants,
      }
      khglApi
        .getselClient(_data)
        .then(res => {
          console.log(res)
          this.merchantsRelationshipList = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 重置
    refreshList() {
      // this.merchantsRelationshipList= [];
      this.merchants = "";
      this.loadCustomerList();
    },
    // 加载客商关系
    loadCustomerList() {
      khglApi
        .getselClient()
        .then(res => {
          this.merchantsRelationshipList = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.loadCustomerList();
  }
};
</script>

<style>
.basic_info {
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  padding-top: 5px;
}
.basic_information_entry,
.personal_information_entry {
  padding: 5px;
  background: #009688;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  margin: 5px 0;
  text-align: center;
  margin: 0 15px 0 0;
}
.lineHeight > .el-form-item__label {
  line-height: 20px;
}
.person_info_entry {
  margin: auto;
  padding: 0 150px;
}
/* el-select滚动条样式 */
.el-scrollbar__bar.is-vertical {
  width: 12px;
}
</style>