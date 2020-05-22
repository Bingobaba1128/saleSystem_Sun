import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'workbench',
    component: () => import("@/App.vue"),
    // redirect: { name: "home" },
    redirect: { name: "login" }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import("@/views/login/login"),
    // redirect: { name: "login" }
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/home/home"),
    redirect: { name: "index" },
    children: [
      // 首页
      {
        path: "/index",
        name: "index",
        component: () => import("@/views/home/index"),
        children: [
          // 合同管理
          {
            path: '/htgl',
            name: 'htgl',
            component: () => import("@/views/htgl/htgl/htgl")
          },
          {
            path: '/htcf',
            name: 'htcf',
            component: () => import("@/views/htgl/htcf/htcf")
          },
          {
            path: '/htlz',
            name: 'htlz',
            component: () => import("@/views/htgl/htlz/htlz")
          },
          // 客户管理
          {
            path: '/lc',
            name: 'lc',
            component: () => import("@/views/khgl/lc/lc")
          },
          {
            path: '/ksda',
            name: 'ksda',
            component: () => import("@/views/khgl/ksda/ksda")
          },
          {
            path: '/ppda',
            name: 'ppda',
            component: () => import("@/views/khgl/ppda/ppda")
          },
          {
            path: '/pppp',
            name: 'pppp',
            component: () => import("@/views/khgl/pppp/pppp")
          },
          {
            path: '/qygl',
            name: 'qygl',
            component: () => import("@/views/khgl/qygl/qygl")
          },
          {
            path: '/khhydqx',
            name: 'khhydqx',
            component: () => import("@/views/khgl/khhydqx/khhydqx")
          },
          // 生产通知
          {
            path: '/jbsqd',
            name: 'jbsqd',
            component: () => import("@/views/sctz/jbsqd/jbsqd")
          },
          {
            path: '/sctzd',
            name: 'sctzd',
            component: () => import("@/views/sctz/sctzd/sctzd")
          },
          // 发货管理
          {
            path: '/fhsq',
            name: 'fhsq',
            component: () => import("@/views/fhgl/fhsq/fhsq")
          },
          {
            path: '/fhxmd',
            name: 'fhxmd',
            component: () => import("@/views/fhgl/fhxmd/fhxmd")
          },
          // 基础设置
          {
            path: '/jcsz',
            name: 'jcsz',
            component: () => import("@/views/jcsz/jcsz/jcsz")
          },
          {
            path: '/spsz',
            name: 'spsz',
            component: () => import("@/views/jcsz/spsz/spsz")
          },
          {
            path: '/kwsz',
            name: 'kwsz',
            component: () => import("@/views/jcsz/kwsz/kwsz")
          },
          {
            path: '/jcxxpz',
            name: 'jcxxpz',
            component: () => import("@/views/jcsz/jcxxpz/jcxxpz")
          },
          // 财务管理
          {
            path: '/yszkrb',
            name: 'yszkrb',
            component: () => import("@/views/cwgl/yszkrb/yszkrb")
          },
          // 审批管理
          {
            path: '/sp',
            name: 'sp',
            component: () => import("@/views/spgl/sp/sp")
          },
          // 库房管理
          {
            path: '/dhrk',
            name: 'dhrk',
            component: () => import("@/views/kfgl/dhrk/dhrk")
          },
          {
            path: '/ckqr',
            name: 'ckqr',
            component: () => import("@/views/kfgl/ckqr/ckqr")
          },
          {
            path: '/crkrb',
            name: 'crkrb',
            component: () => import("@/views/kfgl/crkrb/crkrb")
          },
          {
            path: '/kwsscx',
            name: 'kwsscx',
            component: () => import("@/views/kfgl/kwsscx/kwsscx")
          },
        ]
      },

    ]
  },
  {
    path: '/404',
    name: '404',
    meta: {
      title: "请求页面未找到",
      auth: false
    },
  },
  {
    path: '*',
    meta: {
      title: "请求页面未找到",
      auth: false
    },
    redirect: '/404'
  }
]

const router = new VueRouter({
  routes
})

export default router
