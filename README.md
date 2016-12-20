# ExcelToJsonTool
A simple tool to transform excel file to Json file


### Start

Change your input file and output file name in common.js.

```javascript
//input file name
var data = rf.readFileSync("demo.csv", "utf-8");

//output file name

rf.writeFile("result2.json", m, function (err) {
    if (err) throw err;
    console.log("Transform Complete"); //文件被保存
});

```

Use command node common.js to *Start Transform*.
