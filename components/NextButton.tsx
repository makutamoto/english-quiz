import { FormEvent } from 'react'
import { Button } from 'react-bootstrap'

interface NextButtonProps {
  confirm?: boolean
  onClick?: (e: FormEvent) => void
}
export default function (props: NextButtonProps) {
  return (
    <Button type="submit" onClick={props.onClick}>
      {props.confirm ? '確認' : '次へ'}
    </Button>
  )
}
