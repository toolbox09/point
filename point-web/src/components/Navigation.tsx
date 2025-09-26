import { NavLink } from 'react-router-dom'
import './Navigation.css'

export default function Navigation() {
  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-brand">
          <h2>Point Web</h2>
        </div>
        <div className="nav-menu">
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
        </div>
      </div>
    </nav>
  )
}