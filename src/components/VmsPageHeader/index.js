import React, { PropTypes } from 'react'

import style from './style.css'

import ContainerFluid from '../ContainerFluid'
import VmUserMessages from '../VmUserMessages'
import { logout } from '../../vm-actions'

const LoginButton = ({ config, dispatch }) => {
  const onLogout = () => dispatch(logout())
  const onLogin = () => {} // dispatch(showLoginDialog())

  if (config.get('loginToken')) {
    return (
      <a className={style['user-name']} href='#' onClick={onLogout}>
        <i className='fa fa-sign-out' aria-hidden='true' />&nbsp;{config.getIn(['user', 'name'])}
      </a>
    )
  }

  // TODO: dispatch login action to show login dialog
  return (
    <a className='user-name' href='#' onClick={onLogin}>
      <i className='fa fa-sign-in' aria-hidden='true' />&nbsp;Login
    </a>
  )
}
LoginButton.propTypes = {
  dispatch: PropTypes.func.isRequired,
  config: PropTypes.object.isRequired,
}

function isUnread (userMessages) {
  return userMessages.get('unread')
}

/**
 * Main application header on top of the page
 */
const VmsPageHeader = ({ title, userMessages, config, dispatch }) => {
  const titleStyle = { padding: '0px 0 5px' }

  return (
    <nav className='navbar navbar-default navbar-pf'>
      <ContainerFluid>
        <div className='navbar-header'>
          <a className='navbar-brand' style={titleStyle} href='/'>{title}</a>
        </div>
        <ul className='nav navbar-nav navbar-utility'>
          <li>
            <LoginButton dispatch={dispatch} config={config} />
          </li>
          <li className='dropdown'>
            <a href='#' data-toggle='dropdown'>
              <div className={isUnread(userMessages) ? style['usermsgs-unread'] : style['usermsgs-allread']}>
                <span className='pficon pficon-info' />&nbsp;Messages
              </div>
            </a>
            <VmUserMessages userMessages={userMessages} config={config} dispatch={dispatch} />
          </li>
        </ul>
      </ContainerFluid>
    </nav>
  )
}
VmsPageHeader.propTypes = {
  dispatch: PropTypes.func.isRequired,
  userMessages: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
}

export default VmsPageHeader
