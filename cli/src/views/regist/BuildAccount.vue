<template>
  <div class="build_account">
    <RegistSteps :status="0"></RegistSteps>
    <el-row type="flex" justify="center">
      <el-col :span="9">
        <div class="frame">
          <el-row>
            <div class="top">
              <div class="title">
                <h2>创建账号</h2>
              </div>
            </div>
          </el-row>
          <el-row type="flex" justify="center">
            <el-col :span="23 ">
              <div class="line"></div>
            </el-col>
          </el-row>
          <el-row>
            <el-form
                :model="accountForm"
                status-icon
                :rules="rules"
                ref="accountForm"
                label-width="100px"
                label-position="right">
              <div style="margin-top: 50px; margin-left: 15px; width: 80%">
                <el-form-item label="手机号" prop="user_phone">
                  <el-input
                      v-model="accountForm.user_phone"
                      placeholder="请输入登录的手机号码"
                      prefix-icon="el-icon-phone-outline"
                      ref="userPhone"
                      clearable
                      autocomplete="off">
                  </el-input>
                </el-form-item>
              </div>
              <div style="margin-top: 40px; margin-left: 15px; width: 80%">
                <el-form-item label="短信验证码" prop="note">
                  <el-input
                      v-model="accountForm.note"
                      placeholder="请输入短信验证码"
                      prefix-icon="el-icon-message"
                      autocomplete="off">
                    <el-button type="success" plain slot="append" @click="getNote">获取验证码</el-button>
                  </el-input>
                </el-form-item>
              </div>
              <div style="margin-top: 40px; margin-left: 15px; width: 80%">
                <el-form-item label="密码" prop="pass">
                  <el-input
                      show-password
                      v-model="accountForm.pass"
                      placeholder="请输入密码"
                      prefix-icon="el-icon-key"
                      autocomplete="off">
                  </el-input>
                </el-form-item>
              </div>
              <div style="margin-top: 40px; margin-left: 15px; width: 80%">
                <el-form-item label="确认密码" prop="checkPass">
                  <el-input
                      show-password
                      v-model="accountForm.checkPass"
                      placeholder="请再次输入密码"
                      prefix-icon="el-icon-key"
                      autocomplete="off">
                  </el-input>
                </el-form-item>
              </div>
              <div style="margin-top: 60px;margin-left: 40%">
                <el-form-item>
                  <el-button @click="back">返回</el-button>
                  <el-button type="primary" @click="next">下一步</el-button>
                </el-form-item>
              </div>
            </el-form>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import RegistSteps from "@/components/RegistSteps";

export default {
  name: "BuildAccount",
  data(){
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.accountForm.checkPass !== '') {
          this.$refs.accountForm.validateField('checkPass');
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.accountForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
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
      accountForm: {
        pass: '',
        checkPass: '',
        user_phone:'',
        note:''
      },
      rules: {
        pass: [
          { validator: validatePass,required: true, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2,required: true, trigger: 'blur' }
        ],
        user_phone: [{ required: true, validator: validatePhone, trigger: 'blur' }],
        note: [{ required: true, message: "短信验证码不能为空", trigger: "blur" }]
      }
    }
  },
  methods:{
    getNote(){
      const _this = this
      if(this.accountForm.user_phone != ''){
        this.axios.post('https://easydoc.xyz/mock/sEWRf0fW/get_note',{user_phone:this.accountForm.user_phone})
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

    back(){
      this.$router.go(-1)
    },

    next(){
      this.$refs.accountForm.validate(valid => {
        if(valid){
          console.log("pwd login successful")
          window.localStorage.setItem("user_phone",this.accountForm.user_phone)
          window.localStorage.setItem("note",this.accountForm.note)
          window.localStorage.setItem("user_pwd",this.accountForm.pass)
          this.$router.push("/build_basic_info")
        }
        else {
          this.$message({
            type: "error",
            message: "信息填写有误！",
            showClose: true
          });
        }
      });
    }
  },
  components:{
    RegistSteps
  },
  beforeRouteEnter(to,from,next){
    next(vm =>{
      if(from.name === 'JudgeBuildOrJoin'||from.name === 'BuildCompany'){
        vm.$store.dispatch('addKeepAlivePage','BuildAccount')
      }
    })
  }
}
</script>

<style scoped>
  .frame{
    box-shadow: 5px 5px 10px #888888;
    background-color: white;
    height: 550px;
    width: 500px;
    margin-top: 20px;
    border-radius: 10px;
  }

  .top{
    width: 100%;
    height: 50px;
  }

  .title{
    margin-left: 20px;
  }

  .line{
    box-shadow: 2px 2px 5px #888888;
    width: 100%;
    height: 2px;
    background-color: rgba(176,170,163,0.84);
  }
</style>