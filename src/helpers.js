// TODO: configurable logging
export function logDebug (msg) {
  console.log(msg)
}

export function hidePassword ({action, param}) {
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

