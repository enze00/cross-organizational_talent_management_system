<template>
  <div class="recruitment_manage">
    <el-row type="flex" align="middle">
      <el-col :span="1" style="margin-top: 1%;margin-left: 1%">
        <div style="height: 25px;width: 10px; border-radius:10px;background-color:#3a8ee6"></div>
      </el-col>
      <el-col :span="5" style="margin-top: 1%">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/recruitment_application_manage">对外招聘</el-breadcrumb-item>
          <el-breadcrumb-item>招聘管理</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="3" :offset="13" style="margin-top: 1%">
        <el-select v-model="clickDepartment" placeholder="请选择部门" @change="clickDepartmentChange">
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

    </el-row>
    <el-row>
      <el-tabs
          style="margin-top: 1%"
          type="card"
          v-model="tabName"
          @tab-click="handleTabChange"
      >
        <!-- ////////////////这是待审批页面/////////////////////-->
        <el-tab-pane label="待审批" name="wait_approval">
          <el-row style="margin-left: 2%">
            <el-table
                :data="wait_approval.waitApprovalData"
                style="width: 100%"
                height="530"
                stripe
                empty-text>
              <el-table-column
                  type="index"
                  align="center"
                  label="序号"
                  header-align="center"
                  width="90">
              </el-table-column>
              <el-table-column
                  prop="apply_job"
                  align="center"
                  header-align="center"
                  label="岗位名称"
                  width="165">
              </el-table-column>
              <el-table-column
                  prop="apply_need_worker"
                  align="center"
                  header-align="center"
                  label="申请数量"
                  width="165">
              </el-table-column>
              <el-table-column
                  prop="apply_department"
                  align="center"
                  header-align="center"
                  label="申请部门"
                  width="165">
              </el-table-column>
              <el-table-column
                  prop="apply_status"
                  align="center"
                  header-align="center"
                  label="当前状态"
                  width="165"
              >
                <template slot-scope="scope">
                  <el-tag size="medium" :type="scope.row.apply_status=='待审核'?'info':(scope.row.apply_status=='已通过'?'success':'danger')">{{ scope.row.apply_status }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column
                  align="center"
                  header-align="center"
                  label="申请时间"
                  width="170">
                <template slot-scope="scope">
                  <i class="el-icon-time"></i>
                  <span style="margin-left: 10px">{{ scope.row.create_time }}</span>
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
                      size="small"
                      @click="handleApproval(scope.$index, scope.row)"
                      type="primary">
                    审核
                  </el-button>
                </template>

              </el-table-column>
            </el-table>
          </el-row>
          <el-dialog
              title="审核"
              :visible.sync="approval_dialog.approvalDialogVisible"
              width="35%"
              @close="handleApprovalDialogClose"
          >
            <el-scrollbar
                style="height: 314px;"
                wrap-style="overflow-x:hidden;overflow-y:show;"
            >
              <el-form
                  ref="form"
                  :model="approval_dialog.approvalData"
                  label-width="30%"
                  label-suffix=":">
                <el-form-item label="申请人">
                  <el-input
                      v-model="approval_dialog.approvalData.apply_checker_name"
                      :disabled="true"
                      style="width: 40%">
                  </el-input>
                </el-form-item>
                <el-form-item label="申请部门">
                  <el-input
                      v-model="approval_dialog.approvalData.apply_department"
                      :disabled="true"
                      style="width: 50%">
                  </el-input>
                </el-form-item>
                <el-form-item label="申请岗位">
                  <el-input
                      v-model="approval_dialog.approvalData.apply_job"
                      :disabled="true"
                      style="width: 50%">
                  </el-input>
                </el-form-item>
                <el-form-item label="所需员工数量">
                  <el-input-number v-model="approval_dialog.approvalData.apply_need_worker" size="small" :disabled="true"></el-input-number>
                </el-form-item>
                <el-form-item label="是否通过">
                  <el-radio v-model="approval_dialog.approvalData.isPass" label="是" border size="medium">是</el-radio>
                  <el-radio v-model="approval_dialog.approvalData.isPass" label="否" border size="medium">否</el-radio>
                </el-form-item>
                <el-form-item label="未通过的原因" prop="apply_reason"  v-if="approval_dialog.approvalData.isPass == '否' ? true : false">
                  <el-input
                      style="width: 80%"
                      type="textarea"
                      :autosize="{ minRows: 3, maxRows: 5}"
                      placeholder="在此输入原因"
                      v-model="approval_dialog.approvalData.apply_reason">
                  </el-input>
                </el-form-item>
              </el-form>
            </el-scrollbar>
            <div slot="footer" class="dialog-footer">
              <el-button @click="approval_dialog.approvalDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="submitApproval">确 定</el-button>
            </div>
          </el-dialog>
          <el-row type="flex" justify="center" style="margin-top: 1%">
            <el-col :span="13">
              <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="wait_approval.currentPage"
                  :page-sizes="[10, 15, 20, 40]"
                  :page-size="wait_approval.currentSize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="wait_approval.total">
              </el-pagination>
            </el-col>
          </el-row>
        </el-tab-pane>
        <!-- ////////////////这是待发布招聘页面/////////////////////-->
        <el-tab-pane label="待发布的招聘" name="wait_release">
          <el-row style="margin-left: 2%">
            <el-table
                :data="wait_release.waitReleaseData"
                style="width: 100%"
                height="530"
                stripe
                empty-text>
              <el-table-column
                  type="index"
                  align="center"
                  label="序号"
                  header-align="center"
                  width="90">
              </el-table-column>
              <el-table-column
                  prop="apply_job"
                  align="center"
                  header-align="center"
                  label="岗位名称"
                  width="165">
              </el-table-column>
              <el-table-column
                  prop="apply_need_worker"
                  align="center"
                  header-align="center"
                  label="申请数量"
                  width="165">
              </el-table-column>
              <el-table-column
                  prop="apply_department"
                  align="center"
                  header-align="center"
                  label="申请部门"
                  width="165">
              </el-table-column>
              <el-table-column
                  prop="apply_status"
                  align="center"
                  header-align="center"
                  label="当前状态"
                  width="165"
              >
                <template slot-scope="scope">
                  <el-tag size="medium" :type="scope.row.apply_status=='待审核'?'info':(scope.row.apply_status=='已发布'?'success':'warning')">{{ scope.row.apply_status }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column
                  align="center"
                  header-align="center"
                  label="审批通过时间"
                  width="170">
                <template slot-scope="scope">
                  <i class="el-icon-time"></i>
                  <span style="margin-left: 10px">{{ scope.row.apply_check_time }}</span>
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
                      size="small"
                      @click="handleRelease(scope.$index, scope.row)"
                      type="primary">
                    发布
                  </el-button>
                  <el-button
                      slot="reference"
                      size="small"
                      @click="handleDeleteApplication(scope.$index, scope.row)"
                      type="danger"
                      plain
                  >
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
          <el-dialog
              title="招聘需求"
              :visible.sync="release_dialog.releaseDialogVisible"
              width="35%"
              :before-close="clearReleaseDialog"
          >
            <el-scrollbar
                style="height: 314px;"
                wrap-style="overflow-x:hidden;overflow-y:show;"
            >
              <el-form
                  ref="releaseForm"
                  :model="release_dialog.releaseData"
                  label-width="25%"
                  label-suffix=":">
                <!--///////////////第一页///////////////-->
                <transition name="el-fade-in-linear">
                  <el-form-item label="公司名称" prop="company_title" v-if="release_dialog.page == 0">
                    <el-input
                        v-model="release_dialog.releaseData.company_title"
                        :disabled="true"
                        style="width: 40%">
                    </el-input>
                  </el-form-item>
                </transition>
                <transition name="el-fade-in-linear">
                  <el-form-item label="所在行业" prop="company_pro" v-if="release_dialog.page == 0">
                    <el-cascader
                        v-model="release_dialog.releaseData.company_pro"
                        :options="company_pro_options"
                        :show-all-levels="false"
                        :props="{ expandTrigger: 'hover' }">
                    </el-cascader>
                  </el-form-item>
                </transition>
                <transition name="el-fade-in-linear">
                  <el-form-item label="申请部门" prop="apply_department" v-if="release_dialog.page == 0">
                    <el-input
                        v-model="release_dialog.releaseData.apply_department"
                        :disabled="true"
                        style="width: 50%">
                    </el-input>
                  </el-form-item>
                </transition>
                <transition name="el-fade-in-linear">
                  <el-form-item label="所需岗位" prop="apply_job" v-if="release_dialog.page == 0">
                    <el-input
                        v-model="release_dialog.releaseData.apply_job"
                        :disabled="true"
                        style="width: 50%">
                    </el-input>
                  </el-form-item>
                </transition>
                <transition name="el-fade-in-linear">
                  <el-form-item label="招聘类型" prop="publish_type_name" v-if="release_dialog.page == 0">
                    <el-radio v-model="release_dialog.releaseData.publish_type_name" label="社招" size="medium">社招</el-radio>
                    <el-radio v-model="release_dialog.releaseData.publish_type_name" label="应届校园招聘" size="medium">应届校园招聘</el-radio>
                    <el-radio v-model="release_dialog.releaseData.publish_type_name" label="实习生招聘" size="medium">实习生招聘</el-radio>
                  </el-form-item>
                </transition>
                <!--///////////////第二页///////////////-->
                <transition name="el-fade-in-linear">
                  <el-form-item label="期望成本薪资" prop="publish_expect_money_low" v-if="release_dialog.page == 1">
                    <el-input
                        v-model="release_dialog.releaseData.publish_expect_money_low"
                        style="width: 20%">
                    </el-input>
                    <span>~</span>
                    <el-input
                        v-model="release_dialog.releaseData.publish_expect_money_high"
                        style="width: 20%">
                    </el-input>
                  </el-form-item>
                </transition>
                <transition name="el-fade-in-linear">
                  <el-form-item label="工作经验" prop="publish_work_time" v-if="release_dialog.page == 1">
                    <el-select v-model="release_dialog.releaseData.publish_work_time" style="width: 50%" placeholder="在此选择工作经验">
                      <el-option
                          v-for="item in workTimeOptions"
                          :key="item.value"
                          :label="item.value"
                          :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </transition>
                <transition name="el-fade-in-linear">
                  <el-form-item label="学历要求" prop="publish_edu_qualification" v-if="release_dialog.page == 1">
                    <el-select v-model="release_dialog.releaseData.publish_edu_qualification" style="width: 50%" placeholder="在此选择学历要求">
                      <el-option
                          v-for="item in eduQualificationOptions"
                          :key="item.value"
                          :label="item.value"
                          :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </transition>
                <transition name="el-fade-in-linear">
                  <el-form-item label="社保基数" prop="publish_social_num" v-if="release_dialog.page == 1">
                    <el-input
                        v-model="release_dialog.releaseData.publish_social_num"
                        style="width: 40%">
                    </el-input>
                  </el-form-item>
                </transition>
                <transition name="el-fade-in-linear">
                  <el-form-item label="公积金基数" prop="publish_public_num" v-if="release_dialog.page == 1">
                    <el-input
                        v-model="release_dialog.releaseData.publish_public_num"
                        style="width: 40%">
                    </el-input>
                  </el-form-item>
                </transition>
              </el-form>
            </el-scrollbar>
            <div slot="footer" class="dialog-footer">
              <el-button type="primary" @click="release_dialog.page+=1" v-if="release_dialog.page == 0">下一页</el-button>
              <el-button @click="release_dialog.page-=1" v-if="release_dialog.page == 1">上一页</el-button>
              <el-button type="primary" @click="submitRelease" v-if="release_dialog.page == 1">确 定</el-button>
            </div>
          </el-dialog>
          <el-dialog
              title="招聘岗位风险评估"
              :visible.sync="risk_test_dialog.riskTestDialogVisible"
              width="35%"
              @close="handleApprovalDialogClose"
          >
            <el-scrollbar
                style="height: 270px;"
                wrap-style="overflow-x:hidden;overflow-y:show;"
            >
              <el-row>
                <el-steps style="margin-left: 5%" :space="100" :active="risk_test_dialog.stepNUm" finish-status="success">
                  <el-step></el-step>
                  <el-step></el-step>
                  <el-step></el-step>
                  <el-step></el-step>
                  <el-step></el-step>
                  <el-step></el-step>
                  <el-step></el-step>
                </el-steps>
              </el-row>
              <el-row type="flex" justify="center">
                <transition name="el-zoom-in-center">
                  <div v-if="risk_test_dialog.page == 1" style="margin-top: 10%">
                    <h2>您所在企业是否为初创企业？</h2>
                    <el-col :span="20" :offset="4">
                      <el-radio v-model="risk_test_dialog.riskTestData.question1" label="是" border>是</el-radio>
                      <el-radio v-model="risk_test_dialog.riskTestData.question1" label="否" border>否</el-radio>
                    </el-col>
                  </div>
                </transition>
                <transition name="el-zoom-in-center">
                  <div v-if="risk_test_dialog.page == 2" style="margin-top: 10%">
                    <h2>该岗位是否涉及企业核心业务？</h2>
                    <el-col :span="20" :offset="4">
                      <el-radio v-model="risk_test_dialog.riskTestData.question2" label="是" border>是</el-radio>
                      <el-radio v-model="risk_test_dialog.riskTestData.question2" label="否" border>否</el-radio>
                    </el-col>
                  </div>
                </transition>
                <transition name="el-zoom-in-center">
                  <div v-if="risk_test_dialog.page == 3" style="margin-top: 10%">
                    <h2>该岗位是否为企业新涉及领域？</h2>
                    <el-col :span="20" :offset="4">
                      <el-radio v-model="risk_test_dialog.riskTestData.question3" label="是" border>是</el-radio>
                      <el-radio v-model="risk_test_dialog.riskTestData.question3" label="否" border>否</el-radio>
                    </el-col>
                  </div>
                </transition>
                <transition name="el-zoom-in-center">
                  <div v-if="risk_test_dialog.page == 4" style="margin-top: 10%">
                    <h2>该岗位目前是否有成熟的运营团队？</h2>
                    <el-col :span="19" :offset="5">
                      <el-radio v-model="risk_test_dialog.riskTestData.question4" label="是" border>是</el-radio>
                      <el-radio v-model="risk_test_dialog.riskTestData.question4" label="否" border>否</el-radio>
                    </el-col>
                  </div>
                </transition>
                <transition name="el-zoom-in-center">
                  <div v-if="risk_test_dialog.page == 5" style="margin-top: 10%">
                    <h2>该岗位目前已有员工数？</h2>
                    <el-col :span="24">
                      <el-radio v-model="risk_test_dialog.riskTestData.question5" label="3人以下" border>3人以下</el-radio>
                      <el-radio v-model="risk_test_dialog.riskTestData.question5" label="5人以上" border>5人以上</el-radio>
                    </el-col>
                  </div>
                </transition>
                <transition name="el-zoom-in-center">
                  <div v-if="risk_test_dialog.page == 6" style="margin-top: 10%">
                    <h2>该岗位是否曾有多名员工离职？</h2>
                    <el-col :span="20" :offset="4">
                      <el-radio v-model="risk_test_dialog.riskTestData.question6" label="是" border>是</el-radio>
                      <el-radio v-model="risk_test_dialog.riskTestData.question6" label="否" border>否</el-radio>
                    </el-col>
                  </div>
                </transition>
                <transition name="el-zoom-in-center">
                  <div v-if="risk_test_dialog.page == 7" style="margin-top: 10%">
                    <h2>该岗位所需技能是否是您所在企业缺少的？</h2>
                    <el-col :span="18" :offset="6">
                      <el-radio v-model="risk_test_dialog.riskTestData.question7" label="是" border>是</el-radio>
                      <el-radio v-model="risk_test_dialog.riskTestData.question7" label="否" border>否</el-radio>
                    </el-col>
                  </div>
                </transition>
              </el-row>
            </el-scrollbar>
            <div slot="footer" class="dialog-footer">
              <el-button @click="risk_test_dialog.page-=1;risk_test_dialog.stepNUm-=1" v-if="risk_test_dialog.page == 2||risk_test_dialog.page == 3||risk_test_dialog.page == 4||risk_test_dialog.page == 5||risk_test_dialog.page == 6||risk_test_dialog.page == 7">上一页</el-button>
              <el-button type="primary" @click="risk_test_dialog.page+=1;risk_test_dialog.stepNUm+=1" v-if="risk_test_dialog.page == 1||risk_test_dialog.page == 2||risk_test_dialog.page == 3||risk_test_dialog.page == 4||risk_test_dialog.page == 5||risk_test_dialog.page == 6">下一页</el-button>
              <el-button type="primary" @click="startEvaluate" v-if="risk_test_dialog.page == 7">开始评估</el-button>
            </div>
          </el-dialog>
          <el-row type="flex" justify="center" style="margin-top: 1%">
            <el-col :span="13">
              <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="wait_approval.currentPage"
                  :page-sizes="[10, 15, 20, 40]"
                  :page-size="wait_approval.currentSize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="wait_approval.total">
              </el-pagination>
            </el-col>
          </el-row>
        </el-tab-pane>
        <!-- ////////////////这是已发布的招聘页面/////////////////////-->
        <el-tab-pane label="已发布的招聘" name="already_release">
          <el-row style="margin-left: 2%">
            <el-table
                :data="already_release.alreadyReleaseData"
                style="width: 100%"
                height="530"
                stripe
                empty-text>
              <el-table-column
                  type="index"
                  align="center"
                  label="序号"
                  header-align="center"
                  width="90">
              </el-table-column>
              <el-table-column
                  prop="apply_job"
                  align="center"
                  header-align="center"
                  label="岗位名称"
                  width="165">
              </el-table-column>
              <el-table-column
                  prop="apply_need_worker"
                  align="center"
                  header-align="center"
                  label="所需人数"
                  width="165">
              </el-table-column>
              <el-table-column
                  prop="apply_department"
                  align="center"
                  header-align="center"
                  label="申请部门"
                  width="165">
              </el-table-column>
              <el-table-column
                  prop="apply_status"
                  align="center"
                  header-align="center"
                  label="当前状态"
                  width="165"
              >
                <template slot-scope="scope">
                  <el-tag size="medium" :type="scope.row.apply_status=='待审核'?'info':(scope.row.apply_status=='已发布'?'success':'danger')">{{ scope.row.apply_status }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column
                  align="center"
                  header-align="center"
                  label="发布时间"
                  width="170">
                <template slot-scope="scope">
                  <i class="el-icon-time"></i>
                  <span style="margin-left: 10px">{{ scope.row.publish_create_time }}</span>
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
                      size="small"
                      @click="handleApproval(scope.$index, scope.row)"
                      type="primary">
                    已完成
                  </el-button>
                  <el-button
                      slot="reference"
                      size="small"
                      @click="handleApproval(scope.$index, scope.row)"
                      type="primary"
                      plain>
                    撤销
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
                  :current-page="wait_approval.currentPage"
                  :page-sizes="[10, 15, 20, 40]"
                  :page-size="wait_approval.currentSize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="wait_approval.total">
              </el-pagination>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-row>
  </div>
</template>

<script>
import company_pro_options from "@/util/company_pro";
  export default {
    name: "RecruitmentManage",
    data(){
      return{
        tabName: 'wait_approval',
        clickDepartment:'',
        departmentList:[],
        company_pro_options,
        workTimeOptions:[
          {
            value: '经验不限'
          },
          {
            value: '1~3年'
          },
          {
            value: '3~5年'
          },
          {
            value: '5年以上'
          },
        ],
        eduQualificationOptions:[
          {
            value:'小学',
            label:'小学'
          },
          {
            value:'初中',
            label:'初中'
          },
          {
            value:'中专/高中',
            label:'中专/高中'
          },
          {
            value:'专科',
            label:'专科'
          },
          {
            value:'本科',
            label:'本科'
          },
          {
            value:'硕士研究生',
            label:'硕士研究生'
          },
          {
            value:'博士研究生',
            label:'博士研究生'
          }
        ],
        approval_dialog: {
          approvalDialogVisible: false,
          approvalData: {
            apply_checker_name: '',
            apply_department: '',
            apply_job: '',
            apply_need_worker: '',
            isPass: '是',
            apply_reason: '',
            id:''
          },
        },
        release_dialog: {
          releaseDialogVisible: false,
          page: 0,
          releaseData: {
            company_title: '',
            apply_department: '',
            company_pro:'',
            publish_type_name: '社招',
            publish_manager_name: '',
            publish_expect_money_low: 0,
            publish_expect_money_high: 0,
            publish_social_num: 0,
            publish_public_num: 0,
            publish_work_time: '',
            publish_edu_qualification: '',
            publish_risk: ''
          },
        },
        risk_test_dialog: {
          riskTestDialogVisible: false,
          page: 1,
          stepNUm: 0,
          riskTestData: {
            question1: '是',
            question2: '是',
            question3: '是',
            question4: '是',
            question5: '3人以下',
            question6: '是',
            question7: '是',
          },
        },
        wait_approval: {
          waitApprovalData: [],
          currentSize: '',
          currentPage: '',
          total: ''
        },
        wait_release: {
          waitReleaseData: [],
          currentSize: '',
          currentPage: '',
          total: ''
        },
        already_release: {
          alreadyReleaseData: [],
          currentSize: '',
          currentPage: '',
          total: ''
        },
        company_info: {
          company_title: '',
          company_pro: '',
          company_people_number: 0,
          company_province: '',
          company_place: ''
        },
      }
    },
    methods:{
      handleTabChange() {

      },

      submitApproval() {
        console.log("提交审批");
        this.approval_dialog.approvalDialogVisible = false
        this.approval_dialog.approvalData.isPass = '是'
      },

      submitRelease(){
        const _this = this
        this.release_dialog.releaseDialogVisible = false
        setTimeout(function (){
          _this.$confirm('您的公司已开通岗位风险评估功能，是否对本次发布进行岗位风险评估?', '岗位风险评估', {
            confirmButtonText: '进行评测',
            cancelButtonText: '直接发布',
            type: 'warning'
          }).then(() => {
///////////////////////////////////
            _this.release_dialog.page = 0
            _this.$message({
              type: 'success',
              message: '请您配合我们完成几个问题，以供我们评估该岗位的用工风险!'
            });
            setTimeout(function () {
              _this.risk_test_dialog.riskTestDialogVisible = true
            },500)
//////////////////////////////
          }).catch(() => {
            _this.release_dialog.page = 0
            _this.$notify({
              title: '招聘岗位发布成功！',
              message: '请及时关注人才库更新',
              type: 'success'
            });
          });
        },500)
      },

      startEvaluate() {
        const _this =this
        this.risk_test_dialog.riskTestData.question1 =  '是'
        this.risk_test_dialog.riskTestData.question2 = '是'
        this.risk_test_dialog.riskTestData.question3 = '是'
        this.risk_test_dialog.riskTestData.question4 = '是'
        this.risk_test_dialog.riskTestData.question5 = '3人以下'
        this.risk_test_dialog.riskTestData.question6 = '是'
        this.risk_test_dialog.riskTestData.question7 = '是'
        this.risk_test_dialog.page = 1
        this.risk_test_dialog.stepNUm = 0
        this.risk_test_dialog.riskTestDialogVisible = false
        setTimeout(function () {
          _this.$message({
            message: '您招聘的岗位风险为: 低风险',
            type: 'success',
            center: true,
            offset: 300
          });
          _this.$notify({
            title: '招聘岗位风险评估成功，岗位已发布！',
            message: '请及时关注人才库更新',
            type: 'success'
          });
        },1000)
      },

      handleApprovalDialogClose() {
        this.approval_dialog.approvalData.isPass = '是'
      },

      handleApproval(index,row) {
        this.approval_dialog.approvalDialogVisible = true
        this.approval_dialog.approvalData.apply_department = row.apply_department
        this.approval_dialog.approvalData.apply_checker_name = row.apply_checker_name
        this.approval_dialog.approvalData.apply_job = row.apply_job
        this.approval_dialog.approvalData.apply_need_worker = row.apply_need_worker
        this.approval_dialog.approvalData.id = row.id
      },

      handleRelease(index,row) {
        this.release_dialog.releaseDialogVisible = true
        //this.risk_test_dialog.riskTestDialogVisible = true
        this.release_dialog.releaseData.apply_department = row.apply_department
        this.release_dialog.releaseData.apply_job = row.apply_job
        this.release_dialog.releaseData.company_pro = this.company_info.company_pro
        this.release_dialog.releaseData.publish_manager_name = this.$store.state.user_name
      },

      handleDeleteApplication() {

      },

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

      loadCompanyInfo() {
        const _this = this
        _this.axios.get("https://easydoc.xyz/mock/sEWRf0fW/get_recruitment_company_info?company_id="+_this.$store.state.company_id+"&user_phone="+_this.$store.state.user_phone)
            .then(function (res) {
              _this.company_info = res.data.company_info
              _this.release_dialog.releaseData.company_title = _this.company_info.company_title
              //console.log(res.data.company_info)
            })
            .catch(function (err) {  //当请求出现错误时的回调函数
              console.log(err);
            });
      },

      loadWaitApprovalData() {
        const _this = this
        _this.axios.get("https://easydoc.xyz/mock/sEWRf0fW/get_wait_approval_info?company_id="+_this.$store.state.company_id+"&user_phone="+_this.$store.state.user_phone
            +"&current_size="+_this.wait_approval.currentSize+"&current_page="+_this.wait_approval.currentPage )
            .then(function (res) {
              _this.wait_approval.waitApprovalData = res.data.waitApprovalData
              _this.wait_approval.total = res.data.total
              //console.log(res.data)
            })
            .catch(function (err) {  //当请求出现错误时的回调函数
              console.log(err);
            });
      },

      clearReleaseDialog() {
        this.$refs.releaseForm.resetFields()
        this.release_dialog.releaseDialogVisible = false
        this.release_dialog.page = 0
      },

      loadWaitReleaseData() {
        const _this = this
        _this.axios.get("https://easydoc.xyz/mock/sEWRf0fW/get_wait_release_info?company_id="+_this.$store.state.company_id+"&user_phone="+_this.$store.state.user_phone
            +"&current_size="+_this.wait_release.currentSize+"&current_page="+_this.wait_release.currentPage )
            .then(function (res) {
              _this.wait_release.waitReleaseData = res.data.waitReleaseData
              _this.wait_release.total = res.data.total
              //console.log(res.data)
            })
            .catch(function (err) {  //当请求出现错误时的回调函数
              console.log(err);
            });
      },

      loadAlreadyReleaseData() {
        const _this = this
        _this.axios.get("https://easydoc.xyz/mock/sEWRf0fW/get_already_release_info?company_id="+_this.$store.state.company_id+"&user_phone="+_this.$store.state.user_phone
            +"&current_size="+_this.already_release.currentSize+"&current_page="+_this.already_release.currentPage )
            .then(function (res) {
              _this.already_release.alreadyReleaseData = res.data.alreadyReleaseData
              _this.already_release.total = res.data.total
              //console.log(res.data)
            })
            .catch(function (err) {  //当请求出现错误时的回调函数
              console.log(err);
            });
      },
    },

    mounted() {
      const _this = this
      this.loadDepartmentList((data)=> {
        _this.departmentList = data
        _this.clickDepartment = data[0].value
        //console.log(_this.clickDepartment)
      })
    },
    created() {
      this.loadCompanyInfo()
      this.loadWaitApprovalData()
      this.loadWaitReleaseData()
      this.loadAlreadyReleaseData()
    }
  }
</script>

<style scoped>
  
</style>