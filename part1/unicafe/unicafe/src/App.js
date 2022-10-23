import { useState } from "react";

const Header = ({ header }) => {
  return (
    <h1>{ header }</h1>
  );
}

const Button = ({ text, handleClick}) => {
  return (
    <button onClick={handleClick}>{ text }</button>
  )
}

const FeedbackCount = ({ text, count }) => {
  return (
    <div>
      <p>{text} {count}</p>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => {
    setGood(good + 1);
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  }

  const handleBadClick = () => {
    setBad(bad + 1);
  }

  return (
    <div>
      <Header header="give feedback" />
      <Button text="good" handleClick={handleGoodClick}/>
      <Button text="neutral" handleClick={handleNeutralClick}/>
      <Button text="bad" handleClick={handleBadClick}/>

      <Header header="statistics" />
      <FeedbackCount text="good" count={good} />
      <FeedbackCount text="neutral" count={neutral} />
      <FeedbackCount text="bad" count={bad} />
    </div>
  );
}

export default App;
