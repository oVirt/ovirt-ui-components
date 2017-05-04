import React, { PropTypes } from 'react'

class Checkbox extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      checked: !!props.checked,
    }

    this.onChange = this.onChange.bind(this)
  }

  onChange (event) {
    this.setState({ checked: !this.state.checked })
    this.props.onClick(event.target.checked)
  }

  render () {
    const { label } = this.props

    return (
      <label className={`styled-checkbox ${this.state.checked && 'checked'}`}>
        <input type='checkbox' onChange={this.onChange} checked={this.state.checked} />
        <span>{label}</span>
      </label>
    )
  }
}

Checkbox.propTypes = {
  checked: PropTypes.bool,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default Checkbox
