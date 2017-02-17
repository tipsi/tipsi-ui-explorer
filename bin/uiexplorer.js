#!/usr/bin/env node

require('babel-register')({
  presets: ['es2015', 'stage-0'],
  ignore: /node_modules\/(?!tipsi-ui-explorer)/,
})

require('../cli')
