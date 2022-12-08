<template>
  <div class="employee_charts">
    <el-row type="flex" align="middle">
      <el-col :span="1" style="margin-top: 1%;margin-left: 1%">
        <div style="height: 25px;width: 10px; border-radius:10px;background-color: #3a8ee6"></div>
      </el-col>
      <el-col :span="21" style="margin-top: 1%">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/department_charts' }">统计图表</el-breadcrumb-item>
          <el-breadcrumb-item>员工概况</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="3" :offset="20">
        <el-select v-model="clickDepartment" placeholder="请选择部门" @change="loadClickDepartmentData">
          <el-option
              v-for="item in departmentList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <div style="width: 100%;height: 666px">
      <el-scrollbar
          style="height: 666px;"
          wrap-style="overflow-x:hidden; overflow-y:show;"
      >
        <el-row>
          <el-col :span="10" :offset="1">
            <el-row>
              <i class="el-icon-pie-chart" style="font-size: 30px;font-weight: bold;margin-top: 5%;margin-left: 10%">性别比例</i>
            </el-row>
            <el-row>
              <el-divider></el-divider>
            </el-row>
            <el-row>
              <div id="sex_ratio" style="width:100%;height:350px;margin-top: 1%;"></div>
            </el-row>
          </el-col>
          <el-col :span="10" :offset="1">
            <el-row>
<!--              <el-col :span="12">-->
                <i class="el-icon-pie-chart" style="font-size: 30px;font-weight: bold;margin-top: 5%;margin-left: 10%">年龄结构</i>
<!--              </el-col>-->
<!--              <el-col :span="2">-->
<!--                <div style="width: 100%;height: 10px;background-color: gainsboro">-->

<!--                </div>-->
<!--              </el-col>-->
            </el-row>
            <el-row>
              <el-divider></el-divider>
            </el-row>
            <el-row>
              <div id="age_ratio" style="width:100%;height:350px;margin-top: 1%;"></div>
            </el-row>
          </el-col>
        </el-row>
        <el-row style="margin-top: 2%">
          <el-col :span="10" :offset="1">
            <el-row>
              <i class="el-icon-pie-chart" style="font-size: 30px;font-weight: bold;margin-top: 5%;margin-left: 10%">在职时间</i>
            </el-row>
            <el-row>
              <el-divider></el-divider>
            </el-row>
            <el-row>
              <div id="working_time_ratio" style="width:100%;height:350px;margin-top: 1%;"></div>
            </el-row>
          </el-col>
          <el-col :span="10" :offset="1">
            <el-row>
              <i class="el-icon-pie-chart" style="font-size: 30px;font-weight: bold;margin-top: 5%;margin-left: 10%">学历情况</i>
            </el-row>
            <el-row>
              <el-divider></el-divider>
            </el-row>
            <el-row>
              <div id="education_background_ratio" style="width:100%;height:350px;margin-top: 1%;"></div>
            </el-row>
          </el-col>
        </el-row>
        <el-row style="margin-top: 2%">
          <el-col :span="10" :offset="1">
            <el-row>
              <i class="el-icon-pie-chart" style="font-size: 30px;font-weight: bold;margin-top: 5%;margin-left: 10%">婚姻状态</i>
            </el-row>
            <el-row>
              <el-divider></el-divider>
            </el-row>
            <el-row>
              <div id="marital_status_ratio" style="width:100%;height:350px;margin-top: 1%;"></div>
            </el-row>
          </el-col>
          <el-col :span="12" :offset="1">
            <el-row>
              <i class="el-icon-pie-chart" style="font-size: 30px;font-weight: bold;margin-top: 5%;margin-left: 10%">迟到/早退人数</i>
            </el-row>
            <el-row>
              <el-divider></el-divider>
            </el-row>
            <el-row>
              <div id="clocking_in_ratio" style="width:100%;height:350px;margin-top: 1%;"></div>
            </el-row>
          </el-col>
        </el-row>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
  export default {
    name: "EmployeeCharts",
    data(){
      return{
        departmentList:[],
        clickDepartment:'',
        sexRatioECharts_data:[],
        ageRatioECharts_data: [],
        workingTimeECharts_data:[],
        educationBackgroundECharts_data:[],
        maritalStatusECharts_data:[],
        clockingInECharts_data_man:[],
        clockingInECharts_data_women:[],
        clockingInECharts_data_unknow:[]
      }
    },
    methods:{
      loadDepartmentList(callback) {
        const _this = this
        let data = []
        this.axios.get("https://easydoc.xyz/mock/sEWRf0fW/get_managed_department_list?company_id="+_this.$store.state.company_id+"&user_phone="+_this.$store.state.user_phone)
            .then(function (res) {
              data = res.data.departmentList
              //console.log(data)
            })
            .catch(function (err) {  //当请求出现错误时的回调函数
              console.log(err);
            });
        setTimeout(function (){
          // console.log(result)
          callback(data)
        },1000)
      },

      sexRatioECharts(){
        const _this = this
        // 基于准备好的dom，初始化echarts实例
        const sexRatioECharts = this.$echarts.init(document.getElementById('sex_ratio'),"westeros");
        const option = {
          tooltip: {
            trigger: 'item'
          },
          legend: {
            top: '0%',
            left: 'center'
          },
          series: [
            {
              name: '性别结构',
              type: 'pie',
              radius: ['20%', '60%'],
              center: ['50%', '50%'],
              avoidLabelOverlap: true,
              roseType: 'area',
              itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
              },
              label: {
                show: false,
                position: 'center'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: false
              },
              data: _this.sexRatioECharts_data
            }
          ]
        };
        sexRatioECharts.setOption(option);
      },

      ageRatioECharts(){
        const _this = this
        // 基于准备好的dom，初始化echarts实例
        const ageRatioECharts = _this.$echarts.init(document.getElementById('age_ratio'),"westeros");
        const option = {
          tooltip: {
            trigger: 'item'
          },
          legend: {
            top: '0%',
            left: 'center'
          },
          series: [
            {
              name: '性别结构',
              type: 'pie',
              radius: ['40%', '80%'],
              center: ['50%', '50%'],
              avoidLabelOverlap: true,
              roseType: 'area',
              itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
              },
              label: {
                show: false,
                position: 'center',
                color: 'auto'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: false
              },
              data:_this.ageRatioECharts_data
            }
          ]
        };
        ageRatioECharts.setOption(option);
      },

      workingTimeECharts(){
        const _this = this
        // 基于准备好的dom，初始化echarts实例
        const workingTimeECharts = _this.$echarts.init(document.getElementById('working_time_ratio'),"westeros");
        const option = {
          tooltip: {
            trigger: 'item'
          },
          legend: {
            top: '0%',
            left: 'center'
          },
          series: [
            {
              name: '性别结构',
              type: 'pie',
              radius: ['30%', '80%'],
              center: ['50%', '50%'],
              avoidLabelOverlap: true,
              roseType: 'area',
              itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
              },
              label: {
                show: false,
                position: 'center',
                color: 'auto'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: false
              },
              data: _this.workingTimeECharts_data
            }
          ]
        };
        workingTimeECharts.setOption(option);
      },

      educationBackgroundECharts(){
        const _this = this
        // 基于准备好的dom，初始化echarts实例
        const educationBackgroundECharts = _this.$echarts.init(document.getElementById('education_background_ratio'),"westeros");
        const option = {
          tooltip: {
            trigger: 'item'
          },
          legend: {
            top: '0%',
            left: 'center'
          },
          series: [
            {
              name: '性别结构',
              type: 'pie',
              radius: ['40%', '80%'],
              center: ['50%', '50%'],
              avoidLabelOverlap: true,
              roseType: 'area',
              itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
              },
              label: {
                show: false,
                position: 'center',
                color: 'auto'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: false
              },
              data: _this.educationBackgroundECharts_data
            }
          ]
        };
        educationBackgroundECharts.setOption(option);
      },

      maritalStatusECharts(){
        const _this = this
        // 基于准备好的dom，初始化echarts实例
        const maritalStatusECharts = this.$echarts.init(document.getElementById('marital_status_ratio'),"westeros");
        const option = {
          tooltip: {
            trigger: 'item'
          },
          legend: {
            top: '0%',
            left: 'center'
          },
          series: [
            {
              name: '性别结构',
              type: 'pie',
              radius: ['20%', '60%'],
              center: ['50%', '50%'],
              avoidLabelOverlap: true,
              roseType: 'area',
              itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
              },
              label: {
                show: false,
                position: 'center'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: false
              },
              data: _this.maritalStatusECharts_data
            }
          ]
        };
        maritalStatusECharts.setOption(option);
      },

      clockingInECharts() {
        const _this = this
        // 基于准备好的dom，初始化echarts实例
        const clockingInECharts = this.$echarts.init(document.getElementById('clocking_in_ratio'),"westeros");
        let option;
        let app = {};
        const posList = [
          'left', 'right', 'top', 'bottom',
          'inside',
          'insideTop', 'insideLeft', 'insideRight', 'insideBottom',
          'insideTopLeft', 'insideTopRight', 'insideBottomLeft', 'insideBottomRight'
        ];

        app.configParameters = {
          rotate: {
            min: -90,
            max: 90
          },
          align: {
            options: {
              left: 'left',
              center: 'center',
              right: 'right'
            }
          },
          verticalAlign: {
            options: {
              top: 'top',
              middle: 'middle',
              bottom: 'bottom'
            }
          },
          position: {
            options: posList.reduce(function (map, pos) {
              map[pos] = pos;
              return map;
            }, {})
          },
          distance: {
            min: 0,
            max: 100
          }
        };

        app.config = {
          rotate: 90,
          align: 'left',
          verticalAlign: 'middle',
          position: 'insideBottom',
          distance: 15,
          onChange: function () {
            var labelOption = {
              normal: {
                rotate: app.config.rotate,
                align: app.config.align,
                verticalAlign: app.config.verticalAlign,
                position: app.config.position,
                distance: app.config.distance
              }
            };
            clockingInECharts.setOption({
              series: [{
                label: labelOption
              }, {
                label: labelOption
              }, {
                label: labelOption
              }, {
                label: labelOption
              }]
            });
          }
        };


        var labelOption = {
          show: false,
          position: app.config.position,
          distance: app.config.distance,
          align: app.config.align,
          verticalAlign: app.config.verticalAlign,
          rotate: app.config.rotate,
          formatter: '{c}  {name|{a}}',
          fontSize: 12,
          rich: {
            name: {
            }
          }
        };

        option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            data: ['Forest', 'Steppe', 'Desert', 'Wetland']
          },
          toolbox: {
            show: true,
            orient: 'vertical',
            left: 'right',
            top: 'center',
            feature: {
              mark: {show: true},
              dataView: {show: true, readOnly: false},
              magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
              restore: {show: true},
              saveAsImage: {show: true}
            }
          },
          xAxis: [
            {
              type: 'category',
              axisTick: {show: false},
              data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: '男',
              type: 'bar',
              barGap: 0,
              label: labelOption,
              emphasis: {
                focus: 'series'
              },
              data: _this.clockingInECharts_data_man
            },
            {
              name: '女',
              type: 'bar',
              label: labelOption,
              emphasis: {
                focus: 'series'
              },
              data: _this.clockingInECharts_data_women
            },
            {
              name: '未知',
              type: 'bar',
              label: labelOption,
              emphasis: {
                focus: 'series'
              },
              data: _this.clockingInECharts_data_unknow
            }
          ]
        };
        clockingInECharts.setOption(option);
      },

      loadAllData(callback) {
        const _this = this
        let chartsData = []
        setTimeout(function () {
          _this.axios.get("https://easydoc.xyz/mock/sEWRf0fW/get_department_member_info?company_id="+_this.$store.state.company_id+"&company_apart_name="+_this.clickDepartment)
              .then(function (res) {
                chartsData = res.data
                //console.log(chartsData)
                callback(chartsData)
              })
              .catch(function (err) {  //当请求出现错误时的回调函数
                console.log(err);
              });
        },1000)
      },

      loadClickDepartmentData() {
        const _this = this
        this.loadAllData((data) => {
          _this.ageRatioECharts_data = data.ageRatioECharts_data
          _this.sexRatioECharts_data = data.sexRatioECharts_data
          _this.workingTimeECharts_data = data.workingTimeECharts_data
          _this.educationBackgroundECharts_data = data.educationBackgroundECharts_data
          _this.maritalStatusECharts_data = data.maritalStatusECharts_data
          _this.clockingInECharts_data_man = data.clockingInECharts_data_man
          _this.clockingInECharts_data_women = data.clockingInECharts_data_women
          _this.clockingInECharts_data_unknow = data.clockingInECharts_data_unknow
          this.sexRatioECharts()
          this.ageRatioECharts()
          this.workingTimeECharts()
          this.educationBackgroundECharts()
          this.maritalStatusECharts()
          this.clockingInECharts()
        })
        this.$loading({
          text:'正在加载'
        })
        setTimeout(() => {
          this.$loading().close()
        },1000)
      }
    },
    mounted() {
      const _this = this
      this.loadAllData((data) => {
        _this.ageRatioECharts_data = data.ageRatioECharts_data
        _this.sexRatioECharts_data = data.sexRatioECharts_data
        _this.workingTimeECharts_data = data.workingTimeECharts_data
        _this.educationBackgroundECharts_data = data.educationBackgroundECharts_data
        _this.maritalStatusECharts_data = data.maritalStatusECharts_data
        _this.clockingInECharts_data_man = data.clockingInECharts_data_man
        _this.clockingInECharts_data_women = data.clockingInECharts_data_women
        _this.clockingInECharts_data_unknow = data.clockingInECharts_data_unknow
        this.sexRatioECharts()
        this.ageRatioECharts()
        this.workingTimeECharts()
        this.educationBackgroundECharts()
        this.maritalStatusECharts()
        this.clockingInECharts()
      })
    },
    created() {
      const _this = this
      this.loadDepartmentList((data)=> {
        _this.departmentList = data
        _this.clickDepartment = data[0].value
        //console.log(_this.clickDepartment)
      })
      this.$loading({
        text:'正在加载'
      })
      setTimeout(() => {
        this.$loading().close()
      },1000)
    }
  }
</script>

<style scoped>
  
</style>