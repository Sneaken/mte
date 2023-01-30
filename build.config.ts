import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    'bin/mte'
  ],
  declaration: true,
  clean: true,
  failOnWarn: false,
  rollup: {
    emitCJS: true
  }
})
