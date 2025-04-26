
  const Content = ( { parts } ) => {
    return (
      <div>
        {parts.map(part => {
          return (
            <Part key = {part.id} part={part.name} exercises={part.exercises} />
          )
        })}
      </div>
      
      
    )
  }
  
  const Part = ( {part, exercises}) => {
    return (
      <p>
        {part} {exercises}
      </p>
    )
  }
  
  const Header = (props) => { 
    console.log(props)
    return (
      <h1>{props.course}</h1>
    )
  }
  
  
  const Total = ( { parts }) => { 
  
    const total = parts.reduce((sum, part) => sum + part.exercises, 0)
    console.log(total)
  
    return (
      <p><b>Total of {total} exercises</b></p>
    )
  }


  const Course = ({course}) => {
    return (
      <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
  
      </div>
    )
  }

  export default Course
  