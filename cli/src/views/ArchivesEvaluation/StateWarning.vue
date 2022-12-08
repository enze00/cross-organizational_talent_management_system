<template>
  <div class="state_warning">
    <el-row type="flex" align="middle">
      <el-col :span="1" style="margin-top: 1%;margin-left: 1%">
        <div style="height: 25px;width: 10px; border-radius:10px;background-color:#3a8ee6"></div>
      </el-col>
      <el-col :span="5" style="margin-top: 1%">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/evaluation_info' }">员工评估</el-breadcrumb-item>
          <el-breadcrumb-item>员工状态预警</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <el-row style="margin-top: 1%">
      <el-col :span="2" :offset="1">
        <el-button type="primary" icon="el-icon-search" @click="drawerVisible=true" size="small" plain>筛选</el-button>
        <el-drawer
            title="筛选内容"
            :visible.sync="drawerVisible"
            direction="rtl"
            ref="drawer"
        >
          <el-form ref="search_form" :model="searchForm" style="margin-left: 4%;margin-top: 15%">9
            <el-form-item label="部门名称" label-width="80px" prop="company_department_name">
              <el-select v-model="searchForm.company_department_name" placeholder="在此选择部门名称" style="width: 50%">
                <el-option
                    v-for="(item,index) in managedApartList"
                    :key="index"
                    :label="item.value"
                    :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="员工姓名" label-width="80px" style="margin-top: 20%" prop="company_employee_name">
              <el-input v-model="searchForm.company_employee_name" placeholder="在此输入其姓名" style="width: 45%">
              </el-input>
            </el-form-item>
          </el-form>
          <el-row style="margin-top: 25%">
            <el-col :span="10" :offset="3">
              <el-button @click="cancelSearch" style="width: 90%">清 空</el-button>
            </el-col>
            <el-col :span="10">
              <el-button type="primary" icon="el-icon-search" @click="handleSearch" style="width: 90%"> 筛选</el-button>
            </el-col>
          </el-row>
        </el-drawer>
      </el-col>
      <el-col :span="5" :offset="16">
        <el-radio-group v-model="isRead" size="small" @change="handleIsReadChange">
          <el-radio-button label="0">未查看</el-radio-button>
          <el-radio-button label="1">已查看</el-radio-button>
        </el-radio-group>
      </el-col>
    </el-row>
    <el-row style="margin-left: 2%">
      <el-table
          :data="warningEmployeeData"
          style="width: 100%"
          height="588"
          stripe
          empty-text>
        <el-table-column
            prop="company_employee_name"
            align="center"
            header-align="center"
            label="员工姓名"
            width="180">
        </el-table-column>
        <el-table-column
            prop="company_department_name"
            align="center"
            header-align="center"
            label="部门名称"
            width="185">
        </el-table-column>
        <el-table-column
            prop="company_employee_role"
            align="center"
            header-align="center"
            label="员工身份"
            width="185">
        </el-table-column>
        <el-table-column
            prop="company_employee_position"
            align="center"
            header-align="center"
            label="员工职位"
            width="185">
        </el-table-column>
        <el-table-column
            align="center"
            header-align="center"
            label="操作"
            width="185"
        >
          <template slot-scope="scope">
            <el-button
                fixed="right"
                size="mini"
                @click="handleIgnore(scope.$index, scope.row)"
                icon="el-icon-delete"
                type="info" plain>
              忽略
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
            align="center"
            header-align="center"
            label="查看预警信息"
            width="185">
          <template slot-scope="scope">
            <el-button
                fixed="right"
                size="mini"
                icon="el-icon-search"
                @click="handleReadWarning(scope.$index, scope.row)"
                type="primary">
              查看
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row type="flex" justify="center" style="margin-top: 1%">
      <el-col :span="14">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 15, 20, 40]"
            :page-size="currentSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
      </el-col>
    </el-row>
    <el-dialog
        ref="dialog_root"
        title="预警信息"
        :visible.sync="warningFormVisible"
        width="800px"
        @close="closeDialog"
      >
      <el-row>
        <el-col :span="8" >
          <el-card
              shadow="always"
              style="width: 100%;height: 450px"
          >
            <el-row>
              <div style="font-weight: bolder;text-shadow:3px 4px 4px #7ADFF2">系统解析</div>
            </el-row>
            <el-row style="margin-top: 10%">
              <el-scrollbar
                  style="height: 380px;"
                  wrap-style="overflow-x:hidden; overflow-y:show;"
              >
                <el-timeline>
                  <el-timeline-item
                      hide-timestamp
                      :timestamp="items.timestamp"
                      v-for="(items, index) in warningExplain"
                      :key="index"
                      icon="el-icon-more"
                      color="#0bbd87"
                      style="margin-left: -13%"
                  >
                    {{items.explain}}
                  </el-timeline-item>
                </el-timeline>
              </el-scrollbar>

            </el-row>
          </el-card>
        </el-col>
        <el-col :span="16">
          <div ref="charts" style="width:100%;height:450px;margin-left: 2%;"></div>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "StateWarning",
    data(){
      return{
        drawerVisible: false,
        warningFormVisible: false,
        managedApartList: [],
        currentPage: 1,
        total: 0,
        currentSize: 10,
        isRead: 0,
        searchForm: {
          company_employee_name: '',
          company_department_name: ''
        },
        warningEmployeeData:[],
        indicatorData:[],
        legendData:[],
        seriesData:[],
        warningExplain:[]
      }
    },
    methods:{
      warningRatioECharts(){
        //console.log(this.seriesData)
        const _this = this
        // 基于准备好的dom，初始化echarts实例
        let warningRatioECharts = this.$echarts.init(_this.$refs.charts,"westeros");
        const option = {
          tooltip: {},
          legend: {
            data: _this.legendData
          },
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
        warningRatioECharts.setOption(option);
      },

      handleSearch() {
        const _this = this
        if(_this.searchForm.company_employee_name != '' || _this.searchForm.company_department_name != ''){
          _this.axios.get("https://easydoc.xyz/mock/sEWRf0fW/get_warning_employee_info?company_id="+_this.$store.state.company_id+"&user_phone="+_this.$store.state.user_phone +"&current_size=" +_this.currentSize
              +"&current_page="+_this.currentPage+"&company_department_name="+_this.searchForm.company_department_name+"&company_employee_name="+_this.searchForm.company_employee_name +"&isRead="+_this.isRead)
              .then(function (res) {
                _this.warningEmployeeData = res.data.warningEmployeeData
                _this.total = res.data.total
                //console.log(res)
              })
              .catch(function (err) {  //当请求出现错误时的回调函数
                console.log(err);
              });
        }else {
          _this.$message.error('请输入筛选信息！');
        }
      },

      cancelSearch() {
        this.$refs.search_form.resetFields()
        //this.drawerVisible = false
      },

      closeDialog(){    //关闭dialog后清空图表内容
        const _this = this
        // 基于准备好的dom，初始化echarts实例
        let warningRatioECharts = this.$echarts.init(_this.$refs.charts,"westeros");
        const option = {
          tooltip: {},
          legend: {
            data: []
          },
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
            indicator: []
          },
          series: [{
            name: '预算 vs 开销（Budget vs spending）',
            type: 'radar',
            areaStyle: {},
            // areaStyle: {normal: {}},
            data: []
          }]
        };
        warningRatioECharts.setOption(option);
      },

      loadManagedApartList(callback) {
        const _this = this
        let result = []
        this.axios.get("https://easydoc.xyz/mock/sEWRf0fW/get_managed_department_list?company_id="+_this.$store.state.company_id+"&user_phone="+_this.$store.state.user_phone)
            .then(function (res){
              result = res.data.departmentList
            })
            .catch(function (err) {  //当请求出现错误时的回调函数
              console.log(err);
            });
        setTimeout(function (){
          //console.log(result)
          callback(result)
        },1000)
      },

      loadAllWarningEmployeeInfo() {
        const _this = this
        this.axios.get("https://easydoc.xyz/mock/sEWRf0fW/get_warning_employee_info?company_id="+_this.$store.state.company_id+"&user_phone="+_this.$store.state.user_phone +"&current_size=" +_this.currentSize
            +"&current_page="+_this.currentPage+"&company_department_name="+_this.searchForm.company_department_name+"&company_employee_name="+_this.searchForm.company_employee_name +"&isRead="+_this.isRead)
            .then(function (res) {
              _this.warningEmployeeData = res.data.warningEmployeeData
              _this.total = res.data.total
              //console.log(res)
            })
            .catch(function (err) {  //当请求出现错误时的回调函数
              console.log(err);
            });
      },

      handleSizeChange(val) {
        const _this = this
        _this.currentSize = val
        this.axios.get("https://easydoc.xyz/mock/sEWRf0fW/get_warning_employee_info?company_id="+_this.$store.state.company_id+"&user_phone="+_this.$store.state.user_phone +"&current_size=" +_this.currentSize
            +"&current_page="+_this.currentPage+"&company_department_name="+_this.searchForm.company_department_name+"&company_employee_name="+_this.searchForm.company_employee_name +"&isRead="+_this.isRead)
            .then(function (res) {
              _this.warningEmployeeData = res.data.warningEmployeeData
              _this.total = res.data.total
              //console.log(res)
            })
            .catch(function (err) {  //当请求出现错误时的回调函数
              console.log(err);
            });
      },

      handleCurrentChange(val) {
        const _this = this
        _this.currentPage = val
        this.axios.get("https://easydoc.xyz/mock/sEWRf0fW/get_warning_employee_info?company_id="+_this.$store.state.company_id+"&user_phone="+_this.$store.state.user_phone +"&current_size=" +_this.currentSize
            +"&current_page="+_this.currentPage+"&company_department_name="+_this.searchForm.company_department_name+"&company_employee_name="+_this.searchForm.company_employee_name +"&isRead="+_this.isRead)
            .then(function (res) {
              _this.warningEmployeeData = res.data.warningEmployeeData
              _this.total = res.data.total
              //console.log(res)
            })
            .catch(function (err) {  //当请求出现错误时的回调函数
              console.log(err);
            });
      },

      handleIsReadChange() {
        const _this = this
        this.axios.get("https://easydoc.xyz/mock/sEWRf0fW/get_warning_employee_info?company_id="+_this.$store.state.company_id+"&user_phone="+_this.$store.state.user_phone +"&current_size=" +_this.currentSize
            +"&current_page="+_this.currentPage+"&company_department_name="+_this.searchForm.company_department_name+"&company_employee_name="+_this.searchForm.company_employee_name +"&isRead="+_this.isRead)
            .then(function (res) {
              _this.warningEmployeeData = res.data.warningEmployeeData
              _this.total = res.data.total
              //console.log(res)
            })
            .catch(function (err) {  //当请求出现错误时的回调函数
              console.log(err);
            });
      },

      handleIgnore(index, row) {
        console.log(index, row);
      },

      handleReadWarning(index, row){
        const _this =this
        const employee_phone = row.company_employee_phone
        _this.axios.get("https://easydoc.xyz/mock/sEWRf0fW/get_a_detail_warning?company_id="+_this.$store.state.company_id+"&user_phone="+_this.$store.state.user_phone +"&company_employee_phone="+employee_phone)
            .then(function (res) {
              _this.legendData = res.data.legendData
              _this.indicatorData = res.data.indicatorData
              _this.seriesData = res.data.seriesData
              _this.warningExplain = res.data.warningExplain
              _this.warningFormVisible = true

            })
            .catch(function (err) {  //当请求出现错误时的回调函数
              console.log(err);
            });
        setTimeout(function (){
          _this.warningRatioECharts()
        },500)
      },

    },
    mounted() {
      const _this = this
      _this.loadManagedApartList(data => {
        _this.managedApartList = data
        //console.log(data)
      })

    },
    created() {
      this.loadAllWarningEmployeeInfo()
      //this.$store.dispatch('addKeepAlivePage','StateWarning')
    }
  }
</script>

<style scoped>
  
</style>