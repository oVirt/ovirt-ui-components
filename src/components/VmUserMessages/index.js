import React, { Component } from 'react'

import style from './style.css'

import {logDebug, formatTwoDigits} from '../../helpers'
import {clearUserMessages} from '../../vmactions'

class UserMessage extends Component {
  renderTime (time) {
    const t = new Date(time)
    return `${formatTwoDigits(t.getHours())}:${formatTwoDigits(t.getMinutes())}:${formatTwoDigits(t.getSeconds())}`
  }

  render () {
    const {record} = this.props
    logDebug(`rendering record: ${JSON.stringify(record)}`)

    // TODO: render record.type
    return (<li className={'list-group-item' + style.crop} title={record.message} data-toggle='tooltip'>
      {this.renderTime(record.time)}&nbsp;{record.message}
    </li>)
  }
}
UserMessage.propTypes = {
  record: React.PropTypes.object.isRequired
}

class VmUserMessages extends Component {
  render () {
    const {userMessages, dispatch} = this.props

    const onClearMessages = () => dispatch(clearUserMessages())

    return (<div className='dropdown-menu infotip bottom-right'>
      <div className='arrow' />

      <ul className='list-group'>
        {userMessages.get('records').map(r => (<UserMessage key={r.time} record={r} />))}
      </ul>
      <div className='footer'><a href='#' onClick={onClearMessages}>Clear Messages</a></div>
    </div>)
  }

}
VmUserMessages.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  userMessages: React.PropTypes.object.isRequired
}

export default VmUserMessages
