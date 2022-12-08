<template>
  <div class="department_info">
    <el-row type="flex" align="middle">
      <el-col :span="1" style="margin-top: 1%;margin-left: 1%">
        <div style="height: 25px;width: 10px; border-radius:10px;background-color:#3a8ee6"></div>
      </el-col>
      <el-col :span="5" style="margin-top: 1%">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/department_info' }">部门管理</el-breadcrumb-item>
          <el-breadcrumb-item>部门信息</el-breadcrumb-item>
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
            <el-form-item label="部门主管" label-width="80px" style="margin-top: 15%" prop="leader_name">
              <el-input v-model="searchForm.leader_name" placeholder="在此输入其姓名" style="width: 45%">
              </el-input>
            </el-form-item>
            <el-form-item label="分管HR" label-width="80px" style="margin-top: 15%" prop="hr_name">
              <el-input v-model="searchForm.hr_name" placeholder="在此输入其姓名" style="width: 45%">
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
      <el-col :span="2" :offset="15">
        <el-button size="small" plain type="primary" round @click="$router.push('/department_build')">新建部门</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-table
          :data="departmentData"
          style="width: 100%"
          height="588"
          stripe
          empty-text>
        <el-table-column
            prop="company_department_name"
            align="center"
            header-align="center"
            label="部门名称"
            width="160">
<!--          <template slot-scope="scope">-->
<!--            <i class="el-icon-phone-outline"></i>-->
<!--            <span style="margin-left: 10px">{{ scope.row.company_employee_phone }}</span>-->
<!--          </template>-->
        </el-table-column>
        <el-table-column
            prop="leader_name"
            align="center"
            header-align="center"
            label="部门主管"
            width="160">
        </el-table-column>
        <el-table-column
            prop="hr_name"
            align="center"
            header-align="center"
            label="分管HR"
            width="160">
        </el-table-column>
        <el-table-column
            sortable
            prop="company_worker_num"
            align="center"
            header-align="center"
            label="员工数量"
            width="160">
        </el-table-column>
        <el-table-column
            prop="create_time"
            align="center"
            header-align="center"
            label="创建日期"
            width="170">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.create_time }}</span>
          </template>
        </el-table-column>
        <el-table-column
            align="center"
            header-align="center"
            label="部门邀请码"
            width="150">
          <template slot-scope="scope">
            <el-button
                fixed="right"
                size="mini"
                @click="handleVisitCode(scope.$index, scope.row)"
                icon="el-icon-star-off"
                type="success"
                circle>
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
            align="center"
            header-align="center"
            label="操作"
            width="200"
        >
          <template slot-scope="scope">
            <el-button
                fixed="right"
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
                icon="el-icon-edit"
                type="primary" plain>
              查看
            </el-button>
            <template>
              <el-popover
                  ref="delete_popover"
                  placement="top"
                  width="160"
                  :value="visible">
                <p>确定要解散该部门吗？</p>
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
                  解散
                </el-button>
              </el-popover>
            </template>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row type="flex" justify="center" style="margin-top: 1%">
      <el-col :span="10">
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
    name: "DepartmentInfo",
    data(){
      return{
        drawerVisible: false,
        managedApartList: [],
        searchForm: {
          hr_name: '',
          leader_name: '',
          company_department_name: ''
        },
        departmentData: [
          {
            company_department_name: '',
            hr_name: '',
            leader_name: '',
            company_worker_num: 0,
            create_time: ''
          }
        ],
        currentPage: 1,
        total: 0,
        currentSize: 10,
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

      handleSearch() {
        const _this = this
        if(_this.searchForm.hr_name != '' || _this.searchForm.leader_name != '' || _this.searchForm.company_department_name != ''){
          _this.axios.get("https://easydoc.xyz/mock/sEWRf0fW/get_department_info?company_id="+_this.$store.state.company_id+"&user_phone="+_this.$store.state.user_phone +"&current_size="
              +_this.currentSize+"&current_page="+_this.currentPage+"&hr_name="+_this.searchForm.hr_name+"&leader_name="+_this.searchForm.leader_name +"&company_department_name="+_this.searchForm.company_department_name)
              .then(function (res) {
                _this.departmentData = res.data.departmentData
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

      handleSizeChange(val) {
        const _this = this
        _this.currentSize = val
        _this.axios.get("https://easydoc.xyz/mock/sEWRf0fW/get_department_info?company_id="+_this.$store.state.company_id+"&user_phone="+_this.$store.state.user_phone +"&current_size="
            +_this.currentSize+"&current_page="+_this.currentPage+"&hr_name="+_this.searchForm.hr_name+"&leader_name="+_this.searchForm.leader_name +"&company_department_name="+_this.searchForm.company_department_name)
            .then(function (res) {
              _this.departmentData = res.data.departmentData
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
        _this.axios.get("https://easydoc.xyz/mock/sEWRf0fW/get_department_info?company_id="+_this.$store.state.company_id+"&user_phone="+_this.$store.state.user_phone +"&current_size="
            +_this.currentSize+"&current_page="+_this.currentPage+"&hr_name="+_this.searchForm.hr_name+"&leader_name="+_this.searchForm.leader_name +"&company_department_name="+_this.searchForm.company_department_name)
            .then(function (res) {
              _this.departmentData = res.data.departmentData
              _this.total = res.data.total
              //console.log(res)
            })
            .catch(function (err) {  //当请求出现错误时的回调函数
              console.log(err);
            });
      },

      loadAllDepartmentInfo() {
        const _this = this
        _this.axios.get("https://easydoc.xyz/mock/sEWRf0fW/get_department_info?company_id="+_this.$store.state.company_id+"&user_phone="+_this.$store.state.user_phone +"&current_size="
            +_this.currentSize+"&current_page="+_this.currentPage+"&hr_name="+_this.searchForm.hr_name+"&leader_name="+_this.searchForm.leader_name +"&company_department_name="+_this.searchForm.company_department_name)
            .then(function (res) {
              _this.departmentData = res.data.departmentData
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

      handleVisitCode(index, row) {
        this.$confirm(row.company_department_invite_code, '部门邀请码为: ', {
          confirmButtonText: '确定',
          center: true
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
      this.loadAllDepartmentInfo()
      this.$store.dispatch('addKeepAlivePage','DepartmentInfo')
    }
  }
</script>

<style scoped>
  
</style>