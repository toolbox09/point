import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Checkbox from './components/Checkbox'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>안녕하세요</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <div className="checkbox-demo">
        <h3>체크박스 컴포넌트 테스트</h3>
        <Checkbox
          id="checkbox1"
          label="기본 체크박스"
          onChange={(checked) => console.log('체크박스 1:', checked)}
        />
        <Checkbox
          id="checkbox2"
          label="초기값이 체크된 상태"
          checked={true}
          onChange={(checked) => console.log('체크박스 2:', checked)}
        />
        <Checkbox
          id="checkbox3"
          label="비활성화된 체크박스"
          disabled={true}
        />
        <Checkbox
          id="checkbox4"
          label="비활성화 + 체크된 상태"
          checked={true}
          disabled={true}
        />
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
