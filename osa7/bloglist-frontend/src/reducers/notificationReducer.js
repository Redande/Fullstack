const initialState = {
  message: '',
  level: null
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return {message: action.message, level: action.level}
    case 'HIDE_NOTIFICATION':
      return {message: '', level: null}
    default:
      return state
  }
}

export const setNotification = (message, secondsVisible, level) => {
  return async dispatch => {
    dispatch({
      type: 'SHOW_NOTIFICATION',
      message,
      level,
    })
    setTimeout(() => {
      dispatch({ type: 'HIDE_NOTIFICATION' })
    }, secondsVisible * 1000)
  }
}

export default notificationReducer
