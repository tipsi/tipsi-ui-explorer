/* eslint no-var: 0, vars-on-top: 0, dot-notation: 0, no-console: 0 */

var path = require('path')
var shell = require('shelljs')
var mergeDirs = require('merge-dirs').default
var pkg = require('./package')
var detectProject = require('./detectProject')
var getProjectName = require('./getProjectName')

function init(options) {
  var result = detectProject(options)

  if (result === 'has') {
    console.log('UI Eplorer already exist in you project')
    return
  }

  if (result === 'no') {
    console.log('Can not find React Native project in current directory')
    return
  }

  // copy all files from the template directory to project directory
  mergeDirs(path.resolve(__dirname, '../template/'), '.', 'overwrite')

  var projectName = getProjectName()

  if (projectName) {
    shell.sed('-i', '%PROJECT_NAME%', projectName, 'uiexplorer/index.ios.js')
    shell.sed('-i', '%PROJECT_NAME%', projectName, 'uiexplorer/index.android.js')
  }

  var packageJson = pkg.getPackageJson()

  packageJson.devDependencies = packageJson.devDependencies || {}
  packageJson.devDependencies['tipsi-ui-explorer'] = '../' // require('../package').version

  packageJson.scripts = packageJson.scripts || {}
  packageJson.scripts['uiexplorer'] = 'uiexplorer'

  pkg.writePackageJson(packageJson)
}

module.exports = init
