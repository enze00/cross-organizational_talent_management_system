import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/views/Login";

Vue.use(VueRouter)

export const constantRouterMap = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta:{
      title: '登录',
    }
  },
  {
    path: '/judge_build_or_join',
    name: 'JudgeBuildOrJoin',
    component: () => import('../views/regist/company/JudgeBuildOrJoin'),
    meta:{
      title: '注册',
    }
  },
  {
    path: '/build_account',
    name: 'BuildAccount',
    component: () => import('../views/regist/BuildAccount'),
    meta:{
      title: '创建账号',
    }
  },
  {
    path: '/build_basic_info',
    name: 'BuildBasicInfo',
    component: () => import('../views/regist/BuildBasicInfo'),
    meta:{
      title: '基本信息',
    }
  },
  {
    path: '/build_company',
    name: 'BuildCompany',
    component: () => import('../views/regist/company/build/BuildCompany'),
    meta:{
      title: '创建公司',
    }
  },
  {
    path: '/build_work_experience',
    name: 'BuildWorkExperience',
    component: () => import('../views/regist/BuildWorkExperience'),
    meta:{
      title: '工作经历',
    }
  },
  {
    path: '/build_education_background',
    name: 'BuildEducationBackground',
    component: () => import('../views/regist/BuildEducationBackground'),
    meta:{
      title: '学历信息',
    }
  },
  {
    path: '/join_company',
    name: 'JoinCompany',
    component: () => import('../views/regist/company/join/JoinCompany'),
    meta:{
      title: '加入公司',
    }
  }
]

export const asyncRouterMap =[
  {
    path: '/index',
    name: 'Index',
    component: () => import('@/views/Index'),
    meta:{
      title: '主页',
    },
    children: [
      {
        path: '/home_page_hr',
        name: 'HomePage_hr',
        component: () => import('@/views/HomePage/HomePage_hr'),
        meta:{
          title: '主页',
        }
      },
      {
        path: '/account_manage',
        name: 'AccountManage',
        component: () => import('@/views/AccountManage/AccountManage'),
        meta:{
          title: '账号管理',
        }
      },
      {
        path: '/account_add',
        name: 'AccountAdd',
        component: () => import('@/views/AccountManage/AccountAdd'),
        meta:{
          title: '新增账号',
        }
      },
      {
        path: '/account_approval',
        name: 'AccountApproval',
        component: () => import('@/views/AccountManage/AccountApproval'),
        meta:{
          title: '入司审核',
        }
      },
      {
        path: '/department_charts',
        name: 'DepartmentCharts',
        component: () => import('@/views/StatisticalCharts/DepartmentCharts'),
        meta:{
          title: '历年人数',
        }
      },
      {
        path: '/employee_charts',
        name: 'EmployeeCharts',
        component: () => import('@/views/StatisticalCharts/EmployeeCharts'),
        meta:{
          title: '员工概况',
        }
      },
      {
        path: '/tax_calculation',
        name: 'TaxCalculation',
        component: () => import('@/views/util/TaxCalculation'),
        meta:{
          title: '五险一金',
        }
      },
      {
        path: '/department_info',
        name: 'DepartmentInfo',
        component: () => import('@/views/DepartmentManage/DepartmentInfo'),
        meta:{
          title: '部门信息',
        }
      }
      ,
      {
        path: '/department_build',
        name: 'DepartmentBuild',
        component: () => import('@/views/DepartmentManage/DepartmentBuild'),
        meta:{
          title: '新建部门',
        }
      },
      {
        path: '/archives_info',
        name: 'ArchivesInfo',
        component: () => import('@/views/EmployeeArchives/ArchivesInfo'),
        meta:{
          title: '档案信息',
        },
        props:  route => ({
          company_id: route.query.company_id,
          hr_phone: route.query.hr_phone,
          company_employee_phone: route.query.company_employee_phone
        })
      },
      {
        path: '/history_detail',
        name: 'HistoryDetail',
        component: () => import('@/views/EmployeeArchives/HistoryDetail'),
        meta:{
          title: '过往工作经历',
        },
        props:  route => ({
            company_id: route.query.company_id,
            hr_phone: route.query.hr_phone,
            company_title_search: route.query.company_title_search,
            company_employee_phone: route.query.company_employee_phone,
            company_enter_time: route.query.company_enter_time
        })
      },
      {
        path: '/record_discipline',
        name: 'RecordDiscipline',
        component: () => import('@/views/EmployeeArchives/RecordDiscipline'),
        meta:{
          title: '记录重大违纪',
        }
      },
      {
        path: '/personal_archives',
        name: 'PersonalArchives',
        component: () => import('@/views/EmployeeArchives/PersonalArchives'),
        meta:{
          title: '个人档案',
        },
        props:  route => ({
          company_id: route.query.company_id,
          hr_phone: route.query.hr_phone,
          talent_phone: route.query.user_phone,
          talent_name: route.query.talent_name
        })
      },
      {
        path: '/evaluation_info',
        name: 'EvaluationInfo',
        component: () => import('@/views/ArchivesEvaluation/EvaluationInfo'),
        meta:{
          title: '每月评价',
        }
      },
      {
        path: '/state_warning',
        name: 'StateWarning',
        component: () => import('@/views/ArchivesEvaluation/StateWarning'),
        meta:{
          title: '员工状态预警',
        }
      },
      {
        path: '/recruitment_application',
        name: 'RecruitmentApplication',
        component: () => import('@/views/Recruitment/RecruitmentApplication'),
        meta:{
          title: '用工申请',
        }
      },
      {
        path: '/recruitment_manage',
        name: 'RecruitmentManage',
        component: () => import('@/views/Recruitment/RecruitmentManage'),
        meta:{
          title: '招聘管理',
        }
      },
      {
        path: '/talents_library',
        name: 'TalentsLibrary',
        component: () => import('@/views/Recruitment/TalentsLibrary'),
        meta:{
          title: '人才库',
        },
        props:  route => ({
          company_id: route.query.company_id,
          hr_phone: route.query.hr_phone,
          talent_phone: route.query.talent_phone,
        })
      },
      {
        path: '/interview_manage',
        name: 'InterviewManage',
        component: () => import('@/views/Recruitment/InterviewManage'),
        meta:{
          title: '面试安排',
        }
      },
      {
        path: '/credits_mall',
        name: 'CreditsMall',
        component: () => import('@/views/CreditsManage/CreditsMall'),
        meta:{
          title: '积分兑换',
        }
      },
      {
        path: '/release_train',
        name: 'ReleaseTrain',
        component: () => import('@/views/OnlineTrain/ReleaseTrain'),
        meta:{
          title: '发布培训',
        }
      },
      {
        path: '/company_question_bank',
        name: 'CompanyQuestionBank',
        component: () => import('@/views/OnlineTrain/CompanyQuestionBank'),
        meta:{
          title: '企业题库',
        }
      },
      {
        path: '/employee_performance',
        name: 'EmployeePerformance',
        component: () => import('@/views/OnlineTrain/EmployeePerformance'),
        meta:{
          title: '完成情况',
        }
      },
      {
        path: '/system_log',
        name: 'SystemLog',
        component: () => import('@/views/SystemLog/SystemLog'),
        meta:{
          title: '操作日志',
        }
      }
    ]
  }
]

//实例化vue的时候只挂载constantRouter
const createRouter = () => new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: constantRouterMap
})

const router = createRouter()


export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
  router.options.routes = constantRouterMap
}

export default router
