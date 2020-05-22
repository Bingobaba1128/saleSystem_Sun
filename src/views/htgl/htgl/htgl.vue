<template>
  <div class="box_wrap">
    <!--  合同列表模糊搜索  -->
    <div class="box1">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="80px"
        class="demo-ruleForm form1"
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
          <el-input v-model="ruleForm.customer"></el-input>
        </el-form-item>
        <el-form-item label="合同编号:">
          <el-input v-model="ruleForm.contractNo"></el-input>
        </el-form-item>
        <el-form-item label="布编:">
          <el-input v-model="ruleForm.clothId"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.native="contractSearchForm('ruleForm')">检索</el-button>
          <el-button @click.native="contractResetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--  合同列表  -->
    <div class="box2">
      <!--  新增  -->
      <div class="add_contract" @click="addcontract">
        <i class="el-icon-circle-plus-outline"></i>
        新增
      </div>
      <el-table
        class="table1"
        ref="singleTable"
        :data="tableData"
        highlight-current-row
        style="width: 100%"
        max-height="240"
        row-key="id"
        :border="border"
        :row-style="{height:'20px'}"
        :cell-style="{padding:'0px'}"
        @row-click="allclick"
      >
        <el-table-column type="index" label="序号" align="center"></el-table-column>
        <el-table-column property="contractNo" label="合同编号" width="120" align="center"></el-table-column>
        <el-table-column property="customer" label="客户" width="260" align="center"></el-table-column>
        <el-table-column property="signPlace" label="地点" width="100" align="center"></el-table-column>
        <el-table-column property="saleStyle" label="销售类型" width="100" align="center"></el-table-column>
        <el-table-column property="signDate" label="签约日期" width="100" align="center"></el-table-column>
        <el-table-column property="contractBoby" label="公司" width="250" align="center"></el-table-column>
        <el-table-column property="classify" label="布料" width="80" align="center">
          <template
            slot-scope="scope"
          >{{ scope.row.classify == '0'?'牛仔布':scope.row.classify == '1'?'染色布':'针织布' }}</template>
        </el-table-column>
        <el-table-column property="brand" label="品牌" width="100" align="center"></el-table-column>
        <el-table-column label="操作" width="400" fixed="right" align="center">
          <template slot-scope="scope">
            <el-button
              @click.native="editorClick(scope.row)"
              type="success"
              size="mini"
              style="margin:2px;"
            >编辑</el-button>
            <el-button
              @click.native="finishClick(scope.row)"
              type="info"
              size="mini"
              :disabled="scope.row.symbol == '50'"
            >{{scope.row.symbol == 50?"已完结":"完结"}}</el-button>
            <el-button
              @click.native="approvalClick(scope.row)"
              type="primary"
              size="mini"
              :disabled="scope.row.symbol == '1' || scope.row.symbol == '50'"
            >{{scope.row.symbol == 1?"已审批":"提交审批"}}</el-button>
            <el-button @click.native="seeClick(scope.row)" type="warning" size="mini">预览</el-button>
            <el-button
              @click.native="deleteMasterContract(scope.row)"
              type="danger"
              size="mini"
              :disabled="scope.row.symbol == '50'"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--  子合同  -->
    <div class="box3">
      <!--  新增  -->
      <div style="display:flex">
        <div class="add_contract2" @click="addcontract2">
          <i class="el-icon-circle-plus-outline"></i>
          新增布料
        </div>
        <div class="add_contract3" @click="addcontract3">
          <i class="el-icon-circle-plus-outline"></i>
          新增特价布
        </div>
      </div>
      <el-table
        class="table1"
        ref="singleTable"
        :data="tableData2"
        highlight-current-row
        style="width: 100%"
        max-height="240"
        row-key="id"
        :border="border"
        :row-style="{height:'20px'}"
        :cell-style="{padding:'0px'}"
      >
        <el-table-column type="index" label="序号" align="center"></el-table-column>
        <el-table-column property="clothId" label="布编" width="150" align="center"></el-table-column>
        <el-table-column property="quantity" label="数量" align="center"></el-table-column>
        <el-table-column property="upQuantity" label="上浮动" align="center"></el-table-column>
        <el-table-column property="downQuantity" label="下浮动" align="center"></el-table-column>
        <el-table-column property="unit" label="单位" align="center"></el-table-column>
        <el-table-column property="unitPrice" label="单价" align="center"></el-table-column>
        <el-table-column property="moneyStyle" label="交易类型" align="center"></el-table-column>
        <el-table-column property="exportRate" label="出口汇率" align="center"></el-table-column>
        <el-table-column property="noExportRate" label="非出口汇率" width="100" align="center"></el-table-column>
        <el-table-column property="price" label="金额" width="120" align="center"></el-table-column>
        <el-table-column property="etrMoney" label="额外金额" align="center"></el-table-column>
        <el-table-column property="programMoney" label="项目费用" align="center"></el-table-column>
        <el-table-column label="是否特价" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.bargain == "1"?"是":"否"}}</span>
          </template>
        </el-table-column>
        <el-table-column property="brand" label="海关编号" align="center"></el-table-column>
        <el-table-column property="otherMonry" label="其他金额" align="center"></el-table-column>
        <el-table-column label="操作" width="150px" fixed="right" align="center">
          <template slot-scope="scope">
            <el-button
              @click.native="zEditorClick(scope.row)"
              type="success"
              size="mini"
              style="margin:2px;"
            >编辑</el-button>
            <el-button @click.native="zDeleteClick(scope.row)" type="danger" size="mini">删除</el-button>
            <!-- <el-button type="text" @click="open">点击打开 Message Box</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--  添加布料弹窗  -->
    <el-dialog
      title="新增布料"
      :visible.sync="clothOutTableVisible"
      :closeOnClickModal="closeOnClickModal"
      :closeOnPressEscape="closeOnPressEscape"
      width="80%"
    >
      <div class>
        <el-button type="primary" @click="clothQuery" style="marginBottom:10px;">选择布料</el-button>
      </div>
      <div class="clothtable1">
        <el-table
          :border="border"
          :row-style="{height:'20px'}"
          :cell-style="{padding:'0px'}"
          style="width: 100%"
          :data="clothtablelist"
        >
          <el-table-column type="index" label="序号"></el-table-column>
          <el-table-column property="fabricCode" label="布编" align="center"></el-table-column>
          <el-table-column property="construstion" label="组织" align="center"></el-table-column>
          <el-table-column property="content" label="成分" width="200" align="center"></el-table-column>
          <el-table-column property="width" label="布封" align="center"></el-table-column>
          <el-table-column label="布重" align="center">
            <template slot-scope="scope">{{ scope.row.beforeWash + '/' + scope.row.afterWash}}</template>
          </el-table-column>
          <el-table-column property="colour" label="颜色" align="center"></el-table-column>
          <el-table-column label="商品名称" align="center">
            <template
              slot-scope="scope"
            >{{ scope.row.theme == '0'?'牛仔布':scope.row.theme == '1'?'染色布':'针织布' }}</template>
          </el-table-column>

          <!-- <el-table-column property="xsdj" label="单价(码)"></el-table-column> -->
          <el-table-column property="quantity" label="数量" width="120" align="center">
            <template slot-scope="scope">
              <el-input autocomplete="off" v-model="scope.row.quantity" type="number" min="0"></el-input>
            </template>
          </el-table-column>
          <el-table-column property="upQuantity" label="上范围" width="120" align="center">
            <template slot-scope="scope">
              <el-input autocomplete="off" v-model="scope.row.upQuantity" type="number" min="0"></el-input>
            </template>
          </el-table-column>
          <el-table-column property="downQuantity" label="下范围" width="120" align="center">
            <template slot-scope="scope">
              <el-input autocomplete="off" v-model="scope.row.downQuantity" type="number" min="0"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="单位" width="120" align="center">
            <template slot-scope="scope">
              <el-select v-model="scope.row.unit">
                <el-option label="码" value="码"></el-option>
                <el-option label="米" value="米"></el-option>
                <el-option label="KG" value="KG"></el-option>
                <el-option label="件" value="件"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="单价" width="120" property="xsdj" align="center">
            <template slot-scope="scope">
              <el-input
                autocomplete="off"
                v-model="scope.row.unitPrice"
                type="number"
                min="0"
                :disabled="true"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="币种" width="120" align="center">
            <template slot-scope="scope">
              <el-select v-model="scope.row.moneyStyle">
                <el-option label="RMB" value="RMB"></el-option>
                <el-option label="港币" value="港币"></el-option>
                <el-option label="美元" value="美元"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="出口汇率" width="120" align="center">
            <template slot-scope="scope">
              <el-input
                autocomplete="off"
                v-model="scope.row.exportRate"
                placeholder="3.5"
                :disabled="true"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="不出口汇率" width="120" align="center">
            <template slot-scope="scope">
              <el-input
                autocomplete="off"
                v-model="scope.row.noExportRate"
                placeholder="2.96"
                :disabled="true"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column property="price" label="金额" width="120" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.price = (scope.row.unitPrice * scope.row.quantity)}}</span>
            </template>
          </el-table-column>
          <el-table-column label="附加费" width="120" align="center">
            <template slot-scope="scope">
              <el-input autocomplete="off" v-model="scope.row.etrMoney" type="number" min="0"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="项目费用" width="120" align="center">
            <template slot-scope="scope">
              <el-input autocomplete="off" v-model="scope.row.programMoney" type="number" min="0"></el-input>
            </template>
          </el-table-column>
          <!-- <el-table-column label="特价布" width="120">
            <template slot-scope="scope">
              <el-input
                autocomplete="off"
                v-model="scope.row.bargain"
                placeholder="否"
                :disabled="true"
              ></el-input>
            </template>
          </el-table-column>-->
          <el-table-column label="其他费用" width="120" align="center">
            <template slot-scope="scope">
              <el-input autocomplete="off" v-model="scope.row.otherMonry" type="number" min="0"></el-input>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="clothOutTableVisible = false">取消</el-button>
        <el-button type="primary" @click="zClothSave">保存</el-button>
      </div>
      <!--  正常布料二层弹窗  -->
      <el-dialog
        width="60%"
        title="选择布料"
        :visible.sync="clothInTableVisible"
        append-to-body
        :closeOnClickModal="closeOnClickModal"
        :closeOnPressEscape="closeOnPressEscape"
      >
        <div>
          <div>
            <el-form
              :rules="rules"
              :inline="true"
              :model="formInline"
              ref="formInline"
              class="demo-form-inline"
            >
              <el-form-item label="布编" prop="cloth">
                <el-input autocomplete="off" v-model="formInline.cloth" placeholder="请输入布编"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click.native="addcloth('formInline')">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="clothtable1">
            <el-table
              :border="border"
              :row-style="{height:'30px'}"
              :cell-style="{padding:'0px'}"
              :data="clothlist"
              style="width: 100%"
              @row-dblclick="switchCloth"
            >
              <el-table-column type="index" label="序号"></el-table-column>
              <el-table-column property="fabricCode" label="布编"></el-table-column>
              <el-table-column property="construstion" label="组织"></el-table-column>
              <el-table-column property="content" label="成分"></el-table-column>
              <el-table-column property="width" label="布封"></el-table-column>
              <el-table-column label="布重">
                <template slot-scope="scope">{{ scope.row.beforeWash + '/' + scope.row.afterWash}}</template>
              </el-table-column>
              <el-table-column property="colour" label="颜色"></el-table-column>
              <!-- <el-table-column label="商品名称">
                <template
                  slot-scope="scope"
                >{{ scope.row.theme == '0'?'牛仔布':scope.row.theme == '1'?'染色布':'针织布' }}</template>
              </el-table-column>-->
              <el-table-column property="xsdj" label="单价(码)"></el-table-column>
            </el-table>
          </div>
        </div>
      </el-dialog>
    </el-dialog>

    <!--  添加特价布弹窗  -->
    <el-dialog
      title="新增特价布"
      :visible.sync="noClothOutTableVisible"
      :closeOnClickModal="closeOnClickModal"
      :closeOnPressEscape="closeOnPressEscape"
      :before-close="handleDialogClose"
      width="80%"
    >
      <div class>
        <el-button type="primary" @click="cheapClothQuery" style="marginBottom:10px;">选择布料</el-button>
      </div>
      <div class="clothtable1">
        <el-table
          :border="border"
          :row-style="{height:'20px'}"
          :cell-style="{padding:'0px'}"
          style="width: 100%"
          :data="specialtablelist"
        >
          <el-table-column type="index" label="序号"></el-table-column>
          <el-table-column property="fabricCode" label="布编"></el-table-column>
          <el-table-column property="construstion" label="组织"></el-table-column>
          <el-table-column property="content" label="成分"></el-table-column>
          <el-table-column property="width" label="布封"></el-table-column>
          <el-table-column label="布重">
            <template slot-scope="scope">{{ scope.row.beforeWash + '/' + scope.row.afterWash}}</template>
          </el-table-column>
          <el-table-column property="colour" label="颜色"></el-table-column>
          <el-table-column label="商品名称">
            <template
              slot-scope="scope"
            >{{ scope.row.theme == '0'?'牛仔布':scope.row.theme == '1'?'染色布':'针织布' }}</template>
          </el-table-column>
          <!-- <el-table-column property="xsdj" label="单价(码)"></el-table-column> -->

          <el-table-column property="quantity" label="数量" width="120">
            <template slot-scope="scope">
              <!-- <el-input autocomplete="off" v-model="scope.row.quantity" :disabled="true"></el-input> -->
              <span>{{scope.row.quantity}}</span>
            </template>
          </el-table-column>
          <el-table-column property="upQuantity" label="上范围" width="120">
            <template slot-scope="scope">
              <el-input autocomplete="off" v-model="scope.row.upQuantity" type="number" min="0"></el-input>
            </template>
          </el-table-column>
          <el-table-column property="downQuantity" label="下范围" width="120">
            <template slot-scope="scope">
              <el-input autocomplete="off" v-model="scope.row.downQuantity" type="number" min="0"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="单位" width="120">
            <template slot-scope="scope">
              <el-select v-model="scope.row.unit">
                <el-option label="码" value="码"></el-option>
                <el-option label="米" value="米"></el-option>
                <el-option label="KG" value="KG"></el-option>
                <el-option label="件" value="件"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="单价" width="120" property="xsdj">
            <template slot-scope="scope">
              <el-input autocomplete="off" v-model="scope.row.unitPrice" type="number" min="0"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="币种" width="120">
            <template slot-scope="scope">
              <el-select v-model="scope.row.moneyStyle">
                <el-option label="RMB" value="RMB"></el-option>
                <el-option label="港币" value="港币"></el-option>
                <el-option label="美元" value="美元"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="出口汇率" width="120">
            <template slot-scope="scope">
              <el-input
                autocomplete="off"
                v-model="scope.row.exportRate"
                placeholder="3.5"
                :disabled="true"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="不出口汇率" width="120">
            <template slot-scope="scope">
              <el-input
                autocomplete="off"
                v-model="scope.row.noExportRate"
                placeholder="2.96"
                :disabled="true"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column property="price" label="金额" width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.price = (scope.row.unitPrice * scope.row.quantity)}}</span>
            </template>
          </el-table-column>
          <el-table-column label="附加费" width="120">
            <template slot-scope="scope">
              <el-input autocomplete="off" v-model="scope.row.etrMoney" type="number" min="0"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="项目费用" width="120">
            <template slot-scope="scope">
              <el-input autocomplete="off" v-model="scope.row.programMoney" type="number" min="0"></el-input>
            </template>
          </el-table-column>
          <!-- <el-table-column label="特价布" width="120">
            <template slot-scope>
              <el-input autocomplete="off" placeholder="是" :disabled="true"></el-input>
            </template>
          </el-table-column>-->
          <el-table-column label="其他费用" width="120">
            <template slot-scope="scope">
              <el-input autocomplete="off" v-model="scope.row.otherMonry" type="number" min="0"></el-input>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="noClothClick">取消</el-button>
        <el-button type="primary" @click="zSpecialClothSave">保存</el-button>
      </div>
      <!--  特价布二层弹窗  -->
      <el-dialog
        width="80%"
        title="选择布料"
        :visible.sync="noClothInTableVisible"
        append-to-body
        :closeOnClickModal="closeOnClickModal"
        :closeOnPressEscape="closeOnPressEscape"
      >
        <div>
          <div>
            <el-form
              :rules="rules"
              :inline="true"
              :model="formInline"
              ref="formInline"
              class="demo-form-inline"
            >
              <el-form-item label="布编" prop="cloth">
                <el-input autocomplete="off" v-model="formInline.cloth" placeholder="请输入布编"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="addcheapcloth('formInline')">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="clothtable1">
            <el-table
              :border="border"
              :row-style="{height:'20px'}"
              :cell-style="{padding:'0px'}"
              :data="specialclothlist"
              style="width: 100%"
              @row-dblclick="switchSpecialCloth"
            >
              <el-table-column type="index" label="序号"></el-table-column>
              <el-table-column property="fabricCode" label="布编"></el-table-column>
              <el-table-column property="construstion" label="组织"></el-table-column>
              <el-table-column property="content" label="成分"></el-table-column>
              <el-table-column property="width" label="布封"></el-table-column>
              <el-table-column label="布重">
                <template slot-scope="scope">{{ scope.row.beforeWash + '/' + scope.row.afterWash}}</template>
              </el-table-column>
              <el-table-column property="colour" label="颜色"></el-table-column>
              <el-table-column label="商品名称">
                <template
                  slot-scope="scope"
                >{{ scope.row.theme == '0'?'牛仔布':scope.row.theme == '1'?'染色布':'针织布' }}</template>
              </el-table-column>
              <el-table-column property="unitPrice" label="单价(码)"></el-table-column>
            </el-table>
          </div>
        </div>
      </el-dialog>
    </el-dialog>

    <!--  新增母合同弹窗   -->
    <el-dialog
      title="新建购销合同"
      :visible.sync="outerVisible"
      :closeOnClickModal="closeOnClickModal"
      :closeOnPressEscape="closeOnPressEscape"
      width="80%"
    >
      <div class="contract_con">
        <el-form
          :model="ruleForm2"
          :rules="rules"
          ref="ruleForm2"
          label-width="100px"
          class="demo-ruleForm2 form2"
        >
          <el-col :span="6">
            <el-form-item label="存档编号">
              <el-input v-model="ruleForm2.saveNo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="销售类型">
              <el-select v-model="ruleForm2.saleStyle" @change="saleStyle">
                <el-option label="内销合同" value="内销合同"></el-option>
                <el-option label="外销合同" value="外销合同"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="合同主体">
              <el-input v-model="ruleForm2.contractBoby" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="布料分类">
              <el-select v-model="ruleForm2.classify">
                <el-option label="牛仔布" value="0"></el-option>
                <el-option label="染色布" value="1"></el-option>
                <el-option label="针织布" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="客户">
              <el-select
                v-model="ruleForm2.customer"
                @change="selectcustomer"
                value-key="ruleForm2.clientNo"
              >
                <el-option
                  v-for="item in customerlist"
                  :key="item.value"
                  :value="item"
                  id="item.clientNo"
                >{{item.clientName}}</el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="联系人">
              <el-input v-model="ruleForm2.linkman"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="联系电话">
              <el-input v-model="ruleForm2.linktel"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="结算方式">
              <el-input v-model="ruleForm2.settlementMethod"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="合同编号">
              <el-input placeholder="自动生成" v-model="ruleForm2.contractNo" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="业务员">
              <el-select v-model="ruleForm2.signer" @change="changeSigner">
                <el-option
                  v-for="item in salesmanlist"
                  :label="item.cemployeeId"
                  :key="item.value"
                  :value="item.memployeeId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="路线选择">
              <el-select v-model="ruleForm2.route" @change="changeLxHandle">
                <el-option
                  v-for="item in freightlist"
                  :key="item.value"
                  :label="item.route"
                  :value="JSON.stringify(item)"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="预运算单价">
              <el-input v-model="ruleForm2.estimateFareUnitPrice"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="付款方式">
              <el-select v-model="ruleForm2.payStyle">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="税">
              <el-input v-model="ruleForm2.fax" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="定金">
              <el-input-number v-model="ruleForm2.deposit" :min="0" :max="100"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <!----------------------先空着------------------------>
            <el-form-item label="母合同">
              <el-input v-model="ruleForm2.muContractNo" :disabled="true"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="签约地点">
              <el-input v-model="ruleForm2.signPlace"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="签约时间">
              <el-form-item prop="signDate">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="ruleForm2.signDate"
                  style="width: 100%;"
                  :disabled="disabled"
                ></el-date-picker>
              </el-form-item>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="品牌">
              <el-select v-model="ruleForm2.brand">
                <el-option
                  v-for="item in brandlist"
                  :key="item.value"
                  :value="item.brandName"
                >{{item.brandName}}</el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="副牌">
              <el-select v-model="ruleForm2.depbrand" :disabled="true"></el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="中间商">
              <el-select v-model="ruleForm2.broker">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="相关订单">
              <el-select v-model="ruleForm2.relatedOrder">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="交货区域">
              <el-select v-model="ruleForm2.deliveryArea">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="交货地点">
              <el-input v-model="ruleForm2.deliveryPlace"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="交货时间">
              <el-form-item prop="deliveryTime">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="ruleForm2.deliveryTime"
                  style="width: 100%"
                  :picker-options="pickerOptions"
                ></el-date-picker>
              </el-form-item>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="是否备货">
              <el-select v-model="ruleForm2.choiceOrNot">
                <el-option label="是" value="2"></el-option>
                <el-option label="否" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="质量要求" prop="qualityRequirment">
              <el-input type="textarea" v-model="ruleForm2.qualityRequirment" :resize="resize"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="备注" prop="remarks">
              <el-input type="textarea" v-model="ruleForm2.remarks" :resize="resize"></el-input>
            </el-form-item>
          </el-col>

          <div class="wxneed" v-show="showwx">
            <el-col :span="8">
              <el-form-item label="ShipmentTerm" label-width="150px">
                <el-select v-model="ruleForm2.shipmentTerms">
                  <el-option label="是" value="1"></el-option>
                  <el-option label="否" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="PartialShipment" label-width="150px">
                <el-select v-model="ruleForm2.partialShipment">
                  <el-option label="是" value="1"></el-option>
                  <el-option label="否" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="装运方式" label-width="150px">
                <el-select v-model="ruleForm2.loadStyle">
                  <el-option label="是" value="1"></el-option>
                  <el-option label="否" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="是否转运">
                <el-select v-model="ruleForm2.changeLoad">
                  <el-option label="是" value="1"></el-option>
                  <el-option label="否" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="起运港">
                <el-select v-model="ruleForm2.startPort">
                  <el-option label="是" value="1"></el-option>
                  <el-option label="否" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="目的港">
                <el-select v-model="ruleForm2.endPort">
                  <el-option label="是" value="1"></el-option>
                  <el-option label="否" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="装运次数">
                <el-input v-model="ruleForm2.loadTime" type="number" min="0"></el-input>
              </el-form-item>
            </el-col>
          </div>

          <el-col :span="24">
            <div class="mhttj">
              <el-button type="primary" @click="submitForm('ruleForm2')" class="submitmht">提交</el-button>
            </div>
          </el-col>
        </el-form>
      </div>
    </el-dialog>

    <!--  子合同编辑弹窗  -->
    <el-dialog
      title="合同编辑"
      :visible.sync="childModifyVisible"
      :closeOnClickModal="closeOnClickModal"
      :closeOnPressEscape="closeOnPressEscape"
      width="80%"
    >
      <div class="clothtable1">
        <el-table
          :border="border"
          :row-style="{height:'20px'}"
          :cell-style="{padding:'0px'}"
          style="width: 100%"
          :data="editorlist"
        >
          <el-table-column type="index" label="序号"></el-table-column>
          <el-table-column property="clothId" label="布编"></el-table-column>
          <el-table-column property="zuzhi" label="组织"></el-table-column>
          <el-table-column property="chengfen" label="成分"></el-table-column>
          <el-table-column property="bufeng" label="布封"></el-table-column>
          <el-table-column label="布重">
            <template slot-scope="scope">{{ scope.row.buzhong}}</template>
          </el-table-column>
          <el-table-column property="color" label="颜色"></el-table-column>
          <el-table-column label="商品名称">
            <template
              slot-scope="scope"
            >{{ scope.row.theme == '0'?'牛仔布':scope.row.theme == '1'?'染色布':'针织布' }}</template>
          </el-table-column>
          <!-- <el-table-column property="xsdj" label="单价(码)"></el-table-column> -->
          <el-table-column property="quantity" label="数量" width="120">
            <template slot-scope="scope">
              <el-input
                autocomplete="off"
                v-model="scope.row.quantity"
                :disabled="scope.row.bargain == '1'"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column property="upQuantity" label="上范围" width="120">
            <template slot-scope="scope">
              <el-input autocomplete="off" v-model="scope.row.upQuantity" type="number" min="0"></el-input>
            </template>
          </el-table-column>
          <el-table-column property="downQuantity" label="下范围" width="120">
            <template slot-scope="scope">
              <el-input autocomplete="off" v-model="scope.row.downQuantity" type="number" min="0"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="单位" width="120">
            <template slot-scope="scope">
              <el-select v-model="scope.row.unit">
                <el-option label="码" value="码"></el-option>
                <el-option label="米" value="米"></el-option>
                <el-option label="KG" value="KG"></el-option>
                <el-option label="件" value="件"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="单价" width="120" property="xsdj">
            <template slot-scope="scope">
              <el-input autocomplete="off" v-model="scope.row.unitPrice" type="number" min="0"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="币种" width="120">
            <template slot-scope="scope">
              <el-select v-model="scope.row.moneyStyle">
                <el-option label="RMB" value="RMB"></el-option>
                <el-option label="港币" value="港币"></el-option>
                <el-option label="美元" value="美元"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="出口汇率" width="120">
            <template slot-scope="scope">
              <el-input
                autocomplete="off"
                v-model="scope.row.exportRate"
                placeholder="3.5"
                :disabled="true"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="不出口汇率" width="120">
            <template slot-scope="scope">
              <el-input
                autocomplete="off"
                v-model="scope.row.noExportRate"
                placeholder="2.96"
                :disabled="true"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column property="price" label="金额" width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.price = (scope.row.unitPrice * scope.row.quantity)}}</span>
            </template>
          </el-table-column>
          <el-table-column label="附加费" width="120">
            <template slot-scope="scope">
              <el-input autocomplete="off" v-model="scope.row.etrMoney" type="number" min="0"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="项目费用" width="120">
            <template slot-scope="scope">
              <el-input autocomplete="off" v-model="scope.row.programMoney" type="number" min="0"></el-input>
            </template>
          </el-table-column>
          <!-- <el-table-column label="特价布" width="120">
            <template slot-scope>
              <el-input autocomplete="off" placeholder="是" :disabled="true"></el-input>
            </template>
          </el-table-column>-->
          <el-table-column label="其他费用" width="120">
            <template slot-scope="scope">
              <el-input autocomplete="off" v-model="scope.row.otherMonry" type="number" min="0"></el-input>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="saveCancleClick">取消</el-button>
        <el-button type="primary" @click="saveClothmsg">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as htglApi from "@/api/contractApi.js";
import querystring from "querystring";

export default {
  name: "nxht",
  data() {
    return {
      id: "",
      name: "",
      allData: "",
      submitStatus: "",
      selectConstract: "",
      routeSelect: "",
      input: "",
      resize: "none",
      isClick: false,
      disabled: true,
      showwx: false,
      border: true,
      closeOnClickModal: false,
      closeOnPressEscape: false,
      outerVisible: false,
      clothOutTableVisible: false,
      clothInTableVisible: false,
      noClothOutTableVisible: false,
      noClothInTableVisible: false,
      childModifyVisible: false,
      parentModifyVisible: false,
      formInline: {
        cloth: ""
      },
      ruleForm: {
        signDate_1: "",
        signDate_2: "",
        customer: "",
        contractNo: "",
        clothId: ""
      },
      ruleForm2: {
        contractNo: "",
        customer: "",
        choiceOrNot: "",
        signer: "",
        person: "", // '10010' 调整当前账户id
        saleStyle: "",
        saveNo: "",
        brand: "",
        estimateFareUnitPrice: "",
        route: "",
        payStyle: "",
        contractBoby: "韶关市北纺制造科技有限公司",
        classify: "",
        customerNo: "",
        fax: "",
        deposit: "0",
        signPlace: "",
        signDate: "",
        depbrand: "",
        broker: "",
        relatedOrder: "",
        deliveryArea: "",
        deliveryPlace: "",
        deliveryTime: "",
        qualityRequirment: "",
        remarks: "",
        style: "购销合同",
        linkman: "",
        linktel: "",
        settlementMethod: "",
        loadTime: "0",
        shipmentTerms: "",
        partialShipment: "",
        loadStyle: "",
        changeLoad: "",
        startPort: "",
        endPort: "",
        symbol: "0",
        bargain: "-1",
        updateTime: "",
        customerContractNo: ""
      },
      freightlist: {
        guid: "",
        indate: "",
        moneyStyle: "",
        orderNo: "",
        pOption: "",
        route: "",
        unit: ""
      },
      rules: {
        cloth: [{ required: true, message: "布编不能为空", trigger: "blur" }],
        deposit: [{ required: true, message: "不能小于0", trigger: "blur" }]
      },
      // 时间限制 不允许选择当前天之前的日期
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      tableData: [],
      tableData2: [],
      basislist: [],
      customerlist: [],
      brandlist: [],
      salesmanlist: [],
      clothlist: [],
      clothtablelist: [],
      specialclothlist: [],
      specialtablelist: [],
      editorlist: []
      // signerList: []
    };
  },
  methods: {
    // 删除主合同
    deleteMasterContract(row) {
      this.$confirm("确认删除该条母合同?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let _data = {
            contractNo: row.contractNo
          };
          htglApi
            .postdelContract(querystring.stringify(_data))
            .then(res => {
              if (res.code == 200) {
                this.$message({ message: "删除成功", duration: 2000 });
                this.tableList();
                this.refreshZContract(this.selectConstract)
              } else {
                this.$message({ message: res.msg, duration: 2000 });
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {});
    },
    // 模糊搜索 修改时间格式并获取
    dataClick() {
      let starttime = this.allData[0];
      let endtime = this.allData[1];
      let signDate_1 =
        starttime.getFullYear() +
        "-" +
        this.p(starttime.getMonth() + 1) +
        "-" +
        this.p(starttime.getDate());
      let signDate_2 =
        endtime.getFullYear() +
        "-" +
        this.p(endtime.getMonth() + 1) +
        "-" +
        this.p(endtime.getDate());
      this.$set(this.ruleForm, "signDate_1", signDate_1);
      this.$set(this.ruleForm, "signDate_2", signDate_2);
    },
    // 合同主列表模糊搜索
    contractSearchForm() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          let _data = this.ruleForm;
          htglApi
            .getContractSearchList(querystring.stringify(_data))
            .then(res => {
              this.tableData = res.data;
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          return false;
        }
      });
    },
    // 模糊搜索合同 重置
    contractResetForm() {
      this.ruleForm = JSON.parse(JSON.stringify(this.defaultForm));
      this.allData = "";
      this.tableList();
    },
    // 获取母合同当前条编辑的信息
    contractDetail(contractNo) {
      let _data = {
        condition: "where contractNo='" + contractNo + "'"
      };
      htglApi
        .getContractDetail(_data)
        .then(res => {
          // console.log(res)
          // this.Basismessage();
          this.freight();
          this.Customer();
          this.Salesman();
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
          this.ruleForm2.signDate = resDate + " " + resTime;
          this.ruleForm2.updateTime = resDate + " " + resTime;
          this.outerVisible = true;
          // this.ruleForm2 = res.data[0];
          this.ruleForm2 = Object.assign(this.ruleForm2, res.data[0]);
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 判断母合同是否可以修改
    editorClick(row) {
      this.submitStatus = 2;
      let _data = {
        contractNo: row.contractNo
      };
      htglApi
        .MModifyYesOrNo(querystring.stringify(_data))
        .then(res => {
          if (res.code == 200) {
            //当前合同未审批 可以进行修改
            this.contractDetail(row.contractNo);
          } else {
            this.$message({ message: res.msg, duration: 2000 });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 子合同编辑弹窗的取消
    saveCancleClick() {
      this.childModifyVisible = false;
    },
    // 编辑布料信息保存(子合同)
    saveClothmsg() {
      let _data = this.editorlist[0];
      let subcontract = this.selectConstract;
      htglApi
        .childModifyContract(querystring.stringify(_data))
        .then(res => {
          this.$message({ message: res.msg, duration: 2000 });
          this.childModifyVisible = false;
          this.tableList();
          this.refreshZContract(subcontract);
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 子合同编辑
    zEditorClick(row) {
      this.editorlist = [];
      // 先查看合同状态 是否可以进行编辑操作
      let _data = {
        contractNo: row.contractNo,
        guid: row.guid
      };
      htglApi
        .modifyYesOrNo(querystring.stringify(_data))
        .then(res => {
          if (res.code == 303) {
            this.$message({ message: res.msg, duration: 2000 });
          }
          if (res.code == 302) {
            this.$message({ message: res.msg, duration: 2000 });
          }
          if (res.code == 200) {
            // 当前合同未审批 可以进行修改
            this.editorClothMsg(row.contractNo, row.guid);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 子合同查询当前条编辑的布料信息
    editorClothMsg(contractNo, guid) {
      let _data = {
        contractNo: contractNo,
        guid: guid
      };
      htglApi
        .getcloth(_data)
        .then(res => {
          this.childModifyVisible = true;
          this.editorlist = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 子合同删除
    zDeleteClick(row) {
      this.$confirm("确认删除该条布料信息?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let _data = {
            contractNo: row.contractNo,
            guid: row.guid
          };
          htglApi
            .delZContract(querystring.stringify(_data))
            .then(res => {
              if (res.code == 200) {
                let subcontract = this.selectConstract;
                this.refreshZContract(subcontract);
              } else {
                this.$message({ message: res.msg, duration: 2000 });
              }
              // if (res.code == 301) {
              //   this.$message({ message: res.msg, duration: 2000 });
              // }
              // if (res.code == 302) {
              //   this.$message({ message: res.msg, duration: 2000 });
              // }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          // this.$message({
          //   type: "info",
          //   message: "已取消删除"
          // });
        });
    },
    // 合同完结
    finishClick(row) {
      let _data = {
        symbol: 50,
        contractNo: row.contractNo
      };
      htglApi
        .getFinishContent(querystring.stringify(_data))
        .then(res => {
          this.$message({ message: "合同已完结", duration: 2000 });
          this.tableList();
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 刷新子合同请求
    refreshZContract(subcontract) {
      let _data = {
        contractNo: subcontract
      };
      htglApi
        .getcloth(_data)
        .then(res => {
          this.tableData2 = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 子合同 布料信息添加保存
    zClothSave() {
      let _data = this.clothtablelist;
      let subcontract = this.selectConstract;
      htglApi
        .getAddContractCloth(_data)
        .then(res => {
          this.$message({ message: res.msg, duration: 2000 });
          this.clothOutTableVisible = false;
          this.tableList();
          this.refreshZContract(subcontract);
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 子合同 特价布信息添加保存
    zSpecialClothSave() {
      this.specialtablelist[0].clothGuid = this.specialtablelist[0].guid;
      let _data = this.specialtablelist;
      let subcontract = this.selectConstract;
      htglApi
        .getAddContractCloth(_data)
        .then(res => {
          if (res.code == 200) {
            this.$message({ message: res.msg, duration: 2000 });
            this.noClothOutTableVisible = false;
            this.tableList();
            this.refreshZContract(subcontract);
            this.specialClothOccupies(this.specialtablelist[0].clothGuid);
          } else {
            this.$message({ message: res.msg, duration: 2000 });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //特价布查询
    cheapClothQuery() {
      this.noClothInTableVisible = true;
      this.formInline = {};
      this.specialclothlist = [];
      if (this.specialtablelist.length) {
        this.$message({ message: "只可以选择一个特价布", duration: 2000 });
        this.noClothInTableVisible = false;
      }
    },
    //布料查询
    clothQuery() {
      this.clothInTableVisible = true;
      this.formInline = {};
      this.clothlist = [];
    },
    // 双击选择布料详情
    switchCloth(row) {
      if (
        !this.clothtablelist.map(i => i.fabricCode).includes(row.fabricCode)
      ) {
        let obj = JSON.parse(JSON.stringify(row));
        Object.assign(obj, {
          contractNo: this.selectConstract, //合同编号
          orderNo: "2", // 子合同的第几条
          quantity: "0", //数量
          upQuantity: "0", //上浮动
          downQuantity: "0", //下浮动
          unit: "码", //单位
          unitPrice: "", //单价
          moneyStyle: "RMB", //币种
          exportRate: "3.5", //出口汇率
          noExportRate: "2.96", //不出口汇率
          price: "", //金额
          etrMoney: "0", //额外金额
          programMoney: "0", //项目费用
          bargain: "0", //是否特价
          otherMonry: "0", //其他金额
          payTime: "", //付款时间(没有传空)
          hcustomNo: null, //海关编号（可以为空）
          clothId: row.fabricCode, // 布编
          zuzhi: row.construstion, //组织
          chengfen: row.content, //成分
          bufeng: row.width, //布封
          buzhong: row.beforeWash + "/" + row.afterWash, //布重
          color: row.colour //颜色
        });
        this.clothtablelist.push(obj);
        obj.unitPrice = obj.xsdj;
        this.clothInTableVisible = false;
      } else {
        this.$message({ message: "不可选相同布编布料", duration: 2000 });
      }
    },
    // 特价布占位
    specialClothOccupies(guid) {
      let _data = {
        zhanWei: 1,
        condition: guid
      };
      htglApi
        .getSpecialClothOccupies(querystring.stringify(_data))
        .then(res => {})
        .catch(err => {
          console.log(err);
        });
    },
    // 双击选择特价布详情
    switchSpecialCloth(row) {
      // this.conditionguid = row.guid;
      // this.specialClothOccupies(this.conditionguid);
      let obj = JSON.parse(JSON.stringify(row));
      Object.assign(obj, {
        contractNo: this.selectConstract, //合同编号
        orderNo: "2", // 子合同的第几条
        quantity: "0", //数量
        upQuantity: "0", //上浮动
        downQuantity: "0", //下浮动
        unit: "码", //单位
        unitPrice: "", //单价
        moneyStyle: "RMB", //币种
        exportRate: "3.5", //出口汇率
        noExportRate: "2.96", //不出口汇率
        price: "", //金额
        etrMoney: "0", //额外金额
        programMoney: "0", //项目费用
        bargain: "1", //是否特价
        otherMonry: "0", //其他金额
        payTime: "", //付款时间(没有传空)
        hcustomNo: null, //海关编号（可以为空）
        clothId: row.fabricCode, // 布编
        zuzhi: row.construstion, //组织
        chengfen: row.content, //成分
        bufeng: row.width, //布封
        buzhong: row.beforeWash + "/" + row.afterWash, //布重
        color: row.colour, //颜色
        clothGuid: "" //特价布布码
      });
      this.specialtablelist.push(obj);
      obj.unitPrice = row.unitPrice;
      this.noClothInTableVisible = false;
    },
    // 改变销售类型时  更改税的内容  显示隐藏内div
    saleStyle(value) {
      if (value == "外销合同") {
        this.ruleForm2.fax = "出口";
        this.showwx = true;
      } else {
        this.ruleForm2.fax = "含税";
        this.showwx = false;
      }
    },
    // 当新增母合同 点击切换业务员时 人名 cemployeeId ID memployeeId
    changeSigner(val) {
      // console.log(val);
      let obj = {};
      obj = this.salesmanlist.find(item => {
        return item.memployeeId === val;
      });
      // console.log(obj)
      this.ruleForm2.signer = obj.memployeeId;
      // this.signerList.signer = obj.cemployeeId;
    },
    // 母合同提交、编辑
    submitForm() {
      if (this.submitStatus == 1) {
        if (this.ruleForm2.signer) {
          this.$refs["ruleForm2"].validate(valid => {
            if (valid) {
              let time1 = new Date(this.ruleForm2.deliveryTime);
              this.ruleForm2.deliveryTime =
                time1.getFullYear() +
                "-" +
                this.p(time1.getMonth() + 1) +
                "-" +
                this.p(time1.getDate());
              let resTime =
                this.p(time1.getHours()) +
                ":" +
                this.p(time1.getMinutes()) +
                ":" +
                this.p(time1.getSeconds());
              this.ruleForm2.route = JSON.parse(this.ruleForm2.route).route;
              let id = sessionStorage.getItem("id");
              this.ruleForm2.person = id;
              let _data = this.ruleForm2;
              htglApi
                .getAddContract(_data)
                .then(res => {
                  this.$message({ message: res.msg, duration: 2000 });
                  this.outerVisible = false;
                  this.tableList();
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
          this.$message({ message: "请选择业务员", duration: 1500 });
        }
      } else {
        this.$refs["ruleForm2"].validate(valid => {
          if (valid) {
            let time1 = new Date(this.ruleForm2.deliveryTime);
            this.ruleForm2.deliveryTime =
              time1.getFullYear() +
              "-" +
              this.p(time1.getMonth() + 1) +
              "-" +
              this.p(time1.getDate());
            let resTime =
              this.p(time1.getHours()) +
              ":" +
              this.p(time1.getMinutes()) +
              ":" +
              this.p(time1.getSeconds());
            let obj = {};
            obj = this.salesmanlist.find(item => {
              return item.memployeeId === this.ruleForm2.signer;
            });
            this.ruleForm2.signer = obj.memployeeId;
            let _data = this.ruleForm2;
            htglApi
              .parentModifyContract(_data)
              .then(res => {
                this.$message({ message: res.msg, duration: 2000 });
                this.outerVisible = false;
                this.tableList();
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
    // 时间的补 0
    p(s) {
      return s < 10 ? "0" + s : s;
    },
    // 子合同布料查询
    addcloth(clothform) {
      this.$refs[clothform].validate(valid => {
        if (valid) {
          let _data = {
            fabricCode: this.formInline.cloth,
            pageSize: "50",
            pageNum: "1"
          };
          htglApi
            .getclothinfo(querystring.stringify(_data))
            .then(res => {
              this.clothlist = res.data;
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          return false;
        }
      });
    },
    // 子合同特价布查询
    addcheapcloth(noclothform) {
      this.$refs[noclothform].validate(valid => {
        if (valid) {
          let _data = {
            style: "布",
            id: this.formInline.cloth,
            state: 1
          };
          htglApi
            .getspecialcloth(_data)
            .then(res => {
              this.specialclothlist = res.data;
              if (res.code == 301) {
                this.$message({ message: res.msg, duration: 2000 });
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          return false;
        }
      });
    },
    // 新增母合同
    addcontract() {
      // this.ruleForm2 = {};
      this.ruleForm2 = JSON.parse(JSON.stringify(this.defaultForm2));
      this.outerVisible = true;
      this.submitStatus = 1;
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
      this.ruleForm2.signDate = resDate + " " + resTime;
      this.ruleForm2.updateTime = resDate + " " + resTime;
      // this.Basismessage();
      this.freight();
      this.Customer();
      this.Salesman();
    },
    // 新增布料
    addcontract2() {
      if (this.isClick == true) {
        let _data = {
          contractNo: this.selectConstract
        };
        htglApi
          .addYesOrNo(querystring.stringify(_data))
          .then(res => {
            if (res.code == 200) {
              this.clothOutTableVisible = true;
              this.clothtablelist = [];
            } else {
              this.$message({ message: res.msg, duration: 2000 });
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.$message({ message: "请先选择母合同", duration: 2000 });
      }
    },
    // 新增特价布
    addcontract3() {
      if (this.isClick == true) {
        let _data = {
          contractNo: this.selectConstract
        };
        htglApi
          .addYesOrNo(querystring.stringify(_data))
          .then(res => {
            if (res.code == 200) {
              this.noClothOutTableVisible = true;
              this.specialclothlist = [];
              this.specialtablelist = [];
            } else {
              this.$message({ message: res.msg, duration: 2000 });
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.$message({ message: "请先选择母合同", duration: 2000 });
      }
    },
    // 合同基础信息 路线
    // Basismessage() {
    //   let _data = {
    //     style: "目的港"
    //   };
    //   htglApi
    //     .getBasis(_data)
    //     .then(res => {
    //       this.basislist = res.data;
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // },
    // 加载合同运费预计 (路线、预运算单价)
    freight() {
      htglApi
        .getfreight()
        .then(res => {
          this.freightlist = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 母合同 路线更改 单价随之变动
    changeLxHandle() {
      this.ruleForm2.estimateFareUnitPrice = JSON.parse(
        this.ruleForm2.route
      ).unit;
    },
    // 合同客户详情
    Customer() {
      let id = sessionStorage.getItem("id");
      let _data = {
        employeeId: id
      };
      htglApi
        .getcustomer(_data)
        .then(res => {
          this.customerlist = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 根据当前账户获取相关业务员 (需要判断是否有业务员)
    Salesman() {
      let id = sessionStorage.getItem("id");
      let _data = {
        CemployeeId: id
      };
      htglApi
        .getsalesman(_data)
        .then(res => {
          this.salesmanlist = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 合同详情(子合同)
    allclick(row) {
      this.isClick = true;
      this.selectConstract = row.contractNo;
      let _data = {
        contractNo: row.contractNo
      };
      htglApi
        .getcloth(_data)
        .then(res => {
          this.tableData2 = res.data;
        })
        .catch(err => {
          console.log(err);
        });
      // this.tableData2 = row.list;
    },
    // 母合同的删除 暂时不需要
    // delClick() {
    //   console.log("删除");
    // },
    // 合同提交审批 (初始第一步)
    approvalClick(row) {
      if (this.tableData2) {
        if (this.tableData2.length !== 0) {
          let id = sessionStorage.getItem("id");
          let name = sessionStorage.getItem("name");
          let contractBody = sessionStorage.getItem("contractBody");

          let _data = {
            approveStyle: "1",
            contractNo: row.contractNo,
            relateNo: row.contractNo,
            personName: name,
            personId: id,
            contractBody: contractBody
          };
          htglApi
            .getSubmitApproval(querystring.stringify(_data))
            .then(res => {
              if (res.code == "200") {
                this.tableList();
                this.$message({ message: "提交审批成功", duration: 1500 });
              }
              if (res.code == "302") {
                this.tableList();
                this.$message({ message: "审批添加失败", duration: 1500 });
              }
              if (res.code == "305") {
                this.tableList();
                this.$message({ message: "未配置当前审批", duration: 1500 });
              }
              if (res.code == "306") {
                this.tableList();
                this.$message({ message: res.msg, duration: 1500 });
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      } else {
        this.$message({ message: "请填写合同布料信息", duration: 2000 });
      }
    },
    // 预览 pdf
    seeClick(row) {
      let _data = {
        contractNo: row.contractNo
      };
      let address = window.location.href;
      let url = address.split("ERP", 1) + "ERP";
      htglApi
        .getPdf(querystring.stringify(_data))
        .then(res => {
          // let url = "http://192.168.5.103:8080/ERP";
          window.open(url + res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 合同列表 table数据
    tableList() {
      let _data = {
        symbol: 50,
        choiceOrNot: 1
      };
      htglApi
        .getData(_data)
        .then(res => {
          this.tableData = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 当客户发生变化
    selectcustomer(item) {
      let obj = item;
      this.ruleForm2.customer = item.clientName;
      let _data1 = {
        clientNo: obj.clientNo
      };
      this.ruleForm2.customerNo = obj.clientNo;
      this.ruleForm2.customerContractNo = obj.clientNo;
      this.Customeractive(_data1);
      let _data = {
        clientName: obj.clientName
      };
      this.Customerinfo(_data);
    },
    // 客户信息加载
    Customerinfo(_data) {
      htglApi
        .getcustomerinfo(_data)
        .then(res => {
          let { linkman, linktel, settlementMethod } = res.data[0];
          this.$set(this.ruleForm2, "linkman", linkman);
          this.$set(this.ruleForm2, "linktel", linktel);
          this.$set(this.ruleForm2, "settlementMethod", settlementMethod);
          let brandNamelist = res.data[0].clientBrands;
          this.brandlist = brandNamelist;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 判断客户活跃度
    Customeractive(_data1) {
      htglApi
        .getcustomeractive(_data1)
        .then(res => {
          this.Customeractivelist = res.data;
        })
        .catch(err => {
          this.$message({ message: "客户不活跃", duration: 1500 });
        });
    },
    // 第一层弹窗取消
    noClothClick() {
      this.noClothOutTableVisible = false;
    },
    // 关闭特价布第一层弹窗
    handleDialogClose() {
      this.noClothOutTableVisible = false;
    }
  },
  created() {
    this.defaultForm = JSON.parse(JSON.stringify(this.ruleForm));
    this.defaultForm2 = JSON.parse(JSON.stringify(this.ruleForm2));
    this.tableList();
  },
  mounted() {
    // let id = JSON.parse(sessionStorage.getItem("id"));
    // this.id = id;
    // let name = JSON.parse(sessionStorage.getItem("name"));
    // this.name = name;
  }
};
</script>

<style scoped>
.mhttj {
  text-align: center;
  margin: 0px;
  margin-bottom: 10px;
}
.mhttj .el-form-item__content {
  margin-left: 0;
}
.submitmht {
  width: 150px;
}
.form1 {
  height: 45px;
  margin: auto;
  border: 1px solid #ccc;
  display: flex;
  flex-wrap: wrap;
  padding-top: 5px;
}
.form1 .el-form-item .el-input {
  width: 80px;
}
.box2 {
  cursor: pointer;
}
.el-table__row {
  font-size: 12px;
}
.box3 {
  cursor: pointer;
  margin-top: 10px;
}
.add_contract {
  width: 80px;
  padding: 5px;
  background: #009688;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  margin: 10px 0;
  text-align: center;
}
.add_contract2 {
  padding: 5px;
  background: #009688;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  margin: 5px 0;
  text-align: center;
}
.add_contract3 {
  padding: 5px;
  background: #009688;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  margin: 5px 0;
  text-align: center;
  margin-left: 10px;
}
.contract_con {
  width: 100%;
  height: 100%;
  z-index: 1000;
}
.el-dialog {
  width: 80%;
}
.form2 {
  padding-right: 10px;
  margin: auto;
  border: 1px solid #ccc;
  display: flex;
  flex-wrap: wrap;
  padding-top: 5px;
}
.clothtable2 {
  margin-top: 20px;
}
.wxneed .label {
  width: 150px;
}
/*  table下的 th、td内容居中  */
.clothtable1 .el-table th {
  text-align: center;
}
.clothtable1 .el-table tr td {
  text-align: center;
}

/*  所有 el-dialog 的 body */
.el-dialog .el-dialog__body {
  padding: 5px 20px 20px;
}
</style>