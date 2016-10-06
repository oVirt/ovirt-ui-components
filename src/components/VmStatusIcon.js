import React, { PropTypes } from 'react'

const Icon = ({ className, tooltip }) => (
  <span title={tooltip} data-toggle='tooltip' data-placement='left'>
    <i className={className} />
  </span>
)

Icon.propTypes = {
  className: PropTypes.string.isRequired,
  tooltip: PropTypes.string.isRequired,
}

/**
 * Status-dependant icon for a VM
 */
const VmStatusIcon = ({ state }) => {
  switch (state) { // TODO: review VM states
    case 'up':
      return <Icon className='pficon pficon-ok icon-1x-vms' tooltip='The VM is running.' />
    case 'powering_up':
      return <Icon className='fa fa-angle-double-up icon-1x-vms' tooltip='The VM is powering up.' />
    case 'down':
      return <Icon className='fa fa-arrow-circle-o-down icon-1x-vms' tooltip='The VM is down.' />
    case 'paused':
      return <Icon className='pficon pficon-pause icon-1x-vms' tooltip='The VM is paused.' />
    case 'suspended':
      return <Icon className='fa fa-pause icon-1x-vms' tooltip='The VM is suspended.' />
    case 'powering_down':
      return <Icon className='fa fa-angle-double-down icon-1x-vms' tooltip='The VM is going down.' />
    case 'not_responding':
      return <Icon className='pficon pficon-warning-triangle-o icon-1x-vms' tooltip='The VM is not responding.' />
    case 'unknown':
      return <Icon className='pficon pficon-help icon-1x-vms' tooltip='The VM status is unknown.' />
    case 'unassigned':
      return <Icon className='pficon pficon-help icon-1x-vms' tooltip='The VM status is unassigned.' />
    case 'migrating':
      return <Icon className='pficon pficon-service icon-1x-vms' tooltip='The VM is being migrated.' />
    case 'wait_for_launch':
      return <Icon className='pficon pficon-service icon-1x-vms' tooltip='The VM is scheduled for launch.' />
    case 'reboot_in_progress':
      return <Icon className='fa fa-refresh icon-1x-vms' tooltip='The VM is being rebooted.' />
    case 'saving_state':
      return <Icon className='pficon pficon-export icon-1x-vms' tooltip='The VM is saving its state.' />
    case 'restoring_state':
      return <Icon className='pficon pficon-import icon-1x-vms' tooltip='The VM is restoring its state.' />
    case 'image_locked':
      return <Icon className='pficon pficon-volume icon-1x-vms' tooltip="The VM's image is locked" />

    case undefined: // better not to happen ...
      // TODO: use configurable logger
      console.log(`-- VmStatusIcon component: VM state is undefined`)
      return (<div />)
    default: // better not to happen ...
      // TODO: use configurable logger
      console.log(`-- VmStatusIcon component: unrecognized VM state '${state}'`)
      return <Icon className='pficon pficon-zone' tooltip={`The VM state is '${state}'`} />
  }
}
VmStatusIcon.propTypes = {
  state: React.PropTypes.string.isRequired,
}

export default VmStatusIcon
