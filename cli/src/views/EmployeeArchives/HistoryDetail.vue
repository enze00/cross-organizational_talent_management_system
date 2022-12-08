<template>
  <div class="history_detail">
    <el-row type="flex" align="middle">
      <el-col :span="5" style="margin-top: 1%;margin-left: 1%">
        <el-page-header @back="goBack" content="过往工作经历">
          <div slot="title" style="color: #409EFF;font-weight: bolder">返回</div>
        </el-page-header>
      </el-col>
    </el-row>
    <el-scrollbar
        style="height: 680px;"
        wrap-style="overflow-x:hidden; overflow-y:show;"
    >
      <el-row>
        <el-col :span="5" style="margin-top: 2%">
          <div style="font-weight: bolder;text-shadow:3px 4px 4px #7ADFF2; margin-left: 55%">基本信息</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :offset="6" :span="10" style="margin-top: 1%">
          公司名称: {{company_title_search}}
        </el-col>
      </el-row>
      <el-row>
        <el-col :offset="6" :span="10" style="margin-top: 1%">
          身份: {{basicData.company_employee_role}}
        </el-col>
      </el-row>
      <el-row>
        <el-col :offset="6" :span="10" style="margin-top: 1%">
          职位: {{basicData.company_employee_position}}
        </el-col>
      </el-row>
      <el-row>
        <el-col :offset="6" :span="10" style="margin-top: 1%">
          工作时间: {{basicData.company_in_work_time}}~{{basicData.company_leave_time}}
        </el-col>
      </el-row>
      <el-row style="margin-top: 2%">
        <el-col :span="5" >
          <div style="font-weight: bolder;text-shadow:3px 4px 4px #7ADFF2; margin-left: 44%;margin-top: 2%">重大违纪记录</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :offset="5" :span="15" style="margin-top: 2%">
          <div v-if="disciplineData.length == 0" style="margin-left: 40%;color: #67C23A;font-weight: bolder;font-size: 18px">
            该用户无违纪记录~
          </div>
          <el-timeline>
            <el-timeline-item
                v-for="(item, index) in disciplineData"
                :key="index"
                :timestamp="item.employee_mistake_time"
                placement="top"
                color="#F56C6C"
            >
              <el-card>
                <h3>违纪内容: {{item.employee_mistake_content}}</h3>
                <p>处理结果: {{item.employee_mistake_result}}</p>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5" >
          <div style="font-weight: bolder;text-shadow:3px 4px 4px #7ADFF2; margin-left: 55%;margin-top: 2%">工作表现</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :offset="5" :span="15" style="margin-top: 2%">
          <el-timeline>
            <el-timeline-item
                v-for="(item, index) in historyEvaluationData"
                :key="index"
                :timestamp="item.evaluate_month"
                placement="top"
                color="#409EFF"
            >
              <el-card>
                <el-row>
                  <el-card style="width: 85%;margin-left: 8%">
                    <div slot="header" class="clearfix" style="font-weight: bolder;font-size: 16px">
                      核心能力
                    </div>
                    <el-row>
                      <el-col :span="10">
                        <p>团队领导能力合作性</p>
                      </el-col>
                      <el-col :span="12" :offset="2" style="margin-top: 4%">
                        <el-rate
                            v-model="item.core_lead"
                            disabled
                            show-score
                            text-color="#ff9900"
                        >
                        </el-rate>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="10">
                        <p>工作积极性</p>
                      </el-col>
                      <el-col :span="12" :offset="2" style="margin-top: 4%">
                        <el-rate
                            v-model="item.core_active"
                            disabled
                            show-score
                            text-color="#ff9900"
                        >
                        </el-rate>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="10">
                        <p>完成目标及绩效</p>
                      </el-col>
                      <el-col :span="12" :offset="2" style="margin-top: 4%">
                        <el-rate
                            v-model="item.core_result"
                            disabled
                            show-score
                            text-color="#ff9900"
                        >
                        </el-rate>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="10">
                        <p>数理逻辑及灵敏度</p>
                      </el-col>
                      <el-col :span="12" :offset="2" style="margin-top: 4%">
                        <el-rate
                            v-model="item.core_logic"
                            disabled
                            show-score
                            text-color="#ff9900"
                        >
                        </el-rate>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="10">
                        <p>诚信</p>
                      </el-col>
                      <el-col :span="12" :offset="2" style="margin-top: 4%">
                        <el-rate
                            v-model="item.core_honest"
                            disabled
                            show-score
                            text-color="#ff9900"
                        >
                        </el-rate>
                      </el-col>
                    </el-row>
                  </el-card>
                </el-row>
                <el-row style="margin-top: 3%">
                  <el-card style="width: 85%;margin-left: 8%">
                    <div slot="header" class="clearfix" style="font-weight: bolder;font-size: 16px">
                      技术性能力
                    </div>
                    <el-row>
                      <el-col :span="10">
                        <p>工作素质及精确度</p>
                      </el-col>
                      <el-col :span="12" :offset="2" style="margin-top: 4%">
                        <el-rate
                            v-model="item.skill_quality"
                            disabled
                            show-score
                            text-color="#ff9900"
                        >
                        </el-rate>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="10">
                        <p>工作效率</p>
                      </el-col>
                      <el-col :span="12" :offset="2" style="margin-top: 4%">
                        <el-rate
                            v-model="item.skill_efficient"
                            disabled
                            show-score
                            text-color="#ff9900"
                        >
                        </el-rate>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="10">
                        <p>出勤率</p>
                      </el-col>
                      <el-col :span="12" :offset="2" style="margin-top: 4%">
                        <el-rate
                            v-model="item.skill_work"
                            disabled
                            show-score
                            text-color="#ff9900"
                        >
                        </el-rate>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="10">
                        <p>学习能力与态度</p>
                      </el-col>
                      <el-col :span="12" :offset="2" style="margin-top: 4%">
                        <el-rate
                            v-model="item.skill_power"
                            disabled
                            show-score
                            text-color="#ff9900"
                        >
                        </el-rate>
                      </el-col>
                    </el-row>
                  </el-card>
                </el-row>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </el-col>
      </el-row>
    </el-scrollbar>
  </div>
</template>

<script>
  export default {
    name: "HistoryDetail",
    props: {
      company_id: {
        type: String,
        default: 'no data'
      },
      hr_phone: {
        type: String,
        default: 'no data'
      },
      company_title_search: {
        type: String,
        default: 'no data'
      },
      company_employee_phone: {
        type: String,
        default: 'no data'
      },
      company_enter_time: {
        type: String,
        default: 'no data'
      }
    },
    data(){
      return{
        from_page:'',
        core_lead: 4.2,
        disciplineData: [],
        historyEvaluationData: [
          {
            evaluate_month: '',
            skill_quality: 0,
            skill_efficient: 0,
            skill_work: 0,
            skill_power: 0,
            core_lead: 0,
            core_active: 0,
            core_result: 0,
            core_logic: 0,
            core_honest: 0
          }
        ],
        basicData: {}
      }
    },
    methods:{
      goBack() {
        const _this = this
        if (_this.from_page == 'ArchivesInfo'){
          _this.$router.push({
            path:'/archives_info',
            query: {
              company_id: _this.$store.state.company_id,
              hr_phone: _this.$store.state.user_phone,
              company_employee_phone: _this.company_employee_phone
            }
          })
        }else {
          _this.$router.push({
            path:'/talents_library',
            query: {
              company_id: _this.$store.state.company_id,
              hr_phone: _this.$store.state.user_phone,
              talent_phone: _this.company_employee_phone
            }
          })
        }

      }
    },
    created() {
      const _this =this
      _this.axios.get("https://easydoc.xyz/mock/sEWRf0fW/get_a_history_detail?company_id="+_this.$store.state.company_id+"&hr_phone="+_this.$store.state.user_phone+"&company_title="+_this.company_title_search+
          "&company_enter_time="+_this.company_enter_time+"&company_employee_phone="+_this.company_employee_phone)
          .then(function (res){
            //console.log(res);
            _this.disciplineData = res.data.disciplineData
            _this.historyEvaluationData = res.data.historyEvaluationData
            _this.basicData = res.data.basicData
          })
          .catch(function (err) {  //当请求出现错误时的回调函数
            console.log(err);
          });
    },
    beforeRouteEnter(to,from,next) {
      next(vm =>{
        if(from.name === 'ArchivesInfo'){
          vm.from_page = 'ArchivesInfo'
        }else {
          vm.from_page = 'TalentsLibrary'
        }
      })
    }
  }
</script>

<style scoped>
  
</style>