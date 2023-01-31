import { execSync, spawnSync } from 'child_process'
import { error, errorBoxed, warning, warningBoxed } from '../color'
import { getConfig } from '../config'
import { isExist, parseAppleScript, readFile } from '../utils'

let isInstallNi = false

function isInstallNiInGlobal (): boolean {
  if (isInstallNi) return isInstallNi
  try {
    execSync('which ni')
    isInstallNi = true
    return true
  } catch {
    isInstallNi = false
  }
  return isInstallNi
}

function run (name: string): void {
  const { tasks } = getConfig()

  const task = tasks[name]
  if (!task) {
    console.log(warningBoxed(warning('当前任务不存在'), { margin: 1 }))
    return
  }

  const cmds: string[] = []

  Object.keys(task).forEach(path => {
    const scripts = task[path]
    const pkgPath = `${path}/package.json`
    if (isExist(pkgPath)) {
      const pkg = JSON.parse(readFile(pkgPath))
      scripts.forEach((script) => {
        if (!Reflect.has(pkg.scripts, script)) {
          return cmds.push(`cd ${path} && ${script}`)
        }
        cmds.push(`cd ${path} && ${isInstallNiInGlobal() ? 'nr' : 'npm run'} ${script}`)
      })
    } else {
      scripts.forEach((script) => {
        cmds.push(`cd ${path} && ${script}`)
      })
    }
  })

  try {
    spawnSync('osascript', ['-e', parseAppleScript(cmds)])
  } catch (e) {
    console.log(errorBoxed(error(String(e))))
  }
}

export default run
