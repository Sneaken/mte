import chalk from 'chalk'
import { getConfig, setConfig } from '../config'

function rm (name: string): void {
  const config = getConfig()

  if (!config.tasks[name]) {
    console.log(chalk.yellow('没有需要删除的任务'))
    return
  }

  Reflect.deleteProperty(config.tasks, name)

  setConfig(config)

  console.log(chalk.red(`已删除任务: ${name}`))
}

export default rm
