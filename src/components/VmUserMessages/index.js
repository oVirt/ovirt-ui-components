import React from 'react'

import style from './style.css'

import { formatTwoDigits } from '../../helpers'
import { clearUserMessages } from '../../actions/vm'

const Time = ({ time }) => {
  const t = new Date(time)
  return (
    <div>
      {`${formatTwoDigits(t.getHours())}:${formatTwoDigits(t.getMinutes())}:${formatTwoDigits(t.getSeconds())}`}
    </div>
  )
}
Time.propTypes = {
  time: React.PropTypes.number.isRequired,
}

const UserMessage = ({ record }) => {
  // TODO: render record.type
  return (
    <li className={'list-group-item' + style.crop} title={record.message} data-toggle='tooltip'>
      <Time time={record.time} />&nbsp;{record.message}
    </li>
  )
}
UserMessage.propTypes = {
  record: React.PropTypes.object.isRequired,
}

const VmUserMessages = ({ userMessages, dispatch }) => {
  const onClearMessages = () => dispatch(clearUserMessages())

  return (<div className='dropdown-menu infotip bottom-right'>
    <div className='arrow' />

    <ul className='list-group'>
      {userMessages.get('records').map(r => (<UserMessage key={r.time} record={r} />))}
    </ul>
    <div className='footer'><a href='#' onClick={onClearMessages}>Clear Messages</a></div>
  </div>)
}

VmUserMessages.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  userMessages: React.PropTypes.object.isRequired,
}

export default VmUserMessages
