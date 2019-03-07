import React from 'react'
import { connect } from 'react-redux'
import Anecdote from './Anecdote'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = props => {
  const vote = anecdote => {
    props.voteAnecdote(anecdote.id)
    props.setNotification(`you voted '${anecdote.content}'`, 5)
  }

  return (
    <div>
      {props.visibleAnecdotes
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote =>
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={() => vote(anecdote)}
          />
      )}
    </div>
  )
}

const filteredAnecdotes = ({ anecdotes, filter }) => (
  anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
)

const mapStateToProps = state => (
  {
    visibleAnecdotes: filteredAnecdotes(state),
  }
)

const mapDispatchToProps = {
  voteAnecdote,
  setNotification,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)
