<template>
  <div class="header">
    <div>
      <span class="xsname">销售管理平台</span>
    </div>
    <!-- <el-select v-model="value" placeholder="请选择" class="gs">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        :disabled="item.disabled"
      ></el-option>
    </el-select> -->
    <div>
      <span class="yhname">Hi,盛明玉</span>
      <span class="exit" @click="tcclick">退出</span>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      // options: [
      //   {
      //     value: "选项1",
      //     label: "北江科技"
      //   },
      //   {
      //     value: "选项2",
      //     label: "北江科技111"
      //     //   disabled: true
      //   },
      //   {
      //     value: "选项3",
      //     label: "北江科技222"
      //   },
      //   {
      //     value: "选项4",
      //     label: "北江科技333"
      //   },
      //   {
      //     value: "选项5",
      //     label: "北江科技4422222222222222233334"
      //   }
      // ],
      // value: "选项1"
    };
  },
  methods: {
    tcclick() {
      alert("退出");
    }
  }
};
</script>

<style>
.header {
  height: 50px;
  line-height: 50px;
  background: #fff;
  display: flex;
  justify-content: space-between;
  padding: 0 50px;
  color: #191919;
}
.xsname {
  font-size: 26px;
}
.yhname {
  margin-right: 50px;
}
.exit {
  cursor: pointer;
}
.gs {
  background: #fff;
}
.gs .el-input__inner {
  width: 200px;
  border: none;
  /* background: #15202c; */
  font-size: 22px;
  color: #191919;
}
</style>