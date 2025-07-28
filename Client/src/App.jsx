import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import AuthProvider from './context/AuthContext'
import About from './pages/About'
import Contact from './pages/Contact'
import Footer from './pages/Footer'
import Complaint from './pages/Complaint'
import Member from './pages/Member'
import Profile from './pages/Profile'
import ApplyMembership from './pages/ApplyMembership'
import AdminMembership from './pages/AdminMembership'
import Announcement from './pages/Announcement'
import ScrollToTop  from './components/ScrollToTop '
import ForgotPassword from './pages/ForgotPassword'
import VerifyOTP from './pages/VerifyOTP'

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop/>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword/>} />
          <Route path="/verify-otp" element={<VerifyOTP/>} />

          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/complaint" element={<Complaint />} />
          <Route path="/member" element={<Member />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/Announcement" element={<Announcement/>} />
          <Route path="/membership/apply" element={<ApplyMembership />} />
          <Route path="/membership/all" element={<AdminMembership />} />
          {/* manage same component or combine */}
          <Route path="/membership/manage" element={<AdminMembership/>} />

        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  )
}

export default App
