import Vue from 'vue'
const city_options = [
  {
    'value': '北京市',
    'label': '北京市',
    'children': [
      {
        'value': '北京市',
        'label': '北京市'
      }
    ],
  },
  {
    'value': '天津市',
    'label': '天津市',
    'children': [
      {
        'value': '天津市',
        'label': '天津市',
        'provinceCode': '120000',
      },
    ],
  },
  {
    'value': '河北省',
    'label': '河北省',
    'children': [
      {
        'value': '石家庄市',
        'label': '石家庄市',
        'provinceCode': '130000',
      },
      {
        'value': '唐山市',
        'label': '唐山市',
        'provinceCode': '130000',
      },
      {
        'value': '秦皇岛市',
        'label': '秦皇岛市',
        'provinceCode': '130000',
      },
      {
        'value': '邯郸市',
        'label': '邯郸市',
        'provinceCode': '130000',
      },
      {
        'value': '邢台市',
        'label': '邢台市',
        'provinceCode': '130000',
      },
      {
        'value': '保定市',
        'label': '保定市',
        'provinceCode': '130000',
      },
      {
        'value': '张家口市',
        'label': '张家口市',
        'provinceCode': '130000',
      },
      {
        'value': '承德市',
        'label': '承德市',
        'provinceCode': '130000',
      },
      {
        'value': '沧州市',
        'label': '沧州市',
        'provinceCode': '130000',
      },
      {
        'value': '廊坊市',
        'label': '廊坊市',
        'provinceCode': '130000',
      },
      {
        'value': '衡水市',
        'label': '衡水市',
        'provinceCode': '130000',
      },
    ],
  },
  {
    'value': '山西省',
    'label': '山西省',
    'children': [
      {
        'value': '太原市',
        'label': '太原市',
        'provinceCode': '140000',
      },
      {
        'value': '大同市',
        'label': '大同市',
        'provinceCode': '140000',
      },
      {
        'value': '阳泉市',
        'label': '阳泉市',
        'provinceCode': '140000',
      },
      {
        'value': '长治市',
        'label': '长治市',
        'provinceCode': '140000',
      },
      {
        'value': '晋城市',
        'label': '晋城市',
        'provinceCode': '140000',
      },
      {
        'value': '朔州市',
        'label': '朔州市',
        'provinceCode': '140000',
      },
      {
        'value': '晋中市',
        'label': '晋中市',
        'provinceCode': '140000',
      },
      {
        'value': '运城市',
        'label': '运城市',
        'provinceCode': '140000',
      },
      {
        'value': '忻州市',
        'label': '忻州市',
        'provinceCode': '140000',
      },
      {
        'value': '临汾市',
        'label': '临汾市',
        'provinceCode': '140000',
      },
      {
        'value': '吕梁市',
        'label': '吕梁市',
        'provinceCode': '140000',
      },
    ],
  },
  {
    'value': '内蒙古自治区',
    'label': '内蒙古自治区',
    'children': [
      {
        'value': '呼和浩特市',
        'label': '呼和浩特市',
        'provinceCode': '150000',
      },
      {
        'value': '包头市',
        'label': '包头市',
        'provinceCode': '150000',
      },
      {
        'value': '乌海市',
        'label': '乌海市',
        'provinceCode': '150000',
      },
      {
        'value': '赤峰市',
        'label': '赤峰市',
        'provinceCode': '150000',
      },
      {
        'value': '通辽市',
        'label': '通辽市',
        'provinceCode': '150000',
      },
      {
        'value': '鄂尔多斯市',
        'label': '鄂尔多斯市',
        'provinceCode': '150000',
      },
      {
        'value': '呼伦贝尔市',
        'label': '呼伦贝尔市',
        'provinceCode': '150000',
      },
      {
        'value': '巴彦淖尔市',
        'label': '巴彦淖尔市',
        'provinceCode': '150000',
      },
      {
        'value': '乌兰察布市',
        'label': '乌兰察布市',
        'provinceCode': '150000',
      },
      {
        'value': '兴安盟',
        'label': '兴安盟',
        'provinceCode': '150000',
      },
      {
        'value': '锡林郭勒盟',
        'label': '锡林郭勒盟',
        'provinceCode': '150000',
      },
      {
        'value': '阿拉善盟',
        'label': '阿拉善盟',
        'provinceCode': '150000',
      },
    ],
  },
  {
    'value': '辽宁省',
    'label': '辽宁省',
    'children': [
      {
        'value': '沈阳市',
        'label': '沈阳市',
        'provinceCode': '210000',
      },
      {
        'value': '大连市',
        'label': '大连市',
        'provinceCode': '210000',
      },
      {
        'value': '鞍山市',
        'label': '鞍山市',
        'provinceCode': '210000',
      },
      {
        'value': '抚顺市',
        'label': '抚顺市',
        'provinceCode': '210000',
      },
      {
        'value': '本溪市',
        'label': '本溪市',
        'provinceCode': '210000',
      },
      {
        'value': '丹东市',
        'label': '丹东市',
        'provinceCode': '210000',
      },
      {
        'value': '锦州市',
        'label': '锦州市',
        'provinceCode': '210000',
      },
      {
        'value': '营口市',
        'label': '营口市',
        'provinceCode': '210000',
      },
      {
        'value': '阜新市',
        'label': '阜新市',
        'provinceCode': '210000',
      },
      {
        'value': '辽阳市',
        'label': '辽阳市',
        'provinceCode': '210000',
      },
      {
        'value': '盘锦市',
        'label': '盘锦市',
        'provinceCode': '210000',
      },
      {
        'value': '铁岭市',
        'label': '铁岭市',
        'provinceCode': '210000',
      },
      {
        'value': '朝阳市',
        'label': '朝阳市',
        'provinceCode': '210000',
      },
      {
        'value': '葫芦岛市',
        'label': '葫芦岛市',
        'provinceCode': '210000',
      },
    ],
  },
  {
    'value': '吉林省',
    'label': '吉林省',
    'children': [
      {
        'value': '长春市',
        'label': '长春市',
        'provinceCode': '220000',
      },
      {
        'value': '吉林市',
        'label': '吉林市',
        'provinceCode': '220000',
      },
      {
        'value': '四平市',
        'label': '四平市',
        'provinceCode': '220000',
      },
      {
        'value': '辽源市',
        'label': '辽源市',
        'provinceCode': '220000',
      },
      {
        'value': '通化市',
        'label': '通化市',
        'provinceCode': '220000',
      },
      {
        'value': '白山市',
        'label': '白山市',
        'provinceCode': '220000',
      },
      {
        'value': '松原市',
        'label': '松原市',
        'provinceCode': '220000',
      },
      {
        'value': '白城市',
        'label': '白城市',
        'provinceCode': '220000',
      },
      {
        'value': '延边朝鲜族自治州',
        'label': '延边朝鲜族自治州',
        'provinceCode': '220000',
      },
    ],
  },
  {
    'value': '黑龙江省',
    'label': '黑龙江省',
    'children': [
      {
        'value': '哈尔滨市',
        'label': '哈尔滨市',
        'provinceCode': '230000',
      },
      {
        'value': '齐齐哈尔市',
        'label': '齐齐哈尔市',
        'provinceCode': '230000',
      },
      {
        'value': '鸡西市',
        'label': '鸡西市',
        'provinceCode': '230000',
      },
      {
        'value': '鹤岗市',
        'label': '鹤岗市',
        'provinceCode': '230000',
      },
      {
        'value': '双鸭山市',
        'label': '双鸭山市',
        'provinceCode': '230000',
      },
      {
        'value': '大庆市',
        'label': '大庆市',
        'provinceCode': '230000',
      },
      {
        'value': '伊春市',
        'label': '伊春市',
        'provinceCode': '230000',
      },
      {
        'value': '佳木斯市',
        'label': '佳木斯市',
        'provinceCode': '230000',
      },
      {
        'value': '七台河市',
        'label': '七台河市',
        'provinceCode': '230000',
      },
      {
        'value': '牡丹江市',
        'label': '牡丹江市',
        'provinceCode': '230000',
      },
      {
        'value': '黑河市',
        'label': '黑河市',
        'provinceCode': '230000',
      },
      {
        'value': '绥化市',
        'label': '绥化市',
        'provinceCode': '230000',
      },
      {
        'value': '大兴安岭地区',
        'label': '大兴安岭地区',
        'provinceCode': '230000',
      },
    ],
  },
  {
    'value': '上海市',
    'label': '上海市',
    'children': [
      {
        'value': '310100',
        'label': '上海市',
        'provinceCode': '310000',
      },
    ],
  },
  {
    'value': '江苏省',
    'label': '江苏省',
    'children': [
      {
        'value': '南京市',
        'label': '南京市',
        'provinceCode': '320000',
      },
      {
        'value': '无锡市',
        'label': '无锡市',
        'provinceCode': '320000',
      },
      {
        'value': '徐州市',
        'label': '徐州市',
        'provinceCode': '320000',
      },
      {
        'value': '常州市',
        'label': '常州市',
        'provinceCode': '320000',
      },
      {
        'value': '苏州市',
        'label': '苏州市',
        'provinceCode': '320000',
      },
      {
        'value': '南通市',
        'label': '南通市',
        'provinceCode': '320000',
      },
      {
        'value': '连云港市',
        'label': '连云港市',
        'provinceCode': '320000',
      },
      {
        'value': '淮安市',
        'label': '淮安市',
        'provinceCode': '320000',
      },
      {
        'value': '盐城市',
        'label': '盐城市',
        'provinceCode': '320000',
      },
      {
        'value': '扬州市',
        'label': '扬州市',
        'provinceCode': '320000',
      },
      {
        'value': '镇江市',
        'label': '镇江市',
        'provinceCode': '320000',
      },
      {
        'value': '泰州市',
        'label': '泰州市',
        'provinceCode': '320000',
      },
      {
        'value': '宿迁市',
        'label': '宿迁市',
        'provinceCode': '320000',
      },
    ],
  },
  {
    'value': '浙江省',
    'label': '浙江省',
    'children': [
      {
        'value': '杭州市',
        'label': '杭州市',
        'provinceCode': '330000',
      },
      {
        'value': '宁波市',
        'label': '宁波市',
        'provinceCode': '330000',
      },
      {
        'value': '温州市',
        'label': '温州市',
        'provinceCode': '330000',
      },
      {
        'value': '嘉兴市',
        'label': '嘉兴市',
        'provinceCode': '330000',
      },
      {
        'value': '湖州市',
        'label': '湖州市',
        'provinceCode': '330000',
      },
      {
        'value': '绍兴市',
        'label': '绍兴市',
        'provinceCode': '330000',
      },
      {
        'value': '金华市',
        'label': '金华市',
        'provinceCode': '330000',
      },
      {
        'value': '衢州市',
        'label': '衢州市',
        'provinceCode': '330000',
      },
      {
        'value': '舟山市',
        'label': '舟山市',
        'provinceCode': '330000',
      },
      {
        'value': '台州市',
        'label': '台州市',
        'provinceCode': '330000',
      },
      {
        'value': '丽水市',
        'label': '丽水市',
        'provinceCode': '330000',
      },
    ],
  },
  {
    'value': '安徽省',
    'label': '安徽省',
    'children': [
      {
        'value': '合肥市',
        'label': '合肥市',
        'provinceCode': '340000',
      },
      {
        'value': '芜湖市',
        'label': '芜湖市',
        'provinceCode': '340000',
      },
      {
        'value': '蚌埠市',
        'label': '蚌埠市',
        'provinceCode': '340000',
      },
      {
        'value': '淮南市',
        'label': '淮南市',
        'provinceCode': '340000',
      },
      {
        'value': '马鞍山市',
        'label': '马鞍山市',
        'provinceCode': '340000',
      },
      {
        'value': '淮北市',
        'label': '淮北市',
        'provinceCode': '340000',
      },
      {
        'value': '铜陵市',
        'label': '铜陵市',
        'provinceCode': '340000',
      },
      {
        'value': '安庆市',
        'label': '安庆市',
        'provinceCode': '340000',
      },
      {
        'value': '黄山市',
        'label': '黄山市',
        'provinceCode': '340000',
      },
      {
        'value': '滁州市',
        'label': '滁州市',
        'provinceCode': '340000',
      },
      {
        'value': '阜阳市',
        'label': '阜阳市',
        'provinceCode': '340000',
      },
      {
        'value': '宿州市',
        'label': '宿州市',
        'provinceCode': '340000',
      },
      {
        'value': '六安市',
        'label': '六安市',
        'provinceCode': '340000',
      },
      {
        'value': '亳州市',
        'label': '亳州市',
        'provinceCode': '340000',
      },
      {
        'value': '池州市',
        'label': '池州市',
        'provinceCode': '340000',
      },
      {
        'value': '宣城市',
        'label': '宣城市',
        'provinceCode': '340000',
      },
    ],
  },
  {
    'value': '福建省',
    'label': '福建省',
    'children': [
      {
        'value': '福州市',
        'label': '福州市',
        'provinceCode': '350000',
      },
      {
        'value': '厦门市',
        'label': '厦门市',
        'provinceCode': '350000',
      },
      {
        'value': '莆田市',
        'label': '莆田市',
        'provinceCode': '350000',
      },
      {
        'value': '三明市',
        'label': '三明市',
        'provinceCode': '350000',
      },
      {
        'value': '泉州市',
        'label': '泉州市',
        'provinceCode': '350000',
      },
      {
        'value': '漳州市',
        'label': '漳州市',
        'provinceCode': '350000',
      },
      {
        'value': '南平市',
        'label': '南平市',
        'provinceCode': '350000',
      },
      {
        'value': '龙岩市',
        'label': '龙岩市',
        'provinceCode': '350000',
      },
      {
        'value': '宁德市',
        'label': '宁德市',
        'provinceCode': '350000',
      },
    ],
  },
  {
    'value': '江西省',
    'label': '江西省',
    'children': [
      {
        'value': '南昌市',
        'label': '南昌市',
        'provinceCode': '360000',
      },
      {
        'value': '景德镇市',
        'label': '景德镇市',
        'provinceCode': '360000',
      },
      {
        'value': '萍乡市',
        'label': '萍乡市',
        'provinceCode': '360000',
      },
      {
        'value': '九江市',
        'label': '九江市',
        'provinceCode': '360000',
      },
      {
        'value': '新余市',
        'label': '新余市',
        'provinceCode': '360000',
      },
      {
        'value': '鹰潭市',
        'label': '鹰潭市',
        'provinceCode': '360000',
      },
      {
        'value': '赣州市',
        'label': '赣州市',
        'provinceCode': '360000',
      },
      {
        'value': '吉安市',
        'label': '吉安市',
        'provinceCode': '360000',
      },
      {
        'value': '宜春市',
        'label': '宜春市',
        'provinceCode': '360000',
      },
      {
        'value': '抚州市',
        'label': '抚州市',
        'provinceCode': '360000',
      },
      {
        'value': '上饶市',
        'label': '上饶市',
        'provinceCode': '360000',
      },
    ],
  },
  {
    'value': '山东省',
    'label': '山东省',
    'children': [
      {
        'value': '济南市',
        'label': '济南市',
        'provinceCode': '370000',
      },
      {
        'value': '青岛市',
        'label': '青岛市',
        'provinceCode': '370000',
      },
      {
        'value': '淄博市',
        'label': '淄博市',
        'provinceCode': '370000',
      },
      {
        'value': '枣庄市',
        'label': '枣庄市',
        'provinceCode': '370000',
      },
      {
        'value': '东营市',
        'label': '东营市',
        'provinceCode': '370000',
      },
      {
        'value': '烟台市',
        'label': '烟台市',
        'provinceCode': '370000',
      },
      {
        'value': '潍坊市',
        'label': '潍坊市',
        'provinceCode': '370000',
      },
      {
        'value': '济宁市',
        'label': '济宁市',
        'provinceCode': '370000',
      },
      {
        'value': '泰安市',
        'label': '泰安市',
        'provinceCode': '370000',
      },
      {
        'value': '威海市',
        'label': '威海市',
        'provinceCode': '370000',
      },
      {
        'value': '日照市',
        'label': '日照市',
        'provinceCode': '370000',
      },
      {
        'value': '莱芜市',
        'label': '莱芜市',
        'provinceCode': '370000',
      },
      {
        'value': '临沂市',
        'label': '临沂市',
        'provinceCode': '370000',
      },
      {
        'value': '德州市',
        'label': '德州市',
        'provinceCode': '370000',
      },
      {
        'value': '聊城市',
        'label': '聊城市',
        'provinceCode': '370000',
      },
      {
        'value': '滨州市',
        'label': '滨州市',
        'provinceCode': '370000',
      },
      {
        'value': '菏泽市',
        'label': '菏泽市',
        'provinceCode': '370000',
      },
    ],
  },
  {
    'value': '河南省',
    'label': '河南省',
    'children': [
      {
        'value': '郑州市',
        'label': '郑州市',
        'provinceCode': '410000',
      },
      {
        'value': '开封市',
        'label': '开封市',
        'provinceCode': '410000',
      },
      {
        'value': '洛阳市',
        'label': '洛阳市',
        'provinceCode': '410000',
      },
      {
        'value': '平顶山市',
        'label': '平顶山市',
        'provinceCode': '410000',
      },
      {
        'value': '安阳市',
        'label': '安阳市',
        'provinceCode': '410000',
      },
      {
        'value': '鹤壁市',
        'label': '鹤壁市',
        'provinceCode': '410000',
      },
      {
        'value': '新乡市',
        'label': '新乡市',
        'provinceCode': '410000',
      },
      {
        'value': '焦作市',
        'label': '焦作市',
        'provinceCode': '410000',
      },
      {
        'value': '焦作市',
        'label': '濮阳市',
        'provinceCode': '410000',
      },
      {
        'value': '许昌市',
        'label': '许昌市',
        'provinceCode': '410000',
      },
      {
        'value': '漯河市',
        'label': '漯河市',
        'provinceCode': '410000',
      },
      {
        'value': '三门峡市',
        'label': '三门峡市',
        'provinceCode': '410000',
      },
      {
        'value': '南阳市',
        'label': '南阳市',
        'provinceCode': '410000',
      },
      {
        'value': '商丘市',
        'label': '商丘市',
        'provinceCode': '410000',
      },
      {
        'value': '信阳市',
        'label': '信阳市',
        'provinceCode': '410000',
      },
      {
        'value': '周口市',
        'label': '周口市',
        'provinceCode': '410000',
      },
      {
        'value': '驻马店市',
        'label': '驻马店市',
        'provinceCode': '410000',
      },
      {
        'value': '济源市',
        'label': '济源市',
        'provinceCode': '410000',
      },
    ],
  },
  {
    'value': '湖北省',
    'label': '湖北省',
    'children': [
      {
        'value': '武汉市',
        'label': '武汉市',
        'provinceCode': '420000',
      },
      {
        'value': '黄石市',
        'label': '黄石市',
        'provinceCode': '420000',
      },
      {
        'value': '十堰市',
        'label': '十堰市',
        'provinceCode': '420000',
      },
      {
        'value': '宜昌市',
        'label': '宜昌市',
        'provinceCode': '420000',
      },
      {
        'value': '襄阳市',
        'label': '襄阳市',
        'provinceCode': '420000',
      },
      {
        'value': '鄂州市',
        'label': '鄂州市',
        'provinceCode': '420000',
      },
      {
        'value': '荆门市',
        'label': '荆门市',
        'provinceCode': '420000',
      },
      {
        'value': '孝感市',
        'label': '孝感市',
        'provinceCode': '420000',
      },
      {
        'value': '荆州市',
        'label': '荆州市',
        'provinceCode': '420000',
      },
      {
        'value': '黄冈市',
        'label': '黄冈市',
        'provinceCode': '420000',
      },
      {
        'value': '咸宁市',
        'label': '咸宁市',
        'provinceCode': '420000',
      },
      {
        'value': '随州市',
        'label': '随州市',
        'provinceCode': '420000',
      },
      {
        'value': '恩施土家族苗族自治州',
        'label': '恩施土家族苗族自治州',
        'provinceCode': '420000',
      },
      {
        'value': '仙桃市',
        'label': '仙桃市',
        'provinceCode': '420000',
      },
      {
        'value': '潜江市',
        'label': '潜江市',
        'provinceCode': '420000',
      },
      {
        'value': '天门市',
        'label': '天门市',
        'provinceCode': '420000',
      },
      {
        'value': '神农架林区',
        'label': '神农架林区',
        'provinceCode': '420000',
      },
    ],
  },
  {
    'value': '湖南省',
    'label': '湖南省',
    'children': [
      {
        'value': '长沙市',
        'label': '长沙市',
        'provinceCode': '430000',
      },
      {
        'value': '株洲市',
        'label': '株洲市',
        'provinceCode': '430000',
      },
      {
        'value': '湘潭市',
        'label': '湘潭市',
        'provinceCode': '430000',
      },
      {
        'value': '衡阳市',
        'label': '衡阳市',
        'provinceCode': '430000',
      },
      {
        'value': '邵阳市',
        'label': '邵阳市',
        'provinceCode': '430000',
      },
      {
        'value': '岳阳市',
        'label': '岳阳市',
        'provinceCode': '430000',
      },
      {
        'value': '常德市',
        'label': '常德市',
        'provinceCode': '430000',
      },
      {
        'value': '张家界市',
        'label': '张家界市',
        'provinceCode': '430000',
      },
      {
        'value': '益阳市',
        'label': '益阳市',
        'provinceCode': '430000',
      },
      {
        'value': '郴州市',
        'label': '郴州市',
        'provinceCode': '430000',
      },
      {
        'value': '永州市',
        'label': '永州市',
        'provinceCode': '430000',
      },
      {
        'value': '怀化市',
        'label': '怀化市',
        'provinceCode': '430000',
      },
      {
        'value': '娄底市',
        'label': '娄底市',
        'provinceCode': '430000',
      },
      {
        'value': '湘西土家族苗族自治州',
        'label': '湘西土家族苗族自治州',
        'provinceCode': '430000',
      },
    ],
  },
  {
    'value': '广东省',
    'label': '广东省',
    'children': [
      {
        'value': '广州市',
        'label': '广州市',
        'provinceCode': '440000',
      },
      {
        'value': '韶关市',
        'label': '韶关市',
        'provinceCode': '440000',
      },
      {
        'value': '深圳市',
        'label': '深圳市',
        'provinceCode': '440000',
      },
      {
        'value': '珠海市',
        'label': '珠海市',
        'provinceCode': '440000',
      },
      {
        'value': '汕头市',
        'label': '汕头市',
        'provinceCode': '440000',
      },
      {
        'value': '佛山市',
        'label': '佛山市',
        'provinceCode': '440000',
      },
      {
        'value': '江门市',
        'label': '江门市',
        'provinceCode': '440000',
      },
      {
        'value': '湛江市',
        'label': '湛江市',
        'provinceCode': '440000',
      },
      {
        'value': '茂名市',
        'label': '茂名市',
        'provinceCode': '440000',
      },
      {
        'value': '肇庆市',
        'label': '肇庆市',
        'provinceCode': '440000',
      },
      {
        'value': '惠州市',
        'label': '惠州市',
        'provinceCode': '440000',
      },
      {
        'value': '梅州市',
        'label': '梅州市',
        'provinceCode': '440000',
      },
      {
        'value': '汕尾市',
        'label': '汕尾市',
        'provinceCode': '440000',
      },
      {
        'value': '河源市',
        'label': '河源市',
        'provinceCode': '440000',
      },
      {
        'value': '阳江市',
        'label': '阳江市',
        'provinceCode': '440000',
      },
      {
        'value': '清远市',
        'label': '清远市',
        'provinceCode': '440000',
      },
      {
        'value': '东莞市',
        'label': '东莞市',
        'provinceCode': '440000',
      },
      {
        'value': '中山市',
        'label': '中山市',
        'provinceCode': '440000',
      },
      {
        'value': '潮州市',
        'label': '潮州市',
        'provinceCode': '440000',
      },
      {
        'value': '揭阳市',
        'label': '揭阳市',
        'provinceCode': '440000',
      },
      {
        'value': '云浮市',
        'label': '云浮市',
        'provinceCode': '440000',
      },
    ],
  },
  {
    'value': '广西壮族自治区',
    'label': '广西壮族自治区',
    'children': [
      {
        'value': '南宁市',
        'label': '南宁市',
        'provinceCode': '450000',
      },
      {
        'value': '柳州市',
        'label': '柳州市',
        'provinceCode': '450000',
      },
      {
        'value': '桂林市',
        'label': '桂林市',
        'provinceCode': '450000',
      },
      {
        'value': '梧州市',
        'label': '梧州市',
        'provinceCode': '450000',
      },
      {
        'value': '北海市',
        'label': '北海市',
        'provinceCode': '450000',
      },
      {
        'value': '防城港市',
        'label': '防城港市',
        'provinceCode': '450000',
      },
      {
        'value': '钦州市',
        'label': '钦州市',
        'provinceCode': '450000',
      },
      {
        'value': '贵港市',
        'label': '贵港市',
        'provinceCode': '450000',
      },
      {
        'value': '玉林市',
        'label': '玉林市',
        'provinceCode': '450000',
      },
      {
        'value': '百色市',
        'label': '百色市',
        'provinceCode': '450000',
      },
      {
        'value': '贺州市',
        'label': '贺州市',
        'provinceCode': '450000',
      },
      {
        'value': '河池市',
        'label': '河池市',
        'provinceCode': '450000',
      },
      {
        'value': '来宾市',
        'label': '来宾市',
        'provinceCode': '450000',
      },
      {
        'value': '崇左市',
        'label': '崇左市',
        'provinceCode': '450000',
      },
    ],
  },
  {
    'value': '海南省',
    'label': '海南省',
    'children': [
      {
        'value': '海口市',
        'label': '海口市',
        'provinceCode': '460000',
      },
      {
        'value': '三亚市',
        'label': '三亚市',
        'provinceCode': '460000',
      },
      {
        'value': '三沙市',
        'label': '三沙市',
        'provinceCode': '460000',
      },
      {
        'value': '儋州市',
        'label': '儋州市',
        'provinceCode': '460000',
      },
      {
        'value': '五指山市',
        'label': '五指山市',
        'provinceCode': '460000',
      },
      {
        'value': '琼海市',
        'label': '琼海市',
        'provinceCode': '460000',
      },
      {
        'value': '文昌市',
        'label': '文昌市',
        'provinceCode': '460000',
      },
      {
        'value': '万宁市',
        'label': '万宁市',
        'provinceCode': '460000',
      },
      {
        'value': '东方市',
        'label': '东方市',
        'provinceCode': '460000',
      },
      {
        'value': '定安县',
        'label': '定安县',
        'provinceCode': '460000',
      },
      {
        'value': '澄迈县',
        'label': '澄迈县',
        'provinceCode': '460000',
      },
      {
        'value': '白沙黎族自治县',
        'label': '白沙黎族自治县',
        'provinceCode': '460000',
      },
      {
        'value': '昌江黎族自治县',
        'label': '昌江黎族自治县',
        'provinceCode': '460000',
      },
      {
        'value': '保亭黎族苗族自治县',
        'label': '保亭黎族苗族自治县',
        'provinceCode': '460000',
      },
    ],
  },
  {
    'value': '重庆市',
    'label': '重庆市',
    'children': [
      {
        'value': '重庆市',
        'label': '重庆市',
        'provinceCode': '500000',
      },
      {
        'value': '市辖县',
        'label': '市辖县',
        'provinceCode': '500000',
      },
    ],
  },
  {
    'value': '四川省',
    'label': '四川省',
    'children': [
      {
        'value': '成都市',
        'label': '成都市',
        'provinceCode': '510000',
      },
      {
        'value': '自贡市',
        'label': '自贡市',
        'provinceCode': '510000',
      },
      {
        'value': '攀枝花市',
        'label': '攀枝花市',
        'provinceCode': '510000',
      },
      {
        'value': '泸州市',
        'label': '泸州市',
        'provinceCode': '510000',
      },
      {
        'value': '德阳市',
        'label': '德阳市',
        'provinceCode': '510000',
      },
      {
        'value': '绵阳市',
        'label': '绵阳市',
        'provinceCode': '510000',
      },
      {
        'value': '广元市',
        'label': '广元市',
        'provinceCode': '510000',
      },
      {
        'value': '遂宁市',
        'label': '遂宁市',
        'provinceCode': '510000',
      },
      {
        'value': '内江市',
        'label': '内江市',
        'provinceCode': '510000',
      },
      {
        'value': '乐山市',
        'label': '乐山市',
        'provinceCode': '510000',
      },
      {
        'value': '南充市',
        'label': '南充市',
        'provinceCode': '510000',
      },
      {
        'value': '眉山市',
        'label': '眉山市',
        'provinceCode': '510000',
      },
      {
        'value': '宜宾市',
        'label': '宜宾市',
        'provinceCode': '510000',
      },
      {
        'value': '广安市',
        'label': '广安市',
        'provinceCode': '510000',
      },
      {
        'value': '达州市',
        'label': '达州市',
        'provinceCode': '510000',
      },
      {
        'value': '雅安市',
        'label': '雅安市',
        'provinceCode': '510000',
      },
      {
        'value': '巴中市',
        'label': '巴中市',
        'provinceCode': '510000',
      },
      {
        'value': '资阳市',
        'label': '资阳市',
        'provinceCode': '510000',
      },
      {
        'value': '阿坝藏族羌族自治州',
        'label': '阿坝藏族羌族自治州',
        'provinceCode': '510000',
      },
      {
        'value': '甘孜藏族自治州',
        'label': '甘孜藏族自治州',
        'provinceCode': '510000',
      },
      {
        'value': '凉山彝族自治州',
        'label': '凉山彝族自治州',
        'provinceCode': '510000',
      },
    ],
  },
  {
    'value': '贵州省',
    'label': '贵州省',
    'children': [
      {
        'value': '贵阳市',
        'label': '贵阳市',
        'provinceCode': '520000',
      },
      {
        'value': '六盘水市',
        'label': '六盘水市',
        'provinceCode': '520000',
      },
      {
        'value': '遵义市',
        'label': '遵义市',
        'provinceCode': '520000',
      },
      {
        'value': '安顺市',
        'label': '安顺市',
        'provinceCode': '520000',
      },
      {
        'value': '毕节市',
        'label': '毕节市',
        'provinceCode': '520000',
      },
      {
        'value': '铜仁市',
        'label': '铜仁市',
        'provinceCode': '520000',
      },
      {
        'value': '黔西南布依族苗族自治州',
        'label': '黔西南布依族苗族自治州',
        'provinceCode': '520000',
      },
      {
        'value': '黔东南苗族侗族自治州',
        'label': '黔东南苗族侗族自治州',
        'provinceCode': '520000',
      },
      {
        'value': '黔南布依族苗族自治州',
        'label': '黔南布依族苗族自治州',
        'provinceCode': '520000',
      },
    ],
  },
  {
    'value': '云南省',
    'label': '云南省',
    'children': [
      {
        'value': '昆明市',
        'label': '昆明市',
        'provinceCode': '530000',
      },
      {
        'value': '曲靖市',
        'label': '曲靖市',
        'provinceCode': '530000',
      },
      {
        'value': '玉溪市',
        'label': '玉溪市',
        'provinceCode': '530000',
      },
      {
        'value': '保山市',
        'label': '保山市',
        'provinceCode': '530000',
      },
      {
        'value': '昭通市',
        'label': '昭通市',
        'provinceCode': '530000',
      },
      {
        'value': '丽江市',
        'label': '丽江市',
        'provinceCode': '530000',
      },
      {
        'value': '普洱市',
        'label': '普洱市',
        'provinceCode': '530000',
      },
      {
        'value': '临沧市',
        'label': '临沧市',
        'provinceCode': '530000',
      },
      {
        'value': '楚雄彝族自治州',
        'label': '楚雄彝族自治州',
        'provinceCode': '530000',
      },
      {
        'value': '红河哈尼族彝族自治州',
        'label': '红河哈尼族彝族自治州',
        'provinceCode': '530000',
      },
      {
        'value': '文山壮族苗族自治州',
        'label': '文山壮族苗族自治州',
        'provinceCode': '530000',
      },
      {
        'value': '西双版纳傣族自治州',
        'label': '西双版纳傣族自治州',
        'provinceCode': '530000',
      },
      {
        'value': '大理白族自治州',
        'label': '大理白族自治州',
        'provinceCode': '530000',
      },
      {
        'value': '德宏傣族景颇族自治州',
        'label': '德宏傣族景颇族自治州',
        'provinceCode': '530000',
      },
      {
        'value': '怒江傈僳族自治州',
        'label': '怒江傈僳族自治州',
        'provinceCode': '530000',
      },
      {
        'value': '迪庆藏族自治州',
        'label': '迪庆藏族自治州',
        'provinceCode': '530000',
      },
    ],
  },
  {
    'value': '西藏自治区',
    'label': '西藏自治区',
    'children': [
      {
        'value': '拉萨市',
        'label': '拉萨市',
        'provinceCode': '540000',
      },
      {
        'value': '日喀则市',
        'label': '日喀则市',
        'provinceCode': '540000',
      },
      {
        'value': '昌都市',
        'label': '昌都市',
        'provinceCode': '540000',
      },
      {
        'value': '林芝市',
        'label': '林芝市',
        'provinceCode': '540000',
      },
      {
        'value': '山南市',
        'label': '山南市',
        'provinceCode': '540000',
      },
      {
        'value': '那曲地区',
        'label': '那曲地区',
        'provinceCode': '540000',
      },
      {
        'value': '阿里地区',
        'label': '阿里地区',
        'provinceCode': '540000',
      },
    ],
  },
  {
    'value': '陕西省',
    'label': '陕西省',
    'children': [
      {
        'value': '西安市',
        'label': '西安市',
        'provinceCode': '610000',
      },
      {
        'value': '铜川市',
        'label': '铜川市',
        'provinceCode': '610000',
      },
      {
        'value': '宝鸡市',
        'label': '宝鸡市',
        'provinceCode': '610000',
      },
      {
        'value': '咸阳市',
        'label': '咸阳市',
        'provinceCode': '610000',
      },
      {
        'value': '渭南市',
        'label': '渭南市',
        'provinceCode': '610000',
      },
      {
        'value': '延安市',
        'label': '延安市',
        'provinceCode': '610000',
      },
      {
        'value': '汉中市',
        'label': '汉中市',
        'provinceCode': '610000',
      },
      {
        'value': '榆林市',
        'label': '榆林市',
        'provinceCode': '610000',
      },
      {
        'value': '安康市',
        'label': '安康市',
        'provinceCode': '610000',
      },
      {
        'value': '商洛市',
        'label': '商洛市',
        'provinceCode': '610000',
      },
    ],
  },
  {
    'value': '甘肃省',
    'label': '甘肃省',
    'children': [
      {
        'value': '兰州市',
        'label': '兰州市',
        'provinceCode': '620000',
      },
      {
        'value': '嘉峪关市',
        'label': '嘉峪关市',
        'provinceCode': '620000',
      },
      {
        'value': '金昌市',
        'label': '金昌市',
        'provinceCode': '620000',
      },
      {
        'value': '白银市',
        'label': '白银市',
        'provinceCode': '620000',
      },
      {
        'value': '天水市',
        'label': '天水市',
        'provinceCode': '620000',
      },
      {
        'value': '武威市',
        'label': '武威市',
        'provinceCode': '620000',
      },
      {
        'value': '张掖市',
        'label': '张掖市',
        'provinceCode': '620000',
      },
      {
        'value': '平凉市',
        'label': '平凉市',
        'provinceCode': '620000',
      },
      {
        'value': '酒泉市',
        'label': '酒泉市',
        'provinceCode': '620000',
      },
      {
        'value': '庆阳市',
        'label': '庆阳市',
        'provinceCode': '620000',
      },
      {
        'value': '定西市',
        'label': '定西市',
        'provinceCode': '620000',
      },
      {
        'value': '陇南市',
        'label': '陇南市',
        'provinceCode': '620000',
      },
      {
        'value': '临夏回族自治州',
        'label': '临夏回族自治州',
        'provinceCode': '620000',
      },
      {
        'value': '甘南藏族自治州',
        'label': '甘南藏族自治州',
        'provinceCode': '620000',
      },
    ],
  },
  {
    'value': '青海省',
    'label': '青海省',
    'children': [
      {
        'value': '西宁市',
        'label': '西宁市',
        'provinceCode': '630000',
      },
      {
        'value': '海东市',
        'label': '海东市',
        'provinceCode': '630000',
      },
      {
        'value': '海北藏族自治州',
        'label': '海北藏族自治州',
        'provinceCode': '630000',
      },
      {
        'value': '黄南藏族自治州',
        'label': '黄南藏族自治州',
        'provinceCode': '630000',
      },
      {
        'value': '海南藏族自治州',
        'label': '海南藏族自治州',
        'provinceCode': '630000',
      },
      {
        'value': '果洛藏族自治州',
        'label': '果洛藏族自治州',
        'provinceCode': '630000',
      },
      {
        'value': '玉树藏族自治州',
        'label': '玉树藏族自治州',
        'provinceCode': '630000',
      },
      {
        'value': '海西蒙古族藏族自治州',
        'label': '海西蒙古族藏族自治州',
        'provinceCode': '630000',
      },
    ],
  },
  {
    'value': '宁夏回族自治区',
    'label': '宁夏回族自治区',
    'children': [
      {
        'value': '银川市',
        'label': '银川市',
        'provinceCode': '640000',
      },
      {
        'value': '石嘴山市',
        'label': '石嘴山市',
        'provinceCode': '640000',
      },
      {
        'value': '吴忠市',
        'label': '吴忠市',
        'provinceCode': '640000',
      },
      {
        'value': '固原市',
        'label': '固原市',
        'provinceCode': '640000',
      },
      {
        'value': '中卫市',
        'label': '中卫市',
        'provinceCode': '640000',
      },
    ],
  },
  {
    'value': '新疆维吾尔自治区',
    'label': '新疆维吾尔自治区',
    'children': [
      {
        'value': '乌鲁木齐市',
        'label': '乌鲁木齐市',
        'provinceCode': '650000',
      },
      {
        'value': '克拉玛依市',
        'label': '克拉玛依市',
        'provinceCode': '650000',
      },
      {
        'value': '吐鲁番市',
        'label': '吐鲁番市',
        'provinceCode': '650000',
      },
      {
        'value': '哈密市',
        'label': '哈密市',
        'provinceCode': '650000',
      },
      {
        'value': '昌吉回族自治州',
        'label': '昌吉回族自治州',
        'provinceCode': '650000',
      },
      {
        'value': '博尔塔拉蒙古自治州',
        'label': '博尔塔拉蒙古自治州',
        'provinceCode': '650000',
      },
      {
        'value': '巴音郭楞蒙古自治州',
        'label': '巴音郭楞蒙古自治州',
        'provinceCode': '650000',
      },
      {
        'value': '阿克苏地区',
        'label': '阿克苏地区',
        'provinceCode': '650000',
      },
      {
        'value': '克孜勒苏柯尔克孜自治州',
        'label': '克孜勒苏柯尔克孜自治州',
        'provinceCode': '650000',
      },
      {
        'value': '喀什地区',
        'label': '喀什地区',
        'provinceCode': '650000',
      },
      {
        'value': '和田地区',
        'label': '和田地区',
        'provinceCode': '650000',
      },
      {
        'value': '伊犁哈萨克自治州',
        'label': '伊犁哈萨克自治州',
        'provinceCode': '650000',
      },
      {
        'value': '塔城地区',
        'label': '塔城地区',
        'provinceCode': '650000',
      },
      {
        'value': '阿勒泰地区',
        'label': '阿勒泰地区',
        'provinceCode': '650000',
      },
      {
        'value': '石河子市',
        'label': '石河子市',
        'provinceCode': '650000',
      },
      {
        'value': '阿拉尔市',
        'label': '阿拉尔市',
        'provinceCode': '650000',
      },
      {
        'value': '图木舒克市',
        'label': '图木舒克市',
        'provinceCode': '650000',
      },
      {
        'value': '五家渠市',
        'label': '五家渠市',
        'provinceCode': '650000',
      },
      {
        'value': '北屯市',
        'label': '北屯市',
        'provinceCode': '650000',
      },
      {
        'value': '铁门关市',
        'label': '铁门关市',
        'provinceCode': '650000',
      },
      {
        'value': '双河市',
        'label': '双河市',
        'provinceCode': '650000',
      },
      {
        'value': '可克达拉市',
        'label': '可克达拉市',
        'provinceCode': '650000',
      },
      {
        'value': '昆玉市',
        'label': '昆玉市',
        'provinceCode': '650000',
      },
    ],
  },
  {
    'value': '台湾省',
    'label': '台湾省'
  },
  {
    'value': '香港特别行政区',
    'label': '香港特别行政区'
  },
  {
    'value': '澳门特别行政区',
    'label': '澳门特别行政区'
  },
]

export default city_options
