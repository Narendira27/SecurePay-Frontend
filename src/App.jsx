import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signin from './pages/signin'
import Signup from './pages/signup'
import Dashboard from './pages/dashboard'
import Send from './pages/send'
import NotFound from './pages/notfound'
import ProtectedRoute from './route/protectedRoute'
import RootRoute from './route/rootRoute'

// SecurePay

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<RootRoute />} />
        < Route path='/signup' element={<Signup />} />
        < Route path='/signin' element={<Signin />} />
        < Route path='/dashboard' element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>} />
        < Route path='/send' element={<ProtectedRoute> <Send /> </ProtectedRoute>} />
        < Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
