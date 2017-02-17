import path from 'path'
import shell from 'shelljs'
import { bold } from 'chalk'
import mergeDirs from 'merge-dirs'
import pkg from '../package'
import logger from './utils/logger'
import { installDeps, hasYarn } from './utils/deps'
import { getPackageJson, writePackageJson } from './utils/package'
import { detectProject, getProjectName, types } from './utils/project'

export default function init(options) {
  logger.info('Adding UIExplorer support to your React Native app:')

  const result = detectProject(options)

  if (result === types.EXIST) {
    logger.warn(
      'UI Explorer already exist in your project. Initialization is skipped.\n' +
      `Use ${bold('--force')} key with ${bold('--init')} to forcely add UI Explorer.`
    )
    return
  }

  if (result === types.UNDETECTED) {
    logger.error(
      'Can not find React Native project in current directory.\n' +
      'Please, initialize UIExplorer in your React Native project.'
    )
    return
  }

  // Copy all files from the template directory to project directory
  mergeDirs(path.resolve(__dirname, '../template/'), '.', 'overwrite')

  const projectName = getProjectName()

  if (projectName) {
    logger.success(`Recognized project name: ${projectName}`)
    shell.sed('-i', '%PROJECT_NAME%', projectName, 'uiexplorer/index.ios.js')
    shell.sed('-i', '%PROJECT_NAME%', projectName, 'uiexplorer/index.android.js')
  } else {
    logger.warn(
      'We could not automatically detect the name of your project.\n' +
      `Please replce ${bold('%PROJECT_NAME%')} with your project name\n` +
      `in ${bold('uiexplorer/index.ios.js')} ` +
      `and ${bold('uiexplorer/index.android.js')} files.`
    )
  }

  const packageJson = getPackageJson()

  packageJson.devDependencies = packageJson.devDependencies || {}
  packageJson.devDependencies['tipsi-ui-explorer'] = 'file:../' // pkg.version

  packageJson.scripts = packageJson.scripts || {}
  packageJson.scripts.uiexplorer = 'uiexplorer'

  writePackageJson(packageJson)

  logger.info('Installing dependencies:')

  if (installDeps(options)) {
    logger.success('Dependencies are installed')
  } else {
    logger.error('An error occurred while installing dependencies.')
  }

  const runner = (!options.useNpm && hasYarn()) ? 'yarn' : 'npm'

  logger.info(
    `${bold('To run your UIExplorer:')}\n\n` +
    '  Run UI Explorer server\n' +
    `  ${bold(`${runner} run uiexplorer`)}\n\n` +
    '  Also start your application\n' +
    `  ${bold('react-native run-ios')}\n` +
    '  - or -\n' +
    `  ${bold('react-native run-android')}\n`
  )
}
