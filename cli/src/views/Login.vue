<template>
  <div class="login">
    <!--    <el-row>-->
    <!--      <el-col :span="5">-->
    <!--        <img src="../assets/logo_login.png" height="64.2" width="191.8"/>-->
    <!--      </el-col>-->
    <!--    </el-row>-->
    <el-row>
      <el-col :span="12" :offset="6">
        <div class="frame">
          <el-row type="flex" justify="center">
            <el-col :span="8">
              <div class="choose_frame">
                <el-row>
                  <div class="company">
                    <el-card shadow="hover" :body-style="{height:'130px'}">
                      <div class="choose_company">
                        <el-row>
                          <el-col :span="4">
                            <div style="margin-top: 55px">
                              <el-radio v-model="entrance" label="company"><br></el-radio>
                            </div>
                          </el-col>
                          <el-col :span="20">
                            <div style="margin-top: 55px">
                              企业入口
                              <!--放背景图片-->
                            </div>
                          </el-col>
                        </el-row>
                      </div>
                    </el-card>
                  </div>
                </el-row>
                <el-row>
                  <div class="candidate">
                    <el-card shadow="hover" :body-style="{height:'130px'}">
                      <div class="choose_candidate">
                        <el-row>
                          <el-col :span="4">
                            <div style="margin-top: 55px">
                              <el-radio v-model="entrance" label="candidate"><br></el-radio>
                            </div>
                          </el-col>
                          <el-col :span="20">
                            <div style="margin-top: 55px">
                              求职入口
                              <!--放背景图片-->
                            </div>
                          </el-col>
                        </el-row>
                      </div>
                    </el-card>
                  </div>
                </el-row>
              </div>
            </el-col>
            <el-col :span="13" :offset="2">
              <el-row>
                <div class="judge_login" >
                  <el-tabs v-model="activeName" @tab-click="handleClick" stretch>
                    <el-tab-pane label="账号密码登录" name="login_pwd">
                      <div>
                        <el-form ref="pwd_loginForm" :model="pwd_loginForm" :rules="rules1" status-icon>
                          <div style="margin-top: 40px; margin-left:40px; width: 80%">
                            <el-form-item prop="user_phone" ref="user_phone1">
                              <el-input
                                  v-model="pwd_loginForm.user_phone"
                                  placeholder="请输入登录的手机号码"
                                  prefix-icon="el-icon-phone-outline"
                                  clearable>
                              </el-input>
                            </el-form-item>
                          </div>
                          <div style="margin-top: 35px; margin-left:40px; width: 80%">
                            <el-form-item prop="user_pwd" ref="user_pwd">
                              <el-input
                                  v-model="pwd_loginForm.user_pwd"
                                  placeholder="请输入密码"
                                  prefix-icon="el-icon-key"
                                  show-password>
                              </el-input>
                            </el-form-item>
                          </div>
                        </el-form>
                      </div>
                    </el-tab-pane>
                    <el-tab-pane label="短信验证码登录" name="login_note">
                      <div>
                        <el-form ref="note_loginForm" :model="note_loginForm" :rules="rules2" status-icon>
                          <div style="margin-top: 40px; margin-left:40px; width: 80%">
                            <el-form-item prop="user_phone" ref="user_phone2">
                              <el-input
                                  v-model="note_loginForm.user_phone"
                                  placeholder="请输入登录的手机号码"
                                  prefix-icon="el-icon-phone-outline"
                                  ref="userPhone"
                                  clearable>
                              </el-input>
                            </el-form-item>
                          </div>
                          <div style="margin-top: 35px; margin-left:40px; width: 80%">
                            <el-form-item prop="note" ref="note">
                              <el-input
                                  v-model="note_loginForm.note"
                                  placeholder="请输入短信验证码"
                                  prefix-icon="el-icon-message">
                                <el-button type="success" plain slot="append" @click="getNote">获取验证码</el-button>
                              </el-input>
                            </el-form-item>
                          </div>
                        </el-form>
                      </div>
                    </el-tab-pane>
                  </el-tabs>
                </div>
              </el-row>
              <el-row>
                <div class="button">
                  <el-button type="primary" style="width: 100%" @click="login">登录</el-button>
                  <br>
                  <el-button style="width: 100%; margin-top: 20px" @click="regist">注册</el-button>
                </div>
              </el-row>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <!--    -->
    <el-row>
      <el-col :span="12":offset="11" style="margin-top: 12%">
        <a style="font-size: 10px" href="https://beian.miit.gov.cn" target="_blank">浙ICP备20025565号-1</a>
      </el-col>
    </el-row>
    <!--    -->
  </div>
</template>

<script>
import router,{asyncRouterMap} from "@/router";

export default {
  name: "Login",
  data(){
    let validatePhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号'));
      } else {
        if (/^((1[3,5,8,7,9][0-9])|(14[5,7])|(17[0,6,7,8])|(19[1,7]))\d{8}$/.test(value)) {
          callback();
        }else {
          callback(new Error('请正确输入手机号'));
        }
        callback();
      }
    };
    return{
      entrance:'company',
      activeName:'login_pwd',
      pwd_loginForm: {
        user_phone:'',
        user_pwd:'',
      },
      note_loginForm:{
        user_phone:'',
        note:''
      },
      rules1: {//配合页面内的 prop 定义规则
        user_phone: [{ required: true, validator: validatePhone, trigger: 'blur' }],
        user_pwd: [{ required: true, message: "密码不能为空", trigger: "blur" }]
      },
      rules2: {//配合页面内的 prop 定义规则
        user_phone: [{ required: true, validator: validatePhone, trigger: 'blur' }],
        note: [{ required: true, message: "短信验证码不能为空", trigger: "blur" }]
      },
    }
  },
  methods:{
    handleClick(){
      const _this = this
      console.log(this.activeName)
      setTimeout(function (){
        _this.$refs.pwd_loginForm.resetFields()
        _this.$refs.note_loginForm.resetFields()
      },1)

    },

    login(){
      if (this.activeName==='login_pwd'){
        this.$refs.pwd_loginForm.validate(valid => {
          if(valid){
            // console.log("pwd login successful")
            this.login_pwd();
          }
        });
      }
      else if(this.activeName==='login_note'){
        this.$refs.note_loginForm.validate(valid => {
          if(valid){
            // console.log("note login successful")
            this.login_note();
          }
        });
      }
    },
// {headers: {'Content-Type':'application/x-www-form-urlencoded'}}
    login_pwd(){
      const _this = this;
      //this.axios.post('https://easydoc.xyz/mock/sEWRf0fW/login_pwd',{user_phone:this.pwd_loginForm.user_phone,user_pwd:this.pwd_loginForm.user_pwd,entrance:this.entrance})
      this.axios.post('http://www.ez00.cn/web/cirrus/user/login',this.$qs.stringify({user_phone:this.pwd_loginForm.user_phone,user_pwd:this.pwd_loginForm.user_pwd,entrance:this.entrance}))
          .then(function (res){
            console.log(res);
            if(res.data.code == 0){
              _this.$store.commit("saveCompanyId",res.data.data.company_id)
              _this.$store.commit("saveUserName",res.data.data.user_name)
              _this.$store.commit("saveCompanyEmployeeRole",res.data.data.company_employee_role)
              _this.$store.commit("saveCompanyAccountStatus",res.data.data.company_account_status)
              _this.$store.commit("saveUserPhone",res.data.data.user_phone)
              _this.$store.commit("saveisLogin",true)
              _this.$notify({
                type: "success",
                message: "欢迎你," + _this.$store.state.user_name + "!",
                duration: 3000
              });
              //测试********************************************************************************************

              _this.matcher = router.matcher // reset router
              _this.$router.addRoutes(asyncRouterMap)
              _this.$router.push('/index')
              console.log(_this.$router.getRoutes())

              //测试********************************************************************************************
            }else if(res.data.code == 502){
              _this.$message({
                type: "error",
                message: "账号密码不匹配!",
                showClose: true
              });
            }else if(res.data.code == -1){
              _this.$message({
                type: "error",
                message: "账户不存在!",
                showClose: true
              });
            }
          })
          .catch(function (err) {  //当请求出现错误时的回调函数
            console.log(err);
          });
    },

    login_note(){
      const _this = this
      this.axios.post('https://easydoc.xyz/mock/sEWRf0fW/login_note',qs.stringify({user_phone:this.note_loginForm.user_phone, note:this.note_loginForm.note, entrance:this.entrance}))
          .then(function (res){
            if(res.data.result == "success"){
              _this.$store.commit("saveCompanyId",res.data.company_id)
              _this.$store.commit("saveUserName",res.data.user_name)
              _this.$store.commit("saveCompanyEmployeeRole",res.data.company_employee_role)
              _this.$store.commit("saveCompanyAccountStatus",res.data.company_account_status)
              _this.$store.commit("saveUserPhone",res.data.user_phone)
              _this.$notify({
                type: "success",
                message: "欢迎你," + _this.$store.state.user_name + "!",
                duration: 3000
              });
            }else if(res.data.result == "fail"){
              _this.$message({
                type: "error",
                message: "验证码错误",
                showClose: true
              });
            }
          })
          .catch(function (err) {  //当请求出现错误时的回调函数
            console.log(err);
          });
    },

    getNote(){
      const _this = this
      if(this.note_loginForm.user_phone != ''){
        this.axios.post('https://easydoc.xyz/mock/sEWRf0fW/get_note',{user_phone:this.note_loginForm.user_phone})
            .then(function (){
              _this.$notify({
                type: "success",
                message: "验证码发送成功，请在5分钟内填写！",
                duration: 3000
              });
            })
            .catch(function (err) {  //当请求出现错误时的回调函数
              console.log(err);
            });
      }
      else {
        setTimeout(function (){
          _this.$refs.userPhone.focus()
        },1)
        this.$message({
          type: "error",
          message: "手机号不能为空！",
          showClose: true
        });

      }
    },
    regist(){
      if(this.entrance==='company'){
        this.$router.push("/judge_build_or_join")
      }
    }
  },
  created(){
    if (this.$store.state.isLogin == true) { // 判断是否已经刷新
      window.location.reload()
    }    // 正式显示页面内容
    window.localStorage.clear();
    //_this.$store.dispatch('changeKeepAlive','AccountManage')
  }
}
</script>
<style>
.frame{
  box-shadow: 5px 5px 10px #888888;
  background-color: white;
  height: 500px;
  width: 700px;
  margin-top: 100px;
  border-radius: 10px;
}

.choose_frame{
  text-align: center;
  height: 460px;
  width: 100%;
  margin-left: 30px;
  margin-top: 20px;
}

.candidate{
  margin-top: 40px;
}

.company{
  margin-top: 20px;
}

.judge_login{
  /*background-color: deeppink;*/
  height: 260px;
  width: 100%;
  margin-top: 40px;
}

.button{
  /*background-color: aqua;*/
  margin-top: 20px;
  height: 150px;
  width: 100%;
}
</style>

/**
*@Description
*@Author:En_Ze
*@Date:2021/2/1 2:55
*/ 