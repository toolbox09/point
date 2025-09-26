import { useState } from 'react'
import Button from '../components/Button'
import './CounterPage.css'

export default function CounterPage() {
  const [count, setCount] = useState(0)

  const increment = () => setCount(count + 1)
  const decrement = () => setCount(count - 1)
  const reset = () => setCount(0)

  return (
    <div className="counter-page">
      <h1>카운터 페이지</h1>
      <div className="counter-container">
        <div className="counter-display">
          <span className="counter-number">{count}</span>
        </div>
        <div className="counter-buttons">
          <Button variant="danger" onClick={decrement} size="large">
            -1
          </Button>
          <Button variant="secondary" onClick={reset} size="large">
            리셋
          </Button>
          <Button variant="primary" onClick={increment} size="large">
            +1
          </Button>
        </div>
        <div className="counter-info">
          <p>현재 카운트: <strong>{count}</strong></p>
          <p>상태: {count > 0 ? '양수' : count < 0 ? '음수' : '영'}</p>
        </div>
      </div>
    </div>
  )
}