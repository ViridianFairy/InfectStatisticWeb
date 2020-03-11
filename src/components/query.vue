<template>
  <div id="wrap1">
    <div id="wrap2">
        <div class="query">
            <img class="icon" src="../assets/train.png" />
            <div class="text-wrapper">
               <div>查询您乘坐的火车</div>
               <div>输入日期/车次，查看该车次是否<br>有肺炎患者同行。</div>
            </div>
        </div>
        <div class="query">
            <img class="icon" src="../assets/plane.png" />
            <div class="text-wrapper">
               <div>查询您乘坐的飞机</div>
               <div>输入日期/航班，查看该航班是否<br>有肺炎患者同行。</div>
            </div>
        </div>
        <div class="query">
            <img class="icon" src="../assets/city.png" />
            <div class="text-wrapper">
               <div>所在城市</div>
               <div>输入城市，查看该城市是否有火<br>车、航班停靠。</div>
            </div>
        </div>

        <div>
            <img src="../assets/../assets/pic.jpg" id="pic"/>
        </div>
    </div>
    </div>
</template>

<script>
export default {
  name: "query",
  props: {
    broad: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


html,body{
    margin: 0;
    padding: 0;
}

#wrap1{
    display: flex;
    flex-direction: column;
    margin: 10px auto;
    width: auto;
    /* width:381px; */
}

#nav-bar{
    height: 60px;
}

#button img{
    width: 12px;
    height: 18px;
    float: left;
    margin: 10px;
}

#button div{
    float: left;
    height: 30px;
    padding: 0;
    margin: 7px 24px 10px -5px;
}

#line1{
    clear: both;
    height: 7px;
    background-color: rgba(242, 242, 242, 1);
}
#title{
    height: 50px;
}

#title div:nth-child(1){
    float: left;
    width: 5px;
    height: 19px;
    background-color: rgba(65, 107, 221, 1);
    margin-bottom: 0px;
    margin-top: 17px;
    margin-left: 20px;
}

#title div:nth-child(2){
    float: left;
    font-weight:bold;
    font-size:19px;
    height: 40px;
    margin: 13px 20px 0px 7px;

}

#title div:nth-child(3){
    clear: both;
    height: 2px;
    background-color: rgba(242, 242, 242, 1);
}

#wrap2{
   display: flex;
   flex-direction: column;
   margin: 10px auto;
   width: auto;
   /* width:366px; */
}
#wrap2 .query{
   margin: 8px 0;
   /* width: 100%; */
   height: 112px;
   border-radius: 5px;
   display: flex;
   justify-content:space-around;
   align-items: center;
}
#wrap2 .query:nth-child(1){
   background: rgba(165, 199, 108, 0.968627450980392);
}
#wrap2 .query:nth-child(2){
   background-color: rgba(108, 179, 199, 1);
}
#wrap2 .query:nth-child(3){
   background-color: rgba(199, 108, 108, 1);
}
.icon{
   width: 60px;
   height: 60px;
}
.text-wrapper{
   display: flex;
   flex-direction: column;
}
.text-wrapper div{
   display: inline-block;
   color:white;
}
.text-wrapper div:nth-child(1){
   margin-top: -5px;
   display: inline-block;
   font-size: 20px;
   font-weight: bold;
}
.text-wrapper div:nth-child(2){
   margin-top: 5px;
}


#pic{
    margin: 10px auto;
    display: flex;
    align-items: center;
    height: 228px;
    border-radius: 5px;
    border: 0px none;
}



</style>
