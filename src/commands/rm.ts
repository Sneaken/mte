import { success, successBoxed, warning, warningBoxed } from '../color'
import { getConfig, setConfig } from '../config'

function rm (name: string): void {
  const config = getConfig()

  if (!config.tasks[name]) {
    console.log(warningBoxed(warning('没有需要删除的任务'), { margin: 1 }))
    return
  }

  Reflect.deleteProperty(config.tasks, name)

  setConfig(config)

  console.log(successBoxed(success(`已删除任务: ${name}`)))
}

export default rm
