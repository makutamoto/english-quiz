import { useCallback, ChangeEvent } from 'react'
import { FormControl, InputGroup } from 'react-bootstrap'
import { CheckIcon, XIcon } from '@primer/octicons-react'
import clsx from 'clsx'

import styles from './AnswerBox.module.css'

export interface AnswerBoxProps {
  correct: boolean | null
  answer: string
  value: string
  onChange: (val: string) => void
}
export default function (props: AnswerBoxProps) {
  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      props.onChange(e.currentTarget.value)
    },
    [props.onChange]
  )
  return (
    <div className="my-2">
      <InputGroup>
        {props.correct !== null && (
          <InputGroup.Prepend>
            <InputGroup.Text>
              {props.correct ? (
                <CheckIcon className={styles.correct} />
              ) : (
                <XIcon className={styles.wrong_answer} />
              )}
            </InputGroup.Text>
          </InputGroup.Prepend>
        )}
        <FormControl
          value={props.value}
          placeholder="回答を入力…"
          readOnly={props.correct !== null}
          onChange={onChange}
        />
      </InputGroup>
      {props.correct !== null &&
        (props.correct ? (
          <div className={clsx('mt-1', styles.correct)}>正解</div>
        ) : (
          <div className={clsx('mt-1', styles.wrong_answer)}>
            答え：{props.answer}
          </div>
        ))}
    </div>
  )
}
