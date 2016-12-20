// 常规的转换方式
// 使用的文件为demo.csv

var rf = require("fs");
var data = rf.readFileSync("demo.csv", "utf-8");
var dataList = data.split("\n");

// 最后要输出的obj对象
var obj = {};
obj["data"] = [];

// 建立字段名
function buildTitle() {
	var _temp = dataList.splice(0, 1);
	var title = _temp[0].split(",");
	return title;
}

function buildJson() {
	var title = buildTitle();
	var _length = title.length;
	title[_length - 1] = title[_length - 1].split("\r")[0];

	for (var j = 0; j < dataList.length; j++) {
		var _obj = {};

		for (var i = 0; i < _length; i++) {
			if (i == _length - 1) {
				_obj[title[i]] = dataList[j].split(",")[i].split("\r")[0];
			} else {
				_obj[title[i]] = dataList[j].split(",")[i];
			}
		}
		obj["data"].push(_obj);
	}
}

// 输出json格式
function output() {
	// 格式化输出json
	var m = JSON.stringify(obj, null, 4);

	//保存文件 
	rf.writeFile("result2.json", m, function (err) {
		if (err) throw err;
		console.log("Transform Complete"); //文件被保存
	});
}

(function run() {
	buildJson();
	output();
})();