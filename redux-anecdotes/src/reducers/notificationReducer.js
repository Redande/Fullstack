const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return action.notification
    case 'HIDE_NOTIFICATION':
      return ''
    default:
      return state
  }
}

export const setNotification = (notification, secondsVisible) => {
  return async dispatch => {
    dispatch({
      type: 'SHOW_NOTIFICATION',
      notification,
    })
    setTimeout(() => {
      dispatch({ type: 'HIDE_NOTIFICATION' })
    }, secondsVisible * 1000)
  }
}

export default notificationReducer
