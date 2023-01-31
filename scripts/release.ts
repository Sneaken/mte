import minimist from 'minimist'
import fs from 'fs'
import path from 'path'
import chalk from 'chalk'
import semver from 'semver'
import { version as currentVersion } from '../package.json'
import { prompt } from 'enquirer'
import { spawnSync, type SpawnSyncReturns } from 'child_process'

const args = minimist(process.argv.slice(2))

const preId = args.preid || (semver.prerelease(currentVersion) && semver.prerelease(currentVersion)?.[0])

const versionIncrements = [
  'patch',
  'minor',
  'major',
  ...(preId ? ['prepatch', 'preminor', 'premajor', 'prerelease'] : [])
]

const inc = (i: any): string | null => semver.inc(currentVersion, i, preId)
const run = (bin: string, args: string[], opts = {}): SpawnSyncReturns<Buffer> => spawnSync(bin, args, { stdio: 'inherit', ...opts })
const step = (msg: string): void => { console.log(chalk.cyan(msg)) }

async function main (): Promise<void> {
  let targetVersion: string = args._[0]

  if (!targetVersion) {
    // no explicit version, offer suggestions
    const { release } = await prompt<{ release: string }>({
      type: 'select',
      name: 'release',
      message: 'Select release type',
      choices: versionIncrements.map((i) => `${i} (${inc(i) as string})`).concat(['custom'])
    })

    if (release === 'custom') {
      targetVersion = (
        await prompt<{ version: string }>({
          type: 'input',
          name: 'version',
          message: 'Input custom version',
          initial: currentVersion
        })
      ).version
    } else {
      targetVersion = release?.match(/\((.*)\)/)?.[1] as string
    }
  }

  if (!semver.valid(targetVersion)) {
    throw new Error(`invalid target version: ${targetVersion}`)
  }

  const { yes } = await prompt<{ yes: boolean }>({
    type: 'confirm',
    name: 'yes',
    message: `Releasing v${targetVersion}. Confirm?`
  })

  if (!yes) {
    return
  }

  step('\nUpdating package.json version')
  updateVersions(targetVersion)

  step('\nBuilding ....')

  run('pnpm', ['build'])

  // generate changelog
  run('pnpm', ['changelog'])

  const { stdout } = run('git', ['diff'], { stdio: 'pipe' })
  if (stdout) {
    step('\nCommitting changes...')
    run('git', ['add', '-A'])
    run('git', ['commit', '-m', `release: v${targetVersion}`])
  } else {
    console.log('No changes to commit.')
  }

  // push to GitHub
  step('\nPushing to GitHub...')
  run('git', ['tag', `v${targetVersion}`])
  run('git', ['push', 'origin', `refs/tags/v${targetVersion}`])
  run('git', ['push'])

  console.log()
}

function updateVersions (version: string): void {
  updatePackage(path.resolve(__dirname, '..'), version)
}

function updatePackage (pkgRoot: string, version: any): void {
  const pkgPath = path.resolve(pkgRoot, 'package.json')
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
  pkg.version = version
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n')
}

main().catch((err) => {
  console.error(err)
})
