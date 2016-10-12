import React, { PropTypes } from 'react'

/**
 * Large or small icon (image) associated with the VM
 */
const VmIcon = ({ vmIcon, className, missingIconClassName }) => {
  const content = vmIcon.get('content')
  const mediaType = vmIcon.get('mediaType')

  if (content) {
    const src = `data:${mediaType};base64,${content}`
    return <img src={src} className={className} alt='' />
  }

  return <span className={missingIconClassName} />
}

VmIcon.propTypes = {
  vmIcon: PropTypes.object.isRequired, // either vm.icons.large or vm.icons.small
  className: PropTypes.string.isRequired, // either card-pf-icon or vm-detail-icon
  missingIconClassName: PropTypes.string.isRequired,
}

export default VmIcon
