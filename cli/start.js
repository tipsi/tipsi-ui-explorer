import shell from 'shelljs'

export default function start(options) {
  shell.exec([
    'node node_modules/react-native/local-cli/cli.js start',
    `--projectRoots ${options.configDir}`,
    `--root ${options.projectDir}`,
    options.host && `--host ${options.host}`,
    options.port && `--port ${options.port}`,
  ].join(' '), { async: true })
}
