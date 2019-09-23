const fs = require('fs')
const {promisify} = require('util')
const path = require('path')

const uploadFile = async (ctx) => {
  await promisify(fs.writeFile)(
    path.resolve(__dirname, `../../../dist/${ctx.data.name}`),
    ctx.data.data,
    {
      encoding: 'base64'
    }
  )
}

exports.uploadFile = uploadFile
