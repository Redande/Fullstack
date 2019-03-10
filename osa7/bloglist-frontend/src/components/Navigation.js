import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logOut, } from '../reducers/loginReducer'
import styled from 'styled-components'

const StyledNavigation = styled.div`
  background: lightgray;
  padding: .1rem;
  display: flex;
  flex-direction: row;
  /* justify-content: space-evenly; */
  align-items: center;
  border-radius: 3px;
`

const NavigationItem = styled.div`
  padding-left: 1rem;
`

const Navigation = props => {
  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    props.logOut()
  }

  return (
    <StyledNavigation>
      <NavigationItem><Link to="/">blogs</Link></NavigationItem>
      <NavigationItem><Link to="/users">users</Link></NavigationItem>
      <NavigationItem><p>{props.name} logged in</p></NavigationItem>
      <NavigationItem><button onClick={handleLogout}>logout</button></NavigationItem>
    </StyledNavigation>
  )
}

const mapStateToProps = state => (
  {
    name: state.login.name,
  }
)

const mapDispatchToProps = {
  logOut,
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)
