import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: ['./src/cli'],
  // declaration: true,
  clean: true,
  failOnWarn: false
})
