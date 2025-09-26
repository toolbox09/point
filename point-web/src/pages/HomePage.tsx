import { Link } from 'react-router-dom'
import Button from '../components/Button'
import Checkbox from '../components/Checkbox'
import RadioButton from '../components/RadioButton'
import RadioButtonGroup from '../components/RadioButtonGroup'
import { useState } from 'react'
import './HomePage.css'

export default function HomePage() {
  const [selectedOption, setSelectedOption] = useState('option1')
  const [selectedSize, setSelectedSize] = useState('medium')

  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>안녕하세요! Point Web에 오신 것을 환영합니다</h1>
        <p>React Router를 활용한 멀티 페이지 애플리케이션입니다.</p>
        <div className="hero-actions">
          <Link to="/counter">
            <Button variant="primary" size="large">카운터 페이지</Button>
          </Link>
          <Link to="/posts">
            <Button variant="secondary" size="large">포스트 페이지</Button>
          </Link>
        </div>
      </div>

      <div className="components-demo">
        <h2>컴포넌트 데모</h2>

        <div className="demo-section">
          <h3>Button 컴포넌트</h3>
          <div className="button-demo">
            <Button variant="primary" size="small">Primary Small</Button>
            <Button variant="secondary" size="medium">Secondary Medium</Button>
            <Button variant="danger" size="large">Danger Large</Button>
            <Button variant="primary" isLoading>Loading...</Button>
            <Button variant="secondary" disabled>Disabled</Button>
          </div>
        </div>

        <div className="demo-section">
          <h3>Checkbox 컴포넌트</h3>
          <div className="checkbox-demo">
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
          </div>
        </div>

        <div className="demo-section">
          <h3>Radio Button 컴포넌트</h3>
          <div className="radio-demo">
            <h4>기본 옵션 (선택됨: {selectedOption})</h4>
            <RadioButtonGroup
              name="options"
              value={selectedOption}
              onChange={setSelectedOption}
              direction="vertical"
            >
              <RadioButton name="options" value="option1" checked={selectedOption === 'option1'} label="첫 번째 옵션" />
              <RadioButton name="options" value="option2" checked={selectedOption === 'option2'} label="두 번째 옵션" />
              <RadioButton name="options" value="option3" checked={selectedOption === 'option3'} label="세 번째 옵션" />
            </RadioButtonGroup>

            <h4>크기 옵션 (선택됨: {selectedSize})</h4>
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
      </div>
    </div>
  )
}