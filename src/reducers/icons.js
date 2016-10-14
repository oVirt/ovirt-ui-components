import Immutable, { Map } from 'immutable'

/**
 * The Icons reducer
 *
 * @param state
 * @param action
 * @returns {*}
 */
function icons (state = Map(), action) {
  switch (action.type) {
    case 'UPDATE_ICON': // add or update
      return state.set(action.payload.icon.id, Immutable.fromJS(action.payload.icon))
    default:
      return state
  }
}

export default icons
