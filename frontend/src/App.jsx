import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Homepage from './pages/Homepage'

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
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
                <Homepage />
              </>
            }
          />
          <Route 
            path='/'
            element={
              <>
                <Homepage />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
