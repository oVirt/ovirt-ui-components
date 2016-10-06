
// TODO: review - use VM status functions similar to the ovirt-engine
export function canStart (state) {
  return state && state === 'down'
}

// TODO: review
export function canShutdown (state) {
  return canRestart(state)
}

// TODO: review
export function canRestart (state) {
  return state && (canSuspend(state) || state === 'paused' || state === 'suspended')
}

// TODO: review
export function canSuspend (state) {
  return state && (state === 'up' || state === 'powering_up')
}

// TODO: review
export function canConsole (state) {
  return canSuspend(state)
}

/*
 public enum VmStatus {
 UNASSIGNED,
 DOWN,
 UP,
 POWERING_UP,
 PAUSED,
 MIGRATING,
 UNKNOWN,
 NOT_RESPONDING,
 WAIT_FOR_LAUNCH,
 REBOOT_IN_PROGRESS,
 SAVING_STATE,
 RESTORING_STATE,
 SUSPENDED,
 IMAGE_LOCKED,
 POWERING_DOWN;
 }
 */
