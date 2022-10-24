import { useState } from 'react'

const Button = ({ text, handleClick }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Heading = ({ text }) => {
  return (
    <h2>{text}</h2>
  );
}

const Anecdote = ({ anecdote, votes }) => {
  return (
    <div>
      <div>
        {anecdote}
      </div>
      <div>
        has {votes} votes
      </div>
    </div>
  );
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  const [points, setPoints] = useState(Array(anecdotes.length).fill().map(() => 0));
  const [selected, setSelected] = useState(0);
  const [topAnecdote, setTopAnecdote] = useState('Each anecdote');
  const [topVoteCount, setTopVoteCount] = useState(0);
 
  const getRandomAnecdote = () => {
    setSelected(Math.abs(Math.ceil(Math.random() * anecdotes.length - 1)));
  }

  const handleVoteClick = () => {
    const copy = [...points];
    copy[selected] += 1;
    const mostVotedIndex = getMostVotedIndex();
    setTopAnecdote(anecdotes[mostVotedIndex]);
    setTopVoteCount(copy[mostVotedIndex]);

    setPoints(copy);
  }

  // BUG HEREEEE!!!! "Delay" in finding highest count
  const getMostVotedIndex = () => {
    let highestVoteCount = 0;
    let index = 0;
    for (let i = 0; i < anecdotes.length; i++) {
      if (points[i] > highestVoteCount) {
        highestVoteCount = points[i];
        index = i;
      }
    }

    return index;
  }

  return (
    <div>
      <Heading text="Anecdote of the day" />
      <Anecdote anecdote={anecdotes[selected]} votes={points[selected]} />
      <Button handleClick={handleVoteClick} text="vote"/>
      <Button handleClick={getRandomAnecdote} text="next anecdote" />

      <Heading text="Anecdote with most votes" />
      <Anecdote anecdote={topAnecdote} votes={topVoteCount} />
    </div>
  );
}

export default App;
