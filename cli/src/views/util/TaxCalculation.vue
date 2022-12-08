<template>
  <div class="tax_calculation">
    <el-row type="flex" align="middle">
      <el-col :span="5" style="margin-top: 1%;margin-left: 1%">
        <el-page-header @back="$router.go(-1)" content="五险一金">
          <div slot="title" style="color: #3a8ee6;font-weight: bolder">返回</div>
        </el-page-header>
      </el-col>
    </el-row>
    <el-row style="margin-top: 3%">
      <el-col :span="9" :offset="4">
        <el-input placeholder="在此输入税前工资" v-model="beforeTax_salary">
          <template slot="prepend">税前工资</template>
        </el-input>
      </el-col>
      <el-col :span="1">
        <el-button type="primary" @click="calculate">计算</el-button>
      </el-col>
    </el-row>
    <el-row style="margin-top: 2%">
      <el-col :span="9" :offset="4">
        <el-input placeholder="在此输入税后工资" v-model="afterTax_salary">
          <template slot="prepend">税后工资</template>
        </el-input>
      </el-col>
      <el-col :span="1">
        <el-tooltip class="item" effect="dark">
          <div slot="content">反推会有一定误差</div>
          <el-button type="primary" plain @click="inversion">反推</el-button>
        </el-tooltip>
      </el-col>
    </el-row>
    <el-row style="margin-top: 3%">
      <el-col :span="5" :offset="3" style="height:40px;text-align:center;">

      </el-col>
      <el-col :span="6" style="height:40px; text-align:center;">
        <div style="margin-top: 3%">
          个人应缴部分
          <el-tooltip class="item" effect="dark">
            <div slot="content">此部分为个人缴纳，采取单位代缴<br/>并从个人税前工资中扣除的方式</div>
            <i class="el-icon-info"></i>
          </el-tooltip>
        </div>
      </el-col>
      <el-col :span="6" style="height:40px; text-align:center;">
        <div style="margin-top: 3%">
          公司应缴部分
          <el-tooltip class="item" effect="dark">
            <div slot="content">此部分为用人单位额外缴纳</div>
            <i class="el-icon-info"></i>
          </el-tooltip>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="5" :offset="3" style="height:40px; text-align:center;">
        <div style="margin-top: 3%">
          养老保险金：
        </div>
      </el-col>
      <el-col :span="6" style="height:40px; text-align:center;">
        <div style="margin-top: 3%">
          {{personal.endowment_insurance}}
          <span style="color: #888888">({{personal.endowment_insurance_proportion+"%"}})</span>
        </div>
      </el-col>
      <el-col :span="6" style="height:40px; text-align:center;">
        <div style="margin-top: 3%">
          {{company.endowment_insurance}}
          <span style="color: #888888">({{company.endowment_insurance_proportion+"%"}})</span>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="5" :offset="3" style="height:40px; text-align:center;">
        <div style="margin-top: 3%">
          医疗保险金：
        </div>
      </el-col>
      <el-col :span="6" style="height:40px; text-align:center;">
        <div style="margin-top: 3%">
          {{personal.medical_insurance}}
          <span style="color: #888888">({{personal.medical_insurance_proportion+"%"}})</span>
        </div>
      </el-col>
      <el-col :span="6" style="height:40px;text-align:center;">
        <div style="margin-top: 3%">
          {{company.medical_insurance}}
          <span style="color: #888888">({{company.medical_insurance_proportion+"%"}})</span>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="5" :offset="3" style="height:40px; text-align:center;">
        <div style="margin-top: 3%">
          失业保险金：
        </div>
      </el-col>
      <el-col :span="6" style="height:40px; text-align:center;">
        <div style="margin-top: 3%">
          {{personal.unemployment_insurance}}
          <span style="color: #888888">({{personal.unemployment_insurance_proportion+"%"}})</span>
        </div>
      </el-col>
      <el-col :span="6" style="height:40px;text-align:center;">
        <div style="margin-top: 3%">
          {{company.unemployment_insurance}}
          <span style="color: #888888">({{company.unemployment_insurance_proportion+"%"}})</span>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="5" :offset="3" style="height:40px; text-align:center;">
        <div style="margin-top: 3%">
          工伤保险金：
        </div>
      </el-col>
      <el-col :span="6" style="height:40px; text-align:center;">
        <div style="margin-top: 3%">
          {{personal.injury_insurance}}
          <span style="color: #888888">({{personal.injury_insurance_proportion+"%"}})</span>
        </div>
      </el-col>
      <el-col :span="6" style="height:40px;text-align:center;">
        <div style="margin-top: 3%">
          {{company.injury_insurance}}
          <span style="color: #888888">({{company.injury_insurance_proportion+"%"}})</span>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="5" :offset="3" style="height:40px; text-align:center;">
        <div style="margin-top: 3%">
          生育保险金：
        </div>
      </el-col>
      <el-col :span="6" style="height:40px; text-align:center;">
        <div style="margin-top: 3%">
          {{personal.birth_insurance}}
          <span style="color: #888888">({{personal.birth_insurance_proportion+"%"}})</span>
        </div>
      </el-col>
      <el-col :span="6" style="height:40px;text-align:center;">
        <div style="margin-top: 3%">
          {{company.birth_insurance}}
          <span style="color: #888888">({{company.birth_insurance_proportion+"%"}})</span>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="5" :offset="3" style="height:40px; text-align:center;">
        <div style="margin-top: 3%">
          基本住房公积金：
        </div>
      </el-col>
      <el-col :span="6" style="height:40px; text-align:center;">
        <div style="margin-top: 3%">
          {{personal.housing_fund}}
          <span style="color: #888888">({{personal.housing_fund_proportion+"%"}})</span>
        </div>
      </el-col>
      <el-col :span="6" style="height:40px;text-align:center;">
        <div style="margin-top: 3%">
          {{company.housing_fund}}
          <span style="color: #888888">({{company.housing_fund_proportion+"%"}})</span>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="5" :offset="3" style="height:40px; text-align:center;">
        <div style="margin-top: 3%">
          五险一金支出：
        </div>
      </el-col>
      <el-col :span="6" style="height:40px; text-align:center;">
        <div style="margin-top: 3%">
          {{personal.total}}
        </div>
      </el-col>
      <el-col :span="6" style="height:40px;text-align:center;">
        <div style="margin-top: 3%">
          {{company.total}}
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="5" :offset="3" style="height:40px; text-align:center;">
        <div style="margin-top: 3%">
          个人所得税：
        </div>
      </el-col>
      <el-col :span="6" style="height:40px; text-align:center;">
        <div style="margin-top: 3%">
          {{personal.personal_income_tax}}
        </div>
      </el-col>
      <el-col :span="6" style="height:40px;text-align:center;">
        <div style="margin-top: 3%">
          \
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import tax_proportion from "@/util/tax_proportion";

  export default {
    name: "TaxCalculation",
    data(){
      return{
        city: '',
        beforeTax_salary: '',
        afterTax_salary: '',
        insurance_top: '',
        fund_top: '',
        personal: {
          endowment_insurance_proportion: '', //养老保险
          medical_insurance_proportion: '', //医疗保险
          unemployment_insurance_proportion: '', //失业保险
          injury_insurance_proportion: '', //工伤保险
          birth_insurance_proportion: '', //生育保险
          housing_fund_proportion: '', //基本住房公积金
          endowment_insurance: '',
          medical_insurance: '',
          unemployment_insurance: '',
          injury_insurance: '',
          birth_insurance: '',
          housing_fund: '',
          total: '',
          personal_income_tax: ''
        },
        company: {
          endowment_insurance_proportion: '', //养老保险
          medical_insurance_proportion: '', //医疗保险
          unemployment_insurance_proportion: '', //失业保险
          injury_insurance_proportion: '', //工伤保险
          birth_insurance_proportion: '', //生育保险
          housing_fund_proportion: '', //基本住房公积金
          endowment_insurance: '',
          medical_insurance: '',
          unemployment_insurance: '',
          injury_insurance: '',
          birth_insurance: '',
          housing_fund: '',
          total: ''
        },
        tax_proportion,
      }
    },
    methods:{
      formatFloat(src,pos) {
        return Math.round(src*Math.pow(10, pos))/Math.pow(10, pos);
      },

      calculate() {
        if (this.beforeTax_salary == ''){
          this.$notify.error({
            title: '错误',
            message: '税前工资不能为空！',
          });
        }else {
          if(this.beforeTax_salary < this.insurance_top) {
            this.personal.endowment_insurance = this.formatFloat(this.beforeTax_salary * 0.01 * this.personal.endowment_insurance_proportion,2)
            this.personal.medical_insurance = this.formatFloat(this.beforeTax_salary * 0.01 * this.personal.medical_insurance_proportion,2)
            this.personal.unemployment_insurance = this.formatFloat(this.beforeTax_salary * 0.01 * this.personal.unemployment_insurance_proportion,2)
            this.personal.injury_insurance = this.formatFloat(this.beforeTax_salary * 0.01 * this.personal.injury_insurance_proportion,2)
            this.personal.birth_insurance = this.formatFloat(this.beforeTax_salary * 0.01 * this.personal.birth_insurance_proportion,2)
            this.company.endowment_insurance = this.formatFloat(this.beforeTax_salary * 0.01 * this.company.endowment_insurance_proportion,2)
            this.company.medical_insurance = this.formatFloat(this.beforeTax_salary * 0.01 * this.company.medical_insurance_proportion,2)
            this.company.unemployment_insurance = this.formatFloat(this.beforeTax_salary * 0.01 * this.company.unemployment_insurance_proportion,2)
            this.company.injury_insurance = this.formatFloat(this.beforeTax_salary * 0.01 * this.company.injury_insurance_proportion,2)
            this.company.birth_insurance = this.formatFloat(this.beforeTax_salary * 0.01 * this.company.birth_insurance_proportion,2)
          }else {
            this.personal.endowment_insurance = this.formatFloat(this.insurance_top * 0.01 * this.personal.endowment_insurance_proportion,2)
            this.personal.medical_insurance = this.formatFloat(this.insurance_top * 0.01 * this.personal.medical_insurance_proportion,2)
            this.personal.unemployment_insurance = this.formatFloat(this.insurance_top * 0.01 * this.personal.unemployment_insurance_proportion,2)
            this.personal.injury_insurance = this.formatFloat(this.insurance_top * 0.01 * this.personal.injury_insurance_proportion,2)
            this.personal.birth_insurance = this.formatFloat(this.insurance_top * 0.01 * this.personal.birth_insurance_proportion,2)
            this.company.endowment_insurance = this.formatFloat(this.insurance_top * 0.01 * this.company.endowment_insurance_proportion,2)
            this.company.medical_insurance = this.formatFloat(this.insurance_top * 0.01 * this.company.medical_insurance_proportion,2)
            this.company.unemployment_insurance = this.formatFloat(this.insurance_top * 0.01 * this.company.unemployment_insurance_proportion,2)
            this.company.injury_insurance = this.formatFloat(this.insurance_top * 0.01 * this.company.injury_insurance_proportion,2)
            this.company.birth_insurance = this.formatFloat(this.insurance_top * 0.01 * this.company.birth_insurance_proportion,2)
          }
          if (this.beforeTax_salary < this.fund_top) {
            this.personal.housing_fund = this.formatFloat(this.beforeTax_salary * 0.01 * this.personal.housing_fund_proportion,2)
            this.company.housing_fund = this.formatFloat(this.beforeTax_salary * 0.01 * this.company.housing_fund_proportion,2)
          }else {
            this.personal.housing_fund = this.formatFloat(this.fund_top * 0.01 * this.personal.housing_fund_proportion,2)
            this.company.housing_fund = this.formatFloat(this.fund_top * 0.01 * this.company.housing_fund_proportion,2)
          }
          this.company.total = this.formatFloat(this.company.endowment_insurance+this.company.medical_insurance+this.company.unemployment_insurance+this.company.injury_insurance+this.company.birth_insurance+this.company.housing_fund,2)
          this.personal.total = this.formatFloat(this.personal.endowment_insurance+this.personal.medical_insurance+this.personal.unemployment_insurance+this.personal.injury_insurance+this.personal.birth_insurance+this.personal.housing_fund,2)
          let totalNeedTax = this.formatFloat(this.beforeTax_salary-this.personal.endowment_insurance-this.personal.medical_insurance-this.personal.unemployment_insurance-this.personal.housing_fund-5000,2)
          let totalTax;
          if (totalNeedTax <= 0) {
            totalTax = 0;
          }else if (totalNeedTax <= 3000.0) {
            totalTax = totalNeedTax * 0.03;
          } else if (totalNeedTax <= 12000.0) {
            totalTax = totalNeedTax * 0.1 - 210;
          } else if (totalNeedTax <= 25000.0) {
            totalTax = totalNeedTax * 0.2 - 1410;
          } else if (totalNeedTax <= 35000.0) {
            totalTax = totalNeedTax * 0.25 - 2660;
          } else if (totalNeedTax <= 55000.0) {
            totalTax = totalNeedTax * 0.30 - 4410;
          } else if (totalNeedTax <= 80000.0) {
            totalTax = totalNeedTax * 0.35 - 7160;
          } else {
            totalTax = totalNeedTax * 0.45 - 15160;
          }
          this.personal.personal_income_tax = this.formatFloat(totalTax,2)
          this.afterTax_salary = this.formatFloat(this.beforeTax_salary - this.personal.total - this.personal.personal_income_tax,2)
        }
      },

      inversion() {
        if (this.afterTax_salary == ''){
          this.$notify.error({
            title: '错误',
            message: '税后工资不能为空！',
          });
        }else {
          let totalNeedTax = this.afterTax_salary - 5000
          let totalTax;
          if (totalNeedTax <= 0) {
            totalTax = 0;
          }else if (totalNeedTax <= 3000.0) {
            totalTax = totalNeedTax / (1-0.03)-this.afterTax_salary+5000;
          } else if (totalNeedTax <= 12000.0) {
            totalTax = (totalNeedTax - 210) / (1-0.1)-this.afterTax_salary+5000;
          } else if (totalNeedTax <= 25000.0) {
            totalTax = (totalNeedTax - 1410) / (1-0.2)-this.afterTax_salary+5000;
          } else if (totalNeedTax <= 35000.0) {
            totalTax = (totalNeedTax - 2660) / (1-0.25)-this.afterTax_salary+5000;
          } else if (totalNeedTax <= 55000.0) {
            totalTax = (totalNeedTax - 4410) / (1-0.30)-this.afterTax_salary+5000;
          } else if (totalNeedTax <= 80000.0) {
            totalTax = (totalNeedTax - 7160) / (1-0.35)-this.afterTax_salary+5000;
          } else {
            totalTax = (totalNeedTax - 15160) / (1-0.45)-this.afterTax_salary+5000;
          }
          this.personal.personal_income_tax = this.formatFloat(totalTax,2)
          let salary_middle = totalTax + Number(this.afterTax_salary)
          const insurance_proportion_total = this.personal.endowment_insurance_proportion+this.personal.medical_insurance_proportion+this.personal.unemployment_insurance_proportion+this.personal.injury_insurance_proportion+this.personal.birth_insurance_proportion
          let insurance_final
          let fund_final
          if ((salary_middle/(1-(insurance_proportion_total+this.personal.housing_fund_proportion)*0.01))*insurance_proportion_total*0.01 > this.insurance_top*insurance_proportion_total*0.01) {
            insurance_final = this.insurance_top
            if ((salary_middle/(1-(insurance_proportion_total+this.personal.housing_fund_proportion)*0.01))*this.personal.housing_fund_proportion*0.01 > this.fund_top*this.personal.housing_fund_proportion*0.01) {
              fund_final = this.fund_top
            }else {
              fund_final = salary_middle/(1-(insurance_proportion_total+this.personal.housing_fund_proportion)*0.01)
            }
          }else {
            insurance_final = salary_middle/(1-(insurance_proportion_total+this.personal.housing_fund_proportion)*0.01)
            fund_final = salary_middle/(1-(insurance_proportion_total+this.personal.housing_fund_proportion)*0.01)
          }
          this.personal.total = this.formatFloat((insurance_final * insurance_proportion_total * 0.01) + (fund_final * this.personal.housing_fund_proportion * 0.01),2)
          this.beforeTax_salary = this.formatFloat(this.personal.total + Number(this.afterTax_salary) + this.personal.personal_income_tax,2)
          this.personal.endowment_insurance = this.formatFloat(insurance_final * 0.01 * this.personal.endowment_insurance_proportion,2)
          this.personal.medical_insurance = this.formatFloat(insurance_final * 0.01 * this.personal.medical_insurance_proportion,2)
          this.personal.unemployment_insurance = this.formatFloat(insurance_final * 0.01 * this.personal.unemployment_insurance_proportion,2)
          this.personal.injury_insurance = this.formatFloat(insurance_final * 0.01 * this.personal.injury_insurance_proportion,2)
          this.personal.birth_insurance = this.formatFloat(insurance_final * 0.01 * this.personal.birth_insurance_proportion,2)
          this.company.endowment_insurance = this.formatFloat(insurance_final * 0.01 * this.company.endowment_insurance_proportion,2)
          this.company.medical_insurance = this.formatFloat(insurance_final * 0.01 * this.company.medical_insurance_proportion,2)
          this.company.unemployment_insurance = this.formatFloat(insurance_final * 0.01 * this.company.unemployment_insurance_proportion,2)
          this.company.injury_insurance = this.formatFloat(insurance_final * 0.01 * this.company.injury_insurance_proportion,2)
          this.company.birth_insurance = this.formatFloat(insurance_final * 0.01 * this.company.birth_insurance_proportion,2)
          this.personal.housing_fund = this.formatFloat(fund_final * 0.01 * this.personal.housing_fund_proportion,2)
          this.company.housing_fund = this.formatFloat(fund_final * 0.01 * this.company.housing_fund_proportion,2)
          this.company.total = this.formatFloat(this.company.endowment_insurance+this.company.medical_insurance+this.company.unemployment_insurance+this.company.injury_insurance+this.company.birth_insurance+this.company.housing_fund,2)
        }
      }
    },

    created() {
      const _this = this
      this.axios.get("https://easydoc.xyz/mock/sEWRf0fW/get_company_city?company_id="+_this.$store.state.company_id)
          .then(function (res) {
            const company_city = res.data.company_city
            let flag = false
            const arr = Array.from(_this.tax_proportion)
            arr.forEach(item => {
              if (item.city === company_city){
                //console.log(item.city)
                _this.personal.endowment_insurance_proportion = item.personal.endowment_insurance_proportion
                _this.personal.medical_insurance_proportion = item.personal.medical_insurance_proportion
                _this.personal.unemployment_insurance_proportion = item.personal.unemployment_insurance_proportion
                _this.personal.injury_insurance_proportion = item.personal.injury_insurance_proportion
                _this.personal.birth_insurance_proportion = item.personal.birth_insurance_proportion
                _this.personal.housing_fund_proportion = item.personal.housing_fund_proportion
                _this.company.endowment_insurance_proportion = item.company.endowment_insurance_proportion
                _this.company.medical_insurance_proportion = item.company.medical_insurance_proportion
                _this.company.unemployment_insurance_proportion = item.company.unemployment_insurance_proportion
                _this.company.injury_insurance_proportion = item.company.injury_insurance_proportion
                _this.company.birth_insurance_proportion = item.company.birth_insurance_proportion
                _this.company.housing_fund_proportion = item.company.housing_fund_proportion
                _this.insurance_top = item.insurance_top
                _this.fund_top = item.fund_top
                flag = true
              }
              if (!flag){
                _this.personal.endowment_insurance_proportion = 8, //养老保险
                _this.personal.medical_insurance_proportion = 2, //医疗保险
                _this.personal.unemployment_insurance_proportion = 0.2, //失业保险
                _this.personal.injury_insurance_proportion = 0, //工伤保险
                _this.personal.birth_insurance_proportion = 0, //生育保险
                _this.personal.housing_fund_proportion = 12, //基本住房公积金
                _this.company.endowment_insurance_proportion = 16, //养老保险
                _this.company.medical_insurance_proportion = 10, //医疗保险
                _this.company.unemployment_insurance_proportion = 0.8, //失业保险
                _this.company.injury_insurance_proportion = 0.2, //工伤保险
                _this.company.birth_insurance_proportion = 0.8, //生育保险
                _this.company.housing_fund_proportion = 12 //基本住房公积金
                _this.insurance_top = 23565
                _this.fund_top = 27786
              }
            })
          })
          .catch(function (err) {  //当请求出现错误时的回调函数
            console.log(err);
          });
    }
  }
</script>

<style scoped>
  
</style>