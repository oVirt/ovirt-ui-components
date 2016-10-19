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

export function showLoginDialog () {
  return {
    type: 'SHOW_LOGIN',
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

/**
 * Update or Add
 * @param vms - array of vms
 * @returns {{type: string, payload: {vms: *}}}
 */
export function updateVms ({ vms }) {
  return {
    type: 'UPDATE_VMS',
    payload: {
      vms,
    },
  }
}

export function updateIcon ({ icon }) {
  return {
    type: 'UPDATE_ICON',
    payload: {
      icon,
    },
  }
}

export function updateVmDisk ({ vmId, disk }) {
  return {
    type: 'UPDATE_VM_DISK',
    payload: {
      vmId,
      disk,
    },
  }
}

export function vmActionInProgress ({ vmId, name, started }) {
  return {
    type: 'VM_ACTION_IN_PROGRESS',
    payload: {
      vmId,
      name,
      started,
    },
  }
}
