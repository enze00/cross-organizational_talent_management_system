<template>
  <div class="build_company">
    <RegistSteps :status="4"></RegistSteps>
    <el-row type="flex" justify="center">
      <el-col :span="9">
        <div class="frame">
          <el-row>
            <div class="top">
              <div class="title">
                <h2>创建公司</h2>
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
                :model="companyinfoForm"
                status-icon
                :rules="rules"
                ref="companyinfoForm"
                label-width="100px"
                label-position="right">
              <div style="margin-top: 35px; margin-left: 15px; width: 75%">
                <el-form-item label="公司简称" prop="company_title">
                  <el-input
                      v-model="companyinfoForm.company_title"
                      placeholder="建议使用企业的字号、商号、常用词"
                      ref="company_title"
                      clearable
                      autocomplete="off">
                  </el-input>
                </el-form-item>
              </div>
              <div style="margin-top: 30px; margin-left: 15px; width: 60%">
                <el-form-item label="所在行业" prop="company_pro">
                  <el-cascader
                      placeholder="您公司所在的行业"
                      v-model="companyinfoForm.company_pro"
                      :options="company_pro_options"
                      :show-all-levels="false"
                      :props="{ expandTrigger: 'hover' }">
                  </el-cascader>
                </el-form-item>
              </div>
              <div style="margin-top: 5px; margin-left: 15px; width: 60%">
                <el-form-item label="人员规模" prop="company_people_number">
                  <el-select v-model="companyinfoForm.company_people_number" placeholder="请选择">
                    <el-option
                        v-for="item in people_number_options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div style="margin-top: 30px; margin-left: 15px; width: 60%">
                <el-form-item label="公司地点" prop="company_place">
                  <el-cascader
                      v-model="companyinfoForm.company_place"
                      :options="city_options"
                      :props="{ expandTrigger: 'hover' }">
                  </el-cascader>
                </el-form-item>
              </div>
              <div style="margin-top: 30px; margin-left: 15px; width: 90%">
                <el-form-item label="请选择一项营业执照中的信息进行补充：" label-width="65%" size="mini">
                </el-form-item>
                <el-form-item prop="company_license_type" label-width="7%" size="small">
                  <el-radio-group v-model="companyinfoForm.company_license_type">
                    <el-radio label="统一社会信用代码">统一社会信用代码</el-radio>
                    <el-radio label="纳税人识别号">纳税人识别号</el-radio>
                    <el-radio label="工商注册号">工商注册号</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label-width="7%" prop="company_license_text">
                  <el-input
                      v-if="this.companyinfoForm.company_license_type === '统一社会信用代码'"
                      placeholder="请填写18位统一社会信用代码"
                      v-model="companyinfoForm.company_license_text"
                      maxlength="18"
                      show-word-limit>
                  </el-input>
                  <el-input
                      v-if="this.companyinfoForm.company_license_type === '纳税人识别号'"
                      placeholder="请填写18位纳税人识别号"
                      v-model="companyinfoForm.company_license_text"
                      maxlength="18"
                      show-word-limit>
                  </el-input>
                  <el-input
                      v-if="this.companyinfoForm.company_license_type === '工商注册号'"
                      placeholder="请填写15位工商注册号"
                      v-model="companyinfoForm.company_license_text"
                      maxlength="15"
                      show-word-limit>
                  </el-input>
                </el-form-item>
              </div>
              <div style="margin-top: 30px;margin-left: 40%">
                <el-form-item>
                  <el-button @click="back">返回</el-button>
                  <el-button type="primary" @click="submit">创建</el-button>
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
import city_options from "@/util/city";
import company_pro_options from "@/util/company_pro";
import {buildAccount,buildResume,buildUserInfo,buildCompany} from "@/util/axios_regist";
import axios from "axios";

export default {
      name: "BuildCompany",
      data(){
        return{
          companyinfoForm:{
            company_title:'',
            company_pro:'',
            company_people_number:'',
            company_place:[],
            company_license_type:'统一社会信用代码',
            company_license_text:''
          },
          company_pro_options,
          people_number_options:[
            {
              value:'20人以下',
              label:'20人以下'
            },
            {
              value:'20~50人',
              label:'20~50人'
            },
            {
              value:'50~100人',
              label:'50~100人'
            },
            {
              value:'100人以上',
              label:'100人以上'
            }
          ],
          city_options,
          rules: {//配合页面内的 prop 定义规则
            company_title: [{ required: true, message: "公司简称不能为空", trigger: "blur" }],
            company_pro: [{ required: true, message: "所在行业不能为空", trigger: "change" }],
            company_people_number: [{ required: true, message: "人员规模不能为空", trigger: "change" }],
            company_place: [{ required: true, message: "公司地点不能为空", trigger: "change" }],
            company_license_text: [{ required: true, message: "证明信息不能为空", trigger: "blur" }]
          }
        }
      },
      methods:{
        back(){
          this.$router.go("-1")
        },

        submit(){
          const _this = this
          this.$refs.companyinfoForm.validate(valid => {
            if(valid){
              window.localStorage.setItem("company_title",this. companyinfoForm.company_title)
              window.localStorage.setItem("company_pro",this.companyinfoForm.company_pro)
              window.localStorage.setItem("company_people_number",this.companyinfoForm.company_people_number)
              window.localStorage.setItem("company_place",this.companyinfoForm.company_place)
              window.localStorage.setItem("company_license_type",this.companyinfoForm.company_license_type)
              window.localStorage.setItem("company_license_text",this.companyinfoForm.company_license_text)
              if(_this.$store.state.regist.status === 'build'){
                _this.axios.all([buildAccount(),buildUserInfo(),buildResume(),buildCompany()])
                .then(_this.axios.spread((account,userinfo,resume,company)=>{
                  if(account.data.result=='success'){
                    _this.$message({
                      type: "success",
                      message: "公司创建成功！",
                      showClose: true
                    });
                    _this.$store.dispatch('changeKeepAlive','BuildAccount')
                    _this.$store.dispatch('changeKeepAlive','BuildBasicInfo')
                    _this.$store.dispatch('changeKeepAlive','BuildWorkExperience')
                    _this.$store.dispatch('changeKeepAlive','BuildEducationBackground')
                    _this.$store.dispatch('changeKeepAlive','BuildCompany')
                    setTimeout(function (){
                       _this.$router.push("/")
                    },3000)
                  }else{
                    _this.$message({
                      type: "error",
                      message: "短信验证码错误！",
                      showClose: true
                    });
                    setTimeout(function (){
                       _this.$router.push("/build_account")
                    },3000)
                  }
                }))
              }else if (_this.$store.state.regist.status === 'build_hasAccount'){
                _this.axios.all([buildCompany()])
                    .then(function (res) {
                      _this.$message({
                        type: "success",
                        message: "公司创建成功！",
                        showClose: true
                      });
                      _this.$store.dispatch('changeKeepAlive','BuildCompany')
                      setTimeout(function (){
                        _this.$router.push("/")
                      },3000)
                    })
              }
            }
            else {
              this.$message({
                type: "error",
                message: "信息填写有误！",
                showClose: true
              });
            }
          });
        },

      },
      beforeRouteEnter(to,from,next){
        next(vm =>{
          if(from.name === 'JudgeBuildOrJoin'||from.name === 'BuildEducationBackground'){
            vm.$store.dispatch('addKeepAlivePage','BuildCompany')
          }
        })
      },
      components:{
        RegistSteps
      }
    }
</script>

<style scoped>
.frame{
  box-shadow: 5px 5px 10px #888888;
  background-color: white;
  height: 620px;
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
