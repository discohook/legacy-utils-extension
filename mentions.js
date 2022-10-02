const entityCache = {
  user: { _prefix: '@' },
  member: { _prefix: '@' },
  role: { _prefix: '@' },
  channel: { _prefix: '#' },
  webhook: { _prefix: '@' },
}

const invalidEntityCache = {
  user: [],
  member: [],
  role: [],
  channel: [],
  webhook: [],
}

const getCurrentGuildIds = () => {
}

const getMentions = () => {
  const mapElements = e => {return { element: e, type: e.dataset.mentionType, id: e.dataset.mentionId }}
  return {
    users: [...document.querySelectorAll('span[data-mention-type="user"]')].map(mapElements),
    roles: [...document.querySelectorAll('span[data-mention-type="role"]')].map(mapElements),
    channels: [...document.querySelectorAll('span[data-mention-type="channel"]')].map(mapElements),
  }
}

// https://stackoverflow.com/a/11866980
function toRGBA(num, opacity=1) {
  num >>>= 0
  const b = num & 0xFF,
        g = (num & 0xFF00) >>> 8,
        r = (num & 0xFF0000) >>> 16
  return 'rgba(' + [r, g, b, opacity].join(',') + ')'
}

const resetStyle = (element) => {
  element.style.color = null
  element.style.backgroundColor = null
  element.onmouseover = null
  element.onmouseout = null
}

const replaceMention = async (mention) => {
  if (invalidEntityCache[mention.type].includes(mention.id)) {
    mention.element.innerText = `${entityCache[mention.type]._prefix}invalid-${mention.type}`
    resetStyle(mention.element)
    return
  }
  let cached = entityCache[mention.type][mention.id]
  if (!cached) {
    // TODO: fetch
    let route = ''
    switch (mention.type) {
      case 'user':
        route = `/users/${mention.id}`
        break
      case 'role':
        route = `/roles/${mention.id}`
        break
      case 'channel':
        route = `/channels/${mention.id}`
        break
      default:
        break
    }
    if (route && SNOWFLAKE_RE.test(mention.id)) {
      console.log(`[Discohook Utils] Attempting to resolve ${mention.type} with ID ${mention.id}`)
      const response = await fetch(DUTILS_API + route)
      const data = await response.json()
      if (!response.ok) {
        invalidEntityCache[mention.type].push(mention.id)
        mention.element.innerText = `${entityCache[mention.type]._prefix}invalid-${mention.type}`
        resetStyle(mention.element)
        console.error(data)
        return
      }
      entityCache[mention.type][mention.id] = data
      cached = data
    } else {
      console.debug(`[Discohook Utils] Skipping ${mention.type} with ID ${mention.id}; unrecognized type or invalid snowflake`)
      mention.element.innerText = `${entityCache[mention.type]._prefix}${mention.type}`
      resetStyle(mention.element)
      return
    }
  }
  mention.element.innerText = `${entityCache[mention.type]._prefix}${cached.name}`
  if (cached.color) {
    mention.element.style.color = toRGBA(cached.color)
    mention.element.style.backgroundColor = toRGBA(cached.color, 0.1)
    mention.element.onmouseover = () => {mention.element.style.backgroundColor = toRGBA(cached.color, 0.3)}
    mention.element.onmouseout = () => {mention.element.style.backgroundColor = toRGBA(cached.color, 0.1)}
  }
}

const replaceAllMentions = () => {
  const mentions = getMentions()
  Object.keys(mentions).forEach(t => mentions[t].forEach(m => replaceMention(m)))
}

document.addEventListener('input', (e) => {
  if (e.target.type === 'text' || e.target.tagName === 'TEXTAREA') {
    replaceAllMentions()
  }
})

document.addEventListener('load', replaceAllMentions)

console.log('[Discohook Utils] Loaded mentions')
