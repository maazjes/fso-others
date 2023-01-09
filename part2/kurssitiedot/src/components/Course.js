const Header = (props) => {
    return (
      <>
        <h1>{props.course}</h1>
      </>
    )
  }
  
  const Part = (props) => {
    return (
      <>
        <p>{props.part} {props.exercises}</p>
      </>
    )
  }
  const Content = ({parts}) => {
    return (
      <>
        {parts.map((part) => <Part key={part.id} part={part.name} exercises={part.exercises}/>)}
      </>
    )
  }
  
  const Total = ({parts}) => {
    const exercises = parts.map((part) => part.exercises)
    return (
        <p><b>total of {exercises.reduce((a, b) => a + b)} exercises</b></p>
    )
  }
  
  const Course = ({course}) => {
    return (
      <>
        <Header course= {course.name}/>
        <Content parts = {course.parts}/>
        <Total parts = {course.parts}/>
      </>
    )
  }

  export default Course