<template>
  <div class="build_education_background">
    <RegistSteps :status="3"></RegistSteps>
    <el-row type="flex" justify="center">
      <el-col :span="9">
        <div class="frame">
          <el-row>
            <div class="top">
              <div class="title">
                <h2>学历信息</h2>
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
                :model="edubackgroundForm"
                status-icon :rules="rules"
                ref="edubackgroundForm"
                label-width="100px"
                label-position="right">
              <div style="margin-top: 35px; margin-left: 15px; width: 80%">
                <el-form-item label="学信网验证码" prop="code">
                  <el-input
                      v-model="edubackgroundForm.code"
                      placeholder="在此输入学信网在线报告验证码"
                      ref="code"
                      clearable>
                    <el-button slot="append" icon="el-icon-search" @click="fillInfo"></el-button>
                  </el-input>
                </el-form-item>
              </div>
              <div style="margin-top: 30px; margin-left: 15px; width: 70%">
                <el-form-item label="学校名称" prop="resume_edu_schoolName">
                  <el-input
                      v-model="edubackgroundForm.resume_edu_schoolName"
                      placeholder="最高学历的校名"
                      ref="resume_edu_schoolName"
                      clearable
                      autocomplete="off"
                      disabled>
                  </el-input>
                </el-form-item>
              </div>
              <div style="margin-top: 30px; margin-left: 15px; width: 45%">
                <el-form-item label="学历" prop="resume_edu_qualification">
                  <el-input
                      v-model="edubackgroundForm.resume_edu_qualification"
                      placeholder="最高学历"
                      ref="resume_edu_qualification"
                      clearable
                      autocomplete="off"
                      disabled>
                  </el-input>
                </el-form-item>
              </div>
<!--              <div style="margin-top: 5px; margin-left: 15px; width: 80%">-->
<!--                <el-form-item  prop="resume_edu_isDay">-->
<!--                  <el-radio v-model="edubackgroundForm.resume_edu_isDay" label="全日制" border size="medium">全日制</el-radio>-->
<!--                  <el-radio v-model="edubackgroundForm.resume_edu_isDay" label="非全日制" border size="medium">非全日制</el-radio>-->
<!--                </el-form-item>-->
<!--              </div>-->
              <div style="margin-top: 5px; margin-left: 15px; width: 60%">
                <el-form-item label="就读专业" prop="resume_edu_specialty">
                  <el-input
                      v-model="edubackgroundForm.resume_edu_specialty"
                      placeholder="例如：计算机科学与技术"
                      ref="resume_edu_specialty"
                      clearable
                      autocomplete="off"
                      disabled>
                  </el-input>
                </el-form-item>
              </div>
              <div style="margin-top: 30px; margin-left: 15px; width: 80%">
                <el-form-item label="就读时间" prop="resume_edu_time">
                  <el-date-picker
                      v-model="edubackgroundForm.resume_edu_time"
                      type="daterange"
                      value-format="yyyy-MM-dd"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
                  </el-date-picker>
                </el-form-item>
              </div>
              <div style="margin-top: 30px; margin-left: 15px; width: 80%">
                <el-form-item label="资质证书" prop="resume_certificate_title">
                  <el-input
                      type="textarea"
                      :rows="2"
                      placeholder="可填写您获得的所有资质证书并以“#”相连，例如：英语六级#一级建造师#"
                      v-model="edubackgroundForm.resume_certificate_title">
                  </el-input>
                </el-form-item>
              </div>
              <div style="margin-top: 30px; margin-left: 15px; width: 80%">
                <el-form-item label="在校经历" prop="resume_edu_experience">
                  <el-input
                      type="textarea"
                      :rows="2"
                      placeholder="可填写在校期间学习到的主要技能及获得的荣誉"
                      v-model="edubackgroundForm.resume_edu_experience">
                  </el-input>
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
      name: "BuildEducationBackground",
      data(){
        return{
          edubackgroundForm:{
            resume_edu_schoolName:'',
            resume_edu_qualification:'',
            resume_edu_isDay:'',
            resume_edu_specialty:'',
            resume_edu_time:[],
            resume_certificate_title:'',
            resume_edu_experience:'',
            code: ''
          },
          // options:[
          //   {
          //     value:'小学',
          //     label:'小学'
          //   },
          //   {
          //     value:'初中',
          //     label:'初中'
          //   },
          //   {
          //     value:'中专/高中',
          //     label:'中专/高中'
          //   },
          //   {
          //     value:'专科',
          //     label:'专科'
          //   },
          //   {
          //     value:'本科',
          //     label:'本科'
          //   },
          //   {
          //     value:'硕士研究生',
          //     label:'硕士研究生'
          //   },
          //   {
          //     value:'博士研究生',
          //     label:'博士研究生'
          //   }
          // ],
          rules: {//配合页面内的 prop 定义规则
            resume_edu_schoolName: [{ required: true, message: "学校名称不能为空", trigger: "blur" }],
            resume_edu_specialty: [{ required: true, message: "就读专业不能为空", trigger: "blur" }],
            resume_edu_qualification: [{ required: true, message: "学历不能为空", trigger: "blur" }]
          },
        }
      },
      methods:{
        back(){
          this.$router.go("-1")
        },

        next(){
          const _this = this
          this.$refs.edubackgroundForm.validate(valid => {
            if(valid){
              window.localStorage.setItem("resume_edu_schoolName",this. edubackgroundForm.resume_edu_schoolName)
              window.localStorage.setItem("resume_edu_qualification",this.edubackgroundForm.resume_edu_qualification)
              window.localStorage.setItem("resume_edu_isDay",this.edubackgroundForm.resume_edu_isDay)
              window.localStorage.setItem("resume_edu_specialty",this.edubackgroundForm.resume_edu_specialty)
              window.localStorage.setItem("resume_edu_time",this.edubackgroundForm.resume_edu_time)
              window.localStorage.setItem("resume_certificate_title",this.edubackgroundForm.resume_certificate_title)
              window.localStorage.setItem("resume_edu_experience",this.edubackgroundForm.resume_edu_experience)
              if(_this.$store.state.regist.status === 'build'){
                _this.$router.push("/build_company")
              }else if(_this.$store.state.regist.status === 'join'){
                _this.$router.push("/join_company")
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

        fillInfo() {
          const _this = this
          if(this.edubackgroundForm.code.length == 16) {
            this.axios.post("https://bird.ioliu.cn/v1?url=https://api.jshdz.cn/xxwyz/",{code:this.edubackgroundForm.code})
                .then(function (res){
                   if(res.data.code == 0){
                     _this.$message({
                       type: "success",
                       message: "验证码输入正确！",
                       showClose: true
                     });
                     _this.edubackgroundForm.resume_edu_specialty = res.data.data.profession
                     _this.edubackgroundForm.resume_edu_qualification = res.data.data.level
                     _this.edubackgroundForm.resume_edu_schoolName = res.data.data.university
                     _this.edubackgroundForm.resume_edu_isDay = res.data.data.form
                   }else {
                     _this.$message({
                       type: "error",
                       message: "验证码输入错误！",
                       showClose: true
                     });
                   }
                })
                .catch(function (err) {  //当请求出现错误时的回调函数
                  console.log(err);
                });
          }else {
            _this.$message({
              type: "error",
              message: "验证码输入错误！",
              showClose: true
            });
          }
        },
      },

      beforeRouteEnter(to,from,next){
        next(vm =>{
          if(from.name === 'BuildWorkExperience'){
            vm.$store.dispatch('addKeepAlivePage','BuildEducationBackground')
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
  height: 670px;
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