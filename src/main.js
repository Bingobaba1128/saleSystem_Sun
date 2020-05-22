import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import resetcss from './assets/css/resetcss.css'

// 组件注册
// import Login from "@/views/login/login";
import Home from "@/views/home/home";
import MyHeader from "@/components/header/header";
import WorkBench from "@/components/workbench/workbench";
// Vue.component("Login",Login)
Vue.component("Home",Home)
Vue.component("MyHeader",MyHeader)
Vue.component("WorkBench",WorkBench)

Vue.use(ElementUI)
Vue.use(resetcss)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
