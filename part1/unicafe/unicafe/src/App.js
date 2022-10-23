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

const StatisticLine = ({ text, stat }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{stat}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad, all}) => {
  const averageFeedback = () => (good - bad) / all;

  const positiveFeedback = () => `${(good / all) * 100} %`;

  if (all === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  } 
  return (
    <table>
      <tbody>
        <StatisticLine text="good" stat={good} />
        <StatisticLine text="neutral" stat={neutral} />
        <StatisticLine text="bad" stat={bad} />
        <StatisticLine text="all" stat={all} />
        <StatisticLine text="average" stat={averageFeedback()} />
        <StatisticLine text="positive" stat={positiveFeedback()} />
      </tbody>
    </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);

  const handleFeedbackClick = (e) => {
    if (e.target.textContent === 'good') {
      setGood(good + 1);
    } else if (e.target.textContent === 'neutral') {
      setNeutral(neutral + 1);
    } else if (e.target.textContent === 'bad') {
      setBad(bad + 1);
    }
    setAll(good + neutral + bad + 1);
  }

  return (
    <div>
      <Header header="give feedback" />
      <Button text="good" handleClick={handleFeedbackClick}/>
      <Button text="neutral" handleClick={handleFeedbackClick}/>
      <Button text="bad" handleClick={handleFeedbackClick}/>

      <Header header="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} all={all} />
    </div>
  );
}

export default App;
