/* eslint no-var: 0, vars-on-top: 0, prefer-template: 0 */

var pkg = require('./package')

function detect(options) {
  var packageJson = pkg.getPackageJson()

  if (
    !options.force &&
    packageJson.devDependencies &&
    packageJson.devDependencies['tipsi-ui-explorer']
  ) {
    return 'has'
  }

  if (
    packageJson.dependencies &&
    packageJson.dependencies['react-native']
  ) {
    return 'yes'
  }

  return 'no'
}

module.exports = detect
