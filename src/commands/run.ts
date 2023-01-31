import { execSync, spawnSync } from 'child_process'
import chalk from 'chalk'
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
    console.log(chalk.red('当前任务不存在'))
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
    spawnSync('osascript', ['-ss', '-e', parseAppleScript(cmds)])
  } catch (e) {
    console.log(chalk.red(e))
  }
}

export default run
