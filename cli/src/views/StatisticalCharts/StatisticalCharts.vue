<template>
  <div class="statistical_charts">
    <el-row>
      <el-col :span="12">
        <div id="main" style="width:100%;height:400px"></div>
      </el-col>
    </el-row>

  </div>
</template>

<script>

export default {
  data () {
    return {

    }
  },
    methods:{
      myEcharts(){
        // 基于准备好的dom，初始化echarts实例
        const myChart = this.$echarts.init(document.getElementById('main'));

        // 指定图表的配置项和数据
        const option =  {
          legend: {},
          tooltip: {
            trigger: 'axis',
            showContent: false
          },
          dataset: {
            source: [
              ['product', '2012', '2013', '2014', '2015', '2016', '2017'],
              ['Milk Tea', 56.5, 82.1, 88.7, 70.1, 53.4, 85.1],
              ['Matcha Latte', 51.1, 51.4, 55.1, 53.3, 73.8, 68.7],
              ['Cheese Cocoa', 40.1, 62.2, 69.5, 36.4, 45.2, 32.5],
              ['Walnut Brownie', 25.2, 37.1, 41.2, 18, 33.9, 49.1]
            ]
          },
          xAxis: {type: 'category'},
          yAxis: {gridIndex: 0},
          grid: {top: '55%'},
          series: [
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
                formatter: '{b}: {@2012} ({d}%)'
              },
              encode: {
                itemName: 'product',
                value: '2012',
                tooltip: '2012'
              }
            }
          ]
        };

        myChart.on('updateAxisPointer', function (event) {
          var xAxisInfo = event.axesInfo[0];
          if (xAxisInfo) {
            var dimension = xAxisInfo.value + 1;
            myChart.setOption({
              series: {
                id: 'pie',
                label: {
                  formatter: '{b}: {@[' + dimension + ']} ({d}%)'
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
      }
    },
    mounted() {
      this.myEcharts();
    }
  }
</script>

<style scoped>
  .statistical_charts {
    height: 100%;
    width: 100%;
  }

  .charts1 {
    width: 300px;
    height: 300px;
  }

  .charts2 {
    width: 300px;
    height: 300px;
  }

  .echarts {
    width: 100%;
    height: 100%;
  }
</style>