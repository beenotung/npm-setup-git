import { accessSync, readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

function main() {
  setupPackage()
  setupGitIgnore()
}

function getGitConfigFile() {
  let file = join('.git', 'config')
  try {
    accessSync(file)
  } catch (error) {
    console.error('Failed to access', file)
    console.error('Is this a git repo?')
    process.exit(1)
  }
  return file
}

function parseOriginUrl(text: string) {
  let lines = text.split('\n').map(line => line.trim())
  let index = lines.indexOf('[remote "origin"]')
  if (index === -1) {
    console.error('Failed to find remote origin')
    console.error('Is it set in this git repo?')
    process.exit(1)
  }
  let line = lines[index + 1]
  let url = line.match(/url = (.*)/)?.[1]
  if (!url) {
    console.error('Failed to find the git url')
    console.error('Is it set in this git repo?')
    process.exit(1)
  }
  if (url.startsWith('git@')) {
    url = url.replace(':', '/').replace('git@', 'https://')
  }
  url = url.replace(/\.git$/, '')
  return url
}

function setupPackage() {
  let configFile = getGitConfigFile()
  let text = readFileSync(configFile).toString()
  let repoUrl = parseOriginUrl(text)

  let packageFile = 'package.json'
  text = readFileSync(packageFile).toString()

  let pkg = JSON.parse(text)
  pkg.repository = {
    type: 'git',
    url: `git+${repoUrl}.git`,
  }
  pkg.bugs = {
    url: `${repoUrl}/issues`,
  }
  pkg.homepage = `${repoUrl}#readme`

  text = JSON.stringify(pkg, null, 2)
  writeFileSync(packageFile, text)
}

function setupGitIgnore() {
  let file = '.gitignore'

  let text = ''
  try {
    text = readFileSync(file).toString()
  } catch (error) {
    // file not exist?
  }

  let lines = text
    .trim()
    .split('\n')
    .map(line => line.trim())

  let patterns = [
    'node_modules/',
    '*-lock.json',
    '*-lock.yaml',
    '*.lock',
    '.*-debug.log',
    '*.tsbuildinfo',
    'dist/',
    '*.tgz',
    '.env',
    '.DS_Store',
  ]

  for (let pattern of patterns) {
    if (lines.includes(pattern)) continue
    if (
      pattern.endsWith('/') &&
      lines.includes(pattern.slice(0, pattern.length - 2))
    )
      continue
    lines.push(pattern)
  }

  text = lines.join('\n') + '\n'

  writeFileSync(file, text)
}

main()
