// excel文件转换为json
var rf = require("fs");
var data = rf.readFileSync("data.csv", "utf-8");
var dataList = data.split('\n');
// 去掉开始的无用部分
dataList.splice(0, 4);
// 要输出的obj
var obj = {};
// 省份数组
obj["province"] = [];
obj["code"] = [];

var city = [];

function buildCityList() {
    var _templist = [];

    for (var i = 0; i < dataList.length; i++) {
        var list = dataList[i].split(",");
        //省份
        _templist.push(list[4]);
        obj["code"].push(list[1])


    }
    return clearRepeat(_templist);
}

function clearRepeat(list) {
    var clearList = [];
    var _length = list.length;

    for (var i = 0; i < _length; i++) {
        var m = clearList.indexOf(list[i]);
        if (m == -1) {
            clearList.push(list[i])
        }
    }
    return clearList;
}

function madeCityObj(provinceList) {
    for (var j = 0; j < provinceList.length; j++) {
        var provinceObj = {};
        provinceObj["name"] = provinceList[j];
        provinceObj["city"] = [];
        for (var i = 0; i < dataList.length; i++) {
            var list = dataList[i].split(",");
            var dealerObj = {};
            if (provinceObj["name"] == list[4]) {
                dealerObj["name"] = list[5].split("\r")[0];
                dealerObj["dealer"]  = {};
                dealerObj["dealer"]["name"] = list[2];
                dealerObj["dealer"]["value"] = list[0];
                provinceObj["city"].push(dealerObj);
            }
        }

        obj["province"].push(provinceObj);
    }
}

function buildJson() {
    var provinceList = buildCityList();
    madeCityObj(provinceList);


    console.log(provinceList);
}

function output() {
    // // 格式化输出json
    // var m = JSON.stringify({ a: { b: { c: { d: [1, 2, 3] } } } }, null, 4);
    var m = JSON.stringify(obj, null, 4);

    // //保存文件 
    rf.writeFile("result.json", m, function (err) {
        if (err) throw err;
        console.log("File Saved !"); //文件被保存
    });
}

// 程序运行
(function srart() {
    buildJson();
    output();
})();
