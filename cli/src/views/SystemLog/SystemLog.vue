<template>
  <div class="system_log">
    <el-row type="flex" align="middle">
      <el-col :span="1" style="margin-top: 1%;margin-left: 1%">
        <div style="height: 25px;width: 10px; border-radius:10px;background-color:#3a8ee6"></div>
      </el-col>
      <el-col :span="5" style="margin-top: 1%">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/system_log' }">操作日志</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <el-row style="margin-top: 2%">
      <el-table
          :data="systemLogData"
          style="width: 100%"
          height="600"
          stripe
          :show-header="false"
          empty-text>
        <el-table-column
            prop="user_name"
            align="right"
            label="用户姓名"
            header-align="center"
            width="75">
          <template slot-scope="scope">
            <div style="font-size: 18px;font-weight: bolder; color: #409EFF">
              {{scope.row.user_name}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
            header-align="center"
            width="75">
          <template slot-scope="scope">
            <div style="font-size: 16px;font-weight: bolder;">
              在模块
            </div>
          </template>
        </el-table-column>
        <el-table-column
            prop="user_name"
            align="module"
            header-align="left"
            label="模块名称"
            width="130">
          <template slot-scope="scope">
            <div style="font-size: 18px;font-weight: bolder; color: #409EFF">
              {{scope.row.module}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
            prop="operate_describe"
            align="left"
            header-align="center"
            label="操作描述"
            width="180">
          <template slot-scope="scope">
            <div style="font-size: 16px;font-weight: bolder;">
              {{scope.row.operate_describe}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
            prop="create_time"
            align="right"
            header-align="center"
            label="操作时间"
            width="670">
          <template slot-scope="scope">
            {{scope.row.create_time}}
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row type="flex" justify="center" style="margin-top: 1%">
      <el-col :span="12">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 30, 50]"
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
  name: "SystemLog",
  data() {
    return {
      systemLogData: [],
      currentPage: 1,
      currentSize: 10,
      total: 0
    }
  },
  methods: {
    loadAllSystemLog() {
      const _this = this
      this.axios.get("http://www.ez00.cn/web/cirrus/log-info/get_all_system_log?company_id="+_this.$store.state.company_id+"&user_phone="+_this.$store.state.user_phone+"&current_size="+_this.currentSize+"&current_page="+_this.currentPage)
          .then(function (res) {
            _this.systemLogData = res.data.data.systemLogData
            _this.total = res.data.data.total
            //console.log(res.data.company_info)
          })
          .catch(function (err) {  //当请求出现错误时的回调函数
            console.log(err);
          });
    },

    handleCurrentChange(val) {
      const _this = this
      _this.currentPage = val
      this.axios.get("http://www.ez00.cn/web/cirrus/log-info/get_all_system_log?company_id="+_this.$store.state.company_id+"&user_phone="+_this.$store.state.user_phone+"&current_size="+_this.currentSize+"&current_page="+_this.currentPage)
          .then(function (res) {
            _this.systemLogData = res.data.data.systemLogData
            _this.total = res.data.data.total
            //console.log(res.data.company_info)
          })
          .catch(function (err) {  //当请求出现错误时的回调函数
            console.log(err);
          });
    },

    handleSizeChange(val) {
      const _this = this
      _this.currentSize = val
      this.axios.get("http://www.ez00.cn/web/cirrus/log-info/get_all_system_log?company_id="+_this.$store.state.company_id+"&user_phone="+_this.$store.state.user_phone+"&current_size="+_this.currentSize+"&current_page="+_this.currentPage)
          .then(function (res) {
            _this.systemLogData = res.data.data.systemLogData
            _this.total = res.data.data.total
            //console.log(res.data.company_info)
          })
          .catch(function (err) {  //当请求出现错误时的回调函数
            console.log(err);
          });
    }
  },
  created() {
    this.loadAllSystemLog()
  }
}
</script>

<style scoped>

</style>