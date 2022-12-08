<template>
  <div class="company_question_bank">
    <el-row type="flex" align="middle">
      <el-col :span="1" style="margin-top: 1%;margin-left: 1%">
        <div style="height: 25px;width: 10px; border-radius:10px;background-color:#3a8ee6"></div>
      </el-col>
      <el-col :span="5" style="margin-top: 1%">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/release_train' }">员工培训</el-breadcrumb-item>
          <el-breadcrumb-item>企业题库</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="3" :offset="13" style="margin-top: 1%">
        <el-select :disabled="tabName == 'add_train'" v-model="clickDepartment" placeholder="请选择部门" @change="clickDepartmentChange">
          <el-option
              v-for="item in departmentList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row>
      <el-tabs
          style="margin-top: 1%"
          type="card"
          v-model="tabName"
          @tab-click="handleTabChange"
      >
        <!-- ////////////////这是企业题库页面/////////////////////-->
        <el-tab-pane label="企业题库" name="train_library">
          <el-row style="margin-left: 2%">
            <el-table
                :data="train_library.trainLibraryData"
                style="width: 100%"
                height="530"
                stripe
                empty-text>
              <el-table-column
                  prop="train_id"
                  align="center"
                  label="题目编号"
                  header-align="center"
                  width="90">
              </el-table-column>
              <el-table-column
                  prop="train_department"
                  align="center"
                  header-align="center"
                  label="出题部门"
                  width="165">
              </el-table-column>
              <el-table-column
                  prop="train_content"
                  align="center"
                  header-align="center"
                  label="题目内容"
                  width="450">
              </el-table-column>
              <el-table-column
                  prop="train_type"
                  align="center"
                  header-align="center"
                  label="题目类型"
                  width="165">
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
                      @click="handleRelease(scope.$index, scope.row)"
                      type="primary">
                    编辑
                  </el-button>
                  <el-button
                      slot="reference"
                      size="small"
                      @click="handleDeleteApplication(scope.$index, scope.row)"
                      type="danger"
                      plain
                  >
                    查看
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
          <el-row type="flex" justify="center" style="margin-top: 1%">
            <el-col :span="13">
              <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="train_library.currentPage"
                  :page-sizes="[10, 15, 20, 40]"
                  :page-size="train_library.currentSize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="train_library.total">
              </el-pagination>
            </el-col>
          </el-row>
        </el-tab-pane>
        <!-- ////////////////这是添加试题页面/////////////////////-->
        <el-tab-pane label="添加试题" name="add_train">
          <el-row>
            <el-col :span="3" :offset="1">
              <el-select v-model="add_train.train_type" placeholder="请选择题目类型">
                <el-option
                    label="选择题"
                    value="选择题">
                  选择题
                </el-option>
                <el-option
                    label="填空题"
                    value="填空题">
                  填空题
                </el-option>
                <el-option
                    label="判断题"
                    value="判断题">
                  判断题
                </el-option>
                <el-option
                    label="解答题"
                    value="解答题">
                  解答题
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="2" :offset="17">
              <el-button type="primary" @click="addTrain" :disabled="add_train.train_type == ''">提交</el-button>
            </el-col>
          </el-row>
          <el-row type="flex" justify="center" style="margin-top: 1%">
            <el-col :span="22" style="width: 95%;height: 500px">
              <el-row>
                <el-col :span="2" :offset="1" style="margin-top: 1%">
                  <el-tag>题目</el-tag>
                </el-col>
                <el-col :span="16" style="margin-top: 1%;font-size: 18px">
                  在下面的输入框中输入题目，形如--DNS服务器和DHCP服务器的作用是()
                </el-col>
              </el-row>
              <el-row type="flex" justify="center">
                <el-col :span="23" style="margin-top: 1%;">
                  <el-input
                      type="textarea"
                      :rows="5"
                      placeholder="请输入题目内容"
                      v-model="add_train.train_content">
                  </el-input>
                </el-col>
              </el-row>
              <transition name="el-fade-in-linear">
                <el-row v-if="add_train.train_type == '选择题'">
                  <el-col :span="1" :offset="1" style="margin-top: 2%">
                    <el-tag type="success">A</el-tag>
                  </el-col>
                  <el-col :span="21"  style="margin-top: 2%">
                    <el-input v-model="inputA" placeholder="请输入选项A的内容"></el-input>
                  </el-col>
                </el-row>
              </transition>
              <transition name="el-fade-in-linear">
                <el-row v-if="add_train.train_type == '选择题'">
                  <el-col :span="1" :offset="1" style="margin-top: 2%">
                    <el-tag type="success">B</el-tag>
                  </el-col>
                  <el-col :span="21"  style="margin-top: 2%">
                    <el-input v-model="inputB" placeholder="请输入选项B的内容"></el-input>
                  </el-col>
                </el-row>
              </transition>
              <transition name="el-fade-in-linear">
                <el-row v-if="add_train.train_type == '选择题'">
                  <el-col :span="1" :offset="1" style="margin-top: 2%">
                    <el-tag type="success">C</el-tag>
                  </el-col>
                  <el-col :span="21"  style="margin-top: 2%">
                    <el-input v-model="inputC" placeholder="请输入选项C的内容"></el-input>
                  </el-col>
                </el-row>
              </transition>
              <transition name="el-fade-in-linear">
                <el-row v-if="add_train.train_type == '选择题'">
                  <el-col :span="1" :offset="1" style="margin-top: 2%">
                    <el-tag type="success">D</el-tag>
                  </el-col>
                  <el-col :span="21"  style="margin-top: 2%">
                    <el-input v-model="inputD" placeholder="请输入选项D的内容"></el-input>
                  </el-col>
                </el-row>
              </transition>
              <transition name="el-fade-in-linear">
                <el-row v-if="add_train.train_type == '选择题'">
                  <el-col :span="2" :offset="1" style="margin-top: 3%">
                    正确选项:
                  </el-col>
                  <el-col :span="3"  style="margin-top: 2%">
                    <el-select v-model="add_train.answer" placeholder="选择正确答案">
                      <el-option
                          label="A"
                          value="A">
                        A
                      </el-option>
                      <el-option
                          label="B"
                          value="B">
                        B
                      </el-option>
                      <el-option
                          label="C"
                          value="C">
                        C
                      </el-option>
                      <el-option
                          label="D"
                          value="D">
                        D
                      </el-option>
                    </el-select>
                  </el-col>
                </el-row>
              </transition>

            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "CompanyQuestionBank",
  data() {
    return {
      tabName: 'train_library',
      clickDepartment:'',
      departmentList:[],
      train_library:{
        trainLibraryData: [],
        currentSize: '',
        currentPage: '',
        total: ''
      },
      add_train: {
        train_content: '',
        train_type: ''
      },
      question:{
        inputA: '',
        inputB: '',
        inputC: '',
        inputD: ''
      }
    }
  },
  methods: {
    loadDepartmentList(callback) {
      const _this = this
      let data = []
      this.axios.get("https://easydoc.xyz/mock/sEWRf0fW/get_managed_department_list?company_id="+_this.$store.state.company_id+"&user_phone="+_this.$store.state.user_phone)
          .then(function (res) {
            data = res.data.departmentList
            //console.log(data)
          })
          .catch(function (err) {  //当请求出现错误时的回调函数
            console.log(err);
          });
      setTimeout(function (){
        // console.log(result)
        callback(data)
      },1000)
    },

    loadTrainLibraryData() {
      const _this = this
      this.axios.get("https://easydoc.xyz/mock/sEWRf0fW/get_train_library_info?company_id="+_this.$store.state.company_id+"&user_phone="+_this.$store.state.user_phone
          +"&current_size="+_this.train_library.currentSize+"&current_page="+_this.train_library.currentPage )
          .then(function (res) {
            _this.train_library.trainLibraryData = res.data.trainLibraryData
            _this.train_library.total = res.data.total
            //console.log(res.data)
          })
          .catch(function (err) {  //当请求出现错误时的回调函数
            console.log(err);
          });
    },

    addTrain() {
      const _this = this
      this.$notify({
        title: '成功',
        message: '题目发布成功！',
        type: 'success'
      });
      setTimeout(function () {
        _this.tabName = 'train_library'
      },500)
    }
  },
  created() {
    const _this = this
    this.loadDepartmentList((data)=> {
      _this.departmentList = data
      _this.clickDepartment = data[0].value
      //console.log(_this.clickDepartment)
    })
    this.loadTrainLibraryData()
  }
}
</script>

<style scoped>

</style>