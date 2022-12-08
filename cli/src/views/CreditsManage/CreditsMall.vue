<template>
  <div class="credits_mall">
    <el-row type="flex" align="middle">
      <el-col :span="1" style="margin-top: 1%;margin-left: 1%">
        <div style="height: 25px;width: 10px; border-radius:10px;background-color:#3a8ee6"></div>
      </el-col>
      <el-col :span="5" style="margin-top: 1%">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/credits_mall' }">积分商城</el-breadcrumb-item>
          <el-breadcrumb-item>积分兑换</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col  :span="2" :offset="13" style="margin-top: 1%">
        <div>积分剩余</div>
      </el-col>
      <el-col  :span="1"style="margin-top: 1%">
        <div style="color: #3a8ee6;font-weight: bolder">{{totalCredits}}</div>
      </el-col>
    </el-row>
    <el-scrollbar
        style="height: 615px;"
        wrap-style="overflow-x:hidden; overflow-y:show;"
    >
      <el-col :span="6" v-for="(item, index) in goodsData" :key="index" :offset="index >= 0 ? 1 : 0" style="margin-top: 2%">
        <el-card shadow="hover" style="height: 330px" :body-style="{ padding: '0px' }">
          <el-image
              style="width: 100%; height: 250px"
              fit="fill"
              src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg">
          </el-image>
          <div style="padding: 10px;">
            <div style="font-size: 18px;font-weight: bolder">
              {{item.goods_name}}
            </div>
            <el-row>
              <el-col :span="10">
                <div style="color: #ff4d51;font-size: 14px;line-height: 35px">
                  消耗积分: {{item.goods_costs}}
                </div>
              </el-col>
              <el-col :span="2" :offset="11">
                <el-button type="text" style="line-height: 12px" @click="exchange(item)">兑换</el-button>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-scrollbar>
    <el-row type="flex" justify="center" style="margin-top: 1%">
      <el-col :span="11">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[9, 18, 27, 36]"
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
  name: "CreditsMall",
  data() {
    return {
      currentPage: 1,
      currentSize: 1,
      total: 9,
      totalCredits: 1000,
      goodsData: []
    }
  },
  methods: {
    exchange(item) {
      this.$message({
        message: '恭喜您，'+item.goods_name+'兑换成功！',
        type: 'success',
        offset: 100
      });
      this.totalCredits -= item.goods_costs
    },

    loadAllGoodsInfo() {
      const _this = this
      this.axios.get("https://easydoc.xyz/mock/sEWRf0fW/get_all_goods_info?company_id="+_this.$store.state.company_id+"&user_phone="+_this.$store.state.user_phone)
          .then(function (res) {
            _this.goodsData = res.data.goodsData
          })
          .catch(function (err) {  //当请求出现错误时的回调函数
            console.log(err);
          });
    }
  },
  created() {
    this.loadAllGoodsInfo()
  }
}
</script>

<style scoped>

</style>