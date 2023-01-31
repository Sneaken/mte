import { accessSync, readFileSync } from 'fs'

export function isExist (path: string): boolean {
  try {
    accessSync(path)
    return true
  } catch {
    return false
  }
}

export function readFile (path: string, defaultValue: string = '{}'): string {
  try {
    return readFileSync(path, { encoding: 'utf-8' })
  } catch {
    return defaultValue
  }
}

const tellBody = (arr: string[]): any => [
  `write text "${arr[0]}"`,
  ...(() => arr.slice(1).length ? split(arr.slice(1)) : [])()
]

const split = (obj: string[]): string[] => [
  'tell (split vertically with default profile)',
  tellBody(obj),
  'end tell'
]

const indent = (arr: Array<string | string[]>, prefix = 0): string => arr.map((row: string | string[]) => {
  if (Array.isArray(row)) return indent(row, prefix + 2)
  const pre: string = prefix ? Array.from({ length: prefix }).fill('').join(' ') : ''
  return pre + row
}).join('\n')

export const parseAppleScript = (obj: string[]): string => `
${indent([
  'tell application "iTerm2"',
  [
    'activate',
    'tell current session of current window',
    tellBody(obj),
    'end tell'
  ],
  'end tell'
])}`
