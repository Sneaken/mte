import { dir, info, infoBoxed, script, title, warning, warningBoxed } from '../color'
import { getConfig } from '../config'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface lsOptions {
}

function ls (names: string[], options: lsOptions): void {
  const { tasks } = getConfig()

  names.forEach(name => {
    const task = tasks[name]

    if (!task) {
      console.log(warningBoxed(warning(`不存在任务: ${name}`), { margin: 1 }))
      return
    }

    console.log(title(`当前的任务: ${name}`))

    Object.keys(task).forEach(path => {
      const lines = [dir(`> ${path}:`)]
      task[path].forEach(s => {
        lines.push(script(`>> ${s}`))
      })
      console.log(infoBoxed(info(lines.join('\n'))))
    })
  })
}

export default ls
