<template>
  <div class="regist_steps">
    <el-row type="flex" justify="center">
      <el-col :span="12">
        <el-steps v-if="$store.state.regist.status==='build'" :active="status" align-center finish-status="success">
          <el-step title="创建账号" ></el-step>
          <el-step title="基本信息" ></el-step>
          <el-step title="工作经历" ></el-step>
          <el-step title="学历信息" ></el-step>
          <el-step title="创建公司" ></el-step>
        </el-steps>
        <el-steps v-if="$store.state.regist.status==='join'" :active="status" align-center finish-status="success">
          <el-step title="创建账号" ></el-step>
          <el-step title="基本信息" ></el-step>
          <el-step title="工作经历" ></el-step>
          <el-step title="学历信息" ></el-step>
          <el-step title="加入公司" ></el-step>
        </el-steps>
        <el-steps v-if="$store.state.regist.status==='build_hasAccount'" :active="status" align-center finish-status="success">
          <el-step title="创建账号" ></el-step>
          <el-step title="基本信息" ></el-step>
          <el-step title="工作经历" ></el-step>
          <el-step title="学历信息" ></el-step>
          <el-step title="创建公司" ></el-step>
        </el-steps>
        <el-steps v-if="$store.state.regist.status==='join_hasAccount'" :active="status" align-center finish-status="success">
          <el-step title="创建账号" ></el-step>
          <el-step title="基本信息" ></el-step>
          <el-step title="工作经历" ></el-step>
          <el-step title="学历信息" ></el-step>
          <el-step title="加入公司" ></el-step>
        </el-steps>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    export default {
        name: "RegistSteps",
      props: {
        status: Number
      }
    }
</script>

<style scoped>

</style>