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

const FeedbackStat = ({ text, stat }) => {
  return (
    <div>
      <p>{text} {stat}</p>
    </div>
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

  const averageFeedback = () => {
    if (all === 0) {
      return 0;
    } else {
      return (good - bad) / all;
    }
  }

  const positiveFeedback = () => `${(good / all) * 100} %`;

  return (
    <div>
      <Header header="give feedback" />
      <Button text="good" handleClick={handleFeedbackClick}/>
      <Button text="neutral" handleClick={handleFeedbackClick}/>
      <Button text="bad" handleClick={handleFeedbackClick}/>

      <Header header="statistics" />
      <FeedbackStat text="good" stat={good} />
      <FeedbackStat text="neutral" stat={neutral} />
      <FeedbackStat text="bad" stat={bad} />
      <FeedbackStat text="all" stat={all} />
      <FeedbackStat text="average" stat={averageFeedback()} />
      <FeedbackStat text="positive" stat={positiveFeedback()} />
    </div>
  );
}

export default App;
