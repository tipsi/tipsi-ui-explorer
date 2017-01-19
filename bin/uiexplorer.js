#!/usr/bin/env node

/* eslint no-console: 0, no-var: 0, vars-on-top: 0, prefer-template: 0 */
var pkg = require('../package.json')
var path = require('path')
var shell = require('shelljs')
var cfonts = require('cfonts')
var program = require('commander')
var init = require('../cli/init')

program
  .version(pkg.version)
  .option('-h, --host <host>', 'host to listen on')
  .option('-p, --port <port>', 'port to listen on')
  .option('-c, --config-dir [dir-name]', 'uiexplorer config directory')
  .option('-i, --init', 'init uiexplorer in project')
  .option('-f, --force', 'force init')
  .parse(process.argv)


cfonts.say('UI Explorer', {
  font: 'simple3d',
  colors: ['candy'],
})

var projectDir = path.resolve()
var configDir = path.resolve(program.configDir || './uiexplorer')

if (program.init) {
  return init({ force: program.force })
}

shell.exec([
  'node node_modules/react-native/local-cli/cli.js start',
  '--projectRoots ' + configDir,
  '--root ' + projectDir,
  program.host ? '--host ' + program.host : '',
  program.port ? '--port ' + program.port : '',
].join(' '), { async: true })
