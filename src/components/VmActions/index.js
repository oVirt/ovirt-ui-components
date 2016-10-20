import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import style from './style.css'

import { canRestart, canShutdown, canStart, canConsole, canSuspend } from '../../vm-status'
import { getConsole, shutdownVm, restartVm, suspendVm, startVm } from '../../actions/vm'

const Button = ({ render = true, className, tooltip = '', actionDisabled = false, isOnCard, onClick }) => {
  if (!render) {
    return null
  }

  if (actionDisabled) {
    className = `${className} ${style['action-disabled']}`
    onClick = undefined
  }

  if (isOnCard) {
    return (
      <div className='card-pf-item'>
        <span className={className} data-toggle='tooltip' data-placement='left' title={tooltip} onClick={onClick} />
      </div>
    )
  }

  if (actionDisabled) {
    return (
      <span className={style['left-delimiter']}>
        <span className={className} data-toggle='tooltip' data-placement='left' title={tooltip} />
      </span>
    )
  }

  return (
    <a href='#' onClick={onClick} className={style['left-delimiter']}>
      <span className={className} data-toggle='tooltip' data-placement='left' title={tooltip} />
    </a>
  )
}
Button.propTypes = {
  render: PropTypes.bool.isRequired,
  className: PropTypes.string.isRequired,
  tooltip: PropTypes.string,
  onClick: PropTypes.func,
  actionDisabled: PropTypes.bool,
  isOnCard: PropTypes.bool.isRequired,
}

const EmptyAction = ({ state, isOnCard }) => {
  if (!canConsole(state) && !canShutdown(state) && !canRestart(state) && !canStart(state)) {
    return (
      <div className={isOnCard ? 'card-pf-item' : undefined} />
    )
  }
  return null
}
EmptyAction.propTypes = {
  state: PropTypes.string.isRequired,
  isOnCard: PropTypes.bool.isRequired,
}

/**
 * Active actions on a single VM-card.
 * List of actions depends on the VM state.
 */
const VmActions = ({ vm, isOnCard = false, onGetConsole, onShutdown, onRestart, onStart, onSuspend }) => {
  const status = vm.get('status')

  return (
    <div className={`${isOnCard ? 'card-pf-items' : ''} text-center`}>
      <EmptyAction state={status} isOnCard={isOnCard} />
      <Button isOnCard={isOnCard} render={canConsole(status)} actionDisabled={vm.getIn(['actionInProgress', 'getConsole'])}
        className='pficon pficon-screen' tooltip='Click to get console' onClick={onGetConsole} />
      <Button isOnCard={isOnCard} render={canShutdown(status)} actionDisabled={vm.getIn(['actionInProgress', 'shutdown'])}
        className='fa fa-power-off' tooltip='Click to shut down the VM' onClick={onShutdown} />
      <Button isOnCard={isOnCard} render={canRestart(status)} actionDisabled={vm.getIn(['actionInProgress', 'restart'])}
        className='pficon pficon-restart' tooltip='Click to reboot the VM' onClick={onRestart} />
      <Button isOnCard={isOnCard} render={canStart(status)} actionDisabled={vm.getIn(['actionInProgress', 'start'])}
        className='fa fa-angle-double-right' tooltip='Click to start the VM' onClick={onStart} />
      <Button isOnCard={isOnCard} render={canSuspend(status)} actionDisabled={vm.getIn(['actionInProgress', 'suspend'])}
        className='fa fa-pause' tooltip='Click to suspend the VM' onClick={onSuspend} />
    </div>
  )
}
VmActions.propTypes = {
  vm: PropTypes.object.isRequired,
  isOnCard: PropTypes.bool,
  onGetConsole: PropTypes.func.isRequired,
  onShutdown: PropTypes.func.isRequired,
  onRestart: PropTypes.func.isRequired,
  onStart: PropTypes.func.isRequired,
  onSuspend: PropTypes.func.isRequired,
}

export default connect(
  (state) => ({
    icons: state.icons,
  }),
  (dispatch, { vm }) => ({
    onGetConsole: () => dispatch(getConsole({ vmId: vm.get('id') })),
    onShutdown: () => dispatch(shutdownVm({ vmId: vm.get('id'), force: false })),
    onRestart: () => dispatch(restartVm({ vmId: vm.get('id'), force: false })),
    onStart: () => dispatch(startVm({ vmId: vm.get('id') })),
    onSuspend: () => dispatch(suspendVm({ vmId: vm.get('id') })),
  })
)(VmActions)
