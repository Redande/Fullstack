import loginService from '../services/login'
import blogService from '../services/blogs'

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'LOG_IN':
      return action.data
    case 'LOG_OUT':
      return null
    default:
        return state
  }
}

export const logIn = (username, password) => {
  return async dispatch => {
    const user = await loginService.login({username: username, password: password})
    blogService.setToken(user.token)
    dispatch({
      type: 'LOG_IN',
      data: user,
    })
    return user
  }
}

export const restoreUser = user => {
  return async dispatch => {
    blogService.setToken(user.token)
    dispatch({
      type: 'LOG_IN',
      data: user,
    })
  }
}

export const logOut = () => {
  return async dispatch => {
    blogService.setToken('')
    dispatch({
      type: 'LOG_OUT',
    })
  }
}

export default reducer
