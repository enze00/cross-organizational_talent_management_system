<template>
  <div class="topMenu">
    <el-row>
      <el-col :span="1">
        <el-image
            style="width: 48px; margin-left: 2px"
            :src="src"
            fit="fill"></el-image>
      </el-col>
      <el-col :span="1" :offset="15">
        <div style="margin-top: 13px">
          <el-badge :value="12" class="item">
            <el-button icon="el-icon-bell" size="mini" circle></el-button>
          </el-badge>
        </div>
      </el-col>
      <el-col :span="1">
        <div style="margin-top: 13px;margin-left:19%;color: #bdbebd">
          <span>|</span>
        </div>
      </el-col>
      <el-col :span="3">
        <div style="margin-top: 13px;">
          <span>{{hoursTip}},{{$store.state.user_name}}!</span>
        </div>
      </el-col>
      <el-col :span="1">
        <div style="margin-top: 13px; color: #bdbebd;">
          <span>|</span>
        </div>
      </el-col>
      <el-col :span="1">
        <div style="color: rgba(129,163,245,0.84);margin-top: 12%">
          <el-button type="text" @click="$router.push('/')"><i class="el-icon-switch-button"></i>注销</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import img from "../../assets/more.jpg"
import {resetRouter} from "@/router";

export default {
    name: "TopMenu",
    data(){
      return{
        src:img,
        hoursTip:''
      }
    },
    methods:{
      logOut(){
        window.localStorage.clear()
        resetRouter()
        this.$router.replace('/')
      },

      getMycount () {
        let _this = this;
        let date = new Date();

        if (date.getHours() >= 0 && date.getHours() < 12) {

          _this.hoursTip = "上午好"

        } else if (date.getHours() >= 12 && date.getHours() < 18) {

          _this.hoursTip = "下午好"

        } else {

          _this.hoursTip = "晚上好"

        }
      }
    },
    created() {
      this.getMycount()
    }
  }
</script>

<style scoped>
  
</style>