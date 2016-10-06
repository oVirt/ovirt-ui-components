import React, { PropTypes } from 'react'

import { userFormatOfBytes } from '../../helpers'

import style from './style.css'

const VmDisk = ({ disk }) => {
  const bootable = disk.bootable ? (<span className={'label label-info ' + style['smaller']}>Bootable</span>) : ''
  const inactive = disk.active ? '' : (<span className={'label label-default' + style['smaller']}>Inactive</span>)

  const provSize = userFormatOfBytes(disk.provisionedSize)
  const actSize = userFormatOfBytes(disk.actualSize, provSize.suffix)

  return (
    <li>
      <b>{disk.name}</b>&nbsp;
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
        {disks.toList().map(disk => <VmDisk disk={disk} key={disk.id} />)}
      </ul>
    )
  } else {
    return (
      <div />
    )
  }
}
VmDisks.propTypes = {
  disks: PropTypes.object,
}

export default VmDisks
