import { Blob } from 'blob-util'

let logDebugEnabled = true

/**
 * @param enabled true if logDebug() shall write messages to the console
 */
export function setLogDebug (enabled) {
  logDebugEnabled = enabled
}

/**
 * Write DEBUG log message to console
 * @param msg
 */
export function logDebug (msg) {
  if (logDebugEnabled) {
    console.log(msg)
  }
}

/**
 * Write ERROR log message to console
 * @param msg
 */
export function logError (msg) {
  console.log(`Error: ${msg}`)
}

// "payload":{"message":"Not Found","shortMessage":"LOGIN failed","type":404,"action":{"type":"LOGIN","payload":{"credentials":{"username":"admin@internal","password":"admi"}}}}}
export function hidePassword ({ action, param }) {
  if (action) {
    const hidden = JSON.parse(JSON.stringify(action))
    if (action.payload) {
      if (action.payload.credentials && action.payload.credentials.password) {
        hidden.payload.credentials.password = '*****'
      }

      if (action.payload.action && action.payload.action.payload &&
        action.payload.action.payload.credentials && action.payload.action.payload.credentials.password) {
        hidden.payload.action.payload.credentials.password = '*****'
      }
    }
    return hidden
  }

  if (param) {
    if (param['password']) {
      const hidden = JSON.parse(JSON.stringify(param))
      hidden.password = '*****'
      return hidden
    }
    return param
  }

  return action
}

export function formatTwoDigits (num) {
  return String('0' + num).slice(-2)
}

/**
 * Return bytes in human readable format.
 *
 * [ human readable string, divised number, suffix ]
 *
 * @param number in Bytes
 * @param suffix optional
 * @returns {*}
 */
export function userFormatOfBytes (number, suffix) {
  number = number || 0
  const factor = 1024
  const suffixes = [null, 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB']

  if (suffix) {
    const i = suffixes.indexOf(suffix)
    if (i > 0) {
      const divisor = Math.pow(factor, i)
      number = number / divisor

      return {
        str: `${number} ${suffix}`,
        number: Math.round(number).toFixed(1),
        suffix,
      }
    }
  }

  // figure it out
  let divisor = 1
  suffix = ''
  for (let i = 0; i < suffixes.length; i++) {
    const quotient = number / divisor
    if (quotient < factor) {
      number = quotient
      suffix = suffixes[i]
      break
    }
    divisor *= factor
  }

  return {
    str: `${number} ${suffix}`,
    number: Math.round(number).toFixed(1),
    suffix,
  }
}

/**
 * Download given content as a file in the browser
 *
 * @param data Content of the file
 * @param fileName
 * @param mimeType
 * @returns {*}
 */
export function fileDownload ({ data, fileName = 'myFile.dat', mimeType = 'application/octet-stream' }) {
  if (data) {
    const a = document.createElement('a')

    if (navigator.msSaveBlob) { // IE10
      return navigator.msSaveBlob(new Blob([data], { mimeType }), fileName)
    } else if ('download' in a) { // html5 A[download]
      a.href = `data:${mimeType},${encodeURIComponent(data)}`
      a.setAttribute('download', fileName)
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      return true
    } else { // do iframe dataURL download (old ch+FF):
      const f = document.createElement('iframe')
      document.body.appendChild(f)
      f.src = `data:${mimeType},${encodeURIComponent(data)}`
      setTimeout(() => document.body.removeChild(f), 333)
      return true
    }
  }
}

export function isWindows (name) {
  return name.toLowerCase().indexOf('windows') > -1
}
