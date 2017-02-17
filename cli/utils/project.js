import shell from 'shelljs'
import { getPackageJson } from './package'

export const types = {
  UNDETECTED: 'UNDETECTED',
  EXIST: 'EXIST',
  EMPTY: 'EMPTY',
}

export function detectProject(options) {
  const packageJson = getPackageJson()

  if (!packageJson) {
    return types.UNDETECTED
  }

  if (
    !options.force &&
    packageJson.devDependencies &&
    packageJson.devDependencies['tipsi-ui-explorer']
  ) {
    return types.EXIST
  }

  if (
    packageJson.dependencies &&
    packageJson.dependencies['react-native']
  ) {
    return types.EMPTY
  }

  return types.UNDETECTED
}

export function getProjectName() {
  const dirname = shell.ls('-d', 'ios/*.xcodeproj').stdout
  const projectName = dirname && dirname.slice(
    'ios/'.length,
    dirname.length - '.xcodeproj'.length - 1
  )
  return projectName
}
