import { GetStaticPropsResult } from 'next'

import { getTaskData, getTaskList, TaskData } from '../lib/task'

import QuizTable from '../components/QuizTable'

interface Props {
  tasks: TaskData[]
}

export default function (props: Props) {
  return (
    <>
      <h1>英語クイズ</h1>
      <p>
        このサイトは対英語小テストのために即席で制作されました。
        <br />
        バグはクラスLineで報告して下さい。
        <br />
        入力しにくいので〜はsomething、(人)はsomeoneに置き換えています。
      </p>
      <QuizTable tasks={props.tasks} />
    </>
  )
}

export async function getStaticProps(): Promise<GetStaticPropsResult<Props>> {
  const list = getTaskList()
  const tasks = list.map((id) => getTaskData(id))
  return {
    props: {
      tasks,
    },
  }
}
