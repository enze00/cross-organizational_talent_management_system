<template>
  <div class="index">
    <el-row>
      <el-col :span="4">
        <div style="background-color: white">
          <MenuBar></MenuBar>
        </div>
      </el-col>
      <el-col :span="20">
        <div>
          <el-row>
            <div class="topMenu" style="height: 50px">
              <TopMenu></TopMenu>
            </div>
          </el-row>
          <el-row>
                                            <!--            这里的height原先是725-->
            <div class="grid-content bg-purple-light" style="height: 715px;margin-top: 13px; margin-left: 20px;width: 98%">
              <keep-alive :include="$store.state.keepAlivePage">
                <router-view/>
              </keep-alive>
            </div>
          </el-row>
          <el-row>
            <el-col :span="12":offset="10">
              <a style="font-size: 10px" href="https://beian.miit.gov.cn" target="_blank">浙ICP备20025565号-1</a>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import MenuBar from "@/components/layout/Menubar/MenuBar";
import TopMenu from "@/components/layout/TopMenu";
  export default {
    name: "Index",
    data(){
      return{
      
      }
    },
    methods:{
      record() {

      }
    },
    components: {
      MenuBar,
      TopMenu
    }
  }
</script>

<style scoped>
  .bg-purple-light {
    /*background: #e5e9f2;*/
    background: white;
  }
  .topMenu {
    background-color: white;
    box-shadow: 1px 3px 5px #d3d3d3;
  }
</style>