import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import style from './style.css'

import ContainerFluid from '../ContainerFluid'
import VmUserMessages from '../VmUserMessages'
import LoginMenu from './LoginMenu'

import { getAllVms } from '../../actions/vm'

function isUnread (userMessages) {
  return userMessages.get('unread')
}

/**
 * Main application header on top of the page
 */
const VmsPageHeader = ({ title, userMessages, config, onRefresh }) => {
  const titleStyle = { padding: '0px 0 5px' }

  return (
    <nav className='navbar navbar-default navbar-pf navbar-fixed-top'>
      <ContainerFluid>
        <div className='navbar-header'>
          <a className='navbar-brand' style={titleStyle} href='/'>{title}</a>
        </div>

        <ul className='nav navbar-nav navbar-utility'>
          <li className='dropdown'>
            <a href='#' data-toggle='dropdown' onClick={onRefresh}>
              <span className='fa fa-refresh' />&nbsp;Refresh
            </a>
          </li>

          <LoginMenu config={config} />

          <li className='dropdown'>
            <a href='#' data-toggle='dropdown'>
              <div className={isUnread(userMessages) ? style['usermsgs-unread'] : style['usermsgs-allread']}>
                <span className='pficon pficon-info' />&nbsp;Messages
              </div>
            </a>
            <VmUserMessages userMessages={userMessages} config={config} />
          </li>
        </ul>
      </ContainerFluid>
    </nav>
  )
}
VmsPageHeader.propTypes = {
  userMessages: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  onRefresh: PropTypes.func.isRequired,
}

export default connect(
  (state) => ({
    userMessages: state.userMessages,
    config: state.config,
  }),
  (dispatch) => ({
    onRefresh: () => dispatch(getAllVms({ shallowFetch: false })),
  })
)(VmsPageHeader)
