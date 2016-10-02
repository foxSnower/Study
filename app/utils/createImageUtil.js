var fs = require('fs')


var content = ''

// 读取 image/big 目录下的所有文件
fs.readdir('../image/car/big/', function (err, files) {
  if(err) throw err;
  //console.log(files)
  var keyAndValueAry = files.map(function (file) {
    //
    var name = file.split('.')[0]
    // 有文件名后
    return '"' + name + '" :require("../image/car/big/' + file + '")'
  })

  var content = 'module.exports = {';
  content += keyAndValueAry.join(',')
  content += '};'

  // 生成 js 文件
  fs.writeFileSync('imageUtil.js', content, 'utf8')
})
