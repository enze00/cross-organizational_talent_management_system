<template>
  <div class="employee_performance">
    <el-row type="flex" align="middle">
      <el-col :span="1" style="margin-top: 1%;margin-left: 1%">
        <div style="height: 25px;width: 10px; border-radius:10px;background-color:#3a8ee6"></div>
      </el-col>
      <el-col :span="5" style="margin-top: 1%">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/release_train' }">员工培训</el-breadcrumb-item>
          <el-breadcrumb-item>完成情况</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "EmployeePerformance",
  data() {
    return {}
  },
  methods: {}
}
</script>

<style scoped>

</style>