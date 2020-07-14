import fs from 'fs'
import path from 'path'

const TASK_DATA_DIR = './task_data'

export interface Task {
  sentence: string
  answer: string
}

export interface TaskData {
  id: string
  name: string
  tasks: Task[]
}

export function getTaskList() {
  const dir = fs.readdirSync(TASK_DATA_DIR)
  const list: string[] = []
  dir.forEach((filename) => {
    if (path.extname(filename) == '.csv') {
      list.push(path.basename(filename, '.csv'))
    }
  })
  return list
}

export function getTaskData(id: string): TaskData {
  const data = fs.readFileSync(path.join(TASK_DATA_DIR, id + '.csv'), {
    encoding: 'utf-8',
  })
  const lines = data.split('\n')
  const csv: string[][] = []
  lines.forEach((line) => {
    if (line.length > 0) csv.push(line.split('\t'))
  })
  const name = csv.shift()[0]
  const tasks: Task[] = csv.map((line) => ({
    sentence: line[0],
    answer: line[1],
  }))
  return {
    id,
    name,
    tasks,
  }
}
