import chalk from 'chalk'
import { readFileSync, writeFileSync } from 'fs'
import { homedir } from 'os'
import { isExist } from './utils'

interface Config {
  tasks: Record<string, any>
}

const CONFIG_PATH = `${homedir()}/.mterc`

const DEFAULT_CONFIG: Config = {
  tasks: {}
}

export function getConfig (): Config {
  if (!isExist(CONFIG_PATH)) return DEFAULT_CONFIG
  const originConfig = readFileSync(CONFIG_PATH, { encoding: 'utf-8' })
  try {
    const config = JSON.parse(originConfig)
    validateConfig(config)
    return config
  } catch {
    // 配置文件格式存在问题
    return DEFAULT_CONFIG
  }
}
export function setConfig (config: Config = DEFAULT_CONFIG): void {
  try {
    writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2), { encoding: 'utf-8' })
  } catch (error) {
    chalk.bgRedBright(error)
    chalk.red('please try again')
  }
}

function validateConfig (config: Config): void {
  if (!config.tasks) throw new Error('config is illegal')
}
