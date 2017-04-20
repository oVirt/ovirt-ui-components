import React, { PropTypes } from 'react'
import style from './style.css'
import Checkbox from '../Checkbox'

class ConsoleOptions extends React.Component {

  constructor (props) {
    super(props)
    this.onChangeOptions = this.onChangeOptions.bind(this)
  }

  onChangeOptions (option) {
    return function (value) {
      switch (option) {
        case 'autoConnect': 
          this.props.options[option] = value
          break
        default:
          this.props.options[option] = value
          break
      }
      this.props.onSave({ options: this.props.options })
    }.bind(this)
  }
  render () {
    let { options, open } = this.props

    let classes = style['vm-detail-settings']
    if (open) {
      classes += ` ${style['open-settings']}`
    }

    return (
      <div className={classes}>
        <div className='row' style={{marginLeft: 0}}>
          <div className='col-xs-12'>
            <Checkbox checked={options.autoConnect || false} onClick={this.onChangeOptions('autoConnect')} label='Connect automatically' />
          </div>
        </div>
      </div>
      )
  }
}

ConsoleOptions.propTypes = {
  options: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  open: PropTypes.bool,
}

export default ConsoleOptions
