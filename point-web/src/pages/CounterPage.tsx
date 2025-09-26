import { useState, useEffect, useRef } from 'react'
import Button from '../components/Button'
import './CounterPage.css'

export default function CounterPage() {
  const [count, setCount] = useState(0)
  const [isDelayedCounting, setIsDelayedCounting] = useState(false)
  const [progress, setProgress] = useState(0)
  const [pendingOperation, setPendingOperation] = useState<'increment' | 'decrement' | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const increment = () => setCount(count + 1)
  const decrement = () => setCount(count - 1)
  const reset = () => {
    // 진행 중인 지연 카운팅이 있으면 취소
    if (isDelayedCounting) {
      cancelDelayedCounting()
    }
    setCount(0)
  }

  const startDelayedCounting = (operation: 'increment' | 'decrement') => {
    if (isDelayedCounting) return // 이미 진행 중이면 무시

    setIsDelayedCounting(true)
    setPendingOperation(operation)
    setProgress(0)

    // 프로그레스 바 업데이트 (100ms마다 2%씩 증가)
    const startTime = Date.now()
    const duration = 5000 // 5초

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime
      const newProgress = Math.min((elapsed / duration) * 100, 100)
      setProgress(newProgress)

      if (newProgress >= 100) {
        if (intervalRef.current) clearInterval(intervalRef.current)
      }
    }, 100)

    // 5초 후 실행
    timeoutRef.current = setTimeout(() => {
      if (operation === 'increment') {
        setCount(prevCount => prevCount + 1)
      } else {
        setCount(prevCount => prevCount - 1)
      }

      setIsDelayedCounting(false)
      setPendingOperation(null)
      setProgress(0)
      if (intervalRef.current) clearInterval(intervalRef.current)
    }, duration)
  }

  const cancelDelayedCounting = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setIsDelayedCounting(false)
    setPendingOperation(null)
    setProgress(0)
  }

  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  return (
    <div className="counter-page">
      <h1>올려 올려</h1>
      <div className="counter-container">
        <div className="counter-display">
          <span className="counter-number">{count}</span>
          {isDelayedCounting && (
            <div className="pending-operation">
              <span className="pending-text">
                {pendingOperation === 'increment' ? '+1' : '-1'} 대기 중...
              </span>
            </div>
          )}
        </div>

        {/* 즉시 실행 버튼 */}
        <div className="counter-buttons">
          <Button
            variant="danger"
            onClick={decrement}
            size="large"
            disabled={isDelayedCounting}
          >
            -1 (즉시)
          </Button>
          <Button
            variant="secondary"
            onClick={reset}
            size="large"
          >
            {isDelayedCounting ? '취소' : '리셋'}
          </Button>
          <Button
            variant="primary"
            onClick={increment}
            size="large"
            disabled={isDelayedCounting}
          >
            +1 (즉시)
          </Button>
        </div>

        {/* 5초 지연 버튼 */}
        <div className="delayed-buttons">
          <Button
            variant="danger"
            onClick={() => startDelayedCounting('decrement')}
            size="large"
            disabled={isDelayedCounting}
          >
            -1 (5초 후)
          </Button>
          <Button
            variant="primary"
            onClick={() => startDelayedCounting('increment')}
            size="large"
            disabled={isDelayedCounting}
          >
            +1 (5초 후)
          </Button>
        </div>

        {/* 프로그레스 바 */}
        {isDelayedCounting && (
          <div className="progress-container">
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="progress-text">
              {Math.round((5 - (progress / 100) * 5) * 10) / 10}초 남음
            </div>
            <Button
              variant="secondary"
              onClick={cancelDelayedCounting}
              size="small"
            >
              취소
            </Button>
          </div>
        )}

        <div className="counter-info">
          <p>현재 카운트: <strong>{count}</strong></p>
          <p>상태: {count > 0 ? '양수' : count < 0 ? '음수' : '영'}</p>
          {isDelayedCounting && (
            <p className="delayed-info">
              🕐 {pendingOperation === 'increment' ? '증가' : '감소'} 작업이 진행 중입니다...
            </p>
          )}
        </div>
      </div>
    </div>
  )
}