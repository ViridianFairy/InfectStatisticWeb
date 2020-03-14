<template>
   <!-- 滑动条组件 -->
   <div class="sliderbar">
      <div style="position: relative;border-radius:10px">
         <input
            id="input1"
            type="range"
            @input="barChange($event)"
				@mouseup="barChange($event,true)"
            min="1"
            max="100"
            defaultValue="0"
            v-model="barValue"
         />
         <div :id="id" class="div1"></div>
         <!-- 此元素用于解决滑动条滑动后点击彩色位置没有反应的问题 -->
         <input
            type="range"
            class="input2"
            v-model="barValue"
            min="1"
            max="100"
            @input="input2Change"
         />
      </div>
      <input class="textinput" type="text" v-model="textValue" @input="textchange" disabled/>
   </div>
</template>

<script >
export default {
   // 此id值是为了实现组件在同页面复用
   props: {
      id: {
         type: [String, Number],
         default: "id1"
      },
      // 父组件传过来初始值
      value: {
         type: [Number],
         default: 99
      }
   },

   name: "",
   data() {
      return {
         textValue: 0,
         barValue: 0,
         barInput: null,
			max: null,
			calen:[],
      };
   },
	created(){
		var MONTH = [-1,31,29,10];
		var m,d,i;
		for(m=2;m<=3;m++){
			for(m==2?d=14:d=1;d<=MONTH[m];d++){
				var strd = d
				if(strd<=9) strd = '0' + strd
				this.calen.push(`2020年0${m}月${strd}日`)
			}
		}
	},
   mounted() {
      this.initSliderBar();
   },
   components: {},
   methods: {
		getText(val, up){
			var pos = parseInt((this.calen.length-1)*(0.01*val))
			val = this.calen[pos]
			if(up) this.$emit('allDateChange',val.replace(/年|月/g,'-').replace('日',''))
			return val
		},
      // 初始化滑动条进度
      initSliderBar() {
         this.barValue = this.value;
         this.textValue = this.getText(this.value);
         this.barInput = document.querySelector("#input1");
         //console.log(this.barInput.Element);
         this.max = this.barInput.max;
         this.setTrack(this.value, this.max);
      },
      // 解决点击彩色位置滑动条没反应
      input2Change(e) {
         //   console.log(e);
         let value = e.target.value,
            // input的最大值
            max = e.target.max;
         this.textValue = this.getText(value, true);
         this.setTrack(value, max);
      },
      // 滑动条事件
      barChange(e, up) {
         //   console.log(e);
         let value = e.target.value,
            // input的最大值
            max = e.target.max;
         this.textValue = this.getText(value, up);
         this.setTrack(value, max);
      },
      // 输入框input事件
      textchange(e) {
         let value = e.target.value;

         if (value) {
            this.barValue = value;
            this.setTrack(value, this.max);
         }
      },
      // 设置滑块划过部分颜色
      setTrack(value, max) {
         let div1 = document.querySelector(`#${this.id}`);
         // input的实际宽度
         let width = this.barInput.offsetWidth;
         let number = max / width;
         // 填充色需要减去的像素可以进行微调,有时候会有几个像素的偏差
         let number2 = (value / width) * ((width / max) * 10) - 1;
         // 根据value的值动态改变div的宽度,达到滑动滑块填充颜色的效果
         div1.style.width = value / number - number2 + "px";
         // console.log("div-width", div1.style.width);
         // console.log("value", value);
      }
	},
	watch:{
		// textValue(val){
			
		// }
	}
};
</script>

<style scoped>
.sliderbar {
   position: relative;
   width: 200px;
   padding-top: 6px;
}
input[type="range"] {
   -webkit-appearance: none;
   width: 200px;
   border-radius: 10px;
}

input[type="range"]::-webkit-slider-thumb {
   -webkit-appearance: none;
}
/* 设置轨道样式 */
input[type="range"]::-webkit-slider-runnable-track {
   height: 3px;
   border-radius: 5px; /*将轨道设为圆角的*/
   /* box-shadow: 0 1px 1px #def3f8, inset 0 0.125em 0.125em #0d1112; 轨道内置阴影效果 */
}
input[type="range"]:focus {
   outline: none;
}
input[type="range"]::-webkit-slider-thumb {
   -webkit-appearance: none;
   position: relative;
   z-index: 10;
   height: 14px;
   width: 14px;
   margin-top: -3.5px; 
   background: #c9d5f5;
	transition: 0.2s all;
   border-radius: 50%; 
   box-shadow: 0 0.125em 0.125em #a9a9a9;
}
input[type="range"]::-webkit-slider-thumb:hover {
   background: rgb(165, 187, 252);
}
input[type="range"]::-webkit-slider-thumb:active {
   background: rgb(133, 150, 192);
}
.div1 {
   height: 6px;
   border-radius: 30px;
   background: rgb(222, 228, 243);
   position: absolute;
   top: 0;
   left: 0;
}
#input1 {
   position: absolute;
   margin: 0;
   left: 0;
   top: 0;
}
.input2 {
   position: absolute;
   left: -2px;
   top: -2px;
   opacity: 0;
}

.textinput {
   width: 130px;
   height: 15px;
   background: rgba(150, 145, 145, 0);
   color: #ddd;
   position: absolute;
   top: 1px;
   right: 0;
   border: none;
	transform: translateX(137px);
}
</style>
