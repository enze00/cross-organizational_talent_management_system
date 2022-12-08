<template>
  <div class="department_build">
    <el-row type="flex" align="middle">
      <el-col :span="1" style="margin-top: 1%;margin-left: 1%">
        <div style="height: 25px;width: 10px; border-radius:10px;background-color:#3a8ee6"></div>
      </el-col>
      <el-col :span="5" style="margin-top: 1%">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/department_info' }">部门管理</el-breadcrumb-item>
          <el-breadcrumb-item>新建部门</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="5" style="margin-top: 7%" :offset="2">
        <div style="font-weight: bolder;text-shadow:3px 4px 4px #7ADFF2; margin-left: 50%">基本信息</div>
      </el-col>
    </el-row>
    <el-row>
      <el-form :model="buildForm" :rules="rules" ref="buildForm" label-width="120px" style="margin-top: 4%">
        <el-col :span="8" :offset="6">
          <el-form-item
              prop="company_department_name"
              label="部门名称"
          >
            <el-input v-model="buildForm.company_department_name">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :offset="6" style="margin-top: 2%">
          <el-form-item
              prop="leader_user_id"
              label="部门主管账号"
          >
            <el-input v-model="buildForm.leader_user_id">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :offset="6" style="margin-top: 2%">
          <el-form-item
              prop="hr_user_id"
              label="HR账号"
          >
            <el-input v-model="buildForm.hr_user_id">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :offset="6" style="margin-top: 5%">
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button @click="clear">清空</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "DepartmentBuild",
    data(){
      return{
        buildForm: {
          company_department_name: '',
          leader_user_id: '',
          hr_user_id: ''
        },
        rules:{
          company_department_name:[
              { required: true, message: '请输入部门名称', trigger: 'blur' }
            ]
        }
      }
    },
    methods:{
      clear() {
        this.$refs.buildForm.resetFields()
      },

      onSubmit() {
        const _this = this
        _this.$refs.buildForm.validate(valid => {
          if(valid) {
            _this.axios.post("https://easydoc.xyz/mock/sEWRf0fW/build_a_department",{company_id:_this.$store.state.company_id,user_phone:_this.$store.state.user_phone,
              company_department_name:_this.buildForm.company_department_name,leader_user_id:_this.buildForm.leader_user_id,hr_user_id:_this.buildForm.hr_user_id})
                .then(function (res) {
                  if(res.data.code == 1){
                    _this.$message({
                      message: '部门创建成功！',
                      type: 'success'
                    });
                  }else {
                    _this.$message.error('部门创建失败！');
                  }
                })
                .catch(function (err) {  //当请求出现错误时的回调函数
                  console.log(err);
                });
          }
        })
      }

    }
  }
</script>

<style scoped>
  
</style>