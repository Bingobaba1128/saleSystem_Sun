<template>
  <div class="box">
    <div class="ht_left">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="母合同编号">
          <el-input v-model="formInline.user"></el-input>
        </el-form-item>
        <el-form-item label="品牌">
          <el-input v-model="formInline.user"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>

      <el-table :data="tableData1" style="width: 100%" height="500" @row-click="zht">
        <el-table-column type="index" width="50" fixed></el-table-column>
        <el-table-column fixed prop="date" label="母合同编号" width="150"></el-table-column>
        <el-table-column prop="name" label="品牌" width="120"></el-table-column>
        <el-table-column prop="province" label="合同主体" width="120"></el-table-column>
        <el-table-column property="address" label="操作" width="150" align="center">
          <el-button @click.native="editorClick" type="text">查看</el-button>
        </el-table-column>
      </el-table>
    </div>
    <div class="ht_right" id="ht_right">
      <div class="zheader">子合同</div>
      <el-table :data="tableData2" height="500" border style="width: 100%">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="date" label="子合同编号" width="120"></el-table-column>
        <el-table-column prop="name" label="布编" width="120"></el-table-column>
        <el-table-column prop="province" label="数量" width="120"></el-table-column>
        <el-table-column prop="city" label="状态" width="120"></el-table-column>
        <el-table-column property="address" label="操作" width="150" align="center">
          <el-button @click.native="editorClick" type="text">拆分</el-button>
          <el-button @click.native="editorClick" type="text">修改</el-button>
          <el-button @click.native="editorClick" type="text">删除</el-button>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "htcf",
  data() {
    return {
      formInline: {
        user: "",
        region: ""
      },
      tableData1: [
        {
          date: "2016-05-03",
          name: "王小2222222222222222222虎",
          province: "上海市普陀区金沙江路 1518 弄",
          id: "1"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海市普陀区金沙江路 1518 弄",
          id: "2"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海市普陀区金沙江路 1518 弄",
          id: "3"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          province: "上海市普陀区金沙江路 1518 弄",
          id: "4"
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          province: "上海市普陀区金沙江路 1518 弄",
          id: "5"
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          province: "上海市普陀区金沙江路 1518 弄",
          id: "6"
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          province: "上海市普陀区金沙江路 1518 弄",
          id: "7"
        }
      ],
      tableData2: [
        {
          date: "2016-05-03",
          name: "王小222222222222222222虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        }
      ]
    };
  },
  methods: {
    onSubmit() {
      alert("submit!");
    },
    zht(row) {
      document.getElementById("ht_right").innerHTML = row.id;
    }
  }
};
</script>

<style>
.box {
  display: flex;
}
.ht_right {
  width: 100%;
  border: 1px solid #000;
  background: #ccc;
  padding: 10px;
}
.zheader{
    line-height: 30px;
}
</style>