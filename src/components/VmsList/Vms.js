import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import style from './style.css'
import Vm from './Vm'

import { closeDetail } from '../../actions'

const Vms = ({ vms, visibility, onCloseDetail }) => {
  const isDetailVisible = visibility.get('selectedVmDetail') || visibility.get('showOptions')
  const containerClass = `container-fluid container-cards-pf ${style['movable-left']} ${isDetailVisible ? style['moved-left'] : ''}`

  // The overlayingDiv disables actions of inner components and grays-out the list
  const overlayingDiv = isDetailVisible ? (<div className={style['overlay']} onClick={onCloseDetail} />) : ''

  return (
    <div className={containerClass}>
      <div className='row row-cards-pf'>
        {vms.get('vms').toList().map(vm =>
          <Vm vm={vm} key={vm.get('id')} />)}
      </div>
      {overlayingDiv}
    </div>
  )
}
Vms.propTypes = {
  vms: PropTypes.object.isRequired,
  visibility: PropTypes.object.isRequired,
  onCloseDetail: PropTypes.func.isRequired,
}

export default connect(
  (state) => ({
    vms: state.vms,
    visibility: state.visibility,
  }),
  (dispatch) => ({
    onCloseDetail: () => dispatch(closeDetail()),
  })
)(Vms)
