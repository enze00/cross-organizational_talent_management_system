<template>
  <div class="record_discipline">
    <el-row type="flex" align="middle">
      <el-col :span="1" style="margin-top: 1%;margin-left: 1%">
        <div style="height: 25px;width: 10px; border-radius:10px;background-color:#3a8ee6"></div>
      </el-col>
      <el-col :span="5" style="margin-top: 1%">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/archives_info' }">员工档案</el-breadcrumb-item>
          <el-breadcrumb-item>记录重大违纪</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <el-form :model="disciplineForm" :rules="rules" ref="disciplineForm" label-width="120px">
      <el-row>
        <el-col :span="5" style="margin-top: 3%" :offset="3">
          <div style="font-weight: bolder;text-shadow:3px 4px 4px #7ADFF2;">基本信息</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" :offset="6">
          <el-form-item
              prop="employee_mistake_time"
              label="违纪时间"
          >
            <el-date-picker
                v-model="disciplineForm.employee_mistake_time"
                type="date"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                placeholder="选择员工违纪日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" :offset="6">
          <el-form-item
              prop="company_employee_name"
              label="员工姓名"
          >
            <el-input v-model="disciplineForm.company_employee_name" style="width: 80%">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" :offset="6">
          <el-form-item
              prop="hr_user_id"
              label="员工部门"
          >
            <el-select v-model="disciplineForm.company_department_name" placeholder="在此选择员工部门" style="width: 80%">
              <el-option
                  v-for="(item,index) in managedApartList"
                  :key="index"
                  :label="item.value"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" :offset="6">
          <el-form-item
              prop="company_employee_phone"
              label="员工手机号"
          >
            <el-input v-model="disciplineForm.company_employee_phone" placeholder="在此输入员工手机" style="width: 100%" maxlength="11" show-word-limit>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5" :offset="3">
          <div style="font-weight: bolder;text-shadow:3px 4px 4px #7ADFF2;">违纪内容</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" :offset="6">
          <el-form-item
              prop="company_employee_phone"
              label-width="7%"
          >
            <el-input
                type="textarea"
                :rows="5"
                placeholder="请输入该员工违纪内容"
                v-model="textarea">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5" :offset="3">
          <div style="font-weight: bolder;text-shadow:3px 4px 4px #7ADFF2;">处理结果</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" :offset="6">
          <el-form-item
              prop="company_employee_phone"
              label-width="7%"
          >
            <el-input
                type="textarea"
                :rows="5"
                placeholder="请输入处理结果"
                v-model="textarea">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-col :span="8" :offset="6">
        <el-form-item>
          <el-button type="primary" @click="onSubmit" style="width: 100px">提交</el-button>
          <el-button @click="clear"  style="width: 100px">清空</el-button>
        </el-form-item>
      </el-col>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "RecordDiscipline",
    data(){
      return{
        disciplineForm: {
          employee_mistake_time: '',

        },
        rules:{
          company_department_name:[
            { required: true, message: '请输入部门名称', trigger: 'blur' }
          ]
        },
        managedApartList: [],
      }
    },
    methods:{
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
    },
    mounted() {
      const _this = this
      _this.loadManagedApartList(data => {
        _this.managedApartList = data
        //console.log(data)
      })
    }
  }
</script>

<style scoped>
  
</style>