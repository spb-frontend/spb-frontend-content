const processTypes = require('./process-types')

module.exports = function(content) {
  const result = {}
  const contentKeys = Object.keys(content)

  contentKeys.forEach(key => {
    const entries = content[key]

    const processed = entries.map(entry => {
      const fields = {}
      const types = Object.keys(entry.fields)
      // console.log(entry.fields.meetup)
      types.forEach(type => {
        if (processTypes[type]) {
          fields[type] = processTypes[type](entry.fields[type])
        }
        else {
          fields[type] = entry.fields[type]
        }
      })

      return {
        id: entry.sys.id,
        locale: entry.sys.locale,
        contentType: entry.sys.contentType.sys,
        revision: entry.sys.revision,
        createdAt: entry.sys.createdAt,
        updatedAt: entry.sys.updatedAt,
        fields,
      }
    })

    result[key] = processed
  })

  return result
}
