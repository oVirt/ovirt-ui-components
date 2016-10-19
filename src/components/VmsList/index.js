import React, { PropTypes } from 'react'

import style from './style.css'

import ContainerFluid from '../ContainerFluid'
import VmIcon from '../VmIcon'
import VmStatusIcon from '../VmStatusIcon'
import VmActions from '../VmActions'

import { dispatchVmActions } from '../../actions/dispatchVm'
import { closeVmDetail } from '../../actions/vm'

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

const VmStatusText = ({ vm }) => {
  const lastMessage = vm.get('lastMessage')
  const status = vm.get('status')

  if (lastMessage) {
    return (<div>
      <p className={style.crop} title={lastMessage} data-toggle='tooltip'>
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
const Vm = ({ vm, icons, actions = {} }) => {
  const onSelectVm = actions.onSelectVm
  const state = vm.get('status')

  const iconId = vm.getIn(['icons', 'large', 'id'])
  const icon = icons.get(iconId)

  // TODO: improve the card flip:
  // TODO: https://davidwalsh.name/css-flip
  // TODO: http://tympanus.net/codrops/2013/12/18/perspective-page-view-navigation/
  // TODO: https://desandro.github.io/3dtransforms/docs/card-flip.html
  return (
    <div className='col-xs-12 col-sm-6 col-md-4 col-lg-3'>
      <div className='card-pf card-pf-view card-pf-view-select card-pf-view-single-select'>
        <div className='card-pf-body'>
          <div className='card-pf-top-element' onClick={onSelectVm}>
            <VmIcon icon={icon} className={style['card-pf-icon']}
              missingIconClassName='fa fa-birthday-cake card-pf-icon-circle' />
          </div>
          <h2 className='card-pf-title text-center' onClick={onSelectVm}>
            <VmStatusIcon state={state} />&nbsp;{vm.get('name')}
          </h2>

          <VmActions vm={vm} actions={actions} isOnCard />
          <VmStatusText vm={vm} />

        </div>
      </div>
    </div>
  )
}
Vm.propTypes = {
  vm: PropTypes.object.isRequired,
  icons: PropTypes.object.isRequired,
  actions: PropTypes.object,
}

const Vms = ({ vms, icons, dispatch }) => {
  const selectedVmId = vms.get('selected')
  const containerClass = 'container-fluid container-cards-pf ' + (selectedVmId ? style['move-left'] : style['move-left-remove'])
  const stopNestedPropagation = selectedVmId

  return (
    <span onClick={stopNestedPropagation ? () => dispatch(closeVmDetail()) : undefined}>
      <div className={containerClass}>
        <div className='row row-cards-pf'>
          {vms.get('vms').toList().map(vm => <Vm vm={vm} actions={dispatchVmActions({ vm, dispatch, stopNestedPropagation })}
            icons={icons} key={vm.get('id')} />)}
        </div>
      </div>
    </span>
  )
}
Vms.propTypes = {
  vms: PropTypes.object.isRequired,
  icons: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
}

const VmsList = ({ vms, icons, config, dispatch }) => {
  if (vms.get('vms') && !vms.get('vms').isEmpty()) {
    return (
      <Vms vms={vms} icons={icons} dispatch={dispatch} />
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
  icons: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default VmsList
