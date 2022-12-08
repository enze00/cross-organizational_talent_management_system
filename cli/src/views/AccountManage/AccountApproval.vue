<template>
  <div class="account_approval">
    <el-row type="flex" align="middle">
      <el-col :span="1" style="margin-top: 1%;margin-left: 1%">
        <div style="height: 25px;width: 10px; border-radius:10px;background-color:#3a8ee6"></div>
      </el-col>
      <el-col :span="5" style="margin-top: 1%">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/account_manage' }">账号管理</el-breadcrumb-item>
          <el-breadcrumb-item>入司审核</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <el-row style="margin-top: 1%">
      <el-col :span="5">
        <el-input v-if="search_type == '全体员工'||search_type == '员工姓名'||search_type == '员工手机号'||search_type == '账号状态'||search_type == '员工身份'"
                  placeholder="请输入搜索内容"
                  v-model="search_content"
                  class="input-with-select"
                  size="small">
          <el-select v-model="search_type" slot="prepend" placeholder="请选择">
            <el-option label="全体员工" value="全体员工"></el-option>
            <el-option label="员工姓名" value="员工姓名"></el-option>
            <el-option label="员工手机号" value="员工手机号"></el-option>
            <el-option label="员工身份" value="员工身份"></el-option>
            <el-option label="员工部门" value="员工部门"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
        </el-input>
        <el-autocomplete
            v-if="search_type == '员工部门'"
            v-model="search_content"
            class="input-with-select"
            size="small"
            :fetch-suggestions="querySearch"
            placeholder="请输入搜索内容">
          <el-select v-model="search_type" slot="prepend" placeholder="请选择">
            <el-option label="全体员工" value="全体员工"></el-option>
            <el-option label="员工姓名" value="员工姓名"></el-option>
            <el-option label="员工手机号" value="员工手机号"></el-option>
            <el-option label="账号状态" value="账号状态"></el-option>
            <el-option label="员工身份" value="员工身份"></el-option>
            <el-option label="员工部门" value="员工部门"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
        </el-autocomplete>
      </el-col>
      <el-col :span="5" :offset="14">
        <el-radio-group v-model="passStatusType" size="small" @change="handleIsClickChange">
          <el-radio-button label="待审核"></el-radio-button>
          <el-radio-button label="已通过"></el-radio-button>
          <el-radio-button label="未通过"></el-radio-button>
        </el-radio-group>
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
            prop="company_employee_name"
            width="150">
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
            width="150">
        </el-table-column>
        <el-table-column
            align="center"
            header-align="center"
            label="员工职位"
            width="150"
            prop="company_employee_position">
        </el-table-column>
        <el-table-column
            align="center"
            header-align="center"
            label="审核状态"
            width="150"
        >
          <template slot-scope="scope">
            <el-tag size="medium" :type="scope.row.pass_status=='待审核'?'':(scope.row.pass_status=='已通过'?'success':'danger')">{{ scope.row.pass_status }}</el-tag>
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
                  size="mini"
                  @click="handlePassClick(scope.$index, scope.row)"
                  icon="el-icon-check"
                  type="primary" plain>
                通过
              </el-button>

              <el-button
                  slot="reference"
                  size="mini"
                  @click="handleRefuseClick(scope.$index, scope.row)"
                  icon="el-icon-close"
                  type="danger"
                  plain>
                拒绝
              </el-button>
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
    <el-dialog title="账号设置" :visible.sync="visible_pass" width="45%">
      <el-scrollbar
          style="height: 314px;"
          wrap-style="overflow-x:hidden;
          overflow-y:show;">
        <el-form
            ref="form"
            :model="checkerData"
            label-width="20%"
            label-suffix=":">
          <el-form-item label="员工姓名">
            <el-input
                v-model="checkerData.company_employee_name"
                :disabled="true"
                style="width: 40%">
            </el-input>
          </el-form-item>
          <el-form-item label="员工部门">
            <el-input
                v-model="checkerData.company_department_name"
                :disabled="true"
                style="width: 40%">
            </el-input>
          </el-form-item>
          <el-form-item label="员工身份">
            <el-input
                v-model="checkerData.company_employee_role"
                :disabled="true"
                style="width: 40%">
            </el-input>
          </el-form-item>
          <el-form-item label="员工职位">
            <el-input
                v-model="checkerData.company_employee_position"
                :disabled="true"
                style="width: 40%">
            </el-input>
          </el-form-item>
          <el-form-item label="账号状态">
            <el-switch
                v-model="checkerData.account_status"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-icon-class="el-icon-unlock"
                inactive-icon-class="el-icon-lock">
            </el-switch>
          </el-form-item>
          <el-form-item label="可见部门" prop="company_department_limit"  v-if="!(checkerData.company_employee_role == '普通员工' || checkerData.company_employee_role == '实习员工') ? true : false">
            <el-radio v-model="checkerData.company_department_limit" label="所有部门" border>所有部门</el-radio>
            <el-radio v-model="checkerData.company_department_limit" label="分管部门" border>分管部门</el-radio>
          </el-form-item>
          <el-form-item label="可见页面" prop="company_visual_page_limit" v-if="!(checkerData.company_employee_role == '普通员工' || checkerData.company_employee_role == '实习员工') ? true : false" >
            <tree-transfer
                :to_data="tmpList"
                :from_data="pageList"
                :mode="mode"
                :title="['待选页面', '已选页面']"
                height='300px'
                @addBtn='addBtn'
                @removeBtn='removeBtn'
                openAll
            >
            </tree-transfer>
          </el-form-item>
        </el-form>
      </el-scrollbar>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visible_pass = false">取 消</el-button>
        <el-button type="primary" @click="handlePass">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="拒绝原因" :visible.sync="visible_refuse" width="30%" :center="false">
      <el-input
          type="textarea"
          :rows="4"
          placeholder="请输入拒绝原因"
          v-model="checkerData.textarea">
      </el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visible_refuse = false">取 消</el-button>
        <el-button type="primary" @click="handleRefuse">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import treeTransfer from 'el-tree-transfer'
  export default {
    name: "AccountApproval",
    data(){
      return{
        search_type: '全体员工',
        search_content: '',
        visible_refuse: false,
        visible_pass: false,
        currentPage: 1,
        total: 0,
        passStatusType: '待审核',
        currentSize: 10,
        accountData: [],
        managedApartList:[],
        checkerData: {
          company_employee_name: '',
          company_employee_position: '',
          company_department_name: '',
          company_employee_role: '',
          company_department_limit: '分管部门',
          account_status: '',
          textarea: '',
          pass_status: '',
          company_employee_phone: '',
          company_visual_page_limit: []
        },
        pageList: [
          {
            id:'0',
            pid:0,
            label:"主页"
          },
          {
            id:'1',
            pid:0,
            label:"账号管理",
            children: [
              {
                id:'1-1',
                pid:'1',
                label:"账号信息"
              },
              {
                id:'1-2',
                pid:'1',
                label:"新增账号"
              },
              {
                id:'1-3',
                pid:'1',
                label:"入司审批"
              },
            ]
          },
          {
            id:'2',
            pid:0,
            label:"部门管理",
            children: [
              {
                id:'2-1',
                pid:'2',
                label:"部门信息"
              },
              {
                id:'2-2',
                pid:'2',
                label:"新建部门"
              }
            ]
          },
          {
            id:'3',
            pid:0,
            label:"员工档案",
            children: [
              {
                id:'3-1',
                pid:'3',
                label:"档案信息"
              },
              {
                id:'3-2',
                pid:'3',
                label:"记录重大违纪"
              }
            ]
          },
          {
            id:'4',
            pid:0,
            label:"定期评价"
          },
          {
            id:'5',
            pid:0,
            label:"对外招聘",
            children: [
              {
                id:'5-1',
                pid:'5',
                label:"招聘管理"
              },
              {
                id:'5-2',
                pid:'5',
                label:"人才库"
              },
              {
                id:'5-3',
                pid:'5',
                label:"面试信息"
              }
            ]
          },
          {
            id:'6',
            pid:0,
            label:"统计图表",
            children: [
              {
                id:'6-1',
                pid:'6',
                label:"历年人数"
              },
              {
                id:'6-2',
                pid:'6',
                label:"员工概况"
              }
            ]
          },
          {
            id:'7',
            pid:0,
            label:"出勤管理"
          },
          {
            id:'8',
            pid:0,
            label:"积分商城"
          }
        ],
        tmpList:[],
        mode: "transfer"
      }
    },
    methods:{
      addBtn(fromData,toData,obj) {
        this.tmpList = toData
        console.log(this.tmpList);
      },
      removeBtn(fromData,toData,obj) {
        this.tmpList = toData
        console.log(this.tmpList);
      },

      handleIsClickChange() {
        const _this = this
        _this.axios.get("https://easydoc.xyz/mock/NrvIhraS/get_account_checker_info?company_id="+_this.$store.state.company_id+"&user_phone="+_this.$store.state.user_phone
            +"&current_size"+_this.currentSize+"&current_page="+_this.currentPage+"&search_type="+_this.search_type+"&search_content="+_this.search_content+"&pass_status="+_this.passStatusType )
            .then(function (res) {
              _this.accountData = res.data.accountData
              _this.total = res.data.total
              //console.log(res)
            })
            .catch(function (err) {  //当请求出现错误时的回调函数
              console.log(err);
            });
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

      querySearch(queryString, cb) {
        let managedApartList = this.managedApartList;
        let results = queryString ? managedApartList.filter(this.createFilter(queryString)) : managedApartList;
        // 调用 callback 返回建议列表的数据
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(results);
        }, 1000 * Math.random());
      },

      createFilter(queryString) {
        return (managedApartList) => {
          return (managedApartList.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },

      loadAllAccountInfo() {
        const _this = this
        _this.axios.get("https://easydoc.xyz/mock/NrvIhraS/get_account_checker_info?company_id="+_this.$store.state.company_id+"&user_phone="+_this.$store.state.user_phone
            +"&current_size="+_this.currentSize+"&current_page="+_this.currentPage+"&search_type="+_this.search_type+"&search_content="+_this.search_content+"&pass_status="+_this.passStatusType )
            .then(function (res) {
              _this.accountData = res.data.accountData
              _this.total = res.data.total
              //console.log(res)
            })
            .catch(function (err) {  //当请求出现错误时的回调函数
              console.log(err);
            });
      },

      handleSearch() {
        const _this = this
        if ((_this.search_type == '全体员工' && this.search_content == '')||(this.search_type != '全体员工' && this.search_content != '')){
          _this.axios.get("https://easydoc.xyz/mock/NrvIhraS/get_account_checker_info?company_id="+_this.$store.state.company_id+"&user_phone="+_this.$store.state.user_phone
              +"&current_size="+_this.currentSize+"&current_page="+_this.currentPage+"&search_type="+_this.search_type+"&search_content="+_this.search_content+"&pass_status="+_this.passStatusType )
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
      handlePass() {
        const _this = this
        if (_this.checkerData.company_employee_role != '普通员工' && _this.checkerData.company_employee_role != '实习员工'){
          const arr = Array.from(_this.tmpList);
          arr.forEach(item => {
            if (item.pid == 0 && !(item.children)){
              _this.checkerData.company_visual_page_limit.push(item.label)
            }else if ((item.children)){
              let childs = Array.from(item.children)
              childs.forEach(val => {
                _this.checkerData.company_visual_page_limit.push(val.label)
              })
            }else if (item.pid != 0){
              _this.checkerData.company_visual_page_limit.push(item.label)
            }
          })
          _this.tmpList = []
          console.log(_this.checkerData.company_visual_page_limit);
          _this.checkerData.company_visual_page_limit = []
        }
        //axios提交表单后要返回新的页面数据以刷新
        this.visible_pass = false
      },

      handlePassClick(index, row) { //用于提交审核通过的请求
        this.visible_pass = true
        this.checkerData.company_employee_phone = row.company_employee_phone
        this.checkerData.account_status = row.account_status
        this.checkerData.company_employee_role = row.company_employee_role
        this.checkerData.company_department_name = row.company_department_name
        this.checkerData.company_employee_position = row.company_employee_position
        this.checkerData.company_employee_name = row.company_employee_name
        console.log(index, row);
      },

      handleRefuse() { //用于提交审核不通过的请求
        if (this.checkerData.textarea.length > 0){
          this.visible_refuse = false
          this.axios.post()
        }
      },
      handleRefuseClick(index, row) {
        this.visible_refuse = true
        this.checkerData.company_employee_phone = row.company_employee_phone
        console.log(row);
      },

      handleSizeChange(val) {
        const _this = this
        _this.currentSize = val
        _this.axios.get("https://easydoc.xyz/mock/NrvIhraS/get_account_checker_info?company_id="+_this.$store.state.company_id+"&user_phone="+_this.$store.state.user_phone
            +"&current_size="+_this.currentSize+"&current_page="+_this.currentPage+"&search_type="+_this.search_type+"&search_content="+_this.search_content+"&pass_status="+_this.passStatusType )
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
        _this.axios.get("https://easydoc.xyz/mock/NrvIhraS/get_account_checker_info?company_id="+_this.$store.state.company_id+"&user_phone="+_this.$store.state.user_phone
            +"&current_size="+_this.currentSize+"&current_page="+_this.currentPage+"&search_type="+_this.search_type+"&search_content="+_this.search_content+"&pass_status="+_this.passStatusType )
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
      this.$store.dispatch('addKeepAlivePage','AccountApproval')
    },
    components:{
      treeTransfer
    }
  }
</script>

<style scoped>
  
</style>