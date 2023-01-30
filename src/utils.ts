import { accessSync } from 'fs'

export function isExist (path: string): boolean {
  try {
    accessSync(path)
    return true
  } catch {
    return false
  }
}
