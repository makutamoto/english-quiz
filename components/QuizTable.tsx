import { Table } from 'react-bootstrap'

import { TaskData } from '../lib/task'

export interface QuizTableProps {
  tasks: TaskData[]
}
export default function (props: QuizTableProps) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>名前</th>
          <th>問題数</th>
        </tr>
      </thead>
      <tbody>
        {props.tasks.map((task) => (
          <tr key={task.id}>
            <td>
              <a href={`/task/${task.id}`} rel="noreferrer">
                {task.name}
              </a>
            </td>
            <td>{task.tasks.length}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
