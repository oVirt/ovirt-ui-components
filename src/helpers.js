import { Blob } from 'blob-util'

// TODO: configurable logging
export function logDebug (msg) {
  console.log(msg)
}

export function logError (msg) {
  console.log(msg)
}

export function hidePassword ({ action, param }) {
  if (action) {
    if (action['payload'] && action.payload['credentials'] && action.payload.credentials['password']) {
      const hidden = JSON.parse(JSON.stringify(action))
      hidden.payload.credentials.password = '*****'
      return hidden
    }
    return action
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
