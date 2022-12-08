<template>
  <div class="join_company">
    <RegistSteps :status="4"></RegistSteps>
    <el-row type="flex" justify="center">
      <el-col :span="9">
        <div class="frame">
<!--          <el-row>-->
<!--            <div class="top">-->
<!--              <div class="title">-->
<!--                <h2>加入公司</h2>-->
<!--              </div>-->
<!--            </div>-->
<!--          </el-row>-->
<!--          <el-row type="flex" justify="center">-->
<!--            <el-col :span="23 ">-->
<!--              <div class="line"></div>-->
<!--            </el-col>-->
<!--          </el-row>-->
          <el-row>
            <div style="width: 90%;margin-left: 5%;margin-top: 30px">
              <el-tabs v-model="activeName" @tab-click="handleClick" stretch>
                <el-tab-pane label="邀请码加入" name="invitation_code">
                  <el-form
                      :model="invitationCodeForm"
                      status-icon
                      :rules="invitationCode_rules"
                      ref="invitationCodeForm"
                      label-width="20%"
                      label-position="right">
                    <div style="margin-top: 80px; margin-left: 15px; width: 90%">
                      <el-form-item label="邀请码" prop="invitation_code">
                        <el-input
                            v-model="invitationCodeForm.invitation_code"
                            placeholder="在此输入邀请码"
                            ref="invitation_code"
                            clearable
                            autocomplete="off">
                        </el-input>
                      </el-form-item>
                    </div>
                    <div style="margin-top: 120px;width: 100%">
                      <el-form-item label-width="15%">
                        <el-button @click="back" style="width: 40%">返回</el-button>
                        <el-button type="primary" @click="submit" style="width: 40%">加入</el-button>
                      </el-form-item>
                    </div>
                  </el-form>
                </el-tab-pane>
                <el-tab-pane label="手动加入" name="manually_add">
                  <el-form
                      :model="manuallyAddForm"
                      status-icon
                      :rules="manually_add_rules"
                      ref="manuallyAddForm"
                      label-width="30%"
                      label-position="right">
                    <div style="margin-top: 40px; margin-left: 15px; width: 90%">
                      <el-form-item label="公司简称" prop="company_title">
                        <el-autocomplete
                            popper-class="my-autocomplete"
                            v-model="manuallyAddForm.company_title"
                            placeholder="请输入公司的简称"
                            ref="company_title"
                            clearable
                            autocomplete="off"
                            :fetch-suggestions="querySearch"
                            :trigger-on-focus="false"
                            @select="handleSelect"
                            >
                          <template slot-scope="{ item }">
                            <div class="name">{{ item.value }}</div>
                            <span class="addr">所在地:{{ item.province }}</span>
                          </template>
                        </el-autocomplete>
                      </el-form-item>
                    </div>
                    <div style="margin-top: 30px; margin-left: 15px; width: 90%">
                      <el-form-item label="身份" prop="company_employee_role">
                        <el-select
                            v-model="manuallyAddForm.company_employee_role"
                            placeholder="请选择"
                            :disabled="isDisabled">
                          <el-option
                              v-for="item in employee_role_options"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                    <div style="margin-top: 30px; margin-left: 15px; width: 90%">
                      <el-form-item label="部门" prop="company_employee_apart">
                        <el-select
                            v-model="manuallyAddForm.company_employee_apart"
                            placeholder="请选择"
                            :disabled="isDisabled">
                          <el-option
                              v-for="item in company_apart_options"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                    <div style="margin-top: 30px; margin-left: 15px; width: 90%">
                      <el-form-item label="职位" prop="company_employee_position">
                        <el-cascader
                            v-model="manuallyAddForm.company_employee_position"
                            :options="job_name_options"
                            :show-all-levels="false"
                            :props="{ expandTrigger: 'hover' }"
                            :disabled="isDisabled">
                        </el-cascader>
                      </el-form-item>
                    </div>
                    <div style="margin-top: 30px;width: 100%">
                      <el-form-item label-width="15%">
                        <el-button @click="back" style="width: 40%">返回</el-button>
                        <el-button type="primary" @click="submit" style="width: 40%">加入</el-button>
                      </el-form-item>
                    </div>
                  </el-form>
                </el-tab-pane>
              </el-tabs>
            </div>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import RegistSteps from "@/components/RegistSteps";
import job_name_options from "@/util/job_name";
import {
  buildAccount,
  buildResume,
  buildUserInfo,
  joinCompany_manuallyAdd,
  joinCompany_invitationCode
} from "@/util/axios_regist";
  export default {
    name: "JoinCompany",
    data(){
      return{
        activeName:'invitation_code',
        isDisabled:true,
        allCompanyName: [],
        invitationCodeForm: {
          invitation_code:''
        },
        manuallyAddForm: {
          company_title:'',
          company_province:'',
          company_employee_role:'',
          company_employee_apart:'',
          company_employee_position:''
        },
        employee_role_options:[
          {
            value:'HR',
            label:'HR'
          },
          {
            value:'部门主管',
            label:'部门主管'
          },
          {
            value:'普通员工',
            label:'普通员工'
          },
          {
            value:'实习员工',
            label:'实习员工'
          }
        ],
        company_apart_options:[],
        job_name_options,
        invitationCode_rules: {
          invitation_code: [{ required: true, message: "邀请码不能为空", trigger: "blur" }]
        },
        manually_add_rules: {
          company_title: [{ required: true, message: "公司简称不能为空", trigger: "blur" }],
          company_employee_role: [{ required: true, message: "身份信息不能为空", trigger: "blur" }],
          company_employee_apart: [{ required: true, message: "部门信息不能为空", trigger: "blur" }],
          company_employee_position: [{ required: true, message: "职位信息不能为空", trigger: "blur" }]
        },
      }
    },
    methods:{
      loadAllCompanyName(callback) {
        let result = []
        this.axios.get("https://easydoc.xyz/mock/sEWRf0fW/getAllCompanyName")
          .then(function (res){
            result = res.data.allCompanyName
            console.log(res.data.allCompanyName)
           })
            .catch(function (err) {  //当请求出现错误时的回调函数
              console.log(err);
            });
        setTimeout(function (){
           console.log(result)
          callback(result)
        },1000)
      },

      querySearch(queryString, cb) {
        let allCompanyName = this.allCompanyName
        // console.log(allCompanyName)
        const results = queryString ? allCompanyName.filter(this.createFilter(queryString)) : allCompanyName
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(results);
        }, 1000 * Math.random());
      },

      createFilter(queryString) {
        return (companyName) => {
          return (companyName.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },

      async handleSelect(item) {
        this.isDisabled = false
        this.manuallyAddForm.company_province = item.province
        let company_apart_list = []
        // await this.axios.get("/getCompanyApart?company_title="+this.manuallyAddForm.company_title)
        await this.axios.get("https://easydoc.xyz/mock/sEWRf0fW/getCompanyApart?company_province="+this.manuallyAddForm.company_province+"&company_title="+this.manuallyAddForm.company_title)
        .then(function (res){
          company_apart_list = res.data.company_apart_list
          console.log(res.data.company_apart_list)
        })
            .catch(function (err) {  //当请求出现错误时的回调函数
              console.log(err);
            });
        this.company_apart_options = company_apart_list
      },

      handleClick(){
        const _this = this
        console.log(this.activeName)
        setTimeout(function (){
          _this.$refs.invitationCodeForm.resetFields()
          _this.$refs.manuallyAddForm.resetFields()
        },1)

      },

      back(){
        this.$router.go(-1)
      },

      submit(){
        const _this = this
        if (this.activeName==='invitation_code'){
          this.$refs.invitationCodeForm.validate(valid => {
            if(valid){
              window.localStorage.setItem("invitation_code",_this.invitationCodeForm.invitation_code)
              this.join_invitation_code();
            }
          });
        }
        else if(this.activeName==='manually_add'){
          this.$refs.manuallyAddForm.validate(valid => {
            if(valid){
              window.localStorage.setItem("company_title",_this.manuallyAddForm.company_title)
              window.localStorage.setItem("company_province",_this.manuallyAddForm.company_province)
              window.localStorage.setItem("company_employee_role",_this.manuallyAddForm.company_employee_role)
              window.localStorage.setItem("company_employee_apart",_this.manuallyAddForm.company_employee_apart)
              window.localStorage.setItem("company_employee_position",_this.manuallyAddForm.company_employee_position)
              this.join_manually_add();
            }
          });
        }
      },

      join_invitation_code(){
        if(_this.$store.state.regist.status === 'join'){
          _this.axios.all([buildAccount(),buildUserInfo(),buildResume(),joinCompany_invitationCode()])
              .then(_this.axios.spread((account,userinfo,resume,join)=>{
                if(account.data.result=='success'){
                  _this.$message({
                    type: "success",
                    message: "加入公司成功！",
                    showClose: true
                  });
                  _this.$store.dispatch('changeKeepAlive','BuildAccount')
                  _this.$store.dispatch('changeKeepAlive','BuildBasicInfo')
                  _this.$store.dispatch('changeKeepAlive','BuildWorkExperience')
                  _this.$store.dispatch('changeKeepAlive','BuildEducationBackground')
                  _this.$store.dispatch('changeKeepAlive','JoinCompany')
                  setTimeout(function (){
                    _this.$router.push("/")
                  },3000)
                }else{
                  _this.$message({
                    type: "error",
                    message: "短信验证码错误！",
                    showClose: true
                  });
                  setTimeout(function (){
                    _this.$router.push("/build_account")
                  },3000)
                }
              }))
        }else if (_this.$store.state.regist.status === 'join_hasAccount'){
          _this.axios.all([joinCompany_invitationCode()])
              .then(function (res) {
                _this.$message({
                  type: "success",
                  message: "公司创建成功！",
                  showClose: true
                });
                _this.$store.dispatch('changeKeepAlive','JoinCompany')
                setTimeout(function (){
                  _this.$router.push("/")
                },3000)
              })
        }
      },

      join_manually_add(){
        if(_this.$store.state.regist.status === 'join'){
          _this.axios.all([buildAccount(),buildUserInfo(),buildResume(),joinCompany_manuallyAdd()])
              .then(_this.axios.spread((account,userinfo,resume,join)=>{
                if(account.data.result=='success'){
                  _this.$message({
                    type: "success",
                    message: "加入公司成功！",
                    showClose: true
                  });
                  _this.$store.dispatch('changeKeepAlive','BuildAccount')
                  _this.$store.dispatch('changeKeepAlive','BuildBasicInfo')
                  _this.$store.dispatch('changeKeepAlive','BuildWorkExperience')
                  _this.$store.dispatch('changeKeepAlive','BuildEducationBackground')
                  _this.$store.dispatch('changeKeepAlive','JoinCompany')
                  setTimeout(function (){
                    _this.$router.push("/")
                  },3000)
                }else{
                  _this.$message({
                    type: "error",
                    message: "短信验证码错误！",
                    showClose: true
                  });
                  setTimeout(function (){
                    _this.$router.push("/build_account")
                  },3000)
                }
              }))
        }else if (_this.$store.state.regist.status === 'join_hasAccount'){
          _this.axios.all([joinCompany_manuallyAdd()])
              .then(function (res) {
                _this.$message({
                  type: "success",
                  message: "公司创建成功！",
                  showClose: true
                });
                _this.$store.dispatch('changeKeepAlive','JoinCompany')
                setTimeout(function (){
                  _this.$router.push("/")
                },3000)
              })
        }
      }
    },
    mounted() {
      const _this = this
      this.loadAllCompanyName((data)=>{
        _this.allCompanyName = data
      })
    },
    components:{
      RegistSteps
    },
    beforeRouteEnter(to,from,next){
      next(vm =>{
        if(from.name === 'JudgeBuildOrJoin'||from.name === 'BuildEducationBackground'){
          vm.$store.dispatch('addKeepAlivePage','JoinCompany')
        }
      })
    }
  }
</script>

<style scoped>
.frame{
  box-shadow: 5px 5px 10px #888888;
  background-color: white;
  height: 500px;
  width: 500px;
  margin-top: 20px;
  border-radius: 10px;
}

.my-autocomplete li{
  line-height: normal;
  padding: 7px;
}

.name {
  text-overflow: ellipsis;
  overflow: hidden;
}

.addr {
  font-size: 10px;
  color: #b4b4b4;
}

</style>