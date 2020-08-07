import fs from 'fs'
import path from 'path'

import { normalizeString } from './util'

const TASK_DATA_DIR = './task_data'

export interface Task {
  sentence: string
  answer: string[]
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
    if (path.extname(filename) == '.tsv') {
      list.push(path.basename(filename, '.tsv'))
    }
  })
  return list
}

export function getTaskData(id: string): TaskData {
  const data = fs.readFileSync(path.join(TASK_DATA_DIR, id + '.tsv'), {
    encoding: 'utf-8',
  })
  const lines = data.split('\n')
  const tsv: string[][] = []
  lines.forEach((line) => {
    if (line.length > 0) tsv.push(line.split('\t'))
  })
  const name = tsv.shift()[0]
  const tasks: Task[] = tsv.map((line) => ({
    sentence: line[0],
    answer: line
      .slice(1)
      .filter((ans) => ans !== '')
      .map((ans) => normalizeString(ans)),
  }))
  return {
    id,
    name,
    tasks,
  }
}
