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
