import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state:{
    //存放的键值对就是所要管理的状态
    isLogin: false,
    company_id:'',
    user_phone:'',
    company_employee_role:'',
    company_account_status:'',
    user_name:'',
    regist:{
      //判断注册者的身份，是创建企业“build”，加入企业“join”，求职者”candidate“
      status:''
    },
    keepAlivePage:[] // 需要缓存的页面，如果说你一开始就要缓存，那么你可以在这里设置初始值，如果你不需一开始就设置缓存，那么设置为空，再通过某种条件通过mutations或者actions改变keepAlivePage
  },
  mutations: {
    saveCompanyId(state, data){
      state.company_id = data;
      window.localStorage.setItem("company_id", data);//保存到localStorage 中
    },
    saveUserPhone(state, data){
      state.user_phone = data;
      window.localStorage.setItem("user_phone", data);//保存到localStorage 中
    },
    saveCompanyEmployeeRole(state, data){
      state.company_employee_role = data;
      window.localStorage.setItem("company_employee_role", data);//保存到localStorage 中
    },
    saveCompanyAccountStatus(state, data){
      state.company_account_status = data;
      window.localStorage.setItem("company_account_status", data);//保存到localStorage 中
    },
    saveUserName(state, data){
      state.user_name = data;
      window.localStorage.setItem("user_name", data);//保存到localStorage 中
    },
    saveisLogin(state, data){
      state.isLogin = data;
      window.localStorage.setItem("isLogin", data);//保存到localStorage 中
    },
    //注意这里并未将regist_status放到本地缓存中，刷新会丢失数据
    saveRegistStatus(state, data){
      //status有四种情况为：build,join,build_hasAccount,join_hasAccount
      state.regist.status = data;
    },

    ADD_KEEP_ALIVE: (state, name) => {
      const keepAlivePage = state.keepAlivePage
      const index = keepAlivePage.indexOf(name)
      if (index == -1) {
        state.keepAlivePage = state.keepAlivePage.concat(name)
      }

    },

    CHANGE_KEEP_ALIVE: (state, name) => {
      const keepAlivePage = state.keepAlivePage
      const index = keepAlivePage.indexOf(name)
      if (index > -1) {
        keepAlivePage.splice(index, 1)
      }
    }

  },
  actions: {
    addKeepAlivePage ({ commit }, name) {
      commit('ADD_KEEP_ALIVE', name)
    },
    changeKeepAlive ({ commit }, name) {
      commit('CHANGE_KEEP_ALIVE', name)
    }
  },
  modules: {
  }
})

export default store