import React from "react";

const Header = props => <h1>{props.courseName}</h1>;

const Part = props => (
  <p>
    {props.partName} {props.partExercises}
  </p>
);

const Content = ({ parts }) => (
  <div>
    {parts.map(part => (
      <Part partName={part.name} partExercises={part.exercises} />
    ))}
  </div>
);

const Total = ({ exercises }) => (
  <div>
    <p>yhteensä {exercises.reduce((a, b) => a + b)} tehtävää</p>
  </div>
);

const Course = ({ course }) => (
  <div>
    <Header courseName={course.name} />
    <Content parts={course.parts} />
    <Total exercises={course.parts.map(p => p.exercises)} />
  </div>
);

export default Course
