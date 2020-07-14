export interface TaskProblemProps {
  number: number
  children: string
}
export default function (props: TaskProblemProps) {
  return (
    <h2>
      {props.number}. {props.children}
    </h2>
  )
}
