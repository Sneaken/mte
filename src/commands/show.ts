import { dir, info, infoBoxed, script, title, warning, warningBoxed } from '../color'
import { getConfig } from '../config'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface showOptions {}

function show (options: showOptions): void {
  const { tasks } = getConfig()

  const names = Object.keys(tasks)

  if (!names.length) {
    console.log(warningBoxed(warning('当前不存在任务'), { margin: 1 }))
    return
  }

  names.forEach(name => {
    const lines = [title(`task: ${name}`)]

    const task = tasks[name]
    Object.keys(task).forEach(path => {
      lines.push(dir(`> ${path}:`))
      task[path].forEach(s => {
        lines.push(script(`>> ${s}`))
      })
    })

    console.log(infoBoxed(info(lines.join('\n'))))
  })
}

export default show
