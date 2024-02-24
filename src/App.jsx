import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import AuthorPage from './pages/AuthorPage'
import Home from './components/Home/Home'
import ProtectedRoute from './components/ProtectecRoute/ProtectedRoute'

function App() {
  return (
    <>
      <Routes>
        {/* ---- Home dashboard ---- */}
        <Route path='/' element={<HomePage />}>

          <Route path='/' element={<Home />} />
        </Route>

        {/* ---- Author dashboard ---- */}
        <Route path='/author' element={<ProtectedRoute><AuthorPage /></ProtectedRoute>}>

          <Route path='/author' element={<Home />} />
        </Route>



        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App
