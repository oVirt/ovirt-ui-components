import React, { PropTypes } from 'react'

import { userFormatOfBytes } from '../../helpers'

import style from './style.css'

const VmDisk = ({ disk }) => {
  const bootable = disk.get('bootable') ? (<span className={'label label-info ' + style['smaller']}>Bootable</span>) : ''
  const inactive = disk.get('active') ? '' : (<span className={'label label-default' + style['smaller']}>Inactive</span>)

  const provSize = userFormatOfBytes(disk.get('provisionedSize'))
  const actSize = userFormatOfBytes(disk.get('actualSize'), provSize.suffix)

  return (
    <li>
      <b>{disk.get('name')}</b>&nbsp;
      ({actSize.number} used from {provSize.str})&nbsp;
      {bootable}
      {inactive}
    </li>
  )
}
VmDisk.propTypes = {
  disk: PropTypes.object.isRequired,
}

const VmDisks = ({ disks }) => {
  if (disks && !disks.isEmpty()) {
    return (
      <ul className={style['disks-ul']}>
        {disks.map(disk => <VmDisk disk={disk} key={disk.get('id')} />)}
      </ul>
    )
  }
  return null
}
VmDisks.propTypes = {
  disks: PropTypes.object,
}

export default VmDisks
