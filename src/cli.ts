#!/usr/bin/env node
import { program } from 'commander'
import { name, version } from '../package.json'

program
  .name(name)
  .version(version)

program
  .command('add <name> <task>')
  .description('添加脚本到任务队列')
  .action((name, task, options) => {
    import('./commands/add').then(({ default: add }) => {
      add(name, task, options)
    }).catch((error) => {
      console.error(error)
    })
  })

program
  .command('ls <names...>')
  .description('查看指定任务下存在的脚本')
  .action((names, options) => {
    import('./commands/ls').then(({ default: ls }) => {
      ls(names, options)
    }).catch((error) => {
      console.error(error)
    })
  })

program
  .command('show')
  .description('查看所有任务下的脚本')
  .action((names, options) => {
    import('./commands/show').then(({ default: show }) => {
      show(options)
    }).catch((error) => {
      console.error(error)
    })
  })

program.parse(process.argv)
