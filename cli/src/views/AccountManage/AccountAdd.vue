<template>
  <div class="account_add">
    <el-row type="flex" align="middle">
      <el-col :span="1" style="margin-top: 1%;margin-left: 1%">
        <div style="height: 25px;width: 10px; border-radius:10px;background-color:#3a8ee6"></div>
      </el-col>
      <el-col :span="5" style="margin-top: 1%">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/account_manage' }">账号管理</el-breadcrumb-item>
          <el-breadcrumb-item>新增账号</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2" style="margin-left: 5%;margin-top: 3%">
        <div style="font-weight: bolder;text-shadow:3px 4px 4px #7ADFF2">基本信息</div>
      </el-col>
    </el-row>
    <el-form
        status-icon
        :rules="rules"
        ref="accountAddForm"
        :model="accountAddForm"
        label-suffix=":"
        label-width="90px"
    >
      <el-row style="margin-top: 2%">
        <el-col :span="5" :offset="3">
          <el-form-item label="员工姓名" prop="user_name" >
            <el-input v-model="accountAddForm.user_name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="1">
          <el-form-item label="员工账号" prop="user_phone" >
            <el-input
                maxlength="11"
                show-word-limit
                v-model="accountAddForm.user_phone"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5" :offset="2">
          <el-form-item label="账号状态" prop="account_status" >
            <el-switch
                v-model="accountAddForm.account_status"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-icon-class="el-icon-unlock"
                inactive-icon-class="el-icon-lock">
            </el-switch>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2" style="margin-left: 5%;margin-top: 1%">
          <div style="font-weight: bolder;text-shadow:3px 4px 4px #7ADFF2">身份设置</div>
        </el-col>
      </el-row>
      <el-row style="margin-top: 2%;margin-left: 5%">
        <el-form-item prop="account_status" >
          <el-radio v-model="accountAddForm.company_employee_role" label="HR" border>HR</el-radio>
          <el-radio v-model="accountAddForm.company_employee_role" label="部门主管" border>部门主管</el-radio>
          <el-radio v-model="accountAddForm.company_employee_role" label="普通员工" border>普通员工</el-radio>
          <el-radio v-model="accountAddForm.company_employee_role" label="实习员工" border>实习员工</el-radio>
        </el-form-item>
      </el-row>
      <el-row>
        <el-col :span="2" style="margin-left: 5%;margin-top: 1%">
          <div style="font-weight: bolder;text-shadow:3px 4px 4px #7ADFF2">权限设置</div>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center" align="center" v-if="(accountAddForm.company_employee_role == '普通员工' || accountAddForm.company_employee_role == '实习员工') ? true : false">
        <el-col :span="12" :offset="5" style="margin-top: 3%">
          "普通员工"及"实习员工"无需设置权限~
        </el-col>
      </el-row>
      <el-row style="margin-top: 2%;margin-left: 5%">
        <el-form-item label="可见部门" prop="company_department_limit"  v-if="!(accountAddForm.company_employee_role == '普通员工' || accountAddForm.company_employee_role == '实习员工') ? true : false">
          <el-radio v-model="accountAddForm.company_department_limit" label="所有部门" border>所有部门</el-radio>
          <el-radio v-model="accountAddForm.company_department_limit" label="分管部门" border>分管部门</el-radio>
        </el-form-item>
      </el-row>
      <el-row style="margin-left: 5%">
        <el-col :span="17">
          <el-form-item label="可见页面" prop="company_visual_page_limit" v-if="!(accountAddForm.company_employee_role == '普通员工' || accountAddForm.company_employee_role == '实习员工') ? true : false" >
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
        </el-col>
        <el-col :span="6" style="margin-top: 20%">
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button @click="clear">清空</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import treeTransfer from 'el-tree-transfer'

  export default {
    name: "AccountAdd",
    data(){
      let validatePhone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入员工账号'));
        } else {
          if (/^((1[3,5,8,7,9][0-9])|(14[5,7])|(17[0,6,7,8])|(19[1,7]))\d{8}$/.test(value)) {
            callback();
          }else {
            callback(new Error('请正确输入账号'));
          }
          callback();
        }
      };
      return{
        accountAddForm: {
          user_name: '',
          user_phone: '',
          account_status: true,
          company_employee_role: '普通员工',
          company_department_limit: '分管部门',
          company_visual_page_limit:[]
        },
        rules: {
          user_name: [
            { required: true, message: '请输入员工姓名', trigger: 'blur' },
            { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
          ],
          user_phone: [
            { required: true,validator: validatePhone, trigger: 'blur' }
          ],
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
      clear() {
        this.$refs.accountAddForm.resetFields()
      },
      onSubmit() {
        const _this = this
        _this.$refs.accountAddForm.validate(valid => {
          if(valid){
            /////////////////////////
              const arr = Array.from(_this.tmpList);
              arr.forEach(item => {
                if (item.pid == 0 && !(item.children)){
                  _this.accountAddForm.company_visual_page_limit.push(item.label)
                }else if ((item.children)){
                  let childs = Array.from(item.children)
                  childs.forEach(val => {
                    _this.accountAddForm.company_visual_page_limit.push(val.label)
                  })
                }else if (item.pid != 0){
                  _this.accountAddForm.company_visual_page_limit.push(item.label)
                }
              })
            _this.tmpList = []
            console.log(_this.accountAddForm);
          }
          })
      },

    },
    components:{
      treeTransfer
    }
  }
</script>

<style scoped>
  
</style>