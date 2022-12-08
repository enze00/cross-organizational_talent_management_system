<template>
  <div class="recruitment_application">
    <el-row type="flex" align="middle">
      <el-col :span="1" style="margin-top: 1%;margin-left: 1%">
        <div style="height: 25px;width: 10px; border-radius:10px;background-color:#3a8ee6"></div>
      </el-col>
      <el-col :span="5" style="margin-top: 1%">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>对外招聘</el-breadcrumb-item>
          <el-breadcrumb-item>用工申请</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <el-row>
      <el-tabs
          style="margin-top: 1%"
          type="card"
          v-model="tabName"
          @tab-click="handleTabChange"
      >
        <!-- ////////////////这是已通过页面/////////////////////-->
        <el-tab-pane label="已通过" name="already_passed">
          <el-row style="margin-left: 2%">
            <el-table
                :data="already_passed.alreadyPassedData"
                style="width: 100%"
                height="550"
                stripe
                empty-text>
              <el-table-column
                  type="index"
                  align="center"
                  label="序号"
                  header-align="center"
                  width="90">
              </el-table-column>
              <el-table-column
                  prop="apply_job"
                  align="center"
                  header-align="center"
                  label="岗位名称"
                  width="150">
              </el-table-column>
              <el-table-column
                  prop="apply_need_worker"
                  align="center"
                  header-align="center"
                  label="申请数量"
                  width="150">
              </el-table-column>
              <el-table-column
                  prop="apply_department"
                  align="center"
                  header-align="center"
                  label="申请部门"
                  width="150">
              </el-table-column>
              <el-table-column
                  prop="apply_status"
                  align="center"
                  header-align="center"
                  label="当前状态"
                  width="150"
              >
                <template slot-scope="scope">
                  <el-tag size="medium" :type="scope.row.apply_status=='待审核'?'info':(scope.row.apply_status=='已通过'?'success':'danger')">{{ scope.row.apply_status }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column
                  prop="apply_checker_name"
                  align="center"
                  header-align="center"
                  label="审核人"
                  width="140">
              </el-table-column>
              <el-table-column
                  align="center"
                  header-align="center"
                  label="创建时间"
                  width="155">
                <template slot-scope="scope">
                  <i class="el-icon-time"></i>
                  <span style="margin-left: 10px">{{ scope.row.create_time }}</span>
                </template>
              </el-table-column>
              <el-table-column
                  align="center"
                  header-align="center"
                  label="审批时间"
                  width="155">
                <template slot-scope="scope">
                  <i class="el-icon-time"></i>
                  <span style="margin-left: 10px">{{ scope.row.apply_check_time }}</span>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
          <el-row type="flex" justify="center" style="margin-top: 1%">
            <el-col :span="13">
              <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="already_passed.currentPage"
                  :page-sizes="[10, 15, 20, 40]"
                  :page-size="already_passed.currentSize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="already_passed.total">
              </el-pagination>
            </el-col>
          </el-row>
        </el-tab-pane>
        <!-- ////////////////这是未通过页面/////////////////////-->
        <el-tab-pane label="未通过" name="not_pass">
          <el-row style="margin-left: 2%">
            <el-table
                :data="not_pass.notPassData"
                style="width: 100%"
                height="550"
                stripe
                empty-text>
              <el-table-column
                  type="index"
                  align="center"
                  label="序号"
                  header-align="center"
                  width="90">
              </el-table-column>
              <el-table-column
                  prop="apply_job"
                  align="center"
                  header-align="center"
                  label="岗位名称"
                  width="150">
              </el-table-column>
              <el-table-column
                  prop="apply_need_worker"
                  align="center"
                  header-align="center"
                  label="申请数量"
                  width="150">
              </el-table-column>
              <el-table-column
                  prop="apply_department"
                  align="center"
                  header-align="center"
                  label="申请部门"
                  width="150">
              </el-table-column>
              <el-table-column
                  prop="apply_status"
                  align="center"
                  header-align="center"
                  label="当前状态"
                  width="150"
              >
                <template slot-scope="scope">
                  <el-tag size="medium" :type="scope.row.apply_status=='待审核'?'info':(scope.row.apply_status=='已通过'?'success':'danger')">{{ scope.row.apply_status }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column
                  prop="apply_checker_name"
                  align="center"
                  header-align="center"
                  label="审核人"
                  width="140">
              </el-table-column>
              <el-table-column
                  align="center"
                  header-align="center"
                  label="审批时间"
                  width="155">
                <template slot-scope="scope">
                  <i class="el-icon-time"></i>
                  <span style="margin-left: 10px">{{ scope.row.apply_check_time }}</span>
                </template>
              </el-table-column>
              <el-table-column
                  align="center"
                  header-align="center"
                  label="操作"
              >
                <template slot-scope="scope">
                  <el-button
                      slot="reference"
                      size="small"
                      @click="handleNotPassReason(scope.$index, scope.row)"
                      type="primary">
                    查看原因
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
          <el-dialog
              title="未通过原因"
              :visible.sync="not_pass.notPassDialogVisible"
              width="30%"
              top="30vh"
          >
            <span>{{not_pass.reason}}</span>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="not_pass.notPassDialogVisible = false">确 定</el-button>
            </span>
          </el-dialog>
          <el-row type="flex" justify="center" style="margin-top: 1%">
            <el-col :span="13">
              <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="not_pass.currentPage"
                  :page-sizes="[10, 15, 20, 40]"
                  :page-size="not_pass.currentSize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="not_pass.total">
              </el-pagination>
            </el-col>
          </el-row>
        </el-tab-pane>
        <!-- ////////////////这是待审核页面/////////////////////-->
        <el-tab-pane label="待审核" name="wait_confirmed">
          <el-row style="margin-left: 2%">
            <el-table
                :data="wait_confirmed.waitConfirmedData"
                style="width: 100%"
                height="550"
                stripe
                empty-text>
              <el-table-column
                  type="index"
                  align="center"
                  label="序号"
                  header-align="center"
                  width="90">
              </el-table-column>
              <el-table-column
                  prop="apply_job"
                  align="center"
                  header-align="center"
                  label="岗位名称"
                  width="150">
              </el-table-column>
              <el-table-column
                  prop="apply_need_worker"
                  align="center"
                  header-align="center"
                  label="申请数量"
                  width="160">
              </el-table-column>
              <el-table-column
                  prop="apply_department"
                  align="center"
                  header-align="center"
                  label="申请部门"
                  width="160">
              </el-table-column>
              <el-table-column
                  prop="apply_status"
                  align="center"
                  header-align="center"
                  label="当前状态"
                  width="160"
              >
                <template slot-scope="scope">
                  <el-tag size="medium" :type="scope.row.apply_status=='待审核'?'info':(scope.row.apply_status=='已通过'?'success':'danger')">{{ scope.row.apply_status }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column
                  align="center"
                  header-align="center"
                  label="申请时间"
                  width="165">
                <template slot-scope="scope">
                  <i class="el-icon-time"></i>
                  <span style="margin-left: 10px">{{ scope.row.create_time }}</span>
                </template>
              </el-table-column>
              <el-table-column
                  align="center"
                  header-align="center"
                  label="操作"
                  >
                <template slot-scope="scope">

                  <el-button
                      slot="reference"
                      size="small"
                      @click="handlePassClick(scope.$index, scope.row)"
                      type="primary">
                    修改
                  </el-button>
                  <el-button
                      slot="reference"
                      size="small"
                      @click="handleRefuseClick(scope.$index, scope.row)"
                      type="primary" plain>
                    撤销
                  </el-button>
                  <el-dialog>

                  </el-dialog>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
          <el-row type="flex" justify="center" style="margin-top: 1%">
            <el-col :span="13">
              <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="wait_confirmed.currentPage"
                  :page-sizes="[10, 15, 20, 40]"
                  :page-size="wait_confirmed.currentSize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="wait_confirmed.total">
              </el-pagination>
            </el-col>
          </el-row>
        </el-tab-pane>
        <!-- ////////////////这是创建新申请页面/////////////////////-->
        <el-tab-pane label="创建新申请" name="create_application">
          <el-row style="margin-top: 2%">
            <el-col :span="10" :offset="6">
              <el-card
                  class="box-card"
                  shadow="always"
              >
                <el-form
                    :model="create_application.buildForm"
                    :rules="create_application.rules"
                    ref="ruleForm"
                    label-width="100px"
                    class="demo-ruleForm"
                >
                  <el-form-item label="申请人" prop="apply_user" style="margin-top: 2%;margin-left: 3%">
                    <el-input
                        style="width: 60%"
                        v-model="create_application.buildForm.apply_user"
                        disabled
                    >
                    </el-input>
                  </el-form-item>
                  <el-form-item label="申请部门" prop="apply_department" style="margin-top: 8%;margin-left: 3%">
                    <el-input
                        style="width: 60%"
                        v-model="create_application.buildForm.apply_department"
                        disabled
                    >
                    </el-input>
                  </el-form-item>
                  <el-form-item label="申请岗位" prop="apply_job" style="margin-top: 8%;margin-left: 3%">
                    <el-cascader
                        v-model="create_application.buildForm.apply_job"
                        :options="job_name_options"
                        :show-all-levels="false"
                        :props="{ expandTrigger: 'hover' }">
                    </el-cascader>
                  </el-form-item>
                  <el-form-item label="所需员工数量" prop="apply_need_worker" style="margin-top: 8%;margin-left: 3%">
                    <el-input-number v-model="create_application.buildForm.apply_need_worker"  :min="1" :max="10"></el-input-number>
                  </el-form-item>
                  <el-form-item style="margin-left: 5%;margin-top: 8%">
                    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                    <el-button @click="resetForm('buildForm')">重置</el-button>
                  </el-form-item>
                </el-form>
              </el-card>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-row>
  </div>
</template>

<script>
import job_name_options from "@/util/job_name";

export default {
  name: "RecruitmentApplication",
  data() {
    return {
      tabName: 'already_passed',
      managedApartList: [],
      job_name_options,
      already_passed:{
        alreadyPassedData: [],
        currentPage: 1,
        total: 0,
        currentSize: 10,
      },
      not_pass:{
        notPassData: [],
        currentPage: 1,
        total: 0,
        currentSize: 10,
        notPassDialogVisible: false,
        reason: '',
      },
      wait_confirmed:{
        waitConfirmedData: [],
        currentPage: 1,
        total: 0,
        currentSize: 10,
      },
      create_application:{
        buildForm: {
          apply_user: '',
          apply_user_id: '',
          apply_job: '',
          apply_department: '',
          apply_need_worker: 1,
        },
        rules: [],
      }
    }
  },
  methods: {
    handleTabChange(){

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

    loadWaitConfirmedData(){
      const _this = this
      _this.axios.get("https://easydoc.xyz/mock/sEWRf0fW/get_wait_confirmed_info?company_id="+_this.$store.state.company_id+"&user_phone="+_this.$store.state.user_phone
          +"&current_size="+_this.wait_confirmed.currentSize+"&current_page="+_this.wait_confirmed.currentPage )
          .then(function (res) {
            _this.wait_confirmed.waitConfirmedData = res.data.waitConfirmedData
            _this.wait_confirmed.total = res.data.total
            //console.log(res.data)
          })
          .catch(function (err) {  //当请求出现错误时的回调函数
            console.log(err);
          });
    },

    loadNotPassData(){
      const _this = this
      _this.axios.get("https://easydoc.xyz/mock/sEWRf0fW/get_not_pass_info?company_id="+_this.$store.state.company_id+"&user_phone="+_this.$store.state.user_phone
          +"&current_size="+_this.not_pass.currentSize+"&current_page="+_this.not_pass.currentPage )
          .then(function (res) {
            _this.not_pass.notPassData = res.data.notPassData
            _this.not_pass.total = res.data.total
            //console.log(res.data)
          })
          .catch(function (err) {  //当请求出现错误时的回调函数
            console.log(err);
          });
    },

    loadAlreadyPassedData(){
      const _this = this
      _this.axios.get("https://easydoc.xyz/mock/sEWRf0fW/get_already_passed_info?company_id="+_this.$store.state.company_id+"&user_phone="+_this.$store.state.user_phone
          +"&current_size="+_this.already_passed.currentSize+"&current_page="+_this.already_passed.currentPage )
          .then(function (res) {
            _this.already_passed.alreadyPassedData = res.data.alreadyPassedData
            _this.already_passed.total = res.data.total
            //console.log(res.data)
          })
          .catch(function (err) {  //当请求出现错误时的回调函数
            console.log(err);
          });
    },

    handleNotPassReason(index,row){
      //console.log(row)
      this.not_pass.notPassDialogVisible = true
      this.not_pass.reason = row.apply_reason
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  mounted() {
    const _this = this
    _this.loadManagedApartList(data => {
      _this.managedApartList = data
      _this.create_application.buildForm.apply_department = _this.managedApartList[1].label
      //console.log(data)
    })
  },
  created() {
    this.loadNotPassData()
    this.loadWaitConfirmedData()
    this.loadAlreadyPassedData()
    this.create_application.buildForm.apply_user = this.$store.state.user_name
    //this.$store.dispatch('addKeepAlivePage','RecruitmentApplication')
  }
}
</script>

<style scoped>

</style>