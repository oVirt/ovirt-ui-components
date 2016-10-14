export default function dummy (state = true, action) {
  switch (action.type) {
    case 'DUMMY':
      return !state
    default:
      return state
  }
}
