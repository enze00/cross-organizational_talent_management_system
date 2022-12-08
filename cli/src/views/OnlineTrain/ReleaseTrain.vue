<template>
  <div class="release_train">
    <el-row type="flex" align="middle">
      <el-col :span="1" style="margin-top: 1%;margin-left: 1%">
        <div style="height: 25px;width: 10px; border-radius:10px;background-color:#3a8ee6"></div>
      </el-col>
      <el-col :span="5" style="margin-top: 1%">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/release_train' }">员工培训</el-breadcrumb-item>
          <el-breadcrumb-item>发布培训</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center" style="margin-top: 3%">
      <el-col :span="20">
        <el-steps :active="stepNum" finish-status="success" align-center>
          <el-step title="填写培训介绍"></el-step>
          <el-step title="导入培训教程"></el-step>
          <el-step title="选择培训习题"></el-step>
          <el-step title="选择发布范围"></el-step>
        </el-steps>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="20" style="height: 500px">
        <el-form ref="form" :model="buildTrainData" label-width="80px">
          <el-form-item prop="train_title" v-show="pageNum == 0">
            <el-row>
              <el-col :span="3" :offset="2" style="margin-top: 8%">
                <div style="font-weight: bolder;text-shadow:3px 4px 4px #7ADFF2;">培训题目 :</div>
              </el-col>
              <el-col :span="10"  style="margin-top: 8%">
                <el-input v-model="buildTrainData.train_title" placeholder="在此输入培训题目"></el-input>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="train_title" v-show="pageNum == 0">
            <el-row>
              <el-col :span="3" :offset="2" style="margin-top: 5%">
                <div style="font-weight: bolder;text-shadow:3px 4px 4px #7ADFF2;">培训介绍 :</div>
              </el-col>
              <el-col :span="15"  style="margin-top: 5%">
                <el-input
                    type="textarea"
                    :rows="5"
                    placeholder="在此输入培训介绍"
                    v-model="buildTrainData.train_introduce">
                </el-input>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="train_title" v-if="pageNum == 1">
            <el-row>
              <el-col :span="5" :offset="2" style="margin-top: 5%">
                <div style="font-weight: bolder;text-shadow:3px 4px 4px #7ADFF2;">培训视频 :</div>
              </el-col>
              <el-col :span="15"  style="margin-top: 5%">
                <el-upload
                    class="upload-demo"
                    drag
                    action="https://jsonplaceholder.typicode.com/posts/"
                    multiple>
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                  <div class="el-upload__tip" slot="tip">只能上传mp4/avi/mov/wav文件，且不超过100MB</div>
                </el-upload>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="train_title" v-if="pageNum == 1">
            <el-row>
              <el-col :span="3" :offset="2" style="margin-top: 2%">
                <div style="font-weight: bolder;text-shadow:3px 4px 4px #7ADFF2;">培训内容 :</div>
              </el-col>
              <el-col :span="15"  style="margin-top: 2%">
                <el-input
                    type="textarea"
                    :rows="5"
                    placeholder="在此输入培训介绍"
                    v-model="buildTrainData.train_introduce">
                </el-input>
              </el-col>
            </el-row>
          </el-form-item>
          <el-row style="margin-left: 2%" v-show="pageNum == 2">
            <el-table
                :data="trainLibraryData"
                style="width: 100%"
                height="440"
                stripe
                empty-text>
              <el-table-column
                  type="selection"
                  width="55">
              </el-table-column>
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
            </el-table>
          </el-row>
          <el-row v-show="pageNum==3" style="margin-top: 2%">
            <tree-transfer
                :to_data="tmpList"
                :from_data="pageList"
                :mode="mode"
                :title="['待选员工', '已选员工']"
                height='450px'
                @addBtn='addBtn'
                @removeBtn='removeBtn'
            >
            </tree-transfer>
          </el-row>
        </el-form>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="5">
        <el-button @click="pageNum-=1,stepNum-=1" :disabled="pageNum == 0" >上一页</el-button>
        <el-button type="primary" @click="pageNum+=1,stepNum+=1" v-if="pageNum != 3">下一页</el-button>
        <el-button type="primary" @click="releaseTrain" v-if="pageNum == 3">发 布</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import treeTransfer from 'el-tree-transfer'
export default {
  name: "ReleaseTrain",
  data() {
    return {
      stepNum: 0,
      pageNum: 0,
      buildTrainData: {
        train_title: '',
        train_introduce: '',

      },
      trainLibraryData: [],
      pageList: [
        {
          id:'0',
          pid:0,
          label:"技术1部",
          children: [
            {
              id:'0-1',
              pid:'0',
              label:"熊艳"
            },
            {
              id:'0-2',
              pid:'0',
              label:"乔刚"
            },
            {
              id:'0-3',
              pid:'0',
              label:"汤杰"
            },
            {
              id:'0-4',
              pid:'0',
              label:"夏伟"
            },
            {
              id:'0-5',
              pid:'0',
              label:"薛娟"
            },
            {
              id:'0-6',
              pid:'0',
              label:"秦明"
            },
            {
              id:'0-7',
              pid:'0',
              label:"邹娜"
            },
            {
              id:'0-8',
              pid:'0',
              label:"史刚"
            },
            {
              id:'0-9',
              pid:'0',
              label:"许敏"
            },
            {
              id:'0-10',
              pid:'0',
              label:"蔡丽"
            },
            {
              id:'0-11',
              pid:'0',
              label:"乔秀英"
            },
            {
              id:'0-12',
              pid:'0',
              label:"秦霞"
            },
            {
              id:'0-13',
              pid:'0',
              label:"戴敏"
            },
            {
              id:'0-14',
              pid:'0',
              label:"熊伟"
            },
            {
              id:'0-15',
              pid:'0',
              label:"贾静"
            },
            {
              id:'0-16',
              pid:'0',
              label:"刘军"
            },
            {
              id:'0-17',
              pid:'0',
              label:"唐洋"
            },
            {
              id:'0-18',
              pid:'0',
              label:"郝军"
            }
          ]
        },
        {
          id:'1',
          pid:0,
          label:"技术2部",
          children: [
            {
              id:'1-1',
              pid:'1',
              label:"贺洋"
            },
            {
              id:'1-2',
              pid:'1',
              label:"高明"
            },
            {
              id:'1-3',
              pid:'1',
              label:"徐洋"
            },
            {
              id:'1-4',
              pid:'1',
              label:"董涛"
            },
            {
              id:'1-5',
              pid:'1',
              label:"余磊"
            },
            {
              id:'1-6',
              pid:'1',
              label:"田丽"
            },
            {
              id:'1-7',
              pid:'1',
              label:"苏秀兰"
            },
            {
              id:'1-8',
              pid:'1',
              label:"常霞"
            },
            {
              id:'1-9',
              pid:'1',
              label:"梁娟"
            },
            {
              id:'1-10',
              pid:'1',
              label:"龙丽"
            },
            {
              id:'1-11',
              pid:'1',
              label:"吴娟"
            },
            {
              id:'1-12',
              pid:'1',
              label:"徐勇"
            }
          ]
        },
        {
          id:'2',
          pid:0,
          label:"保安部",
          children: [
            {
              id:'2-1',
              pid:'2',
              label:"部门信息"
            },
            {
              id:'2-2',
              pid:'2',
              label:"新建部门"
            }
          ]
        },
        {
          id:'3',
          pid:0,
          label:"销售部",
          children: [
            {
              id:'3-1',
              pid:'3',
              label:"档案信息"
            },
            {
              id:'3-2',
              pid:'3',
              label:"记录重大违纪"
            }
          ]
        },
        {
          id:'4',
          pid:0,
          label:"研发1部",
          children: [
            {
              id:'4-1',
              pid:'4',
              label:"招聘管理"
            },
            {
              id:'4-2',
              pid:'4',
              label:"人才库"
            },
            {
              id:'4-3',
              pid:'4',
              label:"面试信息"
            }
          ]
        },
        {
          id:'5',
          pid:0,
          label:"研发2部",
          children: [
            {
              id:'5-1',
              pid:'5',
              label:"招聘管理"
            },
            {
              id:'5-2',
              pid:'5',
              label:"人才库"
            },
            {
              id:'5-3',
              pid:'5',
              label:"面试信息"
            }
          ]
        },
        {
          id:'6',
          pid:0,
          label:"后勤保障部",
          children: [
            {
              id:'6-1',
              pid:'6',
              label:"历年人数"
            },
            {
              id:'6-2',
              pid:'6',
              label:"员工概况"
            }
          ]
        }
      ],
      tmpList:[],
      mode: "transfer"
    }
  },
  methods: {
    loadTrainLibraryData() {
      const _this = this
      this.axios.get("https://easydoc.xyz/mock/sEWRf0fW/get_train_library_info?company_id="+_this.$store.state.company_id+"&user_phone="+_this.$store.state.user_phone)
          .then(function (res) {
            _this.trainLibraryData = res.data.trainLibraryData
            //console.log(res.data)
          })
          .catch(function (err) {  //当请求出现错误时的回调函数
            console.log(err);
          });
    },

    releaseTrain() {
      const _this =this
      _this.pageNum += 1
      _this.stepNum += 1
      this.$message({
        message: '发布成功！请提醒相关员工完成培训！',
        type: 'success',
        offset: 300
      });
      setTimeout(function () {
        _this.pageNum = 0
        _this.stepNum = 0
      },1000)
    },

  },
  created() {
    this.loadTrainLibraryData()
  },
  components:{
    treeTransfer
  }
}
</script>

<style scoped>

</style>