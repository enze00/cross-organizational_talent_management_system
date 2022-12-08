<template>
  <div class="judge_build_or_join">
    <el-row type="flex" justify="center">
      <el-col :span="12">
        <div class="frame">
          <el-row>
            <div class="top">
              <el-col :span="11">
                <div class="build">
                  <el-card shadow="hover" :body-style="{height:'130px'}">
                    <div class="choose_build">
                      <el-row>
                        <el-col :span="4">
                          <div style="margin-top: 55px">
                            <el-radio v-model="judge" label="build"><br></el-radio>
                          </div>
                        </el-col>
                        <el-col :span="20">
                          <div style="margin-top: 55px">
                            创建公司
                            <!--放背景图片-->
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                  </el-card>
                </div>
              </el-col>
              <el-col :span="11" :offset="2">
                <div class="join">
                  <el-card shadow="hover" :body-style="{height:'130px'}">
                    <div class="choose_join">
                      <el-row>
                        <el-col :span="4">
                          <div style="margin-top: 55px">
                            <el-radio v-model="judge" label="join"><br></el-radio>
                          </div>
                        </el-col>
                        <el-col :span="20">
                          <div style="margin-top: 55px">
                            加入公司
                            <!--放背景图片-->
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                  </el-card>
                </div>
              </el-col>
            </div>
          </el-row>
          <el-row>
            <el-button plain style="width: 30%;height: 60px;margin-left: 19%" @click="back">返回</el-button>
            <el-button type="primary" style="width: 30%;height: 60px" @click="submit">确定</el-button>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <el-dialog
        width="30%"
        :visible.sync="dialogFormVisible">
     <div style="width: 100%">
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
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="login">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "JudgeBuildOrJoin",
    data(){
      return{
        judge:'build',
        dialogFormVisible: false,
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
          user_phone: [{ required: true, message: "手机号不能为空", trigger: "blur" }],
          user_pwd: [{ required: true, message: "密码不能为空", trigger: "blur" }]
        },
        rules2: {//配合页面内的 prop 定义规则
          user_phone: [{ required: true, message: "手机号不能为空", trigger: "blur" }],
          note: [{ required: true, message: "短信验证码不能为空", trigger: "blur" }]
        },
      }
    },
    methods:{
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

      login_pwd(){
        const _this = this;
        this.axios.post('https://easydoc.xyz/mock/sEWRf0fW/login_pwd_build',{user_phone:this.pwd_loginForm.user_phone,user_pwd:this.pwd_loginForm.user_pwd})
            .then(function (res){
              if(res.data.result == "success"){
                _this.$store.commit("saveUserName",res.data.user_name)
                _this.$store.commit("saveUserPhone",res.data.user_phone)
                window.localStorage.setItem("user_phone",res.data.user_phone)
                _this.$notify({
                  type: "success",
                  message: "欢迎你," + _this.$store.state.user_name + "!",
                  duration: 3000
                });
                _this.dialogFormVisible = false
                _this.$store.commit("saveRegistStatus",_this.judge)
                if(_this.judge === 'build_hasAccount'){
                  _this.$router.push("/build_company")
                }else if(_this.judge === 'join_hasAccount'){
                  _this.$router.push("/join_company")
                }
              }else if(res.data.result == "fail"){
                _this.$message({
                  type: "error",
                  message: "用户名或密码错误",
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
        this.axios.post('https://easydoc.xyz/mock/sEWRf0fW/login_note_build',{user_phone:this.note_loginForm.user_phone, note:this.note_loginForm.note})
            .then(function (res){
              if(res.data.result == "success"){
                _this.$store.commit("saveUserName",res.data.user_name)
                _this.$store.commit("saveUserPhone",res.data.user_phone)
                window.localStorage.setItem("user_phone",res.data.user_phone)
                _this.$notify({
                  type: "success",
                  message: "欢迎你," + _this.$store.state.user_name + "!",
                  duration: 3000
                });
                _this.dialogFormVisible = false
                _this.$store.commit("saveRegistStatus",_this.judge)
                if(_this.judge === 'build_hasAccount'){
                  _this.$router.push("/build_company")
                }else if(_this.judge === 'join_hasAccount'){
                  _this.$router.push("/join_company")
                }
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

      handleClick(){
        const _this = this
        console.log(this.activeName)
        setTimeout(function (){
          _this.$refs.pwd_loginForm.resetFields()
          _this.$refs.note_loginForm.resetFields()
        },1)
      },

      back(){
        this.$router.push("/");
      },

      submit(){
        const _this = this
        if(this.judge === 'build'){
          _this.$store.dispatch('changeKeepAlive','BuildAccount')
          _this.$store.dispatch('changeKeepAlive','BuildBasicInfo')
          _this.$store.dispatch('changeKeepAlive','BuildWorkExperience')
          _this.$store.dispatch('changeKeepAlive','BuildEducationBackground')
          _this.$store.dispatch('changeKeepAlive','BuildCompany')
          this.$confirm('您是否已注册过本平台账号?',{
            confirmButtonText: '已注册',
            cancelButtonText: '未注册',
            type: 'info',
            distinguishCancelAndClose:true
          }).then(() => {
            _this.judge = 'build_hasAccount'
            _this.dialogFormVisible = true
          }).catch(action => {
            if (action === 'cancel'){
              // 后面要更改跳转到的登录页面
              _this.$store.commit("saveRegistStatus",_this.judge)
              _this.$router.push("/build_account")
            }
          });
        }else if(this.judge === 'join'){
          _this.$store.dispatch('changeKeepAlive','BuildAccount')
          _this.$store.dispatch('changeKeepAlive','BuildBasicInfo')
          _this.$store.dispatch('changeKeepAlive','BuildWorkExperience')
          _this.$store.dispatch('changeKeepAlive','BuildEducationBackground')
          _this.$store.dispatch('changeKeepAlive','JoinCompany')
          this.$confirm('您是否已注册过本平台账号?',{
            confirmButtonText: '已注册',
            cancelButtonText: '未注册',
            type: 'info',
            distinguishCancelAndClose:true
          }).then(() => {
            _this.judge = 'join_hasAccount'
            _this.dialogFormVisible = true
          }).catch(action => {
              if (action === 'cancel'){
                _this.$store.commit("saveRegistStatus",_this.judge)
                // 后面要更改跳转到的登录页面
                _this.$router.push("/build_account")
              }
          });
        }
      }
    },
  }
</script>

<style scoped>
  .frame{
    box-shadow: 5px 5px 10px #888888;
    background-color: white;
    height: 500px;
    width: 700px;
    margin-top: 100px;
    border-radius: 10px;
  }

  .top{
    width: 100%;
    height: 360px;
  }

  .build{
    margin-left: 60px;
    margin-top: 90px;
    width: 80%;
  }

  .join{
    margin-right: 60px;
    margin-top: 90px;
    width: 80%;
  }
</style>
<!--<el-row type="flex" justify="center">-->
<!--<el-col :span="12">-->
<!--  <div class="frame">-->

<!--  </div>-->
<!--</el-col>-->
<!--</el-row>-->