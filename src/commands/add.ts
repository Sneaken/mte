import { cwd } from 'process'
import { info, infoBoxed, warning, warningBoxed } from '../color'
import { getConfig, setConfig } from '../config'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AddOptions {
}

function add (name: string, task: string, options: AddOptions): void {
  // 当前目录
  const currentPath = cwd()
  const config = getConfig()

  const tasks = config.tasks

  if (!tasks[name]?.[currentPath]) {
    tasks[name] = { ...tasks[name], [currentPath]: [task] }
  }

  if (tasks[name][currentPath].length > 1 && tasks[name][currentPath].includes(task)) {
    console.log(warningBoxed(warning('该脚本已存在, 请勿重复添加'), { margin: 1 }))
    return
  }

  const lines = [
    info(`task: ${name}`),
    info(`add action: ${task}`),
    info(`on: ${currentPath}`)
  ]
  console.log(infoBoxed(lines.join('\n'), { margin: 1 }))

  setConfig(config)
}

export default add
