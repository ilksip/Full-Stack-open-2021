import React from 'react'
const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return(
    <div>
      <h1>Web development curriculum</h1>
      {courses.map((course) => <Course key={course.id} course={course}/>)}
    </div>
  )
}

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

export default App