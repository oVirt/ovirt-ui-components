import React, { Component } from 'react'

import style from './style.css'

import { closeVmDetail } from '../../vm-actions'
import { userFormatOfBytes } from '../../helpers'

import VmIcon from '../VmIcon'
import VmDisks from '../VmDisks'

class VmDetail extends Component {
  componentDidMount () {
    this.onKeyDown = (event) => {
      if (event.keyCode === 27) { // ESC
        this.onClose()
      }
    }
    this.onClose = () => {
      this.props.dispatch(closeVmDetail())
    }

    window.addEventListener('keydown', this.onKeyDown)
  }

  componentWillUnmount () {
    window.removeEventListener('keydown', this.onKeyDown)
  }

  render () {
    const { vm, icons } = this.props // optional

    if (vm) {
      const iconId = vm.getIn(['icons', 'small', 'id'])
      const icon = icons.get(iconId)

      return (
        <div className={'container-fluid ' + style['move-left-detail']}>
          <a href='#' className={style['move-left-close-detail']} onClick={this.onClose}><i className='pficon pficon-close'>Close</i></a>

          <h1>
            <VmIcon icon={icon} missingIconClassName='pficon pficon-virtual-machine' className={style['vm-detail-icon']} />
            {vm.get('name')}
          </h1>
          <dl>
            <dt>State</dt>
            <dd>{vm.get('status')}</dd>
            <dt>Defined Memory</dt>
            <dd>{userFormatOfBytes(vm.getIn(['memory', 'total'])).str}</dd>
            <dt>CPUs</dt>
            <dd>{vm.getIn(['cpu', 'vCPUs'])}</dd>
            <dt>CPU Arch</dt>
            <dd>{vm.getIn(['cpu', 'arch'])}</dd>
            <dt>Operating System</dt>
            <dd>{vm.getIn(['os', 'type'])}</dd>
            <dt>State</dt>
            <dd>{vm.get('status')}</dd>
            <dt>ID</dt>
            <dd>{vm.get('id')}</dd>
            <dt>High Availability</dt>
            <dd>{vm.getIn(['highAvailability', 'enabled'])}</dd>
            <dt>Address</dt>
            <dd>{vm.get('fqdn')}</dd>
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
  vm: React.PropTypes.object,
  icons: React.PropTypes.object.isRequired,
  dispatch: React.PropTypes.func,
}

export default VmDetail
