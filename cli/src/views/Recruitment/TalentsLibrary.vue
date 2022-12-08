<template>
  <div class="talents_library">
    <el-row type="flex" align="middle">
      <el-col :span="1" style="margin-top: 1%;margin-left: 1%">
        <div style="height: 25px;width: 10px; border-radius:10px;background-color:#3a8ee6"></div>
      </el-col>
      <el-col :span="5" style="margin-top: 1%">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/recruitment_manage">对外招聘</el-breadcrumb-item>
          <el-breadcrumb-item>人才库</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="5" :offset="17" style="margin-top: 2%">
        <el-button type="primary" icon="el-icon-search" :disabled="tabName != 'system_recommend'" @click="drawerVisible=true" size="small" plain>筛选</el-button>
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
    </el-row>
    <el-tabs
        style="margin-top: 1%"
        type="card"
        v-model="tabName"
        @tab-click="handleTabChange"
    >
      <!-- ////////////////这是系统推荐页面/////////////////////-->
      <el-tab-pane label="系统推荐" name="system_recommend">
        <el-row style="margin-left: 2%">
          <el-scrollbar
              style="height: 530px;"
              wrap-style="overflow-x:hidden; overflow-y:show;"
          >
            <el-card
                style="width: 98%;height: 120px; margin-top: 4px" shadow="hover"
                v-for="(item,index) in system_recommend.systemRecommendData"
                :key="index"
            >
              <el-row align="center" justify="center" type="flex">
                <el-col :span="3" >
                  <h3 style="margin-left: 20%">{{item.talent_name}}</h3>
                  <span style="margin-left: 20%; color: #42b983">{{item.talent_edu_qualification}}</span>
                </el-col>
                <el-col :span="4" :offset="1">
                  <div style="margin-top: 5%;height: 100%;line-height: 100%;">
                    <br>
                    <p>推荐岗位:{{item.talent_recommend_job}}</p>
                  </div>
                </el-col>
                <el-col :span="4" :offset="1">
                  <div style="margin-top: 5%;height: 100%;line-height: 100%;">
                    <br>
                    <p>推荐部门:{{item.talent_recommend_department}}</p>
                  </div>
                </el-col>
                <el-col :span="4" :offset="1">
                  <div style="margin-top: 5%;height: 100%;line-height: 100%;">
                    <br>
                    <p>预估成本(月):{{item.talent_money}}k</p>
                  </div>
                </el-col>
                <el-col :span="3" :offset="1">
                  <div style="margin-top: 5%;height: 100%;line-height: 100%;">
                    <br>
                    <p>系统评分:{{item.talent_score}}</p>
                  </div>
                </el-col>
                <el-col :span="2" offset="1" >
                  <div style="margin-top: 8%;height: 100%;line-height: 100%;">
                    <br>
                    <el-button size="small" type="primary" @click="showPersonalArchives(item)" plain>个人档案</el-button>
                  </div>
                </el-col>
                <el-col :span="2">
                  <div style="margin-top: 8%;height: 100%;line-height: 100%;">
                    <br>
                    <el-button size="small" type="primary" @click="submitApproval">工作经历</el-button>
                  </div>
                </el-col>
                <el-col :span="2">
                  <el-row type="flex" justify="center">
                    <el-col :span="4">
                      <el-tooltip placement="top">
                        <div slot="content">删除该条信息</div>
                        <el-button size="mini" type="danger" icon="el-icon-delete" circle></el-button>
                      </el-tooltip>
                    </el-col>
                  </el-row>
                  <el-row type="flex" justify="center" style="margin-top: 30%">
                    <el-col :span="4">
                      <el-tooltip placement="top">
                        <div slot="content">发送面试邀请</div>
                        <el-button size="mini" type="success" icon="el-icon-s-promotion" circle @click="openInvitationDialog(item)"></el-button>
                      </el-tooltip>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </el-card>
          </el-scrollbar>
        </el-row>
        <el-row type="flex" justify="center" style="margin-top: 1%">
          <el-col :span="13">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="system_recommend.currentPage"
                :page-sizes="[5, 10, 15, 20]"
                :page-size="system_recommend.currentSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="system_recommend.total">
            </el-pagination>
          </el-col>
        </el-row>
      </el-tab-pane>
      <!-- ////////////////这是查找档案页面/////////////////////-->
      <el-tab-pane label="查找档案" name="search_archives">
        <el-row style="margin-left: 2%">
          <el-row type="flex" justify="center" style="margin: 2%">
            <el-col :span="14">
              <el-input placeholder="请输入内容" v-model="search_archives.search_content" class="input-with-select">
                <el-select style="width: 110px" v-model="search_archives.search_type" slot="prepend" placeholder="请选择">
                  <el-option label="姓名" value="name"></el-option>
                  <el-option label="手机号" value="phone"></el-option>
                  <el-option label="身份证号" value="id_card"></el-option>
                </el-select>
                <el-button slot="append" icon="el-icon-search" @click="searchTalent"></el-button>
              </el-input>
            </el-col>
          </el-row>
          <el-scrollbar
              style="height: 400px;"
              wrap-style="overflow-x:hidden; overflow-y:show;"
          >
            <el-card
                style="width: 98%;height: 120px; margin-top: 4px" shadow="hover"
                v-for="(item,index) in search_archives.searchArchivesData"
                :key="index"
            >
              <el-row align="center" justify="center" type="flex">
                <el-col :span="3" >
                  <h3 style="margin-left: 20%">{{item.talent_name}}</h3>
                  <span style="margin-left: 20%; color: #42b983">{{item.talent_edu_qualification}}</span>
                </el-col>
                <el-col :span="4" :offset="1">
                  <div style="margin-top: 5%;height: 100%;line-height: 100%;">
                    <br>
                    <p>性别: {{item.talent_sex}}</p>
                  </div>
                </el-col>
                <el-col :span="4" :offset="1">
                  <div style="margin-top: 5%;height: 100%;line-height: 100%;">
                    <br>
                    <p>年龄: {{item.talent_age}} 岁</p>
                  </div>
                </el-col>
                <el-col :span="4" :offset="1">
                  <div style="margin-top: 5%;height: 100%;line-height: 100%;">
                    <br>
                    <p>工龄: {{item.talent_work_time}} 年</p>
                  </div>
                </el-col>
                <el-col :span="3" :offset="1">
                  <div style="margin-top: 5%;height: 100%;line-height: 100%;">
                    <br>
                    <p>系统评分: {{item.talent_score}}</p>
                  </div>
                </el-col>
                <el-col :span="2" offset="1" >
                  <div style="margin-top: 8%;height: 100%;line-height: 100%;">
                    <br>
                    <el-button size="small" type="primary" @click="showPersonalArchives(item)" plain>个人档案</el-button>
                  </div>
                </el-col>
                <el-col :span="2">
                  <div style="margin-top: 8%;height: 100%;line-height: 100%;">
                    <br>
                    <el-button size="small" type="primary" @click="submitApproval">工作经历</el-button>
                  </div>
                </el-col>
                <el-col :span="2">
                  <el-row type="flex" justify="center">
                    <el-col :span="4">
                      <el-tooltip placement="top">
                        <div slot="content">删除该条信息</div>
                        <el-button size="mini" type="danger" icon="el-icon-delete" circle></el-button>
                      </el-tooltip>
                    </el-col>
                  </el-row>
                  <el-row type="flex" justify="center" style="margin-top: 30%">
                    <el-col :span="4">
                      <el-tooltip placement="top">
                        <div slot="content">发送面试邀请</div>
                        <el-button size="mini" type="success" icon="el-icon-s-promotion" circle @click="openInvitationDialog(item)"></el-button>
                      </el-tooltip>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </el-card>
          </el-scrollbar>
        </el-row>
      </el-tab-pane>
      <!-- ////////////////这是档案库页面/////////////////////-->
      <el-tab-pane label="档案库" name="archives_library">
        <el-row style="margin-left: 2%">
          <el-scrollbar
              style="height: 530px;"
              wrap-style="overflow-x:hidden; overflow-y:show;"
          >
            <el-card
                style="width: 98%;height: 120px; margin-top: 4px" shadow="hover"
                v-for="(item,index) in archives_library.archivesLibraryData"
                :key="index"
            >
              <el-row align="center" justify="center" type="flex">
                <el-col :span="3" >
                  <h3 style="margin-left: 20%">{{item.talent_name}}</h3>
                  <span style="margin-left: 20%; color: #42b983">{{item.talent_edu_qualification}}</span>
                </el-col>
                <el-col :span="4" :offset="1">
                  <div style="margin-top: 5%;height: 100%;line-height: 100%;">
                    <br>
                    <p>推荐岗位:{{item.talent_recommend_job}}</p>
                  </div>
                </el-col>
                <el-col :span="4" :offset="1">
                  <div style="margin-top: 5%;height: 100%;line-height: 100%;">
                    <br>
                    <p>推荐部门:{{item.talent_recommend_department}}</p>
                  </div>
                </el-col>
                <el-col :span="4" :offset="1">
                  <div style="margin-top: 5%;height: 100%;line-height: 100%;">
                    <br>
                    <p>预估成本(月):{{item.talent_money}}k</p>
                  </div>
                </el-col>
                <el-col :span="3" :offset="1">
                  <div style="margin-top: 5%;height: 100%;line-height: 100%;">
                    <br>
                    <p>系统评分:{{item.talent_score}}</p>
                  </div>
                </el-col>
                <el-col :span="2" offset="1" >
                  <div style="margin-top: 8%;height: 100%;line-height: 100%;">
                    <br>
                    <el-button size="small" type="primary" @click="showPersonalArchives(item)" plain>个人档案</el-button>
                  </div>
                </el-col>
                <el-col :span="2">
                  <div style="margin-top: 8%;height: 100%;line-height: 100%;">
                    <br>
                    <el-button size="small" type="primary" @click="showHistory(item)">工作经历</el-button>
                  </div>
                </el-col>
                <el-col :span="2">
                  <el-row type="flex" justify="center">
                    <el-col :span="4">
                      <el-tooltip placement="top">
                        <div slot="content">删除该条信息</div>
                        <el-button size="mini" type="danger" icon="el-icon-delete" circle></el-button>
                      </el-tooltip>
                    </el-col>
                  </el-row>
                  <el-row type="flex" justify="center" style="margin-top: 30%">
                    <el-col :span="4">
                      <el-tooltip placement="top">
                        <div slot="content">发送面试邀请</div>
                        <el-button size="mini" type="success" icon="el-icon-s-promotion" circle @click="openInvitationDialog(item)"></el-button>
                      </el-tooltip>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </el-card>
          </el-scrollbar>
        </el-row>
        <el-row type="flex" justify="center" style="margin-top: 1%">
          <el-col :span="13">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="system_recommend.currentPage"
                :page-sizes="[5, 10, 15, 20]"
                :page-size="system_recommend.currentSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="system_recommend.total">
            </el-pagination>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-dialog title="过往工作经历" :visible.sync="archives_library.historyVisible">
        <el-scrollbar
            style="height: 450px;"
            wrap-style="overflow-x:hidden; overflow-y:show;"
        >
          <el-timeline>
            <el-timeline-item
                color="#409EFF"
                :timestamp="item.company_enter_time"
                placement="top"
                v-for="(item,index) in archives_library.employeeHistoryData"
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
      <el-dialog title="面试邀请" :visible.sync="inviteForm.inviteVisible" width="40%" :before-close="clearInvite">
        <el-form ref="inviteForm" :model="inviteForm" label-width="140px">
          <el-form-item label="面试时间" prop="interview_time">
            <el-col :span="11">
              <el-date-picker type="date" placeholder="请选择面试日期" v-model="inviteForm.interview_time" style="width: 100%;"></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="面试时长" style="margin-top: 10%" prop="interview_duration">
            <el-col :span="11">
              <el-input-number v-model="inviteForm.interview_duration" :precision="1" controls-position="right" :step="0.5" :min="0.5" :max="10"></el-input-number>
            </el-col>
          </el-form-item>
          <el-form-item label="面试方式" style="margin-top: 10%" prop="interview_way">
            <el-col :span="11" >
              <el-select v-model="inviteForm.interview_way"  placeholder="请选择面试方式">
                <el-option
                    label="线上电话面试"
                    value="线上电话面试"
                >
                  线上电话面试
                </el-option>
                <el-option
                    label="线上视频面试"
                    value="线上视频面试"
                >
                  线上视频面试
                </el-option>
                <el-option
                    label="线下面试"
                    value="线下面试"
                >
                  线下面试
                </el-option>
              </el-select>
            </el-col>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="clearInvite" >取 消</el-button>
          <el-button type="primary" @click="submitInvitation">确 定</el-button>
        </div>
      </el-dialog>
    </el-tabs>
  </div>
</template>

<script>
  export default {
    name: "TalentsLibrary",
    props: {
      company_id: {
        type: String,
        default: 'no data'
      },
      hr_phone: {
        type: String,
        default: 'no data'
      },
      talent_phone: {
        type: String,
        default: 'no data'
      }
    },
    data(){
      return{
        tabName: 'system_recommend',
        drawerVisible: false,
        system_recommend: {
          systemRecommendData: [],
          currentSize: '',
          currentPage: '',
          total: ''
        },
        search_archives: {
          searchArchivesData:[],
          search_content: '',
          search_type: '',

        },
        archives_library: {
          historyVisible: false,
          employeeHistoryData:[],
          archivesLibraryData: [],
          currentSize: '',
          currentPage: '',
          total: ''
        },
        inviteForm: {
          inviteVisible: false,
          interview_time: '',
          interview_duration: '',
          interview_way: '',
          talent_name: '',
          talent_phone: ''
        },
        searchForm: {
          hr_name: '',
          leader_name: '',
          company_department_name: ''
        },
      }
    },
    methods:{
      submitApproval() {
        this.$confirm('您还未取得查阅该用户过往工作经历档案的权限，是否向其发送查阅申请？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '发送成功!',
            offset: 150
          });
          this.$notify({
            title: '成功',
            message: '用户通过申请后您可在档案库中查阅其过往经历档案！',
            type: 'success'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消发送',
            offset: 150
          });
        });
      },

      showPersonalArchives(data) {
        const _this = this
        _this.$router.push({
          path:'/personal_archives',
          query: {
            company_id: _this.$store.state.company_id,
            hr_phone: _this.$store.state.user_phone,
            talent_phone: data.talent_phone,
            talent_name: data.talent_name
          }
        })
      },

      loadSystemRecommendData(){
        const _this = this
        _this.axios.get("https://easydoc.xyz/mock/sEWRf0fW/get_system_recommend_info?company_id="+_this.$store.state.company_id+"&user_phone="+_this.$store.state.user_phone
            +"&current_size="+_this.system_recommend.currentSize+"&current_page="+_this.system_recommend.currentPage )
            .then(function (res) {
              _this.system_recommend.systemRecommendData = res.data.systemRecommendData
              _this.system_recommend.total = res.data.total
              //console.log(res.data)
            })
            .catch(function (err) {  //当请求出现错误时的回调函数
              console.log(err);
            });
      },

      loadArchivesLibraryData(){
        const _this = this
        _this.axios.get("https://easydoc.xyz/mock/sEWRf0fW/get_archives_library_info?company_id="+_this.$store.state.company_id+"&user_phone="+_this.$store.state.user_phone
            +"&current_size="+_this.archives_library.currentSize+"&current_page="+_this.archives_library.currentPage )
            .then(function (res) {
              _this.archives_library.archivesLibraryData = res.data.archivesLibraryData
              _this.archives_library.total = res.data.total
              //console.log(res.data)
            })
            .catch(function (err) {  //当请求出现错误时的回调函数
              console.log(err);
            });
      },

      searchTalent() {
        const _this = this
        _this.axios.get("https://easydoc.xyz/mock/sEWRf0fW/get_search_archives_info?company_id="+_this.$store.state.company_id+"&user_phone="+_this.$store.state.user_phone
            +"&search_type="+_this.search_archives.search_type+"&search_content="+_this.search_archives.search_content )
            .then(function (res) {
              _this.search_archives.searchArchivesData = res.data.searchArchivesData
              //console.log(res.data)
            })
            .catch(function (err) {  //当请求出现错误时的回调函数
              console.log(err);
            });
      },

      showHistory(item) {
        const _this = this
        this.$notify({
          title: '提醒',
          message: '您查阅该档案的时间还有 20 天！',
          type: 'warning'
        });
        setTimeout(function () {
          _this.axios.get("https://easydoc.xyz/mock/sEWRf0fW/get_history_experience?company_id="+_this.$store.state.company_id+"&user_phone="+_this.$store.state.user_phone +"&company_employee_phone="+item.talent_phone)
              .then(function (res) {
                _this.archives_library.employeeHistoryData = res.data.employeeHistoryData
                _this.archives_library.historyVisible = true
              })
              .catch(function (err) {  //当请求出现错误时的回调函数
                console.log(err);
              });
        },500)
      },

      showHistoryDetail(data) {
        const _this = this
        _this.historyVisible = false
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

      clearInvite() {
        this.$refs.inviteForm.resetFields()
        this.inviteForm.inviteVisible = false
      },

      openInvitationDialog(item) {
        //console.log(item);
        this.inviteForm.talent_name = item.talent_name
        this.inviteForm.talent_phone = item.talent_phone
        this.inviteForm.inviteVisible = true
      },

      submitInvitation() {                  //发送面试邀请
        this.inviteForm.inviteVisible = false
        this.$message({
          message: '面试邀请发布成功！',
          type: 'success',
          offset:'100'
        });
      }

    },
    mounted() {

    },
    created() {
      this.loadSystemRecommendData()
      this.loadArchivesLibraryData()
    },
    beforeRouteEnter(to,from,next){
      next(vm =>{
        if(from.name === 'HistoryDetail'){
          vm.tabName = 'archives_library'
          // console.log(vm.$store.state.company_id)
          // console.log(vm.$store.state.user_phone)
           //console.log(vm.talent_phone)
          vm.axios.get("https://easydoc.xyz/mock/sEWRf0fW/get_history_experience?company_id="+vm.$store.state.company_id+"&user_phone="+vm.$store.state.user_phone +"&company_employee_phone="+vm.talent_phone)
              .then(function (res) {
                vm.archives_library.employeeHistoryData = res.data.employeeHistoryData
                vm.archives_library.historyVisible = true
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