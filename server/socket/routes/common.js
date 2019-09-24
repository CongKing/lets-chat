const fs = require('fs')
const {promisify} = require('util')
const path = require('path')

const uploadFile = async (ctx) => {
  await promisify(fs.writeFile)(
    path.resolve(__dirname, `../../../static/upload/${ctx.data.name}`),
    ctx.data.data.replace(/^data:image\/\w+;base64,/, ''),
    {
      encoding: 'base64'
    }
  )

  return {
      filePath: `/upload/${ctx.data.name}`
  }
}

exports.uploadFile = uploadFile
