import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/home'
import About from './pages/About'

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route 
              path='/about'
              element={
                <>
                  <About />
                </>
              }
          />
          <Route 
            path='/login'
            element={
              <>
                <Login />
              </>
            }
          />
          <Route 
            path='/signup'
            element={
              <>
                <Signup />
              </>
            }
          />
          <Route 
            path='/home'
            element={
              <>
                <Home />
              </>
            }
          />
          <Route 
            path='/'
            element={
              <>
                <Home />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
