import React from "react";
import ReactDOM from "react-dom";

const Header = props => <h1>{props.courseName}</h1>;

const Part = props => (
  <p>
    {props.partName} {props.partExercises}
  </p>
);

const Content = props => (
  <div>
    <Part
      partName={props.parts[0].name}
      partExercises={props.parts[0].exercises}
    />
    <Part
      partName={props.parts[1].name}
      partExercises={props.parts[1].exercises}
    />
    <Part
      partName={props.parts[2].name}
      partExercises={props.parts[2].exercises}
    />
  </div>
);

const Total = props => (
  <p>
    yhteensä {props.exercises[0] + props.exercises[1] + props.exercises[2]}{" "}
    tehtävää
  </p>
);

const App = () => {
  const course = {
    name: 'Half Stack -sovelluskehitys',
    parts: [
      {
        name: 'Reactin perusteet',
        exercises: 10
      },
      {
        name: 'Tiedonvälitys propseilla',
        exercises: 7
      },
      {
        name: 'Komponenttien tila',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <Total exercises={course.parts.map(p => p.exercises)} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
