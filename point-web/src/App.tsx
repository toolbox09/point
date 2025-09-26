import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Button from './components/Button'
import RadioButton from './components/RadioButton'
import RadioButtonGroup from './components/RadioButtonGroup'

function App() {
  const [count, setCount] = useState(0)
  const [selectedOption, setSelectedOption] = useState('option1')
  const [selectedSize, setSelectedSize] = useState('medium')

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
        <Button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </Button>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
          <Button variant="primary" size="small">Primary Small</Button>
          <Button variant="secondary" size="medium">Secondary Medium</Button>
          <Button variant="danger" size="large">Danger Large</Button>
          <Button variant="primary" isLoading>Loading...</Button>
          <Button variant="secondary" disabled>Disabled</Button>
        </div>

        <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
          <h3>Radio Button Examples</h3>

          <div style={{ marginBottom: '1.5rem' }}>
            <h4>Basic Options (선택됨: {selectedOption})</h4>
            <RadioButtonGroup
              name="options"
              value={selectedOption}
              onChange={setSelectedOption}
              direction="vertical"
            >
              <RadioButton name="options" value="option1" checked={selectedOption === 'option1'} label="첫 번째 옵션" />
              <RadioButton name="options" value="option2" checked={selectedOption === 'option2'} label="두 번째 옵션" />
              <RadioButton name="options" value="option3" checked={selectedOption === 'option3'} label="세 번째 옵션" />
              <RadioButton name="options" value="option4" checked={selectedOption === 'option4'} label="비활성화된 옵션" disabled />
            </RadioButtonGroup>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h4>Size Examples (선택됨: {selectedSize})</h4>
            <RadioButtonGroup
              name="sizes"
              value={selectedSize}
              onChange={setSelectedSize}
              direction="horizontal"
              gap="large"
            >
              <RadioButton name="sizes" value="small" checked={selectedSize === 'small'} label="Small" size="small" />
              <RadioButton name="sizes" value="medium" checked={selectedSize === 'medium'} label="Medium" size="medium" />
              <RadioButton name="sizes" value="large" checked={selectedSize === 'large'} label="Large" size="large" />
            </RadioButtonGroup>
          </div>
        </div>

        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
