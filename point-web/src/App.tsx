import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import HomePage from './pages/HomePage'
import CounterPage from './pages/CounterPage'
import PostsPage from './pages/PostsPage'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/counter" element={<CounterPage />} />
            <Route path="/posts" element={<PostsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
