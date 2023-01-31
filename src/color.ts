import boxen, { type Options } from 'boxen'
import chalk from 'chalk'

export function warning (text: string): string {
  return chalk.hex('#faad14')(text)
}

export function warningBoxed (text: string, options?: Options): string {
  return boxen(text, {
    padding: 1,
    ...options,
    borderColor: '#ffe58f'
  })
}

export function error (text: string): string {
  return chalk.hex('#ff4d4f')(text)
}

export function errorBoxed (text: string, options?: Options): string {
  return boxen(text, {
    padding: 1,
    ...options,
    borderColor: '#ffa39e'
  })
}

export function success (text: string): string {
  return chalk.hex('#52c41a')(text)
}

export function successBoxed (text: string, options?: Options): string {
  return boxen(text, {
    padding: 1,
    ...options,
    borderColor: '#b7eb8f'
  })
}

export function info (text: string): string {
  return chalk.hex('#13c2c2')(text)
}

export function infoBoxed (text: string, options?: Options): string {
  return boxen(text, {
    padding: 1,
    ...options,
    borderColor: '#87e8de'
  })
}

export function title (text: string): string {
  return chalk.magenta(text)
}

export function dir (text: string): string {
  return chalk.cyanBright(text)
}

export function script (text: string): string {
  return chalk.yellowBright(text)
}
