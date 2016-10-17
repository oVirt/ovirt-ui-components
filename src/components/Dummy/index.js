import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import style from './style.css'

import { dummy } from '../../actions/dummy'

export const Dummy = ({ text, onClick }) => (
  <div>
    <div className={style.nice}>{text}</div>
    <button className='btn btn-primary' onClick={onClick}>Primary</button>
  </div>
)

Dummy.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
}

export default connect(
  (state) => ({
    text: state.dummy ? 'Hello World' : 'Goodbye World',
  }),
  (dispatch) => ({
    onClick: () => dispatch(dummy()),
  })
)(Dummy)
