import React from 'react'
const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }
  return (
    <div>
      <Header course={course} />
      <Content part1={part1} part2={part2} part3={part3}/>
      <Total part1={part1} part2={part2} part3={part3}/>
    </div>
  )
}

const Header = (props) => <h1>{props.course}</h1>
const Content = (props) => {
  return(
    <div>
      <Part part={props.part1.name} exercises={props.part1.exercises}/>
      <Part part={props.part2.name} exercises={props.part2.exercises}/>
      <Part part={props.part3.name} exercises={props.part3.exercises}/>
    </div>
  )
} 
const Part = ({part, exercises}) => <p>{part} {exercises}</p>
const Total = (props) => <p>Number of exercises {props.part1.exercises + props.part2.exercises + props.part3.exercises}</p>

export default App