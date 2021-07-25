import React from 'react'

const Course = ({course}) => {
    return(
      <div>
        <Header course={course.name}/>
        <Content parts={course.parts}/>
      </div>
    )
  }
  const Header = ({course}) => <h2>{course}</h2>
  const Content = ({parts}) => {
    return(
      <div>
        {parts.map((part) => <Part key={part.id} part={part}/> )}
        <Total parts={parts}/>
      </div>
    )
  } 
  const Part = ({part}) => <p>{part.name} {part.exercises}</p>
  const Total = ({parts}) => {
    const exercisesTotal = parts.map((part) => part.exercises).reduce((acc, cur) => acc+cur)
    return(<p>Number of exercises: {exercisesTotal}</p>)
}

export default Course