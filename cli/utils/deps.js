import { spawnSync } from 'child_process'

export function hasYarn() {
  const result = spawnSync('yarn', ['--version'], { silent: true })

  return result.status === 0
}

export function installDeps(options) {
  let result

  if (!options.useNpm && hasYarn()) {
    result = spawnSync('yarn', { stdio: 'inherit' })
  } else {
    result = spawnSync('npm', ['install'], { stdio: 'inherit' })
  }

  return result.status === 0
}
