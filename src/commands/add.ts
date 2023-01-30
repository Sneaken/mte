import { getConfig, setConfig } from '../config'
import { cwd } from 'process'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AddOptions {
}

function add (name: string, task: string, options: AddOptions): void {
  // 当前目录
  const currentPath = cwd()
  const config = getConfig()

  const tasks = config.tasks

  if (!tasks[name]) {
    tasks[name] = { ...tasks[name], [currentPath]: [task] }
  }

  if (!tasks[name][currentPath].includes(task)) {
    tasks[name][currentPath].push(task)
  }

  setConfig(config)
}

export default add
