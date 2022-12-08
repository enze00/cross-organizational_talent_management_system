<template>
  <div class="build_work_experience">
    <RegistSteps :status="2"></RegistSteps>
    <el-row type="flex" justify="center">
      <el-col :span="9">
        <div class="frame">
          <el-row>
            <div class="top">
              <div class="title">
                <h2>最近一份工作经历</h2>
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
                :model="experienceForm"
                status-icon :rules="rules"
                ref="experienceForm"
                label-width="100px"
                label-position="right">
              <div style="margin-top: 40px; margin-left: 15px; width: 60%">
                <el-form-item label="公司全称" prop="resume_work_company_name">
                  <el-input
                      v-model="experienceForm.resume_work_company_name"
                      placeholder="最近一份工作的公司全称"
                      ref="resume_work_company_name"
                      clearable
                      autocomplete="off">
                  </el-input>
                </el-form-item>
              </div>
              <div style="margin-top: 35px; margin-left: 15px; width: 60%">
                <el-form-item label="所在行业" prop="resume_work_pro">
                  <el-cascader
                      v-model="experienceForm.resume_work_pro"
                      :options="company_pro_options"
                      :show-all-levels="false"
                      :props="{ expandTrigger: 'hover' }">
                  </el-cascader>
                </el-form-item>
              </div>
              <div style="margin-top: 35px; margin-left: 15px; width: 60%">
                <el-form-item label="所任职位" prop="resume_work_job_name">
                  <el-cascader
                      v-model="experienceForm.resume_work_job_name"
                      :options="job_name_options"
                      :show-all-levels="false"
                      :props="{ expandTrigger: 'hover' }">
                  </el-cascader>
                </el-form-item>
              </div>
              <div style="margin-top: 35px; margin-left: 15px; width: 80%">
                <el-form-item label="在职时间" prop="resume_work_time">
                  <el-date-picker
                      v-model="experienceForm.resume_work_time"
                      type="daterange"
                      value-format="yyyy-MM-dd"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
                  </el-date-picker>
                </el-form-item>
              </div>
              <div style="margin-top: 35px; margin-left: 15px; width: 80%">
                <el-form-item label="需要的技能" prop="resume_work_skill">
                  <el-input
                      v-model="experienceForm.resume_work_skill"
                      placeholder="请输入该份工作需要的技能"
                      ref="resume_work_skill"
                      clearable
                      autocomplete="off">
                  </el-input>
                </el-form-item>
              </div>
              <div style="margin-top: 35px; margin-left: 15px; width: 80%">
                <el-form-item label="工作内容" prop="resume_work_msg">
                  <el-input
                      type="textarea"
                      :rows="3"
                      placeholder="您的工作内容例如：1.负责新员工入职培训2.分析制定计划等..."
                      v-model="experienceForm.resume_work_msg">
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
  import company_pro_options from "@/util/company_pro";
  import job_name_options from "@/util/job_name";
    export default {
      name: "BuildWorkExperience",
      data(){
        return{
          experienceForm:{
            resume_work_company_name:'',
            resume_work_pro:'',
            resume_work_job_name:'',
            resume_work_time:[],
            resume_work_skill:'',
            resume_work_msg:''
          },
          company_pro_options,
          job_name_options,
          rules: {//配合页面内的 prop 定义规则
            resume_work_company_name: [{ required: true, message: "公司全称不能为空", trigger: "blur" }],
            resume_work_pro: [{ required: true, message: "公司所在行业不能为空", trigger: "change" }],
            resume_work_job_name: [{ required: true, message: "所任职位不能为空", trigger: "change" }],
            resume_work_time: [{ required: true, message: "在职时间不能为空", trigger: "blur" }]
          },
        }
      },
      methods:{
        back(){
          this.$router.go("-1")
        },

        next(){
          const _this = this
          this.$refs.experienceForm.validate(valid => {
            if(valid){
              window.localStorage.setItem("resume_work_company_name",this. experienceForm.resume_work_company_name)
              window.localStorage.setItem("resume_work_pro",this.experienceForm.resume_work_pro)
              window.localStorage.setItem("resume_work_job_name",this.experienceForm.resume_work_job_name)
              window.localStorage.setItem("resume_work_time",this.experienceForm.resume_work_time)
              window.localStorage.setItem("resume_work_skill",this.experienceForm.resume_work_skill)
              window.localStorage.setItem("resume_work_msg",this.experienceForm.resume_work_msg)
              this.$router.push("/build_education_background")
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
      beforeRouteEnter(to,from,next){
        next(vm =>{
          if(from.name === 'BuildBasicInfo'){
            vm.$store.dispatch('addKeepAlivePage','BuildWorkExperience')
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

/**
 *@Description
 *@Author:En_Ze
 *@Date:2021/2/1 14:02
*/ 