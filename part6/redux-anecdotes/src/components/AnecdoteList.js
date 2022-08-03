import { useSelector, useDispatch } from "react-redux";
import { voteOn } from "../reducers/anecdoteReducer";
import { setNotification, removeNotification } from "../reducers/notificationReducer";

const AnecdoteList = props => {
    const anecdotes = useSelector(({ anecdotes, filter }) => {
        return anecdotes.filter(
            anecdote => 
                anecdote.content.toUpperCase().includes(filter)
        )
    })
    const dispatch = useDispatch()
  
    const vote = (anecdote) => {
      dispatch(voteOn(anecdote))
      dispatch(setNotification(`you voted '${anecdote.content}'`))
      setTimeout(() => dispatch(removeNotification()), 5000)
      
    }

    return (
        <div>
            <h2>Anecdotes</h2>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote)}>vote</button>
                </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList