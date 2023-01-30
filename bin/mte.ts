#!/usr/bin/env node
import { program } from 'commander'
import { name, version } from '../package.json'

program
  .name(name)
  .version(version)

program
  .command('add <name> <task>')
  .action((name, task, options) => {
    // mte add name dev
    // cd path && 执行任何事情
    import('../src/commands/add').then(({ default: add }) => {
      add(name, task, options)
    }).catch((error) => {
      console.error(error)
    })
  })

program.parse(process.argv)
