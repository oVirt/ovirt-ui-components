import { selectVmDetail, closeVmDetail, shutdownVm, restartVm, startVm, getConsole, suspendVm } from './vm'

// TODO: will be replaced by react-redux / connect
export function dispatchVmActions ({ vm, dispatch, stopNestedPropagation = false }) {
  console.log(`--- dispatchVmActions()`)
  const actions = {
    onCloseVmDetail: () => dispatch(closeVmDetail()),
  }

  if (stopNestedPropagation || !(vm && vm.get('id'))) {
    return actions
  }

  const vmId = vm.get('id')
  return Object.assign(actions, {
    onSelectVm: () => dispatch(selectVmDetail({ vmId })),
    onGetConsole: () => dispatch(getConsole({ vmId })),
    onShutdown: () => dispatch(shutdownVm({ vmId, force: false })),
    onRestart: () => dispatch(restartVm({ vmId, force: false })),
    onStart: () => dispatch(startVm({ vmId })),
    onSuspend: () => dispatch(suspendVm({ vmId })),
  })
}
