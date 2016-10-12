import React, { PropTypes } from 'react'

import style from './style.css'

import ContainerFluid from '../ContainerFluid'
import VmIcon from '../VmIcon'
import VmStatusIcon from '../VmStatusIcon'

import { selectVmDetail, shutdownVm, restartVm, startVm, getConsole, suspendVm } from '../../vm-actions'
import { canRestart, canShutdown, canStart, canConsole, canSuspend } from '../../vm-status'

/**
 * Data are fetched but no VM is available to display
 */
const NoVm = () => {
  return (
    <div className='blank-slate-pf'>
      <div className='blank-slate-pf-icon'>
        <span className='pficon pficon pficon-add-circle-o' />
      </div>
      <h1>
        No VM available
      </h1>
      <p>
        No VM can is available for the logged user.
      </p>
      <p>
        Learn more about this <a href='#'>on the documentation</a>.
      </p>
      <div className='blank-slate-pf-main-action'>
        <button className='btn btn-primary btn-lg'>TODO: Action</button>
      </div>
    </div>
  )
}

/**
 * Login (token) to Engine is missing.
 */
const NoLogin = () => {
  return (
    <div className='blank-slate-pf'>
      <div className='blank-slate-pf-icon'>
        <span className='pficon pficon pficon-user' />
      </div>
      <h1>
        Please log in ...
      </h1>
    </div>
  )
}

const LoadingData = () => {
  return (
    <div className='blank-slate-pf'>
      <div className='blank-slate-pf-icon'>
        <div className='spinner spinner-lg' />
      </div>
      <h1>
        Please wait
      </h1>
      <p>
        Data are being loaded ...
      </p>
    </div>
  )
}

const Button = ({ render = true, className, tooltip = '', onClick }) => {
  return render ? (
    <div className='card-pf-item'>
      <span className={className} data-toggle='tooltip' data-placement='left' title={tooltip} onClick={onClick} />
    </div>
  ) : null
}
Button.propTypes = {
  render: PropTypes.bool.isRequired,
  className: PropTypes.string.isRequired,
  tooltip: PropTypes.string,
  onClick: PropTypes.func.isRequired,
}

const EmptyAction = ({ state }) => {
  if (!canConsole(state) && !canShutdown(state) && !canRestart(state) && !canStart(state)) {
    return (
      <div className='card-pf-item' />
    )
  }
  return null
}
EmptyAction.propTypes = {
  state: PropTypes.string.isRequired,
}

/**
 * Active actions on a single VM-card.
 * List of actions depends on the VM state.
 */
const VmActions = ({ vm, dispatch }) => {
  const vmId = vm.get('id')
  const status = vm.get('status')

  const onGetConsole = () => dispatch(getConsole({ vmId }))
  const onShutdown = () => dispatch(shutdownVm({ vmId, force: false }))
  const onRestart = () => dispatch(restartVm({ vmId, force: false }))
  const onStart = () => dispatch(startVm({ vmId }))
  const onSuspend = () => dispatch(suspendVm({ vmId }))

  return (
    <div className='card-pf-items text-center'>
      <EmptyAction state={status} />
      <Button render={canConsole(status)} className='pficon pficon-screen' tooltip='Click to get console' onClick={onGetConsole} />
      <Button render={canShutdown(status)} className='fa fa-power-off' tooltip='Click to shut down the VM' onClick={onShutdown} />
      <Button render={canRestart(status)} className='fa fa-refresh' tooltip='Click to reboot the VM' onClick={onRestart} />
      <Button render={canStart(status)} className='fa fa-angle-double-right' tooltip='Click to start the VM' onClick={onStart} />
      <Button render={canSuspend(status)} className='fa fa-pause' tooltip='Click to suspend the VM' onClick={onSuspend} />
    </div>
  )
}
VmActions.propTypes = {
  vm: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
}

const VmStatusText = ({ vm }) => {
  const lastMessage = vm.get('lastMessage')
  const status = vm.get('status')

  if (lastMessage) {
    return (<div>
      <p className='crop' title={lastMessage} data-toggle='tooltip'>
        <span className='pficon-warning-triangle-o' />&nbsp;{lastMessage}
      </p>
    </div>)
  } else {
    switch (status) { // TODO: review VM states
      case 'up':
      case 'powering_up':
      case 'paused':
      case 'migrating':
        return (
          <p className='card-pf-info text-center'>
            <strong>Started On</strong>
            {vm.get('startTime')}
          </p>)
      default:
        return (
          <p className='card-pf-info text-center'>
            <strong>Stopped On: </strong>
            {vm.get('stopTime')}
          </p>
        )
    }
  }
}
VmStatusText.propTypes = {
  vm: PropTypes.object.isRequired,
}

/**
 * Single icon-card in the list
 */
const Vm = ({ vm, dispatch }) => {
  const onSelectVm = () => dispatch(selectVmDetail({ vmId: vm.get('id') }))
  const state = vm.get('status')

  // TODO: improve the card flip:
  // TODO: https://davidwalsh.name/css-flip
  // TODO: http://tympanus.net/codrops/2013/12/18/perspective-page-view-navigation/
  // TODO: https://desandro.github.io/3dtransforms/docs/card-flip.html
  return (
    <div className='col-xs-12 col-sm-6 col-md-4 col-lg-3'>
      <div className='card-pf card-pf-view card-pf-view-select card-pf-view-single-select'>
        <div className='card-pf-body'>
          <div className='card-pf-top-element' onClick={onSelectVm}>
            <VmIcon vmIcon={vm.getIn(['icons', 'large'])} className={style['card-pf-icon']}
              missingIconClassName='fa fa-birthday-cake card-pf-icon-circle' />
          </div>
          <h2 className='card-pf-title text-center' onClick={onSelectVm}>
            <VmStatusIcon state={state} />&nbsp;{vm.get('name')}
          </h2>

          <VmActions vm={vm} dispatch={dispatch} />
          <VmStatusText vm={vm} />

        </div>
      </div>
    </div>
  )
}
Vm.propTypes = {
  vm: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
}

const Vms = ({ vms, dispatch }) => {
  const selectedVmId = vms.get('selected')
  const containerClass = 'container-fluid container-cards-pf ' + (selectedVmId ? style['move-left'] : style['move-left-remove'])

  return (
    <span>
      <div className={containerClass}>
        <div className='row row-cards-pf'>
          {vms.get('vms').toList().map(vm => <Vm vm={vm} key={vm.get('id')} dispatch={dispatch} />)}
        </div>
      </div>
    </span>
  )
}
Vms.propTypes = {
  vms: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
}

const VmsList = ({ vms, config, dispatch }) => {
  if (vms.get('vms') && !vms.get('vms').isEmpty()) {
    return (
      <Vms vms={vms} dispatch={dispatch} />
    )
  } else if (!config.get('loginToken')) { // login is missing
    return (
      <ContainerFluid>
        <NoLogin />
      </ContainerFluid>
    )
  } else if (vms.get('loadInProgress')) { // data load in progress
    return (
      <ContainerFluid>
        <LoadingData />
      </ContainerFluid>
    )
  } else { // No VM available
    return (
      <ContainerFluid>
        <NoVm />
      </ContainerFluid>
    )
  }
}
VmsList.propTypes = {
  vms: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default VmsList
