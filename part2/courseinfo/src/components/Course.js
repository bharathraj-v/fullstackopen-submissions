import React from 'react'
const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ parts }) => {
  return (
    <>
    <b>total of {parts.map(part=>part.exercises).reduce((a,b)=>a+b, 0)} exercises </b>
    </>
  )

}

const Content = ({ parts }) => parts.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)



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