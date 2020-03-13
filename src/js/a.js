const fs = require('fs')
var Data = fs.readFileSync('./test.json', 'utf-8')
Data = JSON.parse(Data)
var t = ''
var calen = []
var MONTH = [-1, 31, 29, 8]
var m, d, i
for (m = 1; m <= 3; m++) {
	for (m == 1 ? (d = 23) : (d = 1); d <= MONTH[m]; d++) {
		var strd = d
		if (strd <= 9) strd = '0' + strd
		calen.push(`2020-0${m}-${strd}`)
	}
}
var cnt = 0
function gotton(arr, name) {
	return true
	var found = 0
	arr.forEach(v=>{
		if(v['name'] == name && found==0){
			found=1
		}
	})
	if(found==1) return false
	return true
}
calen.forEach((date)=>{
	cnt = 0
	var obj = {
		data: [],
		statis: {
			curInj: [],
			inj: [],
			dead: [],
			sus: []
		}
	}
	Data.forEach(v => {
		if (v.date == date && gotton(obj.data,v.name)) {
			cnt++
			obj.data.push(v)
		}
	})
	console.log(date + '  '+cnt + '条')
	obj.data.forEach(v=>{
		console.log(v.name)
	})
})


