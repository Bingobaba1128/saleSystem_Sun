<template>
  <div class="down">
    <el-container class="allHeight">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu>
          <el-submenu :index="String(item)" v-for="(work,item) in sixList" :key="item">
            <template slot="title">
              <i :class="iconlist[item]"></i>
              {{work.title}}
            </template>
            <el-menu-item-group>
              <el-menu-item
                :index="item+'-'+idx"
                v-for="(model,idx) in work.model"
                :key="idx"
                @click="addTabs(model.name,model.title)"
              >{{model.title}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: left; font-size: 12px; height:40px; color:#333;">
          <WorkBench></WorkBench>
        </el-header>

        <el-main class="mainBackground">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import * as creatApi from "@/api/creatApi.js";
import querystring from "querystring";
import store from "@/store";

export default {
  name: "index",
  data() {
    return {
      iconlist: [
        "el-icon-document-checked",
        "el-icon-s-custom",
        "el-icon-s-goods",
        "el-icon-s-order",
        "el-icon-s-data",
        "el-icon-s-platform",
        "el-icon-s-promotion",
        "el-icon-s-finance"
      ],
      sixList: [
        {
          title: "合同管理",
          model: [
            {
              title: "合同管理",
              name: "htgl"
            },
            {
              title: "合同拆分",
              name: "htcf"
            },
            {
              title: "合同流转",
              name: "htlz"
            }
          ]
        },
        {
          title: "客户管理",
          model: [
            {
              title: "LC认证",
              name: "lc"
            },
            {
              title: "客商档案",
              name: "ksda"
            },
            {
              title: "品牌档案",
              name: "ppda"
            },
            {
              title: "品牌匹配",
              name: "pppp"
            },
            {
              title: "区域管理",
              name: "qygl"
            },
            {
              title: "客户活跃度期限",
              name: "khhydqx"
            }
          ]
        },
        {
          title: "生产通知",
          model: [
            {
              title: "生产通知单",
              name: "sctzd"
            },
            {
              title: "寄板申请单",
              name: "jbsqd"
            }
          ]
        },
        {
          title: "发货管理",
          model: [
            {
              title: "发货申请",
              name: "fhsq"
            },
            {
              title: "发货细码单",
              name: "fhxmd"
            }
          ]
        },
        {
          title: "基础设置",
          model: [
            {
              title: "审批设置",
              name: "spsz"
            },
            {
              title: "基础设置",
              name: "jcsz"
            },
            {
              title: "卡位设置",
              name: "kwsz"
            },
            {
              title: "基础信息配置",
              name: "jcxxpz"
            },
          ]
        },
        {
          title: "财务管理",
          model: [
            {
              title: "应收账款日报",
              name: "yszkrb"
            }
          ]
        },
        {
          title: "审批管理",
          model: [
            {
              title: "审批",
              name: "sp"
            }
          ]
        },
        {
          title: "库房管理",
          model: [
            {
              title: "大货入库",
              name: "dhrk"
            },
            {
              title: "出入库日报",
              name: "crkrb"
            },
            {
              title: "出库确认",
              name: "ckqr"
            },
            {
              title: "库位实时查询",
              name: "kwsscx"
            }
          ]
        }
      ]
    };
  },
  methods: {
    addTabs(name, title) {
      if (this.$store.state.tabArr.some(item => item.name == name)) {
        this.$router.push({ name });
        store.commit("modifyTabName", name);
      } else {
        store.commit("addTabArr", {
          name,
          title
        });
        this.$router.push({ name });
        store.commit("modifyTabName", name);
      }
    },
    // 获取账号信息，以及权限
    accountInfo() {
      creatApi
        .getAccountInfo()
        .then(res => {
          // console.log(res);
          sessionStorage.setItem("id",res.id)
          sessionStorage.setItem("name",res.username)
          sessionStorage.setItem("contractBody",res.contractBody)
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    // this.accountInfo();
  },
  mounted() {}
};
</script>

<style scoped>
.down {
  height: 100%;
}
.allHeight {
  height: 100%;
}
.mainBackground {
  background: #f9f9f9;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  padding: 0;
}
.el-aside {
  background: #b3c0d1;
  color: #333;
}
</style>