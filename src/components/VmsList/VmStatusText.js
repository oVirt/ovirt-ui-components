import React, { PropTypes } from 'react'

import style from './style.css'

const VmStatusText = ({ vm }) => {
  const lastMessage = vm.get('lastMessage')
  const status = vm.get('status')

  if (lastMessage) {
    return (
      <p className={'card-pf-info text-center ' + style.crop} title={lastMessage} data-toggle='tooltip'>
        <span className='pficon-warning-triangle-o' />&nbsp;{lastMessage}
      </p>
    )
  }

  switch (status) { // TODO: review VM states
    case 'up':
    case 'powering_up':
    case 'paused':
    case 'migrating':
    default:
      return (
        <p className='card-pf-info text-center'>
          &nbsp;
        </p>
      )
  }
}
VmStatusText.propTypes = {
  vm: PropTypes.object.isRequired,
}

export default VmStatusText
