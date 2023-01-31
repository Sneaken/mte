import chalk from 'chalk'
import { getConfig } from '../config'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface lsOptions {}

function ls (names: string[], options: lsOptions): void {
  const { tasks } = getConfig()

  names.forEach(name => {
    const task = tasks[name]

    if (!task) {
      console.log(chalk.red(`不存在任务: ${name}`))
      console.log()
      return
    }

    Object.keys(task).forEach(path => {
      console.log(chalk.cyanBright(`> ${path}:`))
      task[path].forEach(action => {
        console.log(chalk.yellowBright(`>> ${action}`))
      })
    })
    console.log()
  })
}

export default ls
