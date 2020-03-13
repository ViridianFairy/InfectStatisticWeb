<template>
  <div class="hello">
    <!-- <transition name="init" mode="out-in"> -->
    <div id="data" v-if="router==0">
      <div style="margin:12px 0 16px 20px;font-size: 12px;color:#aaa">截至 2020-03-11 20：20 全国数据统计</div>
      <div id="data-huge">
        <div class="data-big">
          <div class="data-small">
            <div>较昨日{{allNum.curInj[1]>0?'+':''}}{{allNum.curInj[1]}}</div>
            <div style="color:#C80017">{{allNum.curInj[0]}}</div>
            <div>现存确诊</div>
          </div>
          <div class="data-small">
            <div>较昨日{{allNum.sus[1]>0?'+':''}}{{allNum.sus[1]}}</div>
            <div style="color:#B8741A">{{allNum.sus[0]}}</div>
            <div>现存疑似</div>
          </div>
          <div class="data-small">
            <div>较昨日{{allNum.bad[1]>0?'+':''}}{{allNum.bad[1]}}</div>
            <div style="color:#7B4D12">{{allNum.bad[0]}}</div>
            <div>现存重症</div>
          </div>
        </div>
        <div class="data-big" style="margin-top: 18px;">
          <div class="data-small">
            <div>较昨日{{allNum.inj[1]>0?'+':''}}{{allNum.inj[1]}}</div>
            <div style="color:#A30014">{{allNum.inj[0]}}</div>
            <div>累计确诊</div>
          </div>
          <div class="data-small">
            <div>较昨日{{allNum.dead[1]>0?'+':''}}{{allNum.dead[1]}}</div>
            <div style="color:#015487">{{allNum.dead[0]}}</div>
            <div>累计死亡</div>
          </div>
          <div class="data-small">
            <div>较昨日{{allNum.cur[1]>0?'+':''}}{{allNum.cur[1]}}</div>
            <div style="color:#4B8502">{{allNum.cur[0]}}</div>
            <div>累计治愈</div>
          </div>
        </div>
      </div>
      <div id="button-wrapper">
        <div class="b-left" @click="changeButtonStyle1" :style="buttonStyle1[btnIndex1]">现存确诊</div>
        <div class="b-right" @click="changeButtonStyle1" :style="buttonStyle1[(btnIndex1+1)%2]" >累计确诊</div>
      </div>
    </div>
    <!-- </transition> -->
    <!-- <transition name="init"> -->
    <div id="data2" v-if="router==1">
      <div style="margin:12px 0 16px 20px;font-size: 12px;color:#aaa">截至 2020-03-11 20：20 全国数据统计</div>
      <div id="data-huge">
        <div class="data-big">
          <div class="data-small">
            <div>较昨日{{provNum.curInj[1]>0?'+':''}}{{provNum.curInj[1]}}</div>
            <div style="color:#C80017">{{provNum.curInj[0]}}</div>
            <div>现存确诊</div>
          </div>
          <div class="data-small">
            <div>较昨日{{provNum.inj[1]>0?'+':''}}{{provNum.inj[1]}}</div>
            <div style="color:#A30014">{{provNum.inj[0]}}</div>
            <div>累计确诊</div>
          </div>
          <div class="data-small">
            <div>较昨日{{provNum.dead[1]>0?'+':''}}{{provNum.dead[1]}}</div>
            <div style="color:#015487">{{provNum.dead[0]}}</div>
            <div>累计死亡</div>
          </div>
          <div class="data-small">
            <div>较昨日{{provNum.cur[1]>0?'+':''}}{{provNum.cur[1]}}</div>
            <div style="color:#4B8502">{{provNum.cur[0]}}</div>
            <div>累计治愈</div>
          </div>
        </div>
      </div>
      <div id="button-wrapper2">
        <div :class="btn2ChangeActive==0?'btnChosen':'btnUnchosen'" @click="changeButtonStyle2(0)">
          现存
          <br />确诊趋势
        </div>
        <div :class="btn2ChangeActive==1?'btnChosen':'btnUnchosen'" @click="changeButtonStyle2(1)">
          累计
          <br />确诊趋势
        </div>
        <div :class="btn2ChangeActive==2?'btnChosen':'btnUnchosen'" @click="changeButtonStyle2(2)">
          累计
          <br />治愈趋势
        </div>
        <div :class="btn2ChangeActive==3?'btnChosen':'btnUnchosen'" @click="changeButtonStyle2(3)">
          累计
          <br />死亡趋势
        </div>
      </div>
      <div class="aaa">最新消息：山东任城监狱一日新增200例新冠..</div>
    </div>
    <!-- </transition> -->
    <div id="load-wrapper">
      <div class="load">
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
      </div>
    </div>
    <transition name="init">
      <div id="main" :style="{width:broad}" v-show="showDialog"></div>
    </transition>
  </div>
</template>

<script>
var baseURL = "http://106.15.200.151:3011"
// var baseURL = "http://127.0.0.1:3011";
import "echarts/map/js/china";
import $ajax from "axios";
var echarts = require("echarts/lib/echarts");
require("echarts/lib/chart/line");
require("echarts/lib/chart/map");
require("echarts/lib/component/tooltip");
require("echarts/lib/component/visualMap");
require("echarts/lib/component/geo");
export default {
  name: "statis",
  props: {
    broad: String,
    router: Number
  },
  methods: {
    initAll() {
      this.showDialog = false;
      if (this.myChart) this.myChart.dispose();
      //if (this.dataList[0].value == -1) {
      $ajax.get(baseURL + "/api/ncov/getAll").then(doc => {
        var arr = JSON.parse(doc.data.data);
        console.log(arr);
        arr.data.forEach(v => {
          this.dataList.forEach((l, i) => {
            if (l.name == v.provinceShortName) {
              this.$set(this.dataList[i], "value", v.confirmedCount);
            }
          });
        });
        if (this.allNum.inj[0] == 0) {
          Object.keys(this.allNum).forEach(name => {
            console.log(name);
            var Time = 30,
              t = 0;
            var piece = (arr.statis[name][0] / Time).toFixed(2);
            var piece2 = (arr.statis[name][1] / Time).toFixed(2);
            var timer = setInterval(() => {
              this.$set(this.allNum[name], 0, parseInt(piece * ++t));
              this.$set(this.allNum[name], 1, parseInt(piece2 * ++t));
              if (t == Time) {
                this.allNum[name][0] = arr.statis[name][0];
                this.allNum[name][1] = arr.statis[name][1];
                clearInterval(timer);
              }
            }, 16.6);
          });
        }

        //var myChart = this.myChart;
        this.myChart = echarts.init(document.getElementById("main"));
        this.myChart.setOption(option);
        this.showDialog = true;
        this.myChart.on("mouseover", () => {
          this.myChart.dispatchAction({
            type: "downplay",
            name: "南海诸岛"
          });
        });
      });
      //}
      var self = this;
      var option = {
        tooltip: {
          triggerOn: "click",
          enterable: true,
          formatter: function(params, ticket, callback) {
            var tag = params.seriesName;
            var name = params.name;
            var value = params.value;
            if (name == "南海诸岛") return "";
            self.$nextTick(() => {
              var dom = document.querySelector(".jump");
              dom.onclick = function() {
                self.router = 1;
                self.showDialog = false;
                self.initProv(dom.name);
              };
            });
            return `<div style="display:flex">
         <div style="padding-left:2px">
            地区：${name == "山东" ? "沙东" : name}<br>${tag}：${value}
         </div>
         <a class="jump" style="margin: 3px 0;border-left:1px solid #ccc;padding:2px;
         display:flex;justify-content:center;align-items:center;
         margin-left:9px;padding-left:9px;font-size:15px;" 
         name="${name}">
            详情 ></a>
         </div>
         `;
          }
        },
        visualMap: {
          type: "piecewise",
          pieces: [
            { max: 0 },
            { min: 1, max: 9 },
            { min: 10, max: 99 },
            { min: 100, max: 999 },
            { min: 1000, max: 9999 },
            { min: 10000 }
          ],
          splitNumber: 5,
          // left: 'left',
          // top: 'bottom',
          color: [
            "#820000",
            "#e33b2b",
            "#ef7341",
            "#fb9d78",
            "#ffb395",
            "#e3e3e3"
          ]
        },
        geo: {
          map: "china",
          zoom: 1.23,
          label: {
            normal: {
              show: true,
              fontSize: "12",
              color: "rgba(0,0,0,0.7)"
            }
          },
          itemStyle: {
            normal: {
              borderColor: "rgba(0, 0, 0, 0.2)"
            },
            emphasis: {
              areaColor: "#b8c9ff",
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowBlur: 20,
              borderWidth: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        },
        series: [
          {
            hoverAnimation: true,
            name: "确诊",
            type: "map",
            geoIndex: 0,
            data: this.dataList
          }
        ]
      };
    },
    initProv(query, info) {
      this.provNum = {
        curInj: [0, 0],
        inj: [0, 0],
        cur: [0, 0],
        dead: [0, 0]
      };
      this.dataList2 = []
      if (!info) info = "inj";
      this.$emit("toProv", { name: query });
      var dataTime = [];
      this.myChart.clear()
      this.myChart.dispose();
      $ajax.post(baseURL + "/api/ncov/getProv", { name: query }).then(doc => {
        var arr = JSON.parse(doc.data.data);
        console.log(arr);
        arr.forEach(v => {
          let t = new Date(v.updateTime);
          let time = `${t.getMonth() + 1}月${t.getDate()}日`;
          if (dataTime.includes(time)) return;
          dataTime.unshift(time);
          this.dataList2.unshift(v[info]);
        });
        this.myChart = echarts.init(document.getElementById("main"));
        this.myChart.clear()
        this.myChart.setOption({
          xAxis: {
            type: "category",
            data: dataTime,
            name: "时间"
          },
          yAxis: {
            type: "value",
            name: query + this.typeText[info],
          },
          series: [
            {
              data: this.dataList2,
              type: "line",
              smooth: true,
              name: "确诊人数",
              lineStyle: {
                normal: {
                  color: "#FC744F",
                  width: 4
                }
              }
            }
          ],
          tooltip: {
            //鼠标悬停提示内容
            trigger: "axis", // 触发类型，默认数据触发，可选为：'axis' item
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: "line", // 默认为直线，可选为：'line' | 'shadow'
              label: "cross",
              show: true
            },
            formatter: function(a) {
              //console.log(a)
              let list = [];
              let listItem = "";
              for (var i = 0; i < a.length; i++) {
                list.push(
                  '<i style="display: inline-block;width: 10px;height: 10px;background: ' +
                    a[i].color +
                    ';margin-right: 5px;border-radius: 50%;}"></i><span style="width:auto; display:inline-block;">' +
                    "截至" +
                    a[i].name +
                    "，<br>" +
                    "累计" +
                    a[i].seriesName +
                    "：" +
                    a[i].value +
                    "&nbsp"
                );
              }
              listItem = list.join("<br>");
              return '<div class="showBox">' + listItem + "</div>";
            }
          }
        },true);
        this.showDialog = true;

        Object.keys(this.provNum).forEach(name => {
          var today = arr[0][name];
          var yesto = arr[1][name];
          arr[name] = [today, today-yesto];
          console.log(name);
          var Time = 30,
            t = 0;
          var piece = (arr[name][0] / Time).toFixed(2);
          var piece2 = (arr[name][1] / Time).toFixed(2);
          var timer = setInterval(() => {
            this.$set(this.provNum[name], 0, parseInt(piece * ++t));
            this.$set(this.provNum[name], 1, parseInt(piece2 * ++t));
            if (t == Time) {
              this.provNum[name][0] = arr[name][0];
              this.provNum[name][1] = arr[name][1];
              clearInterval(timer);
            }
          }, 16.6);
        });
        this.myChart.dispatchAction({
          type: "showTip",
          seriesIndex: 1 // 显示第几个series
        });
      });
    },
    getFullName(name) {
      var obj = this.dataList.find(val => {
        return val.name == name;
      });
      return obj.nameFull;
    },

    changeButtonStyle1:function () {
      this.btnIndex1=(this.btnIndex1+1)%2;
    },
    changeButtonStyle2:function (num) {
      this.btn2ChangeActive=num;
      // alert(num);
    }

  },
  data() {
    return {
      myChart: null,
      dataList2: [],
      query: "",
      showDialog: false,
      typeText:{
         'curInj':'现存确诊',
         'inj':'累计确诊',
         'cur':'累计治愈',
         'dead':'累计死亡',
      },
      typeIndex:0,
      allNum: {
        curInj: [0, 0],
        inj: [0, 0],
        sus: [0, 0],
        cur: [0, 0],
        dead: [0, 0],
        bad: [0, 0]
      },
      provNum: {
        curInj: [0, 0],
        inj: [0, 0],
        //   sus: [0, 0],
        cur: [0, 0],
        dead: [0, 0]
      },
      dataList: [
        { name: "南海诸岛", nameFull: "南海诸岛", value: -1 },
        { name: "北京", nameFull: "北京市", value: -1 },
        { name: "天津", nameFull: "天津市", value: -1 },
        { name: "上海", nameFull: "上海市", value: -1 },
        { name: "重庆", nameFull: "重庆市", value: -1 },
        { name: "河北", nameFull: "河北省", value: -1 },
        { name: "河南", nameFull: "河南省", value: -1 },
        { name: "云南", nameFull: "云南省", value: -1 },
        { name: "辽宁", nameFull: "辽宁省", value: -1 },
        { name: "黑龙江", nameFull: "黑龙江省", value: -1 },
        { name: "湖南", nameFull: "湖南省", value: -1 },
        { name: "安徽", nameFull: "安徽省", value: -1 },
        { name: "山东", nameFull: "山东省", value: 5555 },
        { name: "新疆", nameFull: "新疆维吾尔自治区", value: 99999 },
        { name: "江苏", nameFull: "江苏省", value: -1 },
        { name: "浙江", nameFull: "浙江省", value: -1 },
        { name: "江西", nameFull: "江西省", value: 555 },
        { name: "湖北", nameFull: "湖北省", value: -1 },
        { name: "广西", nameFull: "广西壮族自治区", value: -1 },
        { name: "甘肃", nameFull: "甘肃省", value: -1 },
        { name: "山西", nameFull: "山西省", value: -1 },
        { name: "内蒙古", nameFull: "内蒙古自治区", value: -1 },
        { name: "陕西", nameFull: "陕西省", value: -1 },
        { name: "吉林", nameFull: "吉林省", value: -1 },
        { name: "福建", nameFull: "福建省", value: -1 },
        { name: "贵州", nameFull: "贵州省", value: -1 },
        { name: "广东", nameFull: "广东省", value: -1 },
        { name: "青海", nameFull: "青海省", value: -1 },
        { name: "西藏", nameFull: "西藏自治区", value: -1 },
        { name: "四川", nameFull: "四川省", value: -1 },
        { name: "宁夏", nameFull: "宁夏回族自治区", value: -1 },
        { name: "海南", nameFull: "海南省", value: -1 },
        { name: "台湾", nameFull: "台湾", value: -1 },
        { name: "香港", nameFull: "香港", value: -1 },
        { name: "澳门", nameFull: "澳门", value: -1 }
      ],


      buttonStyle1:[
              "color:#f2f2f2;background-color:#ff756b",
              "color:#ff756b;background-color:#f2f2f2",
      ],

      buttonStyle2:[
        "color:rgb(219, 114, 106);",
        "color:#db726a;",
      ],

      btnIndex1:0,
      btnIndex2:0,
      btn2ChangeActive:0,
    };
  },
  mounted() {
    this.initAll();
  },
  watch: {
    router(newVal) {
      if (newVal == 0) this.initAll();
      //if(newVal==1) this.initProv()
    }
  },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
  margin: 0;
  font-family: Microsoft YaHei, Arial;
}
#main,
#load-wrapper,
#extra-wrapper {
  width: auto;
  height: calc(294px + 60px);
}
#data,
#data2 {
  width: auto;
  height: auto;
  font-size: 14px;
  overflow: hidden;
}
#main {
  /* opacity: 0; */
  transition: 0.4s all;
}
#button-wrapper {
  display: flex;
  width: 80%;
  font-weight: bold;
  font-size: 16px;
  margin: 16px auto 0;
}
#button-wrapper2 {
  display: flex;
  width: 88%;
  font-size: 15px;
  margin: 26px auto 0;
  text-align: center;
  justify-content: space-around;
}
#button-wrapper div {
  padding: 6px 40px;
}
.aaa {
  color: #aaa;
  margin: 14px 0 0 25px;
}
/*#button-wrapper2 div {*/
/*  line-height: 24px;*/
/*  color: white;*/
/*  background-color: #ff756b;*/
/*  margin: 0 4px;*/
/*  padding: 4px 6px;*/
/*  border-radius: 4px;*/
/*  width: 18%;*/
/*  font-weight: bold;*/
/*  transition: 0.2s all;*/
/*}*/
#button-wrapper2 div:hover {
  cursor: pointer;
  background-color: #db726a;
}

.btnChosen{
  line-height: 24px;
  color: white;
  background-color: #db726a;
  margin: 0 4px;
  padding: 4px 6px;
  border-radius: 4px;
  width: 18%;
  font-weight: bold;
  transition: 0.2s all;
}

.btnUnchosen{
  line-height: 24px;
  color: white;
  background-color: #ff756b;
  margin: 0 4px;
  padding: 4px 6px;
  border-radius: 4px;
  width: 18%;
  font-weight: bold;
  transition: 0.2s all;
}


.b-left {
  width: 50%;
  /*color: #ff756b;*/
  /*background-color: #f2f2f2;*/
  text-align: center;
}
#button-wrapper div:hover {
  filter: brightness(1.1);
  cursor: pointer;
}
.b-right {
  width: 50%;
  color: rgb(238, 238, 238);
  background-color: #ff756b;
  text-align: center;
}

#data-huge {
  padding: 15px 4px;
  border-radius: 10px;
  margin: 0 auto;
  width: 90%;
  box-shadow: 3px 3px 7px rgba(170, 170, 170, 0.34);
}
.data-big {
  display: flex;
  justify-content: space-around;
}
.data-small {
  width: 75px;
  text-align: center;
}
.data-small div:nth-child(1) {
  font-size: 12px;
  height: 18px;
}
.data-small div:nth-child(2) {
  font-size: 18px;
  height: 22px;
  font-weight: bold;
}
.data-small div:nth-child(3) {
  font-size: 12px;
  font-weight: bold;
}
#load-wrapper {
  position: absolute;
}
#extra-wrapper {
  position: absolute;
}
#extra-wrapper:hover {
  cursor: pointer;
  position: absolute;
}
#extra {
  z-index: 10;
  width: auto;
  height: auto;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 12px;
  background: #a0a0a0;
  font-size: 14px;
  padding: 6px 11px;
  color: white;
  border-radius: 6px;
}
a:hover {
  cursor: pointer;
  color: #c7e8ff;
}
#appLoading {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.load {
  position: absolute;
  width: 130px;
  background-color: #4b9ddb00;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.load .line:nth-last-child(1) {
  animation: loadingAnimate 0.4s 0.07s cubic-bezier(0.6, -0.28, 0.735, 0.045)
    infinite;
  margin-left: 0.3rem;
}

.load .line:nth-last-child(2) {
  animation: loadingAnimate 0.4s 0.13s cubic-bezier(0.6, -0.28, 0.735, 0.045)
    infinite;
}

.load .line:nth-last-child(3) {
  animation: loadingAnimate 0.4s 0.2s cubic-bezier(0.6, -0.28, 0.735, 0.045)
    infinite;
  margin-right: 0.3rem;
}

.line {
  display: inline-block;
  width: 15px;
  height: 15px;
  border-radius: 15px;
}

.load .line:nth-of-type(1) {
  background-color: rgb(255, 191, 132);
}

.load .line:nth-of-type(2) {
  background-color: rgb(248, 158, 73);
}

.load .line:nth-of-type(3) {
  background-color: rgb(255, 136, 25);
}

@keyframes loadingAnimate {
  0% {
    transform: translate(0, 0);
  }

  50% {
    transform: translate(0, 1.5rem);
  }

  100% {
    transform: translate(0, 0);
  }
}
.init-enter-active {
  transition: all 0.5s;
}
.init-leave-active {
  transition: all 0.5s;
}
.init-enter,
.init-leave-to {
  opacity: 0;
}
</style>
