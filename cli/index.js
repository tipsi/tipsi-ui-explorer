import path from 'path'
import cfonts from 'cfonts'
import program from 'commander'
import init from './init'
import start from './start'
import pkg from '../package.json'

program
  .version(pkg.version)
  .option('-h, --host <host>', 'host to listen on', '')
  .option('-p, --port <port>', 'port to listen on', '')
  .option('-c, --config-dir [dir-name]', 'uiexplorer config directory')
  .option('-i, --init', 'init uiexplorer in project')
  .option('-f, --force', 'force init')
  .option('-N --use-npm', 'use npm to install deps')
  .parse(process.argv)

cfonts.say('UI Explorer', {
  font: 'simple3d',
  colors: ['candy'],
})

const projectDir = path.resolve()
const configDir = path.resolve(program.configDir || './uiexplorer')

if (program.init) {
  init({
    force: program.force,
    useNpm: program.useNpm,
  })
} else {
  start({
    configDir,
    projectDir,
    host: program.host,
    port: program.port,
  })
}
