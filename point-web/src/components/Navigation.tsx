import { NavLink } from 'react-router-dom'
import './Navigation.css'

export default function Navigation() {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-brand">
          <NavLink to="/" className="brand-link">
            <h1>Point Web</h1>
          </NavLink>
        </div>
        <nav className="header-nav">
          <NavLink
            to="/"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            홈
          </NavLink>
          <NavLink
            to="/counter"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            카운터
          </NavLink>
          <NavLink
            to="/posts"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            포스트
          </NavLink>
        </nav>
      </div>
    </header>
  )
}