import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Signup from './pages/Signup'

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
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
