<template>
  <div class="archives_info">
    <el-row type="flex" align="middle">
      <el-col :span="1" style="margin-top: 1%;margin-left: 1%">
        <div style="height: 25px;width: 10px; border-radius:10px;background-color:#3a8ee6"></div>
      </el-col>
      <el-col :span="5" style="margin-top: 1%">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/archives_info' }">员工档案</el-breadcrumb-item>
          <el-breadcrumb-item>档案信息</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <el-row style="margin-top: 1%">
      <el-col :span="5" :offset="1">
        <el-button type="primary" icon="el-icon-search" @click="drawerVisible=true" size="small" plain>筛选</el-button>
        <el-drawer
            title="筛选内容"
            :visible.sync="drawerVisible"
            direction="rtl"
            ref="drawer"
        >
          <el-form ref="search_form" :model="searchForm" style="margin-left: 4%;margin-top: 15%">
            <el-form-item label="员工部门" label-width="80px" prop="company_department_name">
              <el-select v-model="searchForm.company_department_name" placeholder="在此选择员工部门" style="width: 50%">
                <el-option
                    v-for="(item,index) in managedApartList"
                    :key="index"
                    :label="item.value"
                    :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="员工身份" label-width="80px" style="margin-top: 10%" prop="company_employee_role">
              <el-select v-model="searchForm.company_employee_role" placeholder="在此选择员工身份" style="width: 50%">
                <el-option
                    v-for="(item,index) in employee_roleOptions"
                    :key="index"
                    :label="item.value"
                    :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="员工姓名" label-width="80px" style="margin-top: 10%" prop="company_employee_name">
              <el-input v-model="searchForm.company_employee_name" placeholder="在此输入员工姓名" style="width: 50%">
              </el-input>
            </el-form-item>
            <el-form-item label="员工手机" label-width="80px" style="margin-top: 10%" prop="company_employee_phone">
              <el-input v-model="searchForm.company_employee_phone" placeholder="在此输入员工手机" style="width: 70%" maxlength="11" show-word-limit>
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
    </el-row>
    <el-row>
      <el-table
          :data="accountData"
          style="width: 100%"
          height="588"
          stripe
          empty-text>
        <el-table-column
            align="center"
            header-align="center"
            label="员工手机"
            width="150">
          <template slot-scope="scope">
            <i class="el-icon-phone-outline"></i>
            <span style="margin-left: 10px">{{ scope.row.company_employee_phone }}</span>
          </template>
        </el-table-column>
        <el-table-column
            align="center"
            header-align="center"
            label="员工姓名"
            width="150">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>姓名: {{ scope.row.company_employee_name }}</p>
              <p>部门: {{ scope.row.company_department_name }}</p>
              <p>职位: {{ scope.row.company_employee_position }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.company_employee_name }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
            prop="company_department_name"
            align="center"
            header-align="center"
            label="员工部门"
            width="160">
        </el-table-column>
        <el-table-column
            prop="company_employee_role"
            align="center"
            header-align="center"
            label="员工身份"
            width="160">
        </el-table-column>
        <el-table-column
            align="center"
            header-align="center"
            label="加入日期"
            width="170">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.company_enter_time }}</span>
          </template>
        </el-table-column>
        <el-table-column
            align="center"
            header-align="center"
            label="个人档案"
            width="150">
          <template slot-scope="scope">
            <el-button
                fixed="right"
                size="mini"
                @click="showPersonalArchives(scope.$index, scope.row)"
                type="primary"
                plain>
              个人档案
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
            align="center"
            header-align="center"
            label="过往经历"
            width="180"
        >
          <template slot-scope="scope">
            <el-button
                fixed="right"
                size="mini"
                @click="showHistory(scope.$index, scope.row)"
                icon="el-icon-document"
                type="primary">
              过往工作经历
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-dialog title="过往工作经历" :visible.sync="historyVisible">
      <el-scrollbar
          style="height: 450px;"
          wrap-style="overflow-x:hidden; overflow-y:show;"
      >
        <el-timeline>
          <el-timeline-item
              color="#409EFF"
              :timestamp="item.company_enter_time"
              placement="top"
              v-for="(item,index) in employeeHistoryData"
              :key="index"
          >
            <el-card style="width: 90%">
              <el-row align="center" justify="center" type="flex">
                <el-col :span="10" >
                  <h2>{{item.company_title}}</h2>
                  <p>工作时间:{{item.employee_work_time}}</p>
                </el-col>
                <el-col :span="3" :offset="1">
                  <div style="margin-top: 20%;height: 100%;line-height: 100%;">
                    <br>
                    <p>{{item.company_employee_position}}</p>
                  </div>
                </el-col>
                <el-col :span="3" :offset="1">
                  <div style="margin-top: 20%;height: 100%;line-height: 100%;">
                    <br>
                    <p>{{item.company_employee_role}}</p>
                  </div>
                </el-col>
                <el-col :span="3" :offset="2">
                  <div style="margin-top: 20%;height: 100%;line-height: 100%;">
                    <br>
                    <el-button size="small" type="primary" @click="showHistoryDetail(item)">深入了解</el-button>
                  </div>
                </el-col>
              </el-row>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </el-scrollbar>
    </el-dialog>
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
  </div>
</template>

<script>
  export default {
    name: "ArchivesInfo",
    props: {
      company_id: {
        type: String,
        default: 'no data'
      },
      hr_phone: {
        type: String,
        default: 'no data'
      },
      company_employee_phone: {
        type: String,
        default: 'no data'
      }
    },
    data(){
      return{
        drawerVisible: false,
        historyVisible: false,
        currentPage: 1,
        total: 0,
        currentSize: 10,
        managedApartList: [],
        accountData: [],
        employeeHistoryData: [],
        searchForm: {
          company_department_name: '',
          company_employee_phone: '',
          company_employee_role: '',
          company_employee_name: ''
        },
        employee_roleOptions: [
          {
            value: 'HR'
          },
          {
            value: '部门主管'
          },
          {
            value: '普通员工'
          },
          {
            value: '实习员工'
          },
        ],

      }
    },
    methods:{
      cancelSearch() {
        this.$refs.search_form.resetFields()
        //this.drawerVisible = false
      },

      loadManagedApartList(callback) {
        const _this = this
        let result = []
        this.axios.get("http://www.ez00.cn/web/cirrus/role/get_managed_department_list?company_id="+_this.$store.state.company_id+"&user_phone="+_this.$store.state.user_phone)
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

      loadAllAccountInfo() {
        const _this = this
        _this.axios.get("http://www.ez00.cn/web/cirrus/company-manage-info/get_account_info?company_id="+_this.$store.state.company_id+"&user_phone="+_this.$store.state.user_phone +"&current_size="
            +_this.currentSize+"&account_status=-1"+"&current_page="+_this.currentPage+"&company_department_name="+_this.searchForm.company_department_name+ "&company_employee_phone="+_this.searchForm.company_employee_phone+
            "&company_employee_role="+_this.searchForm.company_employee_role+"&company_employee_name="+_this.searchForm.company_employee_name )
            .then(function (res) {
              //console.log(res);
              _this.accountData = res.data.data.accountData
              _this.total = res.data.data.total
            })
            .catch(function (err) {  //当请求出现错误时的回调函数
              console.log(err);
            });
      },

      toAccountAdd() {
        this.$router.push("/account_add")
      },

      handleSearch() {
        const _this = this
        _this.axios.get("http://www.ez00.cn/web/cirrus/company-manage-info/get_account_info?company_id="+_this.$store.state.company_id+"&user_phone="+_this.$store.state.user_phone +"&current_size="
            +_this.currentSize+"&account_status=-1"+"&current_page="+_this.currentPage+"&company_department_name="+_this.searchForm.company_department_name +"&company_employee_phone="
            +_this.searchForm.company_employee_phone+"&company_employee_role="+_this.searchForm.company_employee_role+"&company_employee_name="+_this.searchForm.company_employee_name )
            .then(function (res) {
              _this.accountData = res.data.accountData
              _this.total = res.data.total
              //console.log(res)
            })
            .catch(function (err) {  //当请求出现错误时的回调函数
              console.log(err);
            });
      },

      showHistory(index, row) {
        const _this = this
        _this.axios.get("https://easydoc.xyz/mock/sEWRf0fW/get_history_experience?company_id="+_this.$store.state.company_id+"&user_phone="+_this.$store.state.user_phone +"&company_employee_phone="+_this.searchForm.company_employee_phone)
            .then(function (res) {
              _this.employeeHistoryData = res.data.employeeHistoryData
              _this.historyVisible = true
            })
            .catch(function (err) {  //当请求出现错误时的回调函数
              console.log(err);
            });
      },

      handleDelete(index, row) {
        // this.$refs.delete_popover.show
        this.visible = false
        console.log(index, row);
      },

      stateChange(index, row){
        console.log(row.account_status)
      },

      handleSizeChange(val) {
        const _this = this
        _this.currentSize = val
        _this.axios.get("http://www.ez00.cn/web/cirrus/company-manage-info/get_account_info?company_id="+_this.$store.state.company_id+"&user_phone="+_this.$store.state.user_phone +"&current_size="
            +_this.currentSize+"&account_status=-1"+"&current_page="+_this.currentPage+"&company_department_name="+_this.searchForm.company_department_name +"&company_employee_phone="+_this.searchForm.company_employee_phone+
            "&company_employee_role="+_this.searchForm.company_employee_role+"&company_employee_name="+_this.searchForm.company_employee_name )
            .then(function (res) {
              _this.accountData = res.data.accountData
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
        _this.axios.get("http://www.ez00.cn/web/cirrus/company-manage-info/get_account_info?company_id="+_this.$store.state.company_id+"&user_phone="+_this.$store.state.user_phone +"&current_size="
            +_this.currentSize+"&account_status=-1"+"&current_page="+_this.currentPage+"&company_department_name="+_this.searchForm.company_department_name +"&company_employee_phone=" +_this.searchForm.company_employee_phone
            +"&company_employee_role="+_this.searchForm.company_employee_role+"&company_employee_name="+_this.searchForm.company_employee_name )
            .then(function (res) {
              _this.accountData = res.data.accountData
              _this.total = res.data.total
              //console.log(res)
            })
            .catch(function (err) {  //当请求出现错误时的回调函数
              console.log(err);
            });
      },

      showHistoryDetail(data) {
        const _this = this
        _this.historyVisible = false
        // setTimeout(function () {
        //   _this.historyDetailVisible = true
        // },500)
        _this.$router.push({
          path:'/history_detail',
          query: {
            company_id: _this.$store.state.company_id,
            hr_phone: _this.$store.state.user_phone,
            company_title_search: data.company_title,
            company_employee_phone: data.company_employee_phone,
            company_enter_time: data.company_enter_time
          }
        })
      },

      showPersonalArchives(index,row) {
        const _this = this
        _this.$router.push({
          path:'/personal_archives',
          query: {
            company_id: _this.$store.state.company_id,
            hr_phone: _this.$store.state.user_phone,
            talent_phone: row.company_employee_phone,
            talent_name: row.company_employee_name
          }
        })
      }
    },
    mounted() {
      const _this = this
      _this.loadManagedApartList(data => {
        _this.managedApartList = data
        //console.log(data)
      })
    },
    created() {
      this.loadAllAccountInfo()
    },
    beforeRouteEnter(to,from,next){
      next(vm =>{
        if(from.name === 'HistoryDetail'){
          // console.log(vm.$store.state.company_id)
          // console.log(vm.$store.state.user_phone)
          // console.log(vm.company_employee_phone)
          vm.axios.get("https://easydoc.xyz/mock/sEWRf0fW/get_history_experience?company_id="+vm.$store.state.company_id+"&user_phone="+vm.$store.state.user_phone +"&company_employee_phone="+vm.company_employee_phone)
              .then(function (res) {
                vm.employeeHistoryData = res.data.employeeHistoryData
                vm.historyVisible = true
              })
              .catch(function (err) {  //当请求出现错误时的回调函数
                console.log(err);
              });
        }  
      })
    }
  }
</script>

<style scoped>
  
</style>