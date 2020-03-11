<template>
  <div class="hello">
    <div class="data-big">
      <div class="data-small">
        <div>较昨日-1944</div>
        <div style="color:#C80017">51428</div>
        <div>现存确诊</div>
      </div>
      <div class="data-small">
        <div>较昨日+882</div>
        <div style="color:#B8741A">4148</div>
        <div>现存疑似</div>
      </div>
      <div class="data-small">
        <div>较昨日-789</div>
        <div style="color:#7B4D12">10968</div>
        <div>现存重症</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
