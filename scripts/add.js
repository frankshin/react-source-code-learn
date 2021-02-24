#!/usr/bin/env node

const path = require('path')
const execa = require('execa')
const version = '16.1.0'
const url = `https://registry.npmjs.org/react/-/react-${version}.tgz`
const fileName = `${version}.zip`
const filePath = path.join(__dirname, `../react/${fileName}`)
// const targetPath = path.join(__dirname, `../react/${version}`)

const downloadReact = async () => {
  await execa('curl', ['-o', filePath , url], { stdio: 'inherit' });
  // await execa('tar', ['xvf', filePath, targetPath], { stdio: 'inherit' });
  // await execa('mv', [])
}
downloadReact();

