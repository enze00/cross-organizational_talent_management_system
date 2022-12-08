<template>
  <div class="evaluation_info">
    <el-row type="flex" align="middle">
      <el-col :span="1" style="margin-top: 1%;margin-left: 1%">
        <div style="height: 25px;width: 10px; border-radius:10px;background-color:#3a8ee6"></div>
      </el-col>
      <el-col :span="5" style="margin-top: 1%">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/evaluation_info' }">员工评估</el-breadcrumb-item>
          <el-breadcrumb-item>每月评价</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <el-row style="margin-top: 1%">
      <el-col :span="2" :offset="1">
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
            <el-form-item label="员工姓名" label-width="80px" style="margin-top: 20%" prop="company_employee_name">
              <el-input v-model="searchForm.company_employee_name" placeholder="在此输入其姓名" style="width: 45%">
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
      <el-col :span="5" :offset="16">
        <el-radio-group v-model="isFinish" size="small" @change="handleIsFinishChange">
          <el-radio-button label="0">本月未评价</el-radio-button>
          <el-radio-button label="1">本月已评价</el-radio-button>
        </el-radio-group>
      </el-col>
    </el-row>
    <el-row style="margin-left: 2%">
      <el-table
          :data="evaluateData"
          style="width: 100%"
          height="588"
          stripe
          empty-text>
        <el-table-column
            prop="company_employee_name"
            align="center"
            header-align="center"
            label="员工姓名"
            width="225">
        </el-table-column>
        <el-table-column
            prop="company_department_name"
            align="center"
            header-align="center"
            label="部门名称"
            width="225">
        </el-table-column>
        <el-table-column
            prop="evaluate_isfinish"
            align="center"
            header-align="center"
            label="本月评价状态"
            width="225">
          <template slot-scope="scope">
            <el-button v-if="scope.row.evaluate_isfinish == 1" type="success" icon="el-icon-check" size="small" circle></el-button>
            <el-button v-if="scope.row.evaluate_isfinish == 0" type="danger" icon="el-icon-close" size="small" circle></el-button>
          </template>
        </el-table-column>
        <el-table-column
            align="center"
            header-align="center"
            label="查看历史评价"
            width="225">
          <template slot-scope="scope">
            <el-button
                fixed="right"
                size="mini"
                @click="handleSeeHistory(scope.$index, scope.row)"
                type="success">
              查看
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
            align="center"
            header-align="center"
            label="操作"
            width="225"
        >
          <template slot-scope="scope">
            <el-button
                fixed="right"
                size="mini"
                @click="handleRate(scope.$index, scope.row)"
                icon="el-icon-edit"
                type="primary" plain>
              评价
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-dialog title="编写评价" :visible.sync="rateFormVisible">
      <el-form ref="rateForms" :model="rateForm" label-width="200px">
        <el-scrollbar
            style="height: 450px;"
            wrap-style="overflow-x:hidden; overflow-y:show;"
        >
          <el-row>
            <el-col :span="5" >
              <div style="font-weight: bolder;text-shadow:3px 4px 4px #7ADFF2; margin-left: 50%">技术性能力</div>
            </el-col>
          </el-row>
          <el-form-item label="工作素质及精确度" style="margin-left: 10%" prop="skill_quality">
            <el-rate
                style="margin-top: 2%;margin-left: 5%"
                v-model="rateForm.skill_quality"
                :texts="rateTexts"
                show-text>
            </el-rate>
          </el-form-item>
          <el-form-item label="工作效率" style="margin-left: 10%;" prop="skill_efficient">
            <el-rate
                style="margin-top: 2%;margin-left: 5%"
                v-model="rateForm.skill_efficient"
                :texts="rateTexts"
                show-text>
            </el-rate>
          </el-form-item>
          <el-form-item label="出勤率" style="margin-left: 10%;" prop="skill_work">
            <el-rate
                style="margin-top: 2%;margin-left: 5%"
                v-model="rateForm.skill_work"
                :texts="rateTexts"
                show-text>
            </el-rate>
          </el-form-item>
          <el-form-item label="学习能力与态度" style="margin-left: 10%;" prop="skill_power">
            <el-rate
                style="margin-top: 2%;margin-left: 5%"
                v-model="rateForm.skill_power"
                :texts="rateTexts"
                show-text>
            </el-rate>
          </el-form-item>
          <el-row>
            <el-col :span="5" >
              <div style="font-weight: bolder;text-shadow:3px 4px 4px #7ADFF2; margin-left: 55%">核心能力</div>
            </el-col>
          </el-row>
          <el-form-item label="团队领导能力合作性" style="margin-left: 10%;" prop="core_lead">
            <el-rate
                style="margin-top: 2%;margin-left: 5%"
                v-model="rateForm.core_lead"
                :texts="rateTexts"
                show-text>
            </el-rate>
          </el-form-item>
          <el-form-item label="工作积极性" style="margin-left: 10%;" prop="core_active">
            <el-rate
                style="margin-top: 2%;margin-left: 5%"
                v-model="rateForm.core_active"
                :texts="rateTexts"
                show-text>
            </el-rate>
          </el-form-item>
          <el-form-item label="完成目标及绩效" style="margin-left: 10%;" prop="core_result">
            <el-rate
                style="margin-top: 2%;margin-left: 5%"
                v-model="rateForm.core_result"
                :texts="rateTexts"
                show-text>
            </el-rate>
          </el-form-item>
          <el-form-item label="数理逻辑及灵敏度" style="margin-left: 10%;" prop="core_logic">
            <el-rate
                style="margin-top: 2%;margin-left: 5%"
                v-model="rateForm.core_logic"
                :texts="rateTexts"
                show-text>
            </el-rate>
          </el-form-item>
          <el-form-item label="诚信" style="margin-left: 10%;" prop="core_honest">
            <el-rate
                style="margin-top: 2%;margin-left: 5%"
                v-model="rateForm.core_honest"
                :texts="rateTexts"
                show-text>
            </el-rate>
          </el-form-item>
          <el-form-item style="margin-left: 40%" prop="edit">
            <el-button type="primary" @click="submitForm()">提交</el-button>
            <el-button @click="cancelForm()">取消</el-button>
          </el-form-item>
        </el-scrollbar>
      </el-form>
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
  name: "EvaluationInfo",
  data(){
    return{
      drawerVisible: false,
      rateFormVisible: false,
      managedApartList: [],
      searchForm: {
        company_employee_name: '',
        company_department_name: ''
      },
      rateForm: {
        skill_quality: 0,//工作素质及精确度
        skill_efficient: 0,//工作效率
        skill_work: 0,//出勤率
        skill_power: 0,//学习能力与态度
        core_lead: 0,//团队领导能力合作性
        core_active: 0,//工作积极性
        core_result: 0,//完成目标及绩效
        core_logic: 0,//数理逻辑及灵敏度
        core_honest: 0//诚信
      },
      evaluateData: [
        {
          company_department_name: '',
          company_employee_name: '',
          company_employee_phone: '',
          evaluate_isfinish: 0
        }
      ],
      rateTexts:["表现恶劣，大部分未能达到公司要求","有待改善，部分未能达到公司要求","表现合格，大部分达到公司要求","表现满意，全部达到公司要求","表现优良，经常超出公司要求"],
      currentPage: 1,
      total: 0,
      currentSize: 10,
      isFinish: 0
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
      if(_this.searchForm.company_employee_name != '' || _this.searchForm.company_department_name != ''){
        _this.axios.get("https://easydoc.xyz/mock/sEWRf0fW/get_evaluate_info?company_id="+_this.$store.state.company_id+"&user_phone="+_this.$store.state.user_phone +"&current_size=" +_this.currentSize
            +"&current_page="+_this.currentPage+"&company_department_name="+_this.searchForm.company_department_name+"&company_employee_name="+_this.searchForm.company_employee_name +"&isFinish="+_this.isFinish)
            .then(function (res) {
              _this.evaluateData = res.data.evaluateData
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
      this.axios.get("https://easydoc.xyz/mock/sEWRf0fW/get_evaluate_info?company_id="+_this.$store.state.company_id+"&user_phone="+_this.$store.state.user_phone +"&current_size=" +_this.currentSize
          +"&current_page="+_this.currentPage+"&company_department_name="+_this.searchForm.company_department_name+"&company_employee_name="+_this.searchForm.company_employee_name +"&isFinish="+_this.isFinish)
          .then(function (res) {
            _this.evaluateData = res.data.evaluateData
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
      this.axios.get("https://easydoc.xyz/mock/sEWRf0fW/get_evaluate_info?company_id="+_this.$store.state.company_id+"&user_phone="+_this.$store.state.user_phone +"&current_size=" +_this.currentSize
          +"&current_page="+_this.currentPage+"&company_department_name="+_this.searchForm.company_department_name+"&company_employee_name="+_this.searchForm.company_employee_name +"&isFinish="+_this.isFinish)
          .then(function (res) {
            _this.evaluateData = res.data.evaluateData
            _this.total = res.data.total
            //console.log(res)
          })
          .catch(function (err) {  //当请求出现错误时的回调函数
            console.log(err);
          });
    },

    loadAllEvaluateInfo() {
      const _this = this
      this.axios.get("https://easydoc.xyz/mock/sEWRf0fW/get_evaluate_info?company_id="+_this.$store.state.company_id+"&user_phone="+_this.$store.state.user_phone +"&current_size=" +_this.currentSize
          +"&current_page"+_this.currentPage+"&company_department_name="+_this.searchForm.company_department_name+"&company_employee_name="+_this.searchForm.company_employee_name +"&isFinish="+_this.isFinish)
          .then(function (res) {
            _this.evaluateData = res.data.evaluateData
            _this.total = res.data.total
            //console.log(res)
          })
          .catch(function (err) {  //当请求出现错误时的回调函数
            console.log(err);
          });
    },

    handleRate(index, row) {
      this.rateFormVisible = true
      console.log(index, row);
    },

    handleDelete(index, row) {
      // this.$refs.delete_popover.show
      this.visible = false
      console.log(index, row);
    },
    handleSeeHistory(index, row) {

    },

    handleIsFinishChange() {
      const _this = this
      this.axios.get("https://easydoc.xyz/mock/sEWRf0fW/get_evaluate_info?company_id="+_this.$store.state.company_id+"&user_phone="+_this.$store.state.user_phone +"&current_size=" +_this.currentSize
          +"&current_page="+_this.currentPage+"&company_department_name="+_this.searchForm.company_department_name+"&company_employee_name="+_this.searchForm.company_employee_name +"&isFinish="+_this.isFinish)
          .then(function (res) {
            _this.evaluateData = res.data.evaluateData
            _this.total = res.data.total
            //console.log(res)
          })
          .catch(function (err) {  //当请求出现错误时的回调函数
            console.log(err);
          });
    },

    submitForm() {
      this.rateFormVisible = false
      this.$refs.rateForms.resetFields()
    },

    cancelForm() {
      this.rateFormVisible = false
      this.$refs.rateForms.resetFields()
    },

  },
  mounted() {
    const _this = this
    _this.loadManagedApartList(data => {
      _this.managedApartList = data
      //console.log(data)
    })
  },
  created() {
    this.loadAllEvaluateInfo()
    //this.$store.dispatch('addKeepAlivePage','EvaluationInfo')
  }
}
</script>

<style scoped>

</style>