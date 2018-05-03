const fs = require('fs')
const path = require('path')
const mkpath = require('mkpath')

const publicPath = path.resolve(__dirname, 'public')

let keys = {}

try {
  keys = require('./keys')
}
catch (err) {
  console.error(err) // eslint-disable-line no-console
}

if (keys.contentful) {
  const getContent = require('./src/get-content')

  getContent(keys.contentful).then(process)
}

function process(content) {
  const processContent = require('./src/process-content')
  const processed = processContent(content)
  const processedKeys = Object.keys(processed)

  mkpath(publicPath, err => {
    if (err) throw err

    fs.writeFile(
      path.resolve(publicPath, 'content.json'),
      JSON.stringify(processed),
      {encoding: 'utf8'},
    )
  })

  processedKeys.forEach(key => {
    mkpath(publicPath, err => {
      if (err) throw err

      fs.writeFile(
        path.resolve(publicPath, `${key}.json`),
        JSON.stringify(processed[key]),
        {encoding: 'utf8'},
      )
    })
  })
}
