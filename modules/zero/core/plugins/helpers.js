/*
 *
 * 🔌 [Plugin | Core] Helpers
 *
 */

console.log(`🔌 [Plugin | Core] Helpers`)

// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import Cookie from 'cookie'
import CloneDeepWith from 'lodash/cloneDeepWith'

// /////////////////////////////////////////////////////////////////// Functions
// -----------------------------------------------------------------------------
// //////////////////////////////////////////////////////////////////// OmitDeep
const OmitDeep = (collection, excludeKeys) => {
  const omit = (value) => {
    if (value && typeof value === 'object') {
      excludeKeys.forEach((key) => {
        delete value[key]
      })
    }
  }
  return CloneDeepWith(collection, omit)
}

// /////////////////////////////////////////////////////////////////// GetCookie
const GetCookie = (string, key) => {
  const cookies = Cookie.parse(string)
  return cookies.hasOwnProperty(key) ? cookies[key] : false
}

// ////////////////////////////////////////////////////////// CompileQueryString
const CompileQueryString = (query) => {
  let compiled = ''
  if (!query || typeof query !== 'object') { return '' }
  let len = Object.keys(query).length
  for (const param in query) {
    const value = query[param]
    if (typeof value === 'string') {
      compiled += `${param}=${value}&`
    }
  }
  if (compiled !== '') {
    compiled = `?${compiled}`
  }
  len = compiled.length
  if (compiled.charAt(len - 1) === '&') {
    compiled = compiled.slice(0, len - 1)
  }
  return compiled
}

// ///////////////////////////////////////////////////////////////////// Slugify
// ------------------------- Options: 'dash', 'underscore', 'underscore-no-trim'
const Slugify = (text, type = 'dash') => {
  if (type === 'dash') {
    return text.toString().toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/[^\w-]+/g, '') // Remove all non-word chars
      .replace(/--+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, '') // Trim - from end of text
  } else if (type === 'underscore') {
    return text.toString().toLowerCase()
      .replace(/\s+/g, '_') // Replace spaces with _
      .replace(/[^\w_]+/g, '') // Remove all non-word chars
      .replace(/__+/g, '_') // Replace multiple _ with single _
      .replace(/^_+/, '') // Trim _ from start of text
      .replace(/_+$/, '') // Trim _ from end of text
  } else if (type === 'underscore-no-trim') {
    return text.toString().toLowerCase()
      .replace(/\s+/g, '_') // Replace spaces with _
      .replace(/[^\w_]+/g, '') // Remove all non-word chars
      .replace(/__+/g, '_') // Replace multiple _ with single _
  } else {
    return 'Incompatible "Type" specified. Must be type "dash", "underscore", or "underscore-no-trim". Default is "dash"'
  }
}

// ///////////////////////////////////////////////////////////////// Parse a URL
// ------------------- https://www.abeautifulsite.net/parsing-urls-in-javascript
const ParseURL = (url) => {
  const match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i)
  const urlBreakdown = {}
  let hostname = null
  let domain = null
  if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
    hostname = match[2]
  }
  const urlParts = hostname.split('.').reverse()
  if (urlParts != null && urlParts.length > 1) {
    domain = urlParts[1] + '.' + urlParts[0]
    if (hostname.toLowerCase().includes('.co.uk') !== -1 && urlParts.length > 2) {
      domain = urlParts[2] + '.' + domain
    }
  }
  urlBreakdown.hostname = hostname
  urlBreakdown.domain = domain
  return urlBreakdown
}

// /////////////////////////////////////////// Check if Element contains a class
const HasClass = (element, className) => {
  if (element.classList) { return element.classList.contains(className) }
  return new RegExp('(^| )' + className + '( |$)', 'gi').test(element.className)
}

// /////////////////////////////////////////////// If on iOS, return the version
// ------------------------- supports iOS 2.0 and later -- https://bit.ly/TJjs1V
const GetiOSversion = (element, className) => {
  if (/iP(hone|od|ad)/.test(navigator.platform)) {
    const v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/)
    return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)]
  }
  return false
}

// //////////////////////////////// Add class to NodeList staggered sequentially
const StaggeredAddClass = (elements, className, offset, next) => {
  const len = elements.length - 1
  let num = 0
  const interval = setInterval(() => {
    const item = elements[num] ? elements[num].$el || elements[num] : null
    if (!item) {
      clearInterval(interval)
      if (next) { return next() }
    } else {
      item.classList.add(className)
    }
    if (num === len) {
      clearInterval(interval)
      if (next) { return next() }
    }
    num++
  }, offset)
}

// //////////////////// Get the time from a timestamp in "22 seconds ago" format
const Timeago = (timestamp) => {
  const now = new Date()
  const secondsPast = (now.getTime() - timestamp.getTime()) / 1000
  if (secondsPast === 1) { return Math.floor(parseInt(secondsPast)) + ' second ago' }
  if (secondsPast < 60) { return Math.floor(parseInt(secondsPast)) + ' seconds ago' }
  if (secondsPast === 60) { return Math.floor(parseInt(secondsPast / 60)) + ' minute ago' }
  if (secondsPast < 3600) { return Math.floor(parseInt(secondsPast / 60)) + ' minutes ago' }
  if (secondsPast === 3600) { return Math.floor(parseInt(secondsPast / 3600)) + ' hour ago' }
  if (secondsPast < 86400) { return Math.floor(parseInt(secondsPast / 3600)) + ' hours ago' }
  if (secondsPast < 172800) { return Math.floor(parseInt(secondsPast / 86400)) + ' day ago' }
  if (secondsPast > 86400) { return Math.floor(parseInt(secondsPast / 86400)) + ' days ago' }
  return timestamp
}

// ///////////////////////////////////////////////////////////// Parse Video URL
// ------------------------------------ https://gist.github.com/yangshun/9892961
const ParseVideoUrl = (url) => {
  const matched = url.match(/(https?:\/\/|\/\/|)(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com)|dailymotion.com)\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(&\S+)?/)
  if (!matched) { return { type: false, id: false, time: false } }
  const parsed = new URL(`https://placeholder-for-parsing.com/${url.split('/').pop()}`)
  const domain = matched[3]
  let type = ''
  if (domain.includes('youtu')) { type = 'youtube' }
  if (domain.includes('vimeo')) { type = 'vimeo' }
  if (domain.includes('dailymotion')) { type = 'dailymotion' }
  return { type, id: matched[6], time: parsed.searchParams.get('t') }
}

// /////////////////////////////////////////////////////// Generate an embed URL
// ------------------------------------------------------------ Youtube or Vimeo
const BuildVideoEmbedUrl = (parsed) => {
  const type = parsed.type
  const id = parsed.id
  const time = parsed.time
  let url
  switch (type) {
    case 'youtube' : url = `//www.youtube.com/embed/${id}${(time ? `?start=${time}` : '')}`; break
    case 'vimeo' : url = `//player.vimeo.com/video/${id}${(time ? `/#=${time}` : '')}`; break
    default : url = false
  }
  return url
}

// ////////////////////////////////// Get the height of the entire page Document
// -----------------------------------------------------------------------------
const GetDocHeight = () => {
  const D = document
  return Math.max(
    D.body.scrollHeight, D.documentElement.scrollHeight,
    D.body.offsetHeight, D.documentElement.offsetHeight,
    D.body.clientHeight, D.documentElement.clientHeight
  )
}

// ///////////////////////////////// Capitalize first letters of words in string
/**
  * Capitalizes .
  * @param {string} str String to be modified
  * @param {boolean=false} lower Whether all other letters should be lowercased
  * @return {string}
  * @usage
  *   capitalize('fix this string')     // -> 'Fix This String'
  *   capitalize('javaSCrIPT')          // -> 'JavaSCrIPT'
  *   capitalize('javaSCrIPT', true)    // -> 'Javascript'
  */
const Capitalize = (str, lower = false) => {
  return (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase())
}

// ////////////////////////////////////// Convert bytes to human-readable format
// ----------------------------- Ex: 257831078666960800 bytes outputs as 229 PiB
const FormatBytes = (bytes, format = 'string') => {
  const size = Filesize(bytes, { standard: 'iec' })
  if (format === 'string') { return size }
  const split = size.split(' ')
  return { value: split[0], unit: split[1] }
}

// //////////////////////////////////////////////////////////// Shuffle an Array
// ----------------------------------------- https://stackoverflow.com/a/2450976
const ShuffleArray = (arr) => {
  let currentIndex = arr.length
  let temporaryValue
  let randomIndex
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1
    temporaryValue = arr[currentIndex]
    arr[currentIndex] = arr[randomIndex]
    arr[randomIndex] = temporaryValue
  }
  return arr
}

// //////////////////////////////////// Generate a Random Integer Within a Range
// ----------------------------------------- https://stackoverflow.com/a/1527820
const GetRandomInteger = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// /////////////////////////////////////////////////////////// Truncate a string
// ---------------------------------------------- Default: len = 30, end = '...'
const TruncateString = (string, len = 30, delimiter = '...', type = 'single', endLen = 8) => {
  if (!string) { return string }
  let stringLen = len + delimiter.length
  if (type === 'double') {
    stringLen += endLen
    return string.length > stringLen ? `${string.slice(0, len)}${delimiter}${string.slice(-endLen)}` : string
  } else {
    return string.length > stringLen ? `${string.slice(0, len)}${delimiter}` : string
  }
}

// //////////////////////////////////////////////// Convert number to have zeros
// ---------------------------------------- Ex: 250 --> 250.00, 250.1 --> 250.10
const FormatNumberWithZeros = (incoming) => {
  const value = typeof incoming !== 'number' ? parseFloat(incoming) : incoming
  if (isNaN(value)) { return value }
  const split = value.toString().split('.')
  const beforeDecimal = split[0]
  const afterDecimal = split[1]
  const beforeLen = beforeDecimal.length
  if (beforeLen === 1) {
    return Number(`${beforeDecimal}${afterDecimal ? `.${afterDecimal.charAt(0)}` : ''}`).toFixed(1)
  } else if (beforeLen > 1) {
    return value.toFixed(2)
  } else {
    return value
  }
}

// /////////////////////////////////////////////////////// Add text to clipboard
const AddTextToClipboard = (text) => {
  const container = document.createElement('textarea')
  container.style.position = 'fixed'
  container.style.left = '-99999px'
  container.style.zIndex = '-1'
  container.style.opacity = '0'
  container.style.pointerEvents = 'none'
  container.innerHTML = text
  document.body.appendChild(container)
  container.select()
  document.execCommand('copy')
  document.body.removeChild(container)
}

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export default ({ store }, inject) => {
  inject('OmitDeep', OmitDeep)
  inject('GetCookie', GetCookie)
  inject('CompileQueryString', CompileQueryString)
  inject('Slugify', Slugify)
  inject('ParseURL', ParseURL)
  inject('HasClass', HasClass)
  inject('GetiOSversion', GetiOSversion)
  inject('StaggeredAddClass', StaggeredAddClass)
  inject('Timeago', Timeago)
  inject('ParseVideoUrl', ParseVideoUrl)
  inject('BuildVideoEmbedUrl', BuildVideoEmbedUrl)
  inject('GetDocHeight', GetDocHeight)
  inject('Capitalize', Capitalize)
  inject('FormatBytes', FormatBytes)
  inject('ShuffleArray', ShuffleArray)
  inject('GetRandomInteger', GetRandomInteger)
  inject('TruncateString', TruncateString)
  inject('FormatNumberWithZeros', FormatNumberWithZeros)
  inject('AddTextToClipboard', AddTextToClipboard)
}
