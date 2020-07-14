import React from 'react'

import TaskProblem from './TaskProblem'
import AnswerBox from './AnswerBox'

export interface TaskProps {
  number: number
  problem: string
  correct: boolean
  answer: string
  value: string
  onChange: (val: string) => void
}
export default React.forwardRef((props: TaskProps, ref) => {
  return (
    <>
      <TaskProblem number={props.number}>{props.problem}</TaskProblem>
      <AnswerBox
        ref={ref}
        value={props.value}
        correct={props.correct}
        answer={props.answer}
        onChange={props.onChange}
      />
    </>
  )
})
