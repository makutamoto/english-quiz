import { FormEvent, useCallback, useEffect, useRef, useState } from 'react'
import { GetStaticPropsContext, GetStaticPropsResult } from 'next'
import shuffle from 'shuffle-array'

import styles from './[id].module.css'

import { getTaskData, getTaskList, TaskData } from '../../lib/task'
import { normalizeString } from '../../lib/util'

import NextButton from '../../components/NextButton'
import RestartButton from '../../components/RestartButton'
import Task from '../../components/Task'

interface Props {
  task: TaskData
}

export default function ({ task }: Props) {
  const ref = useRef(null)
  const [tasks, setTasks] = useState(task.tasks)
  const [problem, setProblem] = useState(0)
  const [score, setScore] = useState(0)
  const [penalty, setPenalty] = useState(0)
  const [confirm, setConfirm] = useState(true)
  const [correct, setCorrect] = useState(null)
  const [value, setValue] = useState('')
  useEffect(() => setTasks(shuffle(tasks, { copy: true })), [task])
  const sentence = tasks[problem] && tasks[problem].sentence
  const answer = tasks[problem] && tasks[problem].answer
  const onClick = useCallback(
    (e: FormEvent) => {
      e.preventDefault()
      ref.current.focus()
      if (confirm) {
        const normalizedValue = normalizeString(value)
        if (
          answer
            .map((str) => str.toLowerCase())
            .includes(normalizedValue.toLowerCase())
        ) {
          setCorrect(true)
          setScore(score + 1)
        } else {
          setCorrect(false)
          setPenalty(penalty + 1)
        }
        setConfirm(false)
      } else {
        setProblem(problem + 1)
        setCorrect(null)
        setConfirm(true)
        setValue('')
      }
    },
    [answer, confirm, problem, score, value]
  )
  const onChange = useCallback((val) => setValue(val), [setValue])
  return (
    <>
      <div>
        正答数：{score} 誤答数：{penalty}
      </div>
      {problem < tasks.length ? (
        <form>
          <Task
            ref={ref}
            number={problem + 1}
            value={value}
            problem={sentence}
            correct={correct}
            answer={answer}
            onChange={onChange}
          />
          <div className={styles.button_align}>
            <NextButton confirm={confirm} onClick={onClick} />
          </div>
        </form>
      ) : (
        <>
          <h2>終了です。</h2>
          <div className={styles.button_align}>
            <RestartButton />
          </div>
        </>
      )}
    </>
  )
}

export async function getStaticPaths() {
  const list = getTaskList()
  const paths = list.map((id) => ({ params: { id } }))
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps(
  props: GetStaticPropsContext
): Promise<GetStaticPropsResult<Props>> {
  const id = props.params.id as string
  const task = getTaskData(id)
  return {
    props: {
      task,
    },
  }
}
