/* eslint no-var: 0, vars-on-top: 0, prefer-template: 0 */

var fs = require('fs')
var path = require('path')

exports.getPackageJson = function getPackageJson() {
  var packageJsonPath = path.resolve('package.json')
  if (!fs.existsSync(packageJsonPath)) {
    return false
  }

  var jsonContent = fs.readFileSync(packageJsonPath, 'utf8')
  return JSON.parse(jsonContent)
}

exports.writePackageJson = function writePackageJson(packageJson) {
  var content = JSON.stringify(packageJson, null, 2) + '\n'
  var packageJsonPath = path.resolve('package.json')

  fs.writeFileSync(packageJsonPath, content, 'utf8')
}
