import { useSelector, useDispatch } from "react-redux";
import { voteOn } from "../reducers/anecdoteReducer";
import { setNotification, removeNotification } from "../reducers/notificationReducer";

const AnecdoteList = props => {
    const anecdotes = useSelector(state => state.anecdotes)
    const dispatch = useDispatch()
  
    const vote = (id) => {
      dispatch(voteOn(id))
      const content = anecdotes.find(n => n.id === id).content
      dispatch(setNotification(`you voted '${content}'`))
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
                    <button onClick={() => vote(anecdote.id)}>vote</button>
                </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList