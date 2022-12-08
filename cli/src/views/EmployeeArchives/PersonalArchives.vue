<template>
  <div class="personal_archives">
    <el-row type="flex" align="middle">
      <el-col :span="5" style="margin-top: 1%;margin-left: 1%">
        <el-page-header @back="$router.go(-1)" content="个人档案">
          <div slot="title" style="color: #409EFF;font-weight: bolder">返回</div>
        </el-page-header>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-card style="width: 50%">
        <div slot="header" class="clearfix">
           <div style="text-align: center;">
             <span>{{person_archives.pageNum==0?'基本信息':person_archives.pageNum==1?'最近一份工作/实习经历':'学历信息'}}</span>
           </div>
        </div>
        <el-scrollbar
            style="height: 500px;"
            wrap-style="overflow-x:hidden;overflow-y:show;"
        >
          <transition name="el-fade-in-linear">
            <el-row v-show="person_archives.pageNum == 0">
              <el-col :span="4" :offset="1" style="margin-top: 2%">
                <div style="font-weight: bolder;text-shadow:3px 4px 4px #7ADFF2;">姓名：</div>
              </el-col>
              <el-col :span="4"  style="margin-top: 2%">
                {{talent_name}}
              </el-col>
            </el-row>
          </transition>
          <transition name="el-fade-in-linear">
            <el-row v-show="person_archives.pageNum == 0">
              <el-col :span="4" :offset="1" style="margin-top: 4%">
                <div style="font-weight: bolder;text-shadow:3px 4px 4px #7ADFF2;">手机号：</div>
              </el-col>
              <el-col :span="4"  style="margin-top: 4%">
                {{person_archives.personBasicData.user_phone}}
              </el-col>
            </el-row>
          </transition>
          <transition name="el-fade-in-linear">
            <el-row v-show="person_archives.pageNum == 0">
              <el-col :span="4" :offset="1" style="margin-top: 4%">
                <div style="font-weight: bolder;text-shadow:3px 4px 4px #7ADFF2;">性别：</div>
              </el-col>
              <el-col :span="4"  style="margin-top: 4%">
                {{person_archives.personBasicData.user_sex}}
              </el-col>
            </el-row>
          </transition>
          <transition name="el-fade-in-linear">
            <el-row v-show="person_archives.pageNum == 0">
              <el-col :span="4" :offset="1" style="margin-top: 4%">
                <div style="font-weight: bolder;text-shadow:3px 4px 4px #7ADFF2;">出生年月：</div>
              </el-col>
              <el-col :span="6"  style="margin-top: 4%">
                {{person_archives.personBasicData.user_birth}}
              </el-col>
            </el-row>
          </transition>
          <transition name="el-fade-in-linear">
            <el-row v-show="person_archives.pageNum == 0">
              <el-col :span="4" :offset="1" style="margin-top: 4%">
                <div style="font-weight: bolder;text-shadow:3px 4px 4px #7ADFF2;">结婚状况：</div>
              </el-col>
              <el-col :span="4"  style="margin-top: 4%">
                {{person_archives.personBasicData.user_marry_status}}
              </el-col>
            </el-row>
          </transition>
          <transition name="el-fade-in-linear">
            <el-row v-show="person_archives.pageNum == 0">
              <el-col :span="4" :offset="1" style="margin-top: 4%">
                <div style="font-weight: bolder;text-shadow:3px 4px 4px #7ADFF2;">工作时间：</div>
              </el-col>
              <el-col :span="4"  style="margin-top: 4%">
                {{person_archives.personBasicData.user_work_time}}年
              </el-col>
            </el-row>
          </transition>
          <transition name="el-fade-in-linear">
            <el-divider v-if="person_archives.pageNum == 0">个性图</el-divider>
          </transition>
          <transition name="el-fade-in-linear">
            <el-row v-show="person_archives.pageNum == 0">
              <div ref="charts" style="width:100%;height:360px;margin-left: 4%;"></div>
            </el-row>
          </transition>
          <transition name="el-fade-in-linear">
            <el-row v-show="person_archives.pageNum == 1">
              <el-col :span="4" :offset="1" style="margin-top: 2%">
                <div style="font-weight: bolder;text-shadow:3px 4px 4px #7ADFF2;">公司名称：</div>
              </el-col>
              <el-col :span="4"  style="margin-top: 2%">
                {{person_archives.personWorkExperienceData.resume_work_company_name}}
              </el-col>
            </el-row>
          </transition>
          <transition name="el-fade-in-linear">
            <el-row v-show="person_archives.pageNum == 1">
              <el-col :span="4" :offset="1" style="margin-top: 6%">
                <div style="font-weight: bolder;text-shadow:3px 4px 4px #7ADFF2;">所在行业：</div>
              </el-col>
              <el-col :span="4"  style="margin-top: 6%">
                {{person_archives.personWorkExperienceData.resume_work_pro}}
              </el-col>
            </el-row>
          </transition>
          <transition name="el-fade-in-linear">
            <el-row v-show="person_archives.pageNum == 1">
              <el-col :span="4" :offset="1" style="margin-top: 6%">
                <div style="font-weight: bolder;text-shadow:3px 4px 4px #7ADFF2;">就职岗位：</div>
              </el-col>
              <el-col :span="4"  style="margin-top: 6%">
                {{person_archives.personWorkExperienceData.resume_work_job_name}}
              </el-col>
            </el-row>
          </transition>
          <transition name="el-fade-in-linear">
            <el-row v-show="person_archives.pageNum == 1">
              <el-col :span="4" :offset="1" style="margin-top: 6%">
                <div style="font-weight: bolder;text-shadow:3px 4px 4px #7ADFF2;">就职身份：</div>
              </el-col>
              <el-col :span="4"  style="margin-top: 6%">
                {{person_archives.personWorkExperienceData.resume_work_job_rank}}
              </el-col>
            </el-row>
          </transition>
          <transition name="el-fade-in-linear">
            <el-row v-show="person_archives.pageNum == 1">
              <el-col :span="4" :offset="1" style="margin-top: 6%">
                <div style="font-weight: bolder;text-shadow:3px 4px 4px #7ADFF2;">在职时间：</div>
              </el-col>
              <el-col :span="10"  style="margin-top: 6%">
                {{person_archives.personWorkExperienceData.resume_work_begin_time}} ~ {{person_archives.personWorkExperienceData.resume_work_end_time}}
              </el-col>
            </el-row>
          </transition>
          <transition name="el-fade-in-linear">
            <el-row v-show="person_archives.pageNum == 1">
              <el-col :span="4" :offset="1" style="margin-top: 6%">
                <div style="font-weight: bolder;text-shadow:3px 4px 4px #7ADFF2;">工作内容：</div>
              </el-col>
              <el-col :span="10"  style="margin-top: 6%">
                {{person_archives.personWorkExperienceData.resume_work_msg}}
              </el-col>
            </el-row>
          </transition>
          <transition name="el-fade-in-linear">
            <el-row v-show="person_archives.pageNum == 1">
              <el-col :span="4" :offset="1" style="margin-top: 6%">
                <div style="font-weight: bolder;text-shadow:3px 4px 4px #7ADFF2;">拥有技能：</div>
              </el-col>
              <el-col :span="19"  style="margin-top: 6%">
                <el-tag
                    v-for="(item,index) in person_archives.personWorkExperienceData.resume_work_skill"
                    type="success"
                    :key="index"
                    style="margin: 3px"
                >
                  {{item}}
                </el-tag>
              </el-col>
            </el-row>
          </transition>
          <transition name="el-fade-in-linear">
            <el-row v-show="person_archives.pageNum == 1">
              <el-col :span="4" :offset="1" style="margin-top: 6%">
                <div style="font-weight: bolder;text-shadow:3px 4px 4px #7ADFF2;">资格证书：</div>
              </el-col>
              <el-col :span="19"  style="margin-top: 6%">
                <el-tag
                    v-for="(item,index) in person_archives.personWorkExperienceData.resume_certificate_title"
                    :key="index"
                    style="margin: 3px"
                >
                  {{item}}
                </el-tag>
              </el-col>
            </el-row>
          </transition>
          <transition name="el-fade-in-linear">
            <el-row v-show="person_archives.pageNum == 2">
              <el-col :span="4" :offset="1" style="margin-top: 2%">
                <div style="font-weight: bolder;text-shadow:3px 4px 4px #7ADFF2;">学历层次：</div>
              </el-col>
              <el-col :span="4" style="margin-top: 2%">
                {{person_archives.personEduData.resume_edu_qualification}}
              </el-col>
              <el-col :span="2" style="margin-top: 2%">
                <el-tag size="small" :type="person_archives.personEduData.resume_edu_isDay==0?'danger':''">{{person_archives.personEduData.resume_edu_isDay==0?'非全日制':'全日制'}}</el-tag>
              </el-col>
            </el-row>
          </transition>
          <transition name="el-fade-in-linear">
            <el-row v-show="person_archives.pageNum == 2">
              <el-col :span="4" :offset="1" style="margin-top: 8%">
                <div style="font-weight: bolder;text-shadow:3px 4px 4px #7ADFF2;">学校名称：</div>
              </el-col>
              <el-col :span="10"  style="margin-top: 8%">
                {{person_archives.personEduData.resume_edu_schoolName}}
              </el-col>
            </el-row>
          </transition>
          <transition name="el-fade-in-linear">
            <el-row v-show="person_archives.pageNum == 2">
              <el-col :span="4" :offset="1" style="margin-top: 8%">
                <div style="font-weight: bolder;text-shadow:3px 4px 4px #7ADFF2;">专业：</div>
              </el-col>
              <el-col :span="10"  style="margin-top: 8%">
                {{person_archives.personEduData.resume_edu_specialty}}
              </el-col>
            </el-row>
          </transition>
          <transition name="el-fade-in-linear">
            <el-row v-show="person_archives.pageNum == 2">
              <el-col :span="4" :offset="1" style="margin-top: 8%">
                <div style="font-weight: bolder;text-shadow:3px 4px 4px #7ADFF2;">就读时间：</div>
              </el-col>
              <el-col :span="10"  style="margin-top: 8%">
                {{person_archives.personEduData.resume_edu_begin_time}} ~ {{person_archives.personEduData.resume_edu_end_time}}
              </el-col>
            </el-row>
          </transition>
          <transition name="el-fade-in-linear">
            <el-row v-show="person_archives.pageNum == 2">
              <el-col :span="4" :offset="1" style="margin-top: 8%">
                <div style="font-weight: bolder;text-shadow:3px 4px 4px #7ADFF2;">在校经历：</div>
              </el-col>
              <el-col :span="12"  style="margin-top: 8%">
                {{person_archives.personEduData.resume_edu_experience}}
              </el-col>
            </el-row>
          </transition>
        </el-scrollbar>
        <el-col :span="10" :offset="15" style="padding: 10px">
          <el-button @click="person_archives.pageNum-=1" :disabled="person_archives.pageNum == 0" >上一页</el-button>
          <el-button type="primary" @click="person_archives.pageNum+=1" :disabled="person_archives.pageNum == 2">下一页</el-button>
        </el-col>
      </el-card>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "PersonalArchives",
  props: {
    company_id: {
      type: String,
      default: 'no data'
    },
    hr_phone: {
      type: String,
      default: 'no data'
    },
    talent_name: {
      type: String,
      default: 'no data'
    },
    talent_phone: {
      type: String,
      default: 'no data'
    }
  },
  data() {
    return {
      indicatorData:[],
      seriesData:[],
      person_archives: {
        pageNum: 0,
        personBasicData: {

        },
        personWorkExperienceData: {

        },
        personEduData: {

        }
      }
    }
  },
  methods: {
    personAbilityECharts(){
      //console.log(this.seriesData)
      const _this = this
      // 基于准备好的dom，初始化echarts实例
      let personAbilityECharts = this.$echarts.init(_this.$refs.charts,"westeros");
      const option = {
        tooltip: {},
        radar: {
          // shape: 'circle',
          name: {
            textStyle: {
              color: '#fff',
              backgroundColor: '#999',
              borderRadius: 3,
              padding: [3, 5]
            }
          },
          center: ['45%', '53%'],
          indicator: _this.indicatorData
        },
        series: [{
          type: 'radar',
          areaStyle: {},
          // areaStyle: {normal: {}},
          data: _this.seriesData
        }]
      };
      personAbilityECharts.setOption(option);
    },

    loadPersonAbility(){
      const _this =this
      _this.axios.get("https://easydoc.xyz/mock/sEWRf0fW/get_a_person_ability_info?company_id="+_this.$store.state.company_id+"&user_phone="+_this.$store.state.user_phone +"&talent_phone="+_this.talent_phone+"&talent_name="+_this.talent_name)
          .then(function (res) {
            _this.indicatorData = res.data.indicatorData
            _this.seriesData = res.data.seriesData
          })
          .catch(function (err) {  //当请求出现错误时的回调函数
            console.log(err);
          });
      setTimeout(function (){
        _this.personAbilityECharts()
      },500)
    },

    loadPersonArchives(){
      const _this =this
      _this.axios.get("https://easydoc.xyz/mock/sEWRf0fW/get_a_person_archives?company_id="+_this.$store.state.company_id+"&user_phone="+_this.$store.state.user_phone +"&talent_phone="+_this.$route.query.talent_phone+"&talent_name="+_this.$route.query.talent_name)
          .then(function (res) {
            //console.log(_this.$route.query.talent_phone)
            _this.person_archives.personBasicData = res.data.personBasicData
            _this.person_archives.personWorkExperienceData = res.data.personWorkExperienceData
            _this.person_archives.personEduData = res.data.personEduData
          })
          .catch(function (err) {  //当请求出现错误时的回调函数
            console.log(err);
          });
    },
  },
  mounted() {

  },
  created() {
    this.loadPersonArchives()
    this.loadPersonAbility()
  }
}
</script>

<style scoped>

</style>