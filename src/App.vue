<template>
  <div id="app" :style="{width:broad}">
    <navi :broad="broad" :banner="banner" :router="router" @toAll="toAllOn"></navi>
    <statis v-if="router==0 || router==1" :router="router" :broad="broad" @toProv="toProvOn"></statis>
    <query v-if="router==2" :broad="broad"></query>
  </div>
</template>

<script>
import query from "./components/query";
import navi from "./components/navi";
import statis from "./components/statis";
export default {
  name: "App",
  components: {
    statis,
    query,
    navi
  },
  computed: {
    getBanner() {
      return this.bannerStr[this.router];
    }
  },
  data() {
    return {
      router: 0,
      broad: "681px",
      bannerStr: ["全国实时数据", "实时数据"],
      banner: ""
    };
  },
  mounted() {
    this.banner = this.getBanner;
  },
  methods: {
    toProvOn(data) {
      this.router = 1;
      this.banner = data.name + this.getBanner;
    },
    toAllOn(data) {
      this.router = 0;
      this.banner = this.getBanner;
    }
  }
};
</script>

<style>
#app {
  width: auto;
  height: 710px;
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
.init-enter-active {
  transition: all 0.2s;
}
.init-leave-active {
  transition: all 0.2s;
}
.init-enter,
.init-leave {
  opacity: 0;
}
</style>
