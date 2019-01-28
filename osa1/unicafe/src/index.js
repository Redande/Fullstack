import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ name, setCount, count }) => {
  const handleClick = () => {
    setCount(count + 1)
  }
  return (
    <button onClick={handleClick}>{name}</button>
  )
}

const Statistic = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ good, neutral, bad }) => {
  return (
    <div>
      <h1>statistiikka</h1>
      {good === neutral && good === bad && good === 0 ? (
        <p>Ei yhtään palautetta annettu</p>
      ) : (
        <table>
          <tbody>
            <Statistic text="hyvä" value={good} />
            <Statistic text="neutraali" value={neutral} />
            <Statistic text="neutraali" value={neutral} />
            <Statistic text="huono" value={bad} />
            <Statistic text="yhteensä" value={good + neutral + bad} />
            <Statistic
              text="keskiarvo"
              value={(good - bad) / (good + neutral + bad)}
            />
            <Statistic
              text="positiivisia"
              value={`${(good / (good + neutral + bad)) * 100} %`}
            />
          </tbody>
        </table>
      )}
    </div>
  );
};

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>anna palautetta</h1>
      <Button name="hyvä" setCount={setGood} count={good} />
      <Button name="neutraali" setCount={setNeutral} count={neutral} />
      <Button name="huono" setCount={setBad} count={bad} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
