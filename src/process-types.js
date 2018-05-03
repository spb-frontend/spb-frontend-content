module.exports = {
  podcasts: function(entries) {
    return entries.map(entry => ({
      id: entry.sys.id,
      locale: entry.sys.locale,
      title: entry.fields.title,
      date: entry.fields.date,
      duration: entry.fields.duration,
      number: entry.fields.number,
      explicit: entry.fields.explicit,
    }))
  },
  persons: function(entries) {
    return entries.map(entry => ({
      id: entry.sys.id,
      locale: entry.sys.locale,
      name: entry.fields.name,
      lastname: entry.fields.lastname,
      slug: entry.fields.slug,
    }))
  },
  talks: function(entries) {
    return entries.map(entry => ({
      id: entry.sys.id,
      locale: entry.sys.locale,
      title: entry.fields.title,
    }))
  }
}
