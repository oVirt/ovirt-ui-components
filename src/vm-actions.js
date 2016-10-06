// --- External actions -----------------------
export function login ({ username, password }) {
  return {
    type: 'LOGIN',
    payload: {
      credentials: {
        username,
        password,
      },
    },
  }
}

export function getAllVms () {
  return {
    type: 'GET_ALL_VMS',
    payload: {},
  }
}

export function shutdownVm ({ vmId, force = false }) {
  return {
    type: 'SHUTDOWN_VM',
    payload: {
      vmId,
      force,
    },
  }
}

export function restartVm ({ vmId, force = false }) {
  return {
    type: 'RESTART_VM',
    payload: {
      vmId,
      force,
    },
  }
}

export function startVm ({ vmId }) {
  return {
    type: 'START_VM',
    payload: {
      vmId,
    },
  }
}

export function getConsole ({ vmId }) {
  return {
    type: 'GET_CONSOLE_VM',
    payload: {
      vmId,
    },
  }
}

export function suspendVm ({ vmId }) {
  return {
    type: 'SUSPEND_VM',
    payload: {
      vmId,
    },
  }
}

// --- Internal State -------------------------
export function loginSuccessful ({ token, username }) {
  return {
    type: 'LOGIN_SUCCESSFUL',
    payload: {
      token,
      username,
    },
  }
}

export function loginFailed ({ errorCode, message }) {
  return {
    type: 'LOGIN_FAILED',
    payload: {
      errorCode,
      message,
    },
  }
}

export function logout () {
  return {
    type: 'LOGOUT',
    payload: {
    },
  }
}

export function selectVmDetail ({ vmId }) {
  return {
    type: 'SELECT_VM_DETAIL',
    payload: {
      vmId,
    },
  }
}

export function closeVmDetail () {
  return {
    type: 'CLOSE_VM_DETAIL',
    payload: {
    },
  }
}

export function clearUserMessages () {
  return {
    type: 'CLEAR_USER_MSGS',
    payload: {},
  }
}

export function loadInProgress ({ value }) {
  return {
    type: 'SET_LOAD_IN_PROGRESS',
    payload: {
      value,
    },
  }
}

// --- FAILURES -------------------------------
export function failedExternalAction ({ message, exception, action }) {
  if (exception) {
    message = message || ((exception['responseJSON'] && exception.responseJSON.fault && exception.responseJSON.fault.detail) ? (exception.responseJSON.fault.detail) : (exception['statusText'] || 'UNKNOWN'))
    const type = exception['status'] ? exception['status'] : 'ERROR'
    return {
      type: 'FAILED_EXTERNAL_ACTION',
      payload: {
        message: message,
        type: type,
        action,
      },
    }
  }

  return {
    type: 'FAILED_EXTERNAL_ACTION',
    payload: {
      message,
      action,
    },
  }
}
