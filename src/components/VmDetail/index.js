import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import style from './style.css'

import { userFormatOfBytes } from '../../helpers'
import { closeVmDetail } from '../../actions/vm'

import VmIcon from '../VmIcon'
import VmDisks from '../VmDisks'

import VmActions from '../VmActions'

class VmDetail extends Component {
  componentDidMount () {
    this.onKeyDown = (event) => {
      if (event.keyCode === 27) { // ESC
        this.props.onCloseVmDetail()
      }
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

          <h1>
            <VmIcon icon={icon} missingIconClassName='pficon pficon-virtual-machine' className={style['vm-detail-icon']} />
            {vm.get('name')}
          </h1>
          <VmActions vm={vm} />
          <dl>
            <dt>Operating System</dt>
            <dd>{vm.getIn(['os', 'type'])}</dd>
            <dt>State</dt>
            <dd>{vm.get('status')}</dd>
            <dt>CPU Arch</dt>
            <dd>{vm.getIn(['cpu', 'arch'])}</dd>
            <dt>Defined Memory</dt>
            <dd>{userFormatOfBytes(vm.getIn(['memory', 'total'])).str}</dd>
            <dt>CPUs</dt>
            <dd>{vm.getIn(['cpu', 'vCPUs'])}</dd>
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
  vm: PropTypes.object,
  icons: PropTypes.object.isRequired,
  onCloseVmDetail: PropTypes.func.isRequired,
}

export default connect(
  (state) => ({
    icons: state.icons,
  }),
  (dispatch, ownProps) => ({
    onCloseVmDetail: () => dispatch(closeVmDetail()),
  })
)(VmDetail)
