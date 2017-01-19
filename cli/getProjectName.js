/* eslint no-var: 0, vars-on-top: 0, prefer-template: 0 */

var shell = require('shelljs')

function getProjectName() {
  var dirname = shell.ls('-d', 'ios/*.xcodeproj').stdout
  var projectName = dirname && dirname.slice(
    'ios/'.length,
    dirname.length - '.xcodeproj'.length - 1 // eslint-disable-line comma-dangle
  )
  return projectName
}

module.exports = getProjectName
