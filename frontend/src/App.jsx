import { useState, useEffect } from 'react'
import RegisterForm from './components/RegisterForm'
import Dashboard from './components/Dashboard'
import './App.css'

function App() {
  const [userId, setUserId] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const savedUserId = localStorage.getItem('userId')
    if (savedUserId) {
      setUserId(parseInt(savedUserId))
    }
    setIsLoading(false)
  }, [])

  const handleRegisterSuccess = (newUserId) => {
    setUserId(newUserId)
    localStorage.setItem('userId', newUserId.toString())
  }

  const handleLogout = () => {
    setUserId(null)
    localStorage.removeItem('userId')
  }

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading FinSight...</p>
      </div>
    )
  }

  return (
    <>
      {userId ? (
        <Dashboard userId={userId} onLogout={handleLogout} />
      ) : (
        <RegisterForm onRegisterSuccess={handleRegisterSuccess} />
      )}
    </>
  )
}

export default App
