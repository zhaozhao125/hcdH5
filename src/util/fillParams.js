export default function fillParams(url, params) {
  if (!url || !params) {
    return null
  }
  return url.split('/').map(item => {
    if (item.match(':')) {
      let paramName = item.replace(':', '')
      return params[paramName]
    }
    return item
  }).join('/')
}
