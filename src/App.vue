<template>
  <div id="app" :style="{width:broad}">
     <navi :broad='broad'></navi>
     <statis v-if="router==0" :broad='broad' @toProv="toProv"></statis>
     <query v-if="router==2" :broad='broad'></query>
  </div>
</template>

<script>
import query from './components/query'
import navi from './components/navi'
import statis from './components/statis'
export default {
  name: "App",
  components: {
     statis,
     query,
     navi
  },
  data(){
     return{
        router:0,
        broad:'681px',
     }
  },
  toProv(){

  },
};
</script>

<style>
#app{
   width:auto;
   height:710px;
   background-color: rgba(185, 185, 185, 0.118);
}
body {
  margin: 0;
  font-family: Microsoft YaHei, Arial;
}
.jump:hover {
  cursor: pointer;
  color: #c7e8ff;
}
</style>
