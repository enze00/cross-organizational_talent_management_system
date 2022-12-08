<template>
  <div class="department_charts">
    <el-row type="flex" align="middle">
      <el-col :span="1" style="margin-top: 1%;margin-left: 1%">
        <div style="height: 25px;width: 10px; border-radius:10px;background-color: #3a8ee6"></div>
      </el-col>
      <el-col :span="21" style="margin-top: 1%">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/department_charts' }">统计图表</el-breadcrumb-item>
          <el-breadcrumb-item>历年人数</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <div id="main" style="width:100%;height:650px;margin-top: 1%"></div>
  </div>
</template>

<script>
  export default {
    name: "DepartmentCharts",
    data(){
      const this_year = new Date().getFullYear().toString()
      return{
        chart_source: [],
        chart_series: [
          {type: 'line', smooth: true, seriesLayoutBy: 'row', emphasis: {focus: 'series'}},
          {type: 'line', smooth: true, seriesLayoutBy: 'row', emphasis: {focus: 'series'}},
          {type: 'line', smooth: true, seriesLayoutBy: 'row', emphasis: {focus: 'series'}},
          {type: 'line', smooth: true, seriesLayoutBy: 'row', emphasis: {focus: 'series'}},
          {type: 'line', smooth: true, seriesLayoutBy: 'row', emphasis: {focus: 'series'}},
          {type: 'line', smooth: true, seriesLayoutBy: 'row', emphasis: {focus: 'series'}},
          {type: 'line', smooth: true, seriesLayoutBy: 'row', emphasis: {focus: 'series'}},
          {type: 'line', smooth: true, seriesLayoutBy: 'row', emphasis: {focus: 'series'}},
          {type: 'line', smooth: true, seriesLayoutBy: 'row', emphasis: {focus: 'series'}},
          {type: 'line', smooth: true, seriesLayoutBy: 'row', emphasis: {focus: 'series'}},
          {type: 'line', smooth: true, seriesLayoutBy: 'row', emphasis: {focus: 'series'}},
          {type: 'line', smooth: true, seriesLayoutBy: 'row', emphasis: {focus: 'series'}},
          {type: 'line', smooth: true, seriesLayoutBy: 'row', emphasis: {focus: 'series'}},
          {type: 'line', smooth: true, seriesLayoutBy: 'row', emphasis: {focus: 'series'}},
          {type: 'line', smooth: true, seriesLayoutBy: 'row', emphasis: {focus: 'series'}},
          {type: 'line', smooth: true, seriesLayoutBy: 'row', emphasis: {focus: 'series'}},
          {type: 'line', smooth: true, seriesLayoutBy: 'row', emphasis: {focus: 'series'}},
          {type: 'line', smooth: true, seriesLayoutBy: 'row', emphasis: {focus: 'series'}},
          {type: 'line', smooth: true, seriesLayoutBy: 'row', emphasis: {focus: 'series'}},
          {type: 'line', smooth: true, seriesLayoutBy: 'row', emphasis: {focus: 'series'}},
          {
            type: 'pie',
            id: 'pie',
            radius: '30%',
            center: ['50%', '25%'],
            emphasis: {focus: 'data'},
            label: {
              formatter: '{b}: {@'+this_year+'}人({d}%)'
            },
            encode: {
              itemName: 'department_info',
              value: this_year,
              tooltip:this_year
            }
          }
        ]
      }
    },
    methods:{
      myEcharts(){
        const _this = this
        // 基于准备好的dom，初始化echarts实例
        const myChart = this.$echarts.init(document.getElementById('main'),"westeros");

        // 指定图表的配置项和数据
        const option =  {
          legend: {},
          tooltip: {
            trigger: 'axis',
            showContent: false
          },
          dataset: {
            source: _this.chart_source
          },
          xAxis: {type: 'category'},
          yAxis: {gridIndex: 0},
          grid: {top: '55%'},
          series: _this.chart_series
        };

        myChart.on('updateAxisPointer', function (event) {
          let xAxisInfo = event.axesInfo[0];
          if (xAxisInfo) {
            let dimension = xAxisInfo.value + 1;
            myChart.setOption({
              series: {
                id: 'pie',
                label: {
                  formatter: '{b}: {@[' + dimension + ']}人({d}%)'
                },
                encode: {
                  value: dimension,
                  tooltip: dimension
                }
              }
            });
          }
        });
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      },

      loadAllDepartment(callback) {
        const _this = this
        let data = []
        this.axios.get("https://easydoc.xyz/mock/sEWRf0fW/get_all_department_member_number?company_id="+_this.$store.state.company_id+"&user_phone="+_this.$store.state.user_phone)
            .then(function (res) {
              data = res.data.chart_source
               //console.log(data)
            })
            .catch(function (err) {  //当请求出现错误时的回调函数
              console.log(err);
            });
        setTimeout(function (){
          // console.log(result)
          callback(data)
        },1000)

        setTimeout(function (){
          // console.log(result)
          _this.myEcharts()
        },1000)
      }
    },
    mounted() {
      this.loadAllDepartment((data) => {
        this.chart_source = data
        //console.log(this.chart_source)
      })
    },
    created() {
      this.$loading({
        text:'正在加载'
      })
      setTimeout(() => {
        this.$loading().close()
      },800)
      this.this_year = new Date().getFullYear()
    }
    // beforeRouteEnter(to,from,next){
    //   next(vm =>{
    //     vm.$store.dispatch('addKeepAlivePage','DepartmentCharts')
    //   })
    // },
  }
</script>

<style scoped>
  
</style>