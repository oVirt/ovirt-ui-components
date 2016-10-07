import React, { Component } from 'react'

import style from './style.css'

import VmUserMessages from '../VmUserMessages'
import {logout} from '../../vmactions'

class LoginButton extends Component {
  render () {
    const {config, dispatch} = this.props

    const onLogout = () => dispatch(logout())
    const onLogin = () => {} // dispatch(showLoginDialog())

    if (config.get('loginToken')) {
      return (<a className={style['user-name']} href='#' onClick={onLogout}>
        <i className='fa fa-sign-out' aria-hidden='true' />&nbsp;{config.getIn(['user', 'name'])}
      </a>)
    }

    // TODO: dispatch login action to show login dialog
    return (<a className='user-name' href='#' onClick={onLogin}><i className='fa fa-sign-in' aria-hidden='true' />&nbsp;Login</a>)
  }
}
LoginButton.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  config: React.PropTypes.object.isRequired
}

/**
 * Main application header on top of the page
 */
class VmsPageHeader extends Component {
  isUnread (userMessages) {
    return userMessages.get('unread')
  }

  render () {
    const {title, userMessages, config, dispatch} = this.props
    const titleStyle = {padding: '0px 0 5px'}

    return (<nav className='navbar navbar-default navbar-pf'>
      <div className='container-fluid'>
        <div className='navbar-header'>
          <a className='navbar-brand' style={titleStyle} href='/'>{title}</a>
        </div>
        <ul className='nav navbar-nav navbar-utility'>
          <li>
            <LoginButton dispatch={dispatch} config={config} />
          </li>
          <li className='dropdown'>
            <a href='#' data-toggle='dropdown'>
              <div className={this.isUnread(userMessages) ? style['usermsgs-unread'] : style['usermsgs-allread']}>
                <span className='pficon pficon-info' />&nbsp;Messages
              </div>
            </a>
            <VmUserMessages userMessages={userMessages} config={config} dispatch={dispatch} />
          </li>
        </ul>
      </div>
    </nav>)
  }
}
VmsPageHeader.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  userMessages: React.PropTypes.object.isRequired,
  config: React.PropTypes.object.isRequired,
  title: React.PropTypes.string.isRequired
}

export default VmsPageHeader
