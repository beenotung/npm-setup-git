# npm-setup-git

npm cli tool to setup git repository fields in package.json and .gitignore

[![npm Package Version](https://img.shields.io/npm/v/npm-setup-git)](https://www.npmjs.com/package/npm-setup-git)

## Introduction

In the previous version of npm cli, it auto setup the git repository fields in the `package.json` file as below if the current working directory is a git repository. However recent version of npm cli no longer setup it automatically.

This cli package helps you setup the fields in `package.json`, and it also auto setup some commonly ignored files in the `.gitignore` file.

Example git repository fields in `package.json`:

```json
{
  "repository": {
    "type": "git",
    "url": "git+https://github.com/beenotung/npm-setup-git.git"
  },
  "homepage": "https://github.com/beenotung/npm-setup-git#readme",
  "bugs": {
    "url": "https://github.com/beenotung/npm-setup-git/issues"
  }
}
```

## Installation (optional)

```bash
npm i -g npm-setup-git
```

## Usage

Usage with global installation:

```bash
npm-setup-git
```

Usage without installation:

```bash
npx -y npm-setup-git
```

## License

This project is licensed with [BSD-2-Clause](./LICENSE)

This is free, libre, and open-source software. It comes down to four essential freedoms [[ref]](https://seirdy.one/2021/01/27/whatsapp-and-the-domestication-of-users.html#fnref:2):

- The freedom to run the program as you wish, for any purpose
- The freedom to study how the program works, and change it so it does your computing as you wish
- The freedom to redistribute copies so you can help others
- The freedom to distribute copies of your modified versions to others
