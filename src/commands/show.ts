
import chalk from 'chalk'
import { getConfig } from '../config'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface showOptions {}

function show (options: showOptions): void {
  const { tasks } = getConfig()

  const names = Object.keys(tasks)

  if (!names.length) {
    console.log(chalk.yellow('当前不存在任务'))
    return
  }

  names.forEach(name => {
    console.log(chalk.magenta(`task: ${name}`))

    const task = tasks[name]
    Object.keys(task).forEach(path => {
      console.log(chalk.cyanBright(`> ${path}:`))
      task[path].forEach(action => {
        console.log(chalk.yellowBright(`>> ${action}`))
      })
    })

    console.log()
  })
}

export default show
