<template>
  <div class="menubar">
    <div style="width: 100%">
      <el-image
          style="width: 182px;margin-left: 10%"
          fit="fill"
          :src="src">
      </el-image>
    </div>
    <div style="width: 100%;height: 631px">
      <el-scrollbar
          style="height: 631px;"
          wrap-style="overflow-x:hidden; overflow-y:show;"
         >
        <el-menu
            :default-active="$route.path"
            class="el-menu-vertical"
            ref="menu"
            :unique-opened="true"
            router
        >
          <!--动态生成sideItem-->
          <template v-for="(item, parentIndex) in nav_admin">
            <SideNav :item="item" :index="parentIndex"  :key="parentIndex"></SideNav>
          </template>
        </el-menu>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import SideNav from "./SideNav";
import img from "../../../assets/Cirrus_logo.jpg"
export default {
  name: "MenuBar",
  data(){
    return{
      nav_admin: [
        {
          icon: "el-icon-s-home",
          title: "主页",
          path: "/home_page_hr"
        },
        {
          icon: "el-icon-s-operation",
          title: "账号管理",
          child: [
            {
              title: "账号信息",
              path: "/account_manage"
            },
            {
              title: "新增账号",
              path: "/account_add"
            },
            {
              title: "入司审核",
              path: "/account_approval"
            },
          ]
        },
        {
          icon: "el-icon-office-building",
          title: "部门管理",
          child: [
            {
              title: "部门信息",
              path: "/department_info"
            },
            {
              title: "新建部门",
              path: "/department_build"
            }
          ]
        },
        {
          icon: "el-icon-document",
          title: "员工档案",
          child: [
            {
              title: "档案信息",
              path: "/archives_info"
            },
            {
              title: "记录重大违纪",
              path: "/record_discipline"
            }
          ]
        },
        {
          icon: "el-icon-edit-outline",
          title: "员工评估",
          child: [
            {
              title: "每月评价",
              path: "/evaluation_info",
            },
            {
              title: "员工状态预警",
              path: "/state_warning"
            }
          ]
        },
        {
          icon: "el-icon-s-promotion",
          title: "对外招聘",
          child: [
            {
              title: "招聘管理 ",
              path: "/recruitment_manage"
            },
            {
              title: "人才库",
              path: "/talents_library"
            },
            {
              title: "面试安排",
              path: "/interview_manage"
            },
            {
              title: "用工申请",
              path: "/recruitment_application"
            }
          ]
        },
        {
          icon: "el-icon-reading",
          title: "员工培训",
          child: [
            {
              title: "发布培训",
              path: "/release_train"
            },
            {
              title: "企业题库",
              path: "/company_question_bank"
            },
            {
              title: "完成情况",
              path: "/employee_performance"
            }
          ]
        },
        {
          icon: "el-icon-data-line",
          title: "统计图表",
          child: [
            {
              title: "历年人数",
              path: "/department_charts"
            },
            {
              title: "员工概况",
              path: "/employee_charts"
            },
          ]
        },
        {
          icon: "el-icon-s-flag",
          title: "出勤管理",
          path: "/home_page"
        },
        {
          icon: "el-icon-shopping-cart-full",
          title: "积分商城",
          child: [
            {
              title: "积分兑换",
              path: "/credits_mall"
            },
            {
              title: "积分流水",
              path: "/none"
            },
            {
              title: "物品仓库",
              path: "/none"
            }
          ]
        },
        {
          icon: "el-icon-setting",
          title: "操作日志",
          path: "/system_log"
        },
      ],
      nav_hr: [
        {
          icon: "el-icon-s-home",
          title: "主页",
          path: "/home_page_hr"
        },
        {
          icon: "el-icon-s-operation",
          title: "账号管理",
          child: [
            {
              title: "账号信息",
              path: "/account_manage"
            },
            {
              title: "新增账号",
              path: "/account_add"
            },
            {
              title: "入司审核",
              path: "/account_approval"
            },
          ]
        },
        {
          icon: "el-icon-office-building",
          title: "部门管理",
          child: [
            {
              title: "部门信息",
              path: "/department_info"
            },
            {
              title: "新建部门",
              path: "/department_build"
            }
          ]
        },
        {
          icon: "el-icon-document",
          title: "员工档案",
          child: [
            {
              title: "档案信息",
              path: "/archives_info"
            },
            {
              title: "记录重大违纪",
              path: "/record_discipline"
            }
          ]
        },
        {
          icon: "el-icon-edit-outline",
          title: "员工评估",
          child: [
            {
              title: "每月评价",
              path: "/evaluation_info",
            },
            {
              title: "员工状态预警",
              path: "/state_warning"
            }
          ]
        },
        {
          icon: "el-icon-s-promotion",
          title: "对外招聘",
          child: [
            {
              title: "招聘管理 ",
              path: "/recruitment_manage"
            },
            {
              title: "人才库",
              path: "/talents_library"
            },
            {
              title: "面试安排",
              path: "/interview_manage"
            }
          ]
        },
        {
          icon: "el-icon-reading",
          title: "员工培训",
          child: [
            {
              title: "发布培训",
              path: "/release_train"
            },
            {
              title: "企业题库",
              path: "/company_question_bank"
            },
            {
              title: "完成情况",
              path: "/employee_performance"
            }
          ]
        },
        {
          icon: "el-icon-data-line",
          title: "统计图表",
          child: [
            {
              title: "历年人数",
              path: "/department_charts"
            },
            {
              title: "员工概况",
              path: "/employee_charts"
            },
          ]
        },
        {
          icon: "el-icon-s-flag",
          title: "出勤管理",
          path: "/home_page"
        }
      ],
      nav_department: [
        {
          icon: "el-icon-s-operation",
          title: "账号管理",
          child: [
            {
              title: "入司审核",
              path: "/account_approval"
            },
          ]
        },
        {
          icon: "el-icon-office-building",
          title: "部门管理",
          child: [
            {
              title: "部门信息",
              path: "/department_info"
            }
          ]
        },
        {
          icon: "el-icon-s-promotion",
          title: "对外招聘",
          child: [
            {
              title: "用工申请",
              path: "/recruitment_application"
            }
          ]
        },
        {
          icon: "el-icon-reading",
          title: "员工培训",
          child: [
            {
              title: "发布培训",
              path: "/release_train"
            },
            {
              title: "企业题库",
              path: "/company_question_bank"
            },
            {
              title: "完成情况",
              path: "/employee_performance"
            }
          ]
        },
        {
          icon: "el-icon-data-line",
          title: "统计图表",
          child: [
            {
              title: "历年人数",
              path: "/department_charts"
            },
            {
              title: "员工概况",
              path: "/employee_charts"
            },
          ]
        }
      ],
      src: img
    }
  },
  methods:{
  },
  components: {
    SideNav
  },
  created() {
    // if (this.$store.state.company_employee_role)
    this.$router.push('/home_page_hr')
  }
}
</script>

<style scoped>

</style>