import { useState, useEffect } from 'react'
import Button from '../components/Button'
import './HomePage.css'

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const features = [
    {
      icon: '⚡',
      title: '빠른 성능',
      description: 'React 19와 Vite를 활용한 최신 기술 스택으로 빠른 개발과 실행 속도를 제공합니다.'
    },
    {
      icon: '🎨',
      title: '모던 디자인',
      description: 'Ant Design에서 영감을 받은 깔끔하고 직관적인 사용자 인터페이스를 경험해보세요.'
    },
    {
      icon: '📱',
      title: '반응형 웹',
      description: '모든 디바이스에서 완벽하게 작동하는 반응형 웹 디자인을 지원합니다.'
    },
    {
      icon: '🔧',
      title: '개발자 친화적',
      description: 'TypeScript와 ESLint를 통한 안정적이고 유지보수 가능한 코드를 작성합니다.'
    }
  ]

  const stats = [
    { number: '100%', label: 'TypeScript' },
    { number: 'React 19', label: 'Latest Version' },
    { number: '⚡', label: 'Vite Powered' },
    { number: '🎨', label: 'Modern UI' }
  ]

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className={`hero-section ${isVisible ? 'visible' : ''}`}>
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-text">새로운 웹 경험</span>
            </div>

            <h1 className="hero-title">
              <span className="title-gradient">Point Web App</span>
            </h1>

            <p className="hero-description">
              모던한 기술 스택과 아름다운 디자인으로 만든 웹 애플리케이션입니다.
              <br />
              React, TypeScript, Vite를 활용하여 최고의 개발 경험을 제공합니다.
            </p>

            <div className="hero-actions">
              <Button
                variant="primary"
                size="large"
                onClick={() => window.location.href = '/counter'}
              >
                시작하기
              </Button>
              <Button
                variant="secondary"
                size="large"
                onClick={() => window.location.href = '/posts'}
              >
                더 알아보기
              </Button>
            </div>
          </div>

          <div className="hero-visual">
            <div className="visual-cards">
              <div className="visual-card card-1">
                <div className="card-content">
                  <div className="card-icon">⚡</div>
                  <div className="card-title">Fast</div>
                </div>
              </div>
              <div className="visual-card card-2">
                <div className="card-content">
                  <div className="card-icon">🎨</div>
                  <div className="card-title">Beautiful</div>
                </div>
              </div>
              <div className="visual-card card-3">
                <div className="card-content">
                  <div className="card-icon">🚀</div>
                  <div className="card-title">Modern</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-container">
          <div className="section-header">
            <h2>주요 특징</h2>
            <p>Point Web App이 제공하는 핵심 기능들을 살펴보세요</p>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="section-container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="section-container">
          <div className="cta-content">
            <h2>지금 시작해보세요</h2>
            <p>Point Web App의 모든 기능을 직접 체험해보세요</p>
            <div className="cta-actions">
              <Button
                variant="primary"
                size="large"
                onClick={() => window.location.href = '/counter'}
              >
                카운터 체험
              </Button>
              <Button
                variant="secondary"
                size="large"
                onClick={() => window.location.href = '/posts'}
              >
                포스트 관리
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}