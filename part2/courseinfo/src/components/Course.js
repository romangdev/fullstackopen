const Course = ({ course }) => {
  const sumExercises = () => {
    return course.parts.reduce((sum, part) => sum + part.exercises, 0)
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total sum={sumExercises()} />
    </div>
  )
}

const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <p>Number of exercises {sum}</p>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) => <Part key={part.id} part={part} />)}
    </>
  )
}

export default Course