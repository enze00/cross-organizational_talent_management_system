const tax_proportion = [
  {
    city: '北京',
    personal: {
      endowment_insurance_proportion: 8, //养老保险
      medical_insurance_proportion: 2, //医疗保险
      unemployment_insurance_proportion: 0.2, //失业保险
      injury_insurance_proportion: 0, //工伤保险
      birth_insurance_proportion: 0, //生育保险
      housing_fund_proportion: 12, //基本住房公积金
    },
    company: {
      endowment_insurance_proportion: 16, //养老保险
      medical_insurance_proportion: 10, //医疗保险
      unemployment_insurance_proportion: 0.8, //失业保险
      injury_insurance_proportion: 0.2, //工伤保险
      birth_insurance_proportion: 0.8, //生育保险
      housing_fund_proportion: 12, //基本住房公积金
    },
    insurance_top:23565,
    fund_top:27786
  },
  {
    city: '上海',
    personal: {
      endowment_insurance_proportion: 8, //养老保险
      medical_insurance_proportion: 2, //医疗保险
      unemployment_insurance_proportion: 0.5, //失业保险
      injury_insurance_proportion: 0, //工伤保险
      birth_insurance_proportion: 0, //生育保险
      housing_fund_proportion: 7, //基本住房公积金
    },
    company: {
      endowment_insurance_proportion: 20, //养老保险
      medical_insurance_proportion: 9.5, //医疗保险
      unemployment_insurance_proportion: 0.5, //失业保险
      injury_insurance_proportion: 0.2, //工伤保险
      birth_insurance_proportion: 1, //生育保险
      housing_fund_proportion: 7, //基本住房公积金
    },
    insurance_top:28017,
    fund_top:28014.286
  },
  {
    city: '深圳',
    personal: {
      endowment_insurance_proportion: 8, //养老保险
      medical_insurance_proportion: 2, //医疗保险
      unemployment_insurance_proportion: 0.3, //失业保险
      injury_insurance_proportion: 0, //工伤保险
      birth_insurance_proportion: 0, //生育保险
      housing_fund_proportion: 12, //基本住房公积金
    },
    company: {
      endowment_insurance_proportion: 13, //养老保险
      medical_insurance_proportion: 6.2, //医疗保险
      unemployment_insurance_proportion: 0.7, //失业保险
      injury_insurance_proportion: 0.2, //工伤保险
      birth_insurance_proportion: 0.45, //生育保险
      housing_fund_proportion: 12, //基本住房公积金
    },
    insurance_top:19014,
    fund_top:27927
  },
  {
    city: '广州',
    personal: {
      endowment_insurance_proportion: 8, //养老保险
      medical_insurance_proportion: 2, //医疗保险
      unemployment_insurance_proportion: 0.2, //失业保险
      injury_insurance_proportion: 0, //工伤保险
      birth_insurance_proportion: 0, //生育保险
      housing_fund_proportion: 12, //基本住房公积金
    },
    company: {
      endowment_insurance_proportion: 14, //养老保险
      medical_insurance_proportion: 5.5, //医疗保险
      unemployment_insurance_proportion: 0.8, //失业保险
      injury_insurance_proportion: 0.2, //工伤保险
      birth_insurance_proportion: 0.85, //生育保险
      housing_fund_proportion: 12, //基本住房公积金
    },
    insurance_top:19014,
    fund_top:27960
  },
  {
    city: '杭州',
    personal: {
      endowment_insurance_proportion: 8, //养老保险
      medical_insurance_proportion: 2, //医疗保险
      unemployment_insurance_proportion: 0.5, //失业保险
      injury_insurance_proportion: 0, //工伤保险
      birth_insurance_proportion: 0, //生育保险
      housing_fund_proportion: 12, //基本住房公积金
    },
    company: {
      endowment_insurance_proportion: 14, //养老保险
      medical_insurance_proportion: 10.5, //医疗保险
      unemployment_insurance_proportion: 0.5, //失业保险
      injury_insurance_proportion: 0.2, //工伤保险
      birth_insurance_proportion: 1.2, //生育保险
      housing_fund_proportion: 12, //基本住房公积金
    },
    insurance_top:16593.71,
    fund_top:25950
  },
  {
    city: '苏州',
    personal: {
      endowment_insurance_proportion: 8, //养老保险
      medical_insurance_proportion: 2, //医疗保险
      unemployment_insurance_proportion: 0.5, //失业保险
      injury_insurance_proportion: 0, //工伤保险
      birth_insurance_proportion: 0, //生育保险
      housing_fund_proportion: 12, //基本住房公积金
    },
    company: {
      endowment_insurance_proportion: 16, //养老保险
      medical_insurance_proportion: 8, //医疗保险
      unemployment_insurance_proportion: 0.5, //失业保险
      injury_insurance_proportion: 0.2, //工伤保险
      birth_insurance_proportion: 8, //生育保险
      housing_fund_proportion: 12, //基本住房公积金
    },
    insurance_top:16842,
    fund_top:23700
  },
  {
    city: '成都',
    personal: {
      endowment_insurance_proportion: 8, //养老保险
      medical_insurance_proportion: 2, //医疗保险
      unemployment_insurance_proportion: 0.4, //失业保险
      injury_insurance_proportion: 0, //工伤保险
      birth_insurance_proportion: 0, //生育保险
      housing_fund_proportion: 12, //基本住房公积金
    },
    company: {
      endowment_insurance_proportion: 16, //养老保险
      medical_insurance_proportion: 6.5, //医疗保险
      unemployment_insurance_proportion: 0.6, //失业保险
      injury_insurance_proportion: 0.2, //工伤保险
      birth_insurance_proportion: 0.8, //生育保险
      housing_fund_proportion: 12, //基本住房公积金
    },
    insurance_top:16179,
    fund_top:21498
  },
  {
    city: '南京',
    personal: {
      endowment_insurance_proportion: 8, //养老保险
      medical_insurance_proportion: 2, //医疗保险
      unemployment_insurance_proportion: 0.5, //失业保险
      injury_insurance_proportion: 0, //工伤保险
      birth_insurance_proportion: 0, //生育保险
      housing_fund_proportion: 12, //基本住房公积金
    },
    company: {
      endowment_insurance_proportion: 16, //养老保险
      medical_insurance_proportion: 9, //医疗保险
      unemployment_insurance_proportion: 0.5, //失业保险
      injury_insurance_proportion: 0.2, //工伤保险
      birth_insurance_proportion: 0.8, //生育保险
      housing_fund_proportion: 12, //基本住房公积金
    },
    insurance_top:16842,
    fund_top:27700
  },
  {
    city: '天津',
    personal: {
      endowment_insurance_proportion: 8, //养老保险
      medical_insurance_proportion: 2, //医疗保险
      unemployment_insurance_proportion: 0.5, //失业保险
      injury_insurance_proportion: 0, //工伤保险
      birth_insurance_proportion: 0, //生育保险
      housing_fund_proportion: 12, //基本住房公积金
    },
    company: {
      endowment_insurance_proportion: 16, //养老保险
      medical_insurance_proportion: 10.5, //医疗保险
      unemployment_insurance_proportion: 0.5, //失业保险
      injury_insurance_proportion: 0.2, //工伤保险
      birth_insurance_proportion: 0, //生育保险
      housing_fund_proportion: 12, //基本住房公积金
    },
    insurance_top:17613,
    fund_top:25983
  },
  {
    city: '武汉',
    personal: {
      endowment_insurance_proportion: 8, //养老保险
      medical_insurance_proportion: 2, //医疗保险
      unemployment_insurance_proportion: 0.3, //失业保险
      injury_insurance_proportion: 0, //工伤保险
      birth_insurance_proportion: 0, //生育保险
      housing_fund_proportion: 12, //基本住房公积金
    },
    company: {
      endowment_insurance_proportion: 16, //养老保险
      medical_insurance_proportion: 8, //医疗保险
      unemployment_insurance_proportion: 0.7, //失业保险
      injury_insurance_proportion: 0.2, //工伤保险
      birth_insurance_proportion: 0.7, //生育保险
      housing_fund_proportion: 12, //基本住房公积金
    },
    insurance_top:18695,
    fund_top:22081.75
  },
  {
    city: '重庆',
    personal: {
      endowment_insurance_proportion: 8, //养老保险
      medical_insurance_proportion: 1, //医疗保险
      unemployment_insurance_proportion: 0.5, //失业保险
      injury_insurance_proportion: 0, //工伤保险
      birth_insurance_proportion: 0, //生育保险
      housing_fund_proportion: 12, //基本住房公积金
    },
    company: {
      endowment_insurance_proportion: 16, //养老保险
      medical_insurance_proportion: 8.5, //医疗保险
      unemployment_insurance_proportion: 0.5, //失业保险
      injury_insurance_proportion: 0.2, //工伤保险
      birth_insurance_proportion: 0, //生育保险
      housing_fund_proportion: 12, //基本住房公积金
    },
    insurance_top:16410,
    fund_top:20441
  },
]
export default tax_proportion