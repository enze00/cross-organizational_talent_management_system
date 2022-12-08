<template>
  <div class="account_manage">
    <el-row type="flex" align="middle">
      <el-col :span="1" style="margin-top: 1%;margin-left: 1%">
        <div style="height: 25px;width: 10px; border-radius:10px;background-color:#3a8ee6"></div>
      </el-col>
      <el-col :span="5" style="margin-top: 1%">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/account_manage' }">账号管理</el-breadcrumb-item>
          <el-breadcrumb-item>账号信息</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col  :span="1" :offset="14" style="margin-top: 1%">
        <div>账号</div>
      </el-col>
      <el-col  :span="1"style="margin-top: 1%">
        <div style="color: #3a8ee6;font-weight: bolder">{{total}}</div>
      </el-col>
      <el-col  :span="1"style="margin-top: 1%">
        <div>个</div>
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
          <el-form ref="search_form" :model="searchForm" style="margin-left: 4%;margin-top: 10%">
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
            <el-form-item label="账号状态" label-width="80px" style="margin-top: 10%" prop="account_status">
              <el-radio v-model="searchForm.account_status" label="true">启用</el-radio>
              <el-radio v-model="searchForm.account_status" label="false">停用</el-radio>
            </el-form-item>
          </el-form>
          <el-row style="margin-top: 20%">
            <el-col :span="10" :offset="3">
              <el-button @click="cancelSearch" style="width: 90%">清 空</el-button>
            </el-col>
            <el-col :span="10">
              <el-button type="primary" icon="el-icon-search" @click="handleSearch" style="width: 90%"> 筛选</el-button>
            </el-col>
          </el-row>
        </el-drawer>
      </el-col>
      <el-col :span="2" :offset="15">
        <el-button size="small" plain type="primary" round @click="toAccountAdd">新增账号</el-button>
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
            align="center"
            header-align="center"
            label="账号状态"
            width="140">
          <template slot-scope="scope">
            <el-switch
                @change="stateChange(scope.$index, scope.row)"
                v-model="scope.row.account_status"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-icon-class="el-icon-unlock"
                inactive-icon-class="el-icon-lock">
            </el-switch>
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
            label="操作"
        >
          <template slot-scope="scope">
            <el-button
                fixed="right"
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
                icon="el-icon-edit"
                type="primary" plain>
              编辑
            </el-button>
            <template>
              <el-popover
                  ref="delete_popover"
                  placement="top"
                  width="160"
                  :value="visible">
                <p>确定要删除该账号吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                  <el-button type="primary" size="mini" @click="handleDelete(scope.$index, scope.row)">确定</el-button>
                </div>
                <el-button
                    slot="reference"
                    size="mini"
                    @click="visible = true"
                    icon="el-icon-delete"
                    type="danger"
                    plain>
                  删除
                </el-button>
              </el-popover>
            </template>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row type="flex" justify="center" style="margin-top: 1%">
      <el-col :span="15">
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
  name: "AccountManage",
  data() {
    return {
      visible: false,
      currentPage: 1,
      total: 0,
      currentSize: 10,
      accountData: [],
      managedApartList:[],
      drawerVisible: false,
      searchForm: {
        company_department_name: '',
        account_status: -1,
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
      ]
    }
  },
  methods: {
    cancelSearch() {
      this.$refs.search_form.resetFields()
      //this.drawerVisible = false
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

    // querySearch(queryString, cb) {
    //   let managedApartList = this.managedApartList;
    //   let results = queryString ? managedApartList.filter(this.createFilter(queryString)) : managedApartList;
    //   // 调用 callback 返回建议列表的数据
    //   clearTimeout(this.timeout);
    //   this.timeout = setTimeout(() => {
    //     cb(results);
    //   }, 1000 * Math.random());
    // },
    //
    // createFilter(queryString) {
    //   return (managedApartList) => {
    //     return (managedApartList.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
    //   };
    // },

    loadAllAccountInfo() {
      const _this = this
      _this.axios.get("https://easydoc.xyz/mock/sEWRf0fW/get_account_info?company_id="+_this.$store.state.company_id+"&user_phone="+_this.$store.state.user_phone +"&current_size="
          +_this.currentSize+"&current_page="+_this.currentPage+"&company_department_name="+_this.searchForm.company_department_name+"&account_status="+_this.searchForm.account_status
          +"&company_employee_phone="+_this.searchForm.company_employee_phone+"&company_employee_role="+_this.searchForm.company_employee_role+"&company_employee_name="+_this.searchForm.company_employee_name )
          .then(function (res) {
            _this.accountData = res.data.accountData
            _this.total = res.data.total
            //console.log(res)
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
      _this.axios.get("https://easydoc.xyz/mock/sEWRf0fW/get_account_info?company_id="+_this.$store.state.company_id+"&user_phone="+_this.$store.state.user_phone +"&current_size="
          +_this.currentSize+"&current_page="+_this.currentPage+"&company_department_name="+_this.searchForm.company_department_name+"&account_status="+_this.searchForm.account_status
          +"&company_employee_phone="+_this.searchForm.company_employee_phone+"&company_employee_role="+_this.searchForm.company_employee_role+"&company_employee_name="+_this.searchForm.company_employee_name )
          .then(function (res) {
            _this.accountData = res.data.accountData
            _this.total = res.data.total
            //console.log(res)
          })
          .catch(function (err) {  //当请求出现错误时的回调函数
            console.log(err);
          });
    },

    handleEdit(index, row) {
      console.log(index, row);
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
      _this.axios.get("https://easydoc.xyz/mock/sEWRf0fW/get_account_info?company_id="+_this.$store.state.company_id+"&user_phone="+_this.$store.state.user_phone +"&current_size="
          +_this.currentSize+"&current_page="+_this.currentPage+"&company_department_name="+_this.searchForm.company_department_name+"&account_status="+_this.searchForm.account_status
          +"&company_employee_phone="+_this.searchForm.company_employee_phone+"&company_employee_role="+_this.searchForm.company_employee_role+"&company_employee_name="+_this.searchForm.company_employee_name )
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
      _this.axios.get("https://easydoc.xyz/mock/sEWRf0fW/get_account_info?company_id="+_this.$store.state.company_id+"&user_phone="+_this.$store.state.user_phone +"&current_size="
          +_this.currentSize+"&current_page="+_this.currentPage+"&company_department_name="+_this.searchForm.company_department_name+"&account_status="+_this.searchForm.account_status
          +"&company_employee_phone="+_this.searchForm.company_employee_phone+"&company_employee_role="+_this.searchForm.company_employee_role+"&company_employee_name="+_this.searchForm.company_employee_name )
          .then(function (res) {
            _this.accountData = res.data.accountData
            _this.total = res.data.total
            //console.log(res)
          })
          .catch(function (err) {  //当请求出现错误时的回调函数
            console.log(err);
          });
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
    this.$store.dispatch('addKeepAlivePage','AccountManage')
   },
  // beforeRouteEnter(to,from,next){
  //   next(vm =>{
  //     if(to.name === 'AccountAdd'){
  //       vm.$store.dispatch('addKeepAlivePage','AccountManage')
  //     }
  //   })
  // }
}
</script>

<style scoped>

</style>