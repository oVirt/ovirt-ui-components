export * from './components/dummy'

export { default as VmsList } from './components/VmsList'
export { default as VmIcon } from './components/VmIcon'
export { default as VmStatusIcon } from './components/VmStatusIcon'

export { default as VmDetail } from './components/VmDetail'

export { default as VmUserMessages } from './components/VmUserMessages'
export { default as VmsPageHeader } from './components/VmsPageHeader'

export * from './helpers'

// TODO: consider prefixes or wrapping in a class, split & directory structure
// export { default as VmActions } from './vmactions'
export * from './vmactions'

// TODO: consider prefixes or wrapping in a class
export { default as ConfigReducer } from './reducers/config'
export { default as UserMessages } from './reducers/userMessages'
export { default as VmsReducer } from './reducers/vms'

export { default as OvirtApi } from './ovirtapi'
