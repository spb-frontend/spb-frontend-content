const contentful = require('contentful')

module.exports = async function(keys) {
  const result = {}
  const client = contentful.createClient({
    accessToken: keys.token,
    space: keys.space_id,
  })

  await client.sync({initial: true})

  const entriesResponse = await client.getEntries({
    limit: 1000
  })

  if (entriesResponse && entriesResponse.sys.type === 'Array') {
    const entries = entriesResponse.items

    entries.forEach(entry => {
      const contentType = entry.sys.contentType.sys.id

      if (result[contentType]) {
        result[contentType].push(entry)
      }
      else {
        result[contentType] = [entry]
      }
    })
  }

  return result
}
