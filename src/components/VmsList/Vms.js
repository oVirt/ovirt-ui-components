import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import style from './style.css'
import Vm from './Vm'

const Vms = ({ vms }) => {
  const selectedVmId = vms.get('selected')
  const containerClass = 'container-fluid container-cards-pf ' + (selectedVmId ? style['move-left'] : style['move-left-remove'])
  // const stopNestedPropagation = selectedVmId

  return (
    <span>
      <div className={containerClass}>
        <div className='row row-cards-pf'>
          {vms.get('vms').toList().map(vm =>
            <Vm vm={vm} key={vm.get('id')} />)}
        </div>
      </div>
    </span>
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
