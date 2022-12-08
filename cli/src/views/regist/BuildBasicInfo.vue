<template>
  <div class="build_basic_info">
    <RegistSteps :status="1"></RegistSteps>
    <el-row type="flex" justify="center">
      <el-col :span="9">
        <div class="frame">
          <el-row>
            <div class="top">
              <div class="title">
                <h2>基本信息</h2>
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
                :model="basicinfoForm"
                status-icon :rules="rules"
                ref="basicinfoForm"
                label-width="100px"
                label-position="right">
              <div style="margin-top: 50px; margin-left: 15px; width: 60%">
                <el-form-item label="姓名" prop="user_name">
                  <el-input
                      v-model="basicinfoForm.user_name"
                      placeholder="请输入您的姓名"
                      ref="userName"
                      clearable
                      autocomplete="off">
                  </el-input>
                </el-form-item>
              </div>
              <div style="margin-top: 40px; margin-left: 15px; width: 80%">
                <el-form-item label="性别" prop="user_sex">
                  <el-radio-group v-model="basicinfoForm.user_sex">
                    <el-radio label="男">男</el-radio>
                    <el-radio label="女">女</el-radio>
                  </el-radio-group>
                </el-form-item>
              </div>
              <div style="margin-top: 40px; margin-left: 15px; width: 80%">
                <el-form-item label="身份证号" prop="user_card_id">
                  <el-input
                      v-model="basicinfoForm.user_card_id"
                      placeholder="请输入您的身份证号"
                      autocomplete="off"
                      maxlength="18"
                      show-word-limit>
                  </el-input>
                </el-form-item>
              </div>
              <div style="margin-top: 40px; margin-left: 15px; width: 40%">
                <el-form-item label="婚姻状况" prop="user_marry_status">
                  <el-select v-model="basicinfoForm.user_marry_status" placeholder="请选择您的婚姻状况">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div style="margin-top: 40px; margin-left: 15px; width: 40%">
                <el-form-item label="出生日期" prop="user_birth">
                  <el-date-picker
                      v-model="basicinfoForm.user_birth"
                      type="date"
                      format="yyyy 年 MM 月 dd 日"
                      value-format="yyyy-MM-dd"
                      placeholder="选择您的出生日期">
                  </el-date-picker>
                </el-form-item>
              </div>
              <div style="margin-top: 40px; margin-left: 15px; width: 40%">
                <el-form-item label="工作日期" prop="user_work_time">
                  <el-date-picker
                      v-model="basicinfoForm.user_work_time"
                      type="date"
                      format="yyyy 年 MM 月 dd 日"
                      value-format="yyyy-MM-dd"
                      placeholder="选择您开始工作时的日期">
                  </el-date-picker>
                </el-form-item>
              </div>
              <div style="margin-top: 20px;margin-left: 40%">
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
      name: "BuildBasicInfo",
      data(){
        let validateUserCardId = (rule, value, callback) => {
          const len = value.length;
          if (value == '') {
            callback(new Error('请输入身份证号'));
          } else {
              if (len == 15) {
                  if (/^(\d{6})()?(\d{2})(\d{2})(\d{2})(\d{3})$/.test(value)) {
                    callback();
                  } else {
                    callback(new Error('请正确输入身份证号'));
                  }
              } else if (len == 18) {
                if (/^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(value)) {
                  callback();
                } else {
                  callback(new Error('请正确输入身份证号'));
                }
              } else {
                callback(new Error('请正确输入身份证号'));
              }
          }
        }
        return{
          basicinfoForm:{
            user_name:'',
            user_sex:'男',
            user_card_id:'',
            user_marry_status:'未婚',
            user_birth:'',
            user_work_time:''
          },
          options:[
            {
              value:'未婚',
              label:'未婚'
            },
            {
              value:'已婚',
              label:'已婚'
            },
            {
              value:'离异',
              label:'离异'
            }
          ],
          rules: {//配合页面内的 prop 定义规则
            user_name: [{ required: true, message: "姓名不能为空", trigger: "blur" }],
            user_card_id: [{ validator: validateUserCardId,required: true, trigger: 'blur'}],
            user_birth: [{ required: true, message: "出生日期不能为空", trigger: "blur" }],
            user_work_time: [{ required: true, message: "工作日期不能为空", trigger: "blur" }]
          },
        }
      },
      methods:{
        back(){
          this.$router.go("-1")
        },

        next(){
          this.$refs.basicinfoForm.validate(valid => {
            if(valid){
              window.localStorage.setItem("user_name",this.basicinfoForm.user_name)
              window.localStorage.setItem("user_sex",this.basicinfoForm.user_sex)
              window.localStorage.setItem("user_marry_status",this.basicinfoForm.user_marry_status)
              window.localStorage.setItem("user_card_id",this.basicinfoForm.user_card_id)
              window.localStorage.setItem("user_birth",this.basicinfoForm.user_birth)
              window.localStorage.setItem("user_work_time",this.basicinfoForm.user_work_time)
              this.$router.push("/build_work_experience")
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
          if(from.name === 'BuildAccount'){
            vm.$store.dispatch('addKeepAlivePage','BuildBasicInfo')
          }
        })
      }
    }
</script>

<style scoped>
.frame{
  box-shadow: 5px 5px 10px #888888;
  background-color: white;
  height: 650px;
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