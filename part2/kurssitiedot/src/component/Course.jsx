const Header = ({ name }) => (
    
        <h1>{name}</h1>
   
)

const Part = ({ part }) => (
    
        <p>{part.name} {part.exercises}</p>
    
)

const Content = ({ parts }) => {
      return (
        <div>
            {parts.map(part => <Part key={part.id} part={part} />)}
        </div>
    )
}

const Total = ({ parts }) => {
    const totalExercises = parts.reduce((sum, { exercises }) => sum + exercises, 0);
    return (
        <p>Total of {totalExercises} exercises</p>
    )
}

const Course = ({ course }) => (
    <div>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
    </div>
)

export default Course;
