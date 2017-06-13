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
  const buildRetVal = (number, suffix) => {
    const rounded = number.toFixed(1)
    return {
      str: `${rounded} ${suffix}`,
      rounded,
      number,
      suffix,
    }
  }
  number = number || 0
  const factor = 1024
  const suffixes = [null, 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB']

  if (suffix) {
    const i = suffixes.indexOf(suffix)
    if (i > 0) {
      const divisor = Math.pow(factor, i)
      number = number / divisor

      return buildRetVal(number, suffix)
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

  return buildRetVal(number, suffix)
}
