import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import style from './style.css'
import Vm from './Vm'

const Vms = ({ vms }) => {
  const selectedVmId = vms.get('selected')
  const containerClass = `container-fluid container-cards-pf ${style['movable-left']} ${selectedVmId ? style['moved-left'] : ''}`

  return (
    <div className={containerClass}>
      <div className='row row-cards-pf'>
        {vms.get('vms').toList().map(vm =>
          <Vm vm={vm} key={vm.get('id')} />)}
      </div>
    </div>
  )
}
Vms.propTypes = {
  vms: PropTypes.object.isRequired,
}

export default connect(
  (state) => ({
    vms: state.vms,
  })
)(Vms)
