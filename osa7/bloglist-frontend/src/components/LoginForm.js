/* eslint react/prop-types: 0 */

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Header = styled.h1`
  padding: 1rem;
`

const Form = styled.form`
  vertical-align: top;
`

const InputContainer = styled.div`
  padding-left: 1rem;
  padding-bottom: 1rem;
  width: 25%;
  align-content: horizontal;
`

const Input = styled.input`
  margin: 0.25rem;
  float: right;
`

const Label = styled.label`
  float: left;
  margin: 0.25rem;
`

const Button = styled.button`
  background: white;
  font-size: 1rem;
  margin: 1rem;
  padding: 0.25rem 1rem;
  border: 2px solid black;
  border-radius: 3px;
`

const LoginForm = ({
  handleSubmit,
  username,
  password
}) => {
  return (
    <div>
      <Header>Kirjaudu</Header>

      <Form onSubmit={handleSubmit}>
        <InputContainer>
          <Label>käyttäjätunnus</Label>
          <Input {...username} id={'username'} />
        </InputContainer>
        <InputContainer>
          <Label>salasana</Label>
          <Input {...password} id={'password'} />
        </InputContainer>
        <Button type="submit">kirjaudu</Button>
      </Form>
    </div>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  username: PropTypes.object.isRequired,
  password: PropTypes.object.isRequired
}

export default LoginForm
