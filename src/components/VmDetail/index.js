import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import style from './style.css'

import { userFormatOfBytes, isWindows } from '../../helpers'
import { getConsole, getRDP } from '../../actions'
import { canConsole } from '../../vm-status'

import VmIcon from '../VmIcon'
import VmDisks from '../VmDisks'
import Time from '../Time'
import VmActions from '../VmActions'
import DetailContainer from '../DetailContainer'
import VmStatusIcon from '../VmStatusIcon'

const LastMessage = ({ vmId, userMessages }) => {
  const vmMessages = userMessages.get('records')
    .filter(msg => (msg.failedAction && msg.failedAction.payload && msg.failedAction.payload.vmId === vmId))
    .sort((msg1, msg2) => (msg1.time - msg2.time))

  const lastMessage = vmMessages.last()

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

const VmConsoles = ({ vm, onConsole, onRDP }) => {
  return (
    <dd>
      {canConsole(vm.get('status')) ? vm.get('consoles').map(c => (
        <a href='#' key={c.get('id')} onClick={() => onConsole({ vmId: vm.get('id'), consoleId: c.get('id') })} className={style['left-delimiter']}>
          {c.get('protocol').toUpperCase()}
        </a>
      )) : ''}
      {
        canConsole(vm.get('status')) && isWindows(vm.getIn(['os', 'type']))
        ? (<a href='#' key={vm.get('id')} onClick={onRDP} className={style['left-delimiter']}>
          RDP
        </a>)
        : ''
      }
    </dd>
  )
}
VmConsoles.propTypes = {
  vm: PropTypes.object.isRequired,
  onConsole: PropTypes.func.isRequired,
  onRDP: PropTypes.func.isRequired,
}

class VmDetail extends Component {
  constructor (props) {
    super(props)
    this.state = { renderDisks: true }
  }

  render () {
    const { vm, icons, userMessages, onConsole, onRDP } = this.props

    if (!vm) {
      return null
    }
    const iconId = vm.getIn(['icons', 'small', 'id'])
    const icon = icons.get(iconId)
    const disks = vm.get('disks')

    const onToggleRenderDisks = () => { this.setState({ renderDisks: !this.state.renderDisks }) }
    const disksElement = this.state.renderDisks ? (<VmDisks disks={disks} />) : ''
    const hasDisks = disks.size > 0

    return (
      <DetailContainer>
        <h1>
          <VmIcon icon={icon} missingIconClassName='pficon pficon-virtual-machine' className={style['vm-detail-icon']} />
          &nbsp;{vm.get('name')}
        </h1>
        <VmActions vm={vm} userMessages={userMessages} />
        <LastMessage vmId={vm.get('id')} userMessages={userMessages} />
        <dl className={style['vm-properties']}>
          <dt>State</dt>
          <dd><VmStatusIcon state={vm.get('status')} /> {vm.get('status')}</dd>
          <dt>Description</dt>
          <dd>{vm.get('description')}</dd>
          <dt>Operating System</dt>
          <dd>{vm.getIn(['os', 'type'])}</dd>
          <dt><span className='pficon pficon-memory' /> Defined Memory</dt>
          <dd>{userFormatOfBytes(vm.getIn(['memory', 'total'])).str}</dd>
          <dt><span className='pficon pficon-cpu' /> CPUs</dt>
          <dd>{vm.getIn(['cpu', 'vCPUs'])}</dd>
          <dt><span className='pficon pficon-network' /> Address</dt>
          <dd>{vm.get('fqdn')}</dd>
          <dt><span className='pficon pficon-screen' /> Console</dt>
          <VmConsoles vm={vm} onConsole={onConsole} onRDP={onRDP} />
          <dt><span className='fa fa-database' /> Disks&nbsp;
            <small>
              ({hasDisks
                ? (<a href='#' onClick={onToggleRenderDisks}>{this.state.renderDisks ? 'hide' : 'show'}</a>)
                : 'no disks'
              })
            </small>
          </dt>
          <dd>{disksElement}</dd>
        </dl>
      </DetailContainer>
    )
  }
}
VmDetail.propTypes = {
  vm: PropTypes.object,
  config: PropTypes.object.isRequired,
  icons: PropTypes.object.isRequired,
  userMessages: PropTypes.object.isRequired,
  onConsole: PropTypes.func.isRequired,
  onRDP: PropTypes.func.isRequired,
}

export default connect(
  (state) => ({
    icons: state.icons,
    userMessages: state.userMessages,
  }),
  (dispatch, { vm, config }) => ({
    onConsole: ({ vmId, consoleId }) => dispatch(getConsole({ vmId, consoleId })),
    onRDP: () => dispatch(getRDP({ vmName: vm.get('name'), username: config.getIn([ 'user', 'name' ]) })),
  })
)(VmDetail)
