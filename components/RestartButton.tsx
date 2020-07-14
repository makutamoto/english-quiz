import { useCallback } from 'react'
import { Button } from 'react-bootstrap'

export default function () {
  const onClick = useCallback(() => window.location.reload(), [])
  return <Button onClick={onClick}>再挑戦</Button>
}
