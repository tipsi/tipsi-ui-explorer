/* eslint-disable no-console */
import { cyan, yellow, red, green } from 'chalk'

class Logger {
  pad = (message, symbol = ' ') => {
    const [first, ...lines] = message.split('\n')
    const synbolLine = `${symbol} ${first}`
    const paddedLines = lines.map(
      line => `  ${line}`
    )
    const nextMessage = [
      synbolLine,
      ...paddedLines,
    ].join('\n')
    return nextMessage
  }

  log = (message) => {
    console.log(this.pad(message))
  }

  info = (message) => {
    console.log(
      this.pad(message, cyan('-'))
    )
  }

  warn = (message) => {
    console.log(
      yellow(this.pad(message, '•'))
    )
  }

  error = (message) => {
    console.log(
      red(this.pad(message, '✖'))
    )
  }

  success = (message) => {
    console.log(
      green(this.pad(message, '✓'))
    )
  }
}

export default new Logger()
