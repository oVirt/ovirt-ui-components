import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import style from './style.css'

import { userFormatOfBytes } from '../../helpers'
import { closeVmDetail, getConsole } from '../../actions/vm'
import { canConsole } from '../../vm-status'

import VmIcon from '../VmIcon'
import VmDisks from '../VmDisks'
import Time from '../Time'
import VmActions from '../VmActions'

const LastMessage = ({ vmId, userMessages }) => {
  const vmMessages = userMessages.get('records')
    .filter(msg => (msg.failedAction && msg.failedAction.payload && msg.failedAction.payload.vmId === vmId))
    .sort((msg1, msg2) => (msg1.time - msg2.time))

  console.log(`LastMessage: vmMessages: ${JSON.stringify(vmMessages)}`)
  const lastMessage = vmMessages.last()
  console.log(`LastMessage: lastMessage: ${JSON.stringify(lastMessage)}`)

  if (!lastMessage) {
    return null
  }

  return (
    <span>
      <Time time={lastMessage.time} />
      <pre>
        {lastMessage.message}
      </pre>
    </span>
  )
}
LastMessage.propTypes = {
  vmId: PropTypes.string.isRequired,
  userMessages: PropTypes.object.isRequired,
}

const VmConsoles = ({ vm, onConsole }) => {
  return (
    <dd>
      {canConsole(vm.get('status')) ? vm.get('consoles').map(c => (
        <a href='#' key={c.id} onClick={() => onConsole({ vmId: vm.get('id'), consoleId: c.id })} className={style['left-delimiter']}>
          {c.protocol.toUpperCase()}
        </a>
      )) : ''}
    </dd>
  )
}
VmConsoles.propTypes = {
  vm: PropTypes.object.isRequired,
  onConsole: PropTypes.func.isRequired,
}

class VmDetail extends Component {
  componentDidMount () {
    this.onKeyDown = (event) => {
      if (event.keyCode === 27) { // ESC
        this.props.onCloseVmDetail()
      }
    }

    window.addEventListener('keydown', this.onKeyDown)
  }

  componentWillUnmount () {
    window.removeEventListener('keydown', this.onKeyDown)
  }

  render () {
    const { vm, icons, userMessages, onConsole } = this.props // optional

    if (vm) {
      const iconId = vm.getIn(['icons', 'small', 'id'])
      const icon = icons.get(iconId)

      return (
        <div className={'container-fluid ' + style['move-left-detail']}>

          <h1>
            <VmIcon icon={icon} missingIconClassName='pficon pficon-virtual-machine' className={style['vm-detail-icon']} />
            {vm.get('name')}
          </h1>
          <VmActions vm={vm} userMessages={userMessages} />
          <LastMessage vmId={vm.get('id')} userMessages={userMessages} />
          <dl className={style['vm-properties']}>
            <dt>Description</dt>
            <dd>{vm.get('description')}</dd>
            <dt>Operating System</dt>
            <dd>{vm.getIn(['os', 'type'])}</dd>
            <dt>State</dt>
            <dd>{vm.get('status')}</dd>
            <dt>Defined Memory</dt>
            <dd>{userFormatOfBytes(vm.getIn(['memory', 'total'])).str}</dd>
            <dt>CPUs</dt>
            <dd>{vm.getIn(['cpu', 'vCPUs'])}</dd>
            <dt>Address</dt>
            <dd>{vm.get('fqdn')}</dd>
            <dt><span className='pficon pficon-screen' /> Console</dt>
            <VmConsoles vm={vm} onConsole={onConsole} />
            <dt>Disks</dt>
            <dd><VmDisks disks={vm.get('disks')} /></dd>
          </dl>
        </div>
      )
    } else {
      return (
        <div className={style['move-left-detail-invisible']} />
      )
    }
  }
}
VmDetail.propTypes = {
  vm: PropTypes.object,
  icons: PropTypes.object.isRequired,
  userMessages: PropTypes.object.isRequired,
  onCloseVmDetail: PropTypes.func.isRequired,
  onConsole: PropTypes.func.isRequired,
}

export default connect(
  (state) => ({
    icons: state.icons,
    userMessages: state.userMessages,
  }),
  (dispatch) => ({
    onCloseVmDetail: () => dispatch(closeVmDetail()),
    onConsole: ({ vmId, consoleId }) => dispatch(getConsole({ vmId, consoleId })),
  })
)(VmDetail)
