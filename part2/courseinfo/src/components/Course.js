import React from 'react'

const Header = (props) => {
    return (
    <div>
      <h2>{props.course.name}</h2>
    </div>
    )
  }
  
  const Part = (props) => {
    return (
        <p>{props.part.name} {props.part.exercises}</p>
    )
  }
  
  const Content = (props) => {
    return (
    <div>
      {props.course.parts.map(part =>
        <Part key={part.id} part={part} />)}
    </div>
    )
  }
  
  const Total = (props) => {
    return (
      <div>
        <p><strong>Total of {props.course.parts.reduce((acc, val) => acc + val.exercises, 0)} exercises</strong></p>
      </div>
    )
  }
  
  const Course = ({ course }) => {
    return (
      <div>
        <Header course={course} />
        <Content course={course} />
        <Total course={course} />
      </div>
    )
  }

  export default Course