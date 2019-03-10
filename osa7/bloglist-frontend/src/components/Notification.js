import React from 'react'
import { connect } from 'react-redux'

const Notification = props => {
  const message = props.message

  if (message === '') {
    return null
  }

  return (
    <div className={props.level}>
      {message}
    </div>
  )
}

const mapStateToProps = state => (
  {
    message: state.notification.message,
    level: state.notification.level,
  }
)

export default connect(mapStateToProps)(Notification)
