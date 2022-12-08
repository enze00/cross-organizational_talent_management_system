import Vue from 'vue'
import App from './App.vue'

import router from './router'

import store from './store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import axios from 'axios'
import VueAxios from 'vue-axios'

import Vuex from 'vuex'

import '@/permission'

import Fragment from 'vue-fragment'

import echarts from 'echarts'
import 'echarts/theme/westeros.js'
import qs from 'qs'
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueAxios, axios)
Vue.use(Vuex)
// npm i -s vue-fragment
Vue.use(Fragment.Plugin);
// Vue.prototype.$echarts = ECharts
// Vue.component("v-chart",ECharts)
Vue.use(echarts)
Vue.prototype.$echarts = echarts
Vue.prototype.$qs = qs

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
