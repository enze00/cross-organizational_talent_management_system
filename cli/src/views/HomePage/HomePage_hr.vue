<template>
  <div class="homePage_hr">
    <el-row>
      <div class="top">
        <el-row>
          <el-col :span="4">
            <div style="font-weight: 550; margin-top: 10px; margin-left: 9%">
              员工概况(分管部门)
            </div>
          </el-col>
          <el-col :span="3">
            <div style="margin-top: 14px;font-size: 12px; font-weight: bold; color: #d3d3d3">
              {{"本月("+ dateRange +")"}}
            </div>
          </el-col>
        </el-row>
        <el-row type="flex" style="text-align: center">
          <el-col :span="2" :offset="1" style="margin-top: 9px">
            在职
          </el-col>
          <el-col :span="2" style="margin-top: 9px">
            离职
          </el-col>
          <el-col :span="2" style="margin-top: 9px">
            入职
          </el-col>
          <el-col :span="2" style="font-size: 28px; color: #d3d3d3; margin-top: 3px">
            |
          </el-col>
          <el-col :span="2" style="margin-top: 9px">
            转正
          </el-col>
          <el-col :span="2" style="margin-top: 9px">
            待入职
          </el-col>
          <el-col :span="2" style="font-size: 28px; color: #d3d3d3; margin-top: 3px;margin-left: 2%">
            |
          </el-col>
          <el-col :span="2" style="margin-top: 9px">
            未互评
          </el-col>
          <el-col :span="2" style="margin-top: 9px">
            已互评
          </el-col>
        </el-row>
        <el-row type="flex" style="text-align: center; font-weight: bold">
          <el-col :span="2" :offset="1">
            {{ generalSituation.on_the_job }}
          </el-col>
          <el-col :span="2">
            {{ generalSituation.departure }}
          </el-col>
          <el-col :span="2">
            {{ generalSituation.induction }}
          </el-col>

          <el-col :span="2" :offset="2">
            {{ generalSituation.become_regular }}
          </el-col>
          <el-col :span="2">
            {{ generalSituation.to_be_hired }}
          </el-col>
          <el-col :span="2" style="margin-left: 2%">

          </el-col>
          <el-col :span="2">
            {{ generalSituation.without_mutual }}
          </el-col>
          <el-col :span="2">
            {{ generalSituation.have_mutual }}
          </el-col>
        </el-row>
      </div>
    </el-row>
    <el-row>
      <el-col :span="15">
        <el-row>
          <div class="left-top">
            <el-col :span="12">
              <div class="calendar">
                  <el-calendar v-model="dateValue" id="calendar">
                    <template
                        slot="dateCell"
                        slot-scope="{date, data}" >
                      <!--自定义内容-->
                      <div slot="reference" class="div-Calendar" @click="calendarOnClick(data)">
                        <div class="calendar-day">{{ data.day.split('-').slice(2).join('-') }}</div>
                        <div v-for="item in calendarData">
                          <div v-if="(item.year).indexOf(data.day.split('-').slice(0,1))!==-1">
                            <div v-if="(item.months).indexOf(data.day.split('-').slice(1,2))!==-1">
                              <div v-if="(item.days).indexOf(data.day.split('-').slice(2).join('-'))!==-1" >
                                <div v-if="item.content=='备忘录'" class="blue budge"></div>
                                <div v-if="item.content=='招聘'" class="green budge"></div>
                              </div>
                              <div v-else></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </template>
                  </el-calendar>
                </div>
            </el-col>
            <el-col :span="12">
              <el-row>
                <div class="memo">
                  <el-row>
                    <el-col :span="4">
                      <div style="width: 100%;margin-top: 10%;margin-left: 15%;margin-bottom: 6%;font-weight: bold">
                        <span>备忘录</span>
                      </div>
                    </el-col>
                    <el-col :span="3" :offset="17">
                      <div style="width: 100%;margin-top: 14%;margin-left: 32%;font-size: 16px;color: #3a8ee6;font-weight: bolder"
                           @click="dialogFormVisible = true">
                        <i class="el-icon-plus"></i>
                      </div>
                      <el-dialog title="新建备忘" :visible.sync="dialogFormVisible" width="30%">
<!--                        <el-form :model="form">-->
<!--                          <el-form-item label="活动名称" :label-width="formLabelWidth">-->
                            <el-input
                                type="textarea"
                                :autosize="{ minRows: 2, maxRows: 4}"
                                placeholder="请输入备忘内容"
                                v-model="inputMemo">
                            </el-input>
<!--                          </el-form-item>-->
<!--                        </el-form>-->
                        <div slot="footer" class="dialog-footer">
                          <el-button @click="dialogFormVisible = false">取 消</el-button>
                          <el-button type="primary" @click="buildANewMemo">确 定</el-button>
                        </div>
                      </el-dialog>
                    </el-col>
                  </el-row>
                  <div v-if="memoData == ''" style="margin-top: 6%;margin-left: 38%;font-size: 12px;font-weight: bold; color: #d3d3d3">
                    今日暂无备忘
                  </div>
                  <div v-else v-for="(item,i) in memoData">
                    <el-row>
                      <el-col :span="3">
                        <div style="width: 100%;margin-left: 50%">
                          {{ i+1 +"."}}
                        </div>
                      </el-col>
                      <el-col :span="12">
                        <div style="width: 100%;margin-left: 15%">
                          {{ item.content.substr(0,10) }}{{item.content.length>10?"...":""}}
                        </div>
                      </el-col>
                      <el-col :span="2" :offset="4">
                        <div style="width: 100%;margin-left: 15%;font-size: 12px;margin-top: 6%;color: #42b983" @click="showMemoDetail(item)">
                          <i class="el-icon-search"></i>
                        </div>
                      </el-col>
                      <el-col :span="3">
                        <div style="width: 100%;margin-left: 15%;font-size: 12px;margin-top: 6%;color: red" @click="deleteAMemo(item)">
                          <i class="el-icon-delete"></i>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </el-row>
              <el-row>
                <div class="recruitment">
                  <el-row>
                    <el-col :span="4">
                      <div style="width: 100%;margin-top: 10%;margin-left: 15%;margin-bottom: 6%;font-weight: bold">
                        <span>招聘</span>
                      </div>
                    </el-col>
                  </el-row>
                  <div v-if="recruitmentData == ''" style="margin-top: 6%;margin-left: 35%;font-size: 12px;font-weight: bold; color: #d3d3d3">
                    今日暂无面试安排
                  </div>
                  <div v-else v-for="(item,i) in recruitmentData">
                    <el-row>
                      <el-col :span="3">
                        <div style="width: 100%;margin-left: 50%">
                          {{ i+1 +"."}}
                        </div>
                      </el-col>
                      <el-col :span="4">
                        <div style="width: 100%;margin-left: 15%">
                          {{ item.interview_talent_name}}
                        </div>
                      </el-col>
                      <el-col :span="11">
                        <div style="width: 100%;margin-left: 15%">
                          {{ item.talent_recommend_department}}-{{ item.talent_recommend_job}}
                        </div>
                      </el-col>
                      <el-col :span="2" :offset="2">
                        <div style="width: 100%;margin-left: 15%;font-size: 12px;margin-top: 6%;color: #42b983" @click="xxxxxxxxxxxx(item)">
                          <i class="el-icon-s-promotion"></i>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </el-row>
            </el-col>
          </div>
        </el-row>
        <el-row>
          <div class="left-bottom">
            <el-row>
              <div style="font-weight: 550; margin-top: 10px; margin-left: 2%">
                快捷入口
              </div>
            </el-row>
            <el-row type="flex" justify="space-around" style="margin-top: 2%">
              <el-col :span="3">
                <el-button type="primary" @click="$router.push('/account_add')">添加员工</el-button>
              </el-col>
              <el-col :span="3">
                <el-button type="primary">工资计算</el-button>
              </el-col>
              <el-col :span="3">
                <el-button type="primary" @click="$router.push('/tax_calculation')">五险一金</el-button>
              </el-col>
              <el-col :span="3">
                <el-button type="primary">员工成本</el-button>
              </el-col>
              <el-col :span="3">
                <el-button type="primary" @click="$router.push('/record_discipline')">重大违纪</el-button>
              </el-col>
            </el-row>
          </div>
        </el-row>
      </el-col>
      <el-col :span="9" >
        <el-row>
          <div class="right-top">
            <el-row>
              <el-badge
                  :value="unevaluatedNumber"
                  :max="50"
                  :hidden="unevaluatedNumber == 0 ? true : false"
                  style="margin-left: 3%;margin-top: 2%">
                <div style="font-weight: 550; margin-bottom: 3%">
                  本月未完成的评价
                </div>
              </el-badge>
            </el-row>
            <div v-if="recruitmentData == ''" style="margin-top: 15%;margin-left: 32%;font-size: 16px;font-weight: bold; color: #d3d3d3">
              本月评价已全部完成~~！
            </div>
            <div v-else v-for="(item,i) in evaluateSituation" style="margin-top: 2%">
              <el-row>
                <el-col :span="3">
                  <div style="width: 100%;margin-left: 50%">
                    {{ i+1 +"."}}
                  </div>
                </el-col>
                <el-col :span="4">
                  <div style="width: 100%;margin-left: 15%">
                    {{ item.company_employee_name}}
                  </div>
                </el-col>
                <el-col :span="10">
                  <div style="width: 100%;margin-left: 15%">
                    {{ item.company_apart_name}}-{{ item.company_employee_position}}
                  </div>
                </el-col>
                <el-col :span="2" :offset="1">
                  <el-button
                      type="primary"
                      plain
                      size="small"
                      @click="$router.push('/evaluation_info')"
                  >
                    去评价
                  </el-button>
                </el-col>
              </el-row>
            </div>
            <div v-if="unevaluatedNumber > 5" style="position:absolute; bottom:5%; margin-left: 5%;font-size: 12px;font-weight: bold; color: #409EFF">
              查看更多
            </div>
          </div>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="right-bottom-1">
              <el-row>
                <div style="font-weight: 550; margin-top: 10px; margin-left: 6%">
                  招聘消息
                </div>
              </el-row>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="right-bottom-2">
              <el-row>
                <div style="font-weight: 550; margin-top: 10px; margin-left: 6%">
                  系统消息
                </div>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "HomePage_hr",
    data(){
      return{
        generalSituation : {
          on_the_job: 0, //在职
          departure: 0, //离职
          induction: 0, //入职
          become_regular: 0, //转正
          to_be_hired: 0, //待入职
          without_mutual: 0, //未互评
          have_mutual: 0 //已互评
        },
        unevaluatedNumber: 0, //未评价的人数
        evaluateSituation: [],
        calendarData: [],
        memoData: [],
        recruitmentData: [],
        dateValue: new Date(),
        dialogFormVisible: false,
        inputMemo: '',
        clickDate:'',
        dateRange:''
      }
    },
    methods:{
      loadAllSchedule(callback) {
        const _this = this
        let calendarData = []
        this.axios.get("http://www.ez00.cn/web/cirrus/schedule/get_all_schedule?user_phone="+_this.$store.state.user_phone)
            .then(function (res){
              calendarData = res.data.data.data.calendarData
            })
            .catch(function (err) {  //当请求出现错误时的回调函数
              console.log(err);
            });
        setTimeout(function (){
          // console.log(result)
          callback(calendarData)
        },1000)
      },

      loadTodayRecruitment(callback) {
        const _this = this
        let recruitmentData = []
        this.axios.get("http://www.ez00.cn/web/cirrus//talent-info/get_today_recruitment?user_phone="+_this.$store.state.user_phone)
            .then(function (res){
              recruitmentData = res.data.data.recruitmentData
              //console.log(res.data)
            })
            .catch(function (err) {  //当请求出现错误时的回调函数
              console.log(err);
            });
        setTimeout(function (){
          // console.log(result)
          callback(recruitmentData)
        },1000)
      },

      loadTodayMemo(callback) {
        const _this = this
        let memoData = []
        this.axios.get("http://www.ez00.cn/web/cirrus/memorandum/get_today_schedule?user_phone="+_this.$store.state.user_phone)
            .then(function (res){
              memoData = res.data.data.memodata
            })
            .catch(function (err) {  //当请求出现错误时的回调函数
              console.log(err);
            });
        setTimeout(function (){
          // console.log(result)
          callback(memoData)
        },1000)
      },

      calendarOnClick(data) {
        const _this = this
        _this.clickDate = data.day
        console.log(_this.clickDate)
        this.axios.get("http://www.ez00.cn/web/cirrus/schedule/get_click_schedule?date="+data.day+"&user_phone="+_this.$store.state.user_phone)
                  .then(function (res) {
                    _this.memoData = res.data.data.memodata
                    _this.recruitmentData = res.data.recruitmentData
                    // console.log(_this.recruitmentData)
                  })
                  .catch(function (err) {  //当请求出现错误时的回调函数
                    console.log(err);
                  });
      },

      buildANewMemo() {    // 提交新建的备忘录
        const _this = this
        this.dialogFormVisible = false
        //const d = this.dateValue
        //转化为类似2021-02-18的日期
        //const resDate = d.getFullYear() + '-' + this.p((d.getMonth() + 1)) + '-' + this.p(d.getDate())
        //转化为类似12:57:57的时间
        //const resTime = this.p(d.getHours()) + ':' + this.p(d.getMinutes()) + ':' + this.p(d.getSeconds())
        this.axios.post('http://www.ez00.cn/web/cirrus/memorandum/build_a_new_memo',{inputMemo:this.inputMemo,inputDate:_this.clickDate,user_phone:_this.$store.state.user_phone})
          .then(function (res) {
            _this.memoData = res.data.data.memodata
            _this.calendarData = res.data.calendarData
          })
            .catch(function (err) {  //当请求出现错误时的回调函数
              console.log(err);
            });
      },

      showMemoDetail(item) {
        this.$alert(item.content, '备忘录', {
          confirmButtonText: '确定',
          closeOnClickModal:'true'
        });
      },

      deleteAMemo(item) {
        const _this = this
        this.axios.post('http://www.ez00.cn/web/cirrus/memorandum/delete_a_memo',{id:item.id,user_phone:_this.$store.state.user_phone})
            .then(function (res) {
              _this.memoData = res.data.data.memodata
              _this.calendarData = res.data.calendarData
            })
            .catch(function (err) {  //当请求出现错误时的回调函数
              console.log(err);
            });
      },

      getDateRange() {
        const nowDate = new Date();
        const cloneNowDate = new Date();
        const fullYear = nowDate.getFullYear();
        const month = nowDate.getMonth() + 1; // getMonth 方法返回 0-11，代表1-12月
        const endOfMonth = new Date(fullYear, month, 0).getDate(); // 获取本月最后一天
        function getFullDate(targetDate) {
          let D, y, m, d;
          if (targetDate) {
            D = new Date(targetDate);
            //y = D.getFullYear();
            m = D.getMonth() + 1;
            d = D.getDate();
          } else {
            //y = fullYear;
            m = month;
            d = date;
          }
          m = m > 9 ? m : '0' + m;
          d = d > 9 ? d : '0' + d;
          return m + '.' + d;
        };
        const endDate = getFullDate(cloneNowDate.setDate(endOfMonth));//当月最后一天
        const starDate = getFullDate(cloneNowDate.setDate(1));//当月第一天
        this.dateRange = starDate + "~" + endDate
      },

      getClickTime() {//初始化今日日期
        const now = new Date();
        const year = now.getFullYear(); //得到年份
        let month = now.getMonth();//得到月份
        let date = now.getDate();//得到日期
        month = month + 1;
        if (month < 10) month = "0" + month;
        if (date < 10) date = "0" + date;
        let time = "";
        time = year + "-" + month + "-" + date;
        this.clickDate = time
      },

      getGeneralSituation(callback) {
        const _this = this
        let data = ''
        this.axios.get("http://www.ez00.cn/web/cirrus/company-manage-info/get_general_situation?user_phone=" + _this.$store.state.user_phone + "&company_id=" + _this.$store.state.company_id)
           .then(function (res) {
             data = res.data.data.generalSituation
            })
            .catch(function (err) {  //当请求出现错误时的回调函数
              console.log(err);
            });
        setTimeout(function (){
          // console.log(result)
          callback(data)
        },1000)
      },

      getEvaluateSituation(callback) {
        const _this = this
        let data = ''
        this.axios.get("https://easydoc.xyz/mock/sEWRf0fW/get_evaluate_situation?user_phone=" + _this.$store.state.user_phone + "&company_id=" + _this.$store.state.company_id)
            .then(function (res) {
              data = res.data
            })
            .catch(function (err) {  //当请求出现错误时的回调函数
              console.log(err);
            });
        setTimeout(function (){
          // console.log(result)
          callback(data)
        },1000)
      }
    },
    created() {
      const _this = this
      _this.loadTodayMemo((data) => {
        _this.memoData = data
      })
      _this.loadTodayRecruitment((data) => {
        _this.recruitmentData = data
      })
      _this.getDateRange()
      _this.getClickTime()
      _this.getGeneralSituation( (data) => {
        _this.generalSituation.on_the_job = data.on_the_job
        _this.generalSituation.departure = data.departure
        _this.generalSituation.induction = data.induction
        _this.generalSituation.become_regular = data.become_regular
        _this.generalSituation.to_be_hired = data.to_be_hired
        _this.generalSituation.without_mutual = data.without_mutual
        _this.generalSituation.have_mutual = data.have_mutual
      })
      _this.getEvaluateSituation((data) => {
        _this.unevaluatedNumber = data.unevaluatedNumber
        _this.evaluateSituation = data.evaluateSituation
      })
      this.$loading({
        text:'正在加载'
      })
      setTimeout(() => {
        this.$loading().close()
      },1000)
    },
    mounted() {
      const _this = this
      _this.loadAllSchedule((data) => {
        _this.calendarData = data
      })
    }
  }
</script>

<style >
  .top {
    width: 99%;
    height: 100px;
    box-shadow: 1px 4px 5px #d3d3d3;
    background-color: white;
    border-radius: 10px;
  }

  .left-top {
    margin-top: 2%;
    width: 98%;
    height: 450px;
    box-shadow: 1px 4px 5px #d3d3d3;
    background-color: white;
    border-radius: 10px;
  }

  .left-bottom {
    margin-top: 2%;
    width: 98%;
    height: 120px;
    box-shadow: 1px 4px 5px #d3d3d3;
    background-color: white;
    border-radius: 10px;
  }

  .right-top {
    margin-top: 3%;
    width: 97%;
    height: 280px;
    box-shadow: 1px 4px 5px #d3d3d3;
    background-color: white;
    border-radius: 10px;
  }

  .right-bottom-1 {
    margin-top: 7%;
    width: 94%;
    height: 290px;
    box-shadow: 1px 4px 5px #d3d3d3;
    background-color: white;
    border-radius: 10px;
  }

  .right-bottom-2 {
    margin-top: 7%;
    width: 94%;
    height: 290px;
    box-shadow: 1px 4px 5px #d3d3d3;
    background-color: white;
    border-radius: 10px;
  }

  .calendar {
    margin-left: 8px;
    width: 100%;
  }

  .calendar-day{
    text-align: center;
    color: #202535;
    line-height: 20px;
    font-size: 12px;
  }
  /*.is-selected{*/
  /*  color: #F8A535;*/
  /*  font-size: 10px;*/
  /*  margin-top: 5px;*/
  /*}*/
  .el-calendar-table .el-calendar-day {
    height: 45px;
  }
  .el-calendar-table:not(.is-range) td.next, .el-calendar-table:not(.is-range) td.prev{
    opacity: 0.35;
  }

  .budge{
    width: 8px;
    height: 8px;
    border-radius: 15px;
    margin: 1px auto;
  }
  .blue{
    background-color: #409EFF;
  }
  .green{
    background-color: #25b591;
  }

  .memo {
    border-style:solid;
    border-width: 2px;
    border-color: #409EFF;
    border-radius: 10px;
    margin-left: 4%;
    margin-top: 15%;
    box-shadow: 1px 1px 3px #409EFF;
    width: 90%;
    height: 120px;
  }

  .recruitment {
    border-style:solid;
    border-width: 2px;
    border-color: #25b591;
    border-radius: 10px;
    margin-left: 4%;
    margin-top: 10%;
    box-shadow: 1px 1px 3px #25b591;
    width: 90%;
    height: 120px;
  }
</style>