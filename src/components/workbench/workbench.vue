<template>
  <div id="tabs">
    <el-tabs v-model="editableTabsValue" type="card" @edit="handleRemove" @tab-click="handleCheck">
      <el-tab-pane
        :key="item.name"
        v-for="(item,idx) in editableTabs"
        :label="item.title"
        :name="item.name"
        :closable="idx != 0">
      </el-tab-pane>
    </el-tabs>
    <span style="display:none;">
      {{tabName}}
    </span>
  </div>
</template>

<script>

// editable 添加 tabs
import store from "@/store"
export default {
  data() {
    return {
      editableTabsValue: "home"
    };
  },
  computed: {
    tabName:() =>{
      // console.log("当前",store.state.tabName)
      return store.state.tabName
    },
    editableTabs:  () =>{
      return store.state.tabArr
    }
  },
  watch:{
    tabName(val){
      // console.log(val)
      this.editableTabsValue = val;
    }
  },
  methods: {
    handleRemove(modelName, operation) {
      if(operation == 'remove'){
        let newName = "";
        // 判断当前关闭的模块，是不是活跃的模块，如果是则自动显示到前一个，如果不是则不改变
        if(modelName == this.tabName){
          this.editableTabs.forEach((item,i) => {
            if(item.name == modelName){
              newName = this.editableTabs[i-1].name;
            }
          })
          store.commit("deleteTabArr", modelName)
          store.commit("modifyTabName", newName)
          this.$router.push({name:newName})
        }else{
          store.commit("deleteTabArr", modelName)
        }
      }
    },
    handleCheck(insteance){
      this.$router.push({name:insteance.paneName})
      store.commit("modifyTabName", insteance.paneName)
    }
  }
};
</script>

<style scoped>
#tabs {
  background: #ccc;
  margin: 0;
  height: 40px;
}
.el-tabs__item{
  height: 40px;
  line-height: 40px;
}
#tab-home{
  height: 40px;
}
#tab-1 .el-icon-close {
  display: none;
}
.el-tabs--card>.el-tabs__header .el-tabs__item.is-active{
  border-bottom-color: #3c8dbc;
}
</style>