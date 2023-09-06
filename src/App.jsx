
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './components/Home/Home'
import Header from './components/Layout/Header/Header'
import Courses from './components/Courses/Courses'
import Footer from './components/Layout/Footer/Footer'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import ForgetPassword from './components/Auth/ForgetPassword'
import ResetPassword from './components/Auth/ResetPassword'
import Contact from './components/contact/Contact'
import Request from './components/Request/Request'
import About from './components/About/About'
import Subscribe from './components/Payments/Subscribe'
import PaymentFail from './components/Payments/PaymentFail'
import PaymentSuccess from './components/Payments/PaymentSuccess'
import NotFound from './components/Layout/NotFound/NotFound'
import CoursePage from './components/CourseDetails/CoursePage'
import Profile from './components/Profile/Profile'
import ChangePassword from './components/Profile/ChangePassword'
import UpdateProfile from './components/Profile/UpdateProfile'
import Dashboard from './components/Admin/Dashboard/Dashboard'
import CreateCourse from './components/Admin/CreateCourse/CreateCourse'
import AdminCourses from './components/Admin/AdminCourses/AdminCourses'
import Users from './components/Admin/Users/Users'
import { useDispatch, useSelector } from 'react-redux'
import toast, { Toaster } from 'react-hot-toast'
import { useEffect } from 'react'
import { loadUser } from './redux/actions/user'
import { ProtectedRoute } from 'protected-route-react'
import Loader from './components/Layout/Loader/Loader'

function App() {

  window.addEventListener('contextmenu', e => {
    e.preventDefault();
  })

  const { isAuthenticated, user, error, message, loading } = useSelector(state => state.user)

  // console.log(message)
  // console.log(error)

  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, error, message]);

  useEffect(() => {
    dispatch(loadUser())
  }, [dispatch])

  return (
    <Router>
      {
        loading ? (<Loader />) : (
          <>

            <Header isAuthenticated={isAuthenticated} user={user} />
            <Routes>
              <Route path='/' element={
                <>
                  <Home />
                  <div className='sticky '>
                    <Footer />
                  </div>
                </>
              } />
              <Route path='/courses' element={
                <>
                  <Courses />
                  <div className='sticky '>
                    <Footer />
                  </div>
                </>
              } />

              {/* If it is isAuthenticated then it will be redirected to /profile url. */}
              <Route path='/login' element={
                <ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/profile">
                  <>
                    <Login />
                    <div className='sticky '>
                      <Footer />
                    </div>
                  </>
                </ProtectedRoute>
              } />
              <Route path='/register' element={
                <ProtectedRoute
                  isAuthenticated={!isAuthenticated}
                  redirect="/profile">
                  <>
                    <Register />
                    <div className='sticky '>
                      <Footer />
                    </div>

                  </>

                </ProtectedRoute>
              } />
              <Route path='/forgetpassword' element={
                <ProtectedRoute
                  isAuthenticated={!isAuthenticated}
                  redirect="/profile"
                >
                  <>
                    <ForgetPassword />
                    <div className='sticky '>
                      <Footer />
                    </div>

                  </>

                </ProtectedRoute>
              } />
              <Route path='/resetpassword/:token' element={
                <ProtectedRoute
                  isAuthenticated={!isAuthenticated}
                  redirect="/profile">
                  <> <ResetPassword />
                    <div className='sticky '>
                      <Footer />
                    </div>

                  </>

                </ProtectedRoute>
              } />
              <Route path='/contact' element={
                <>   <Contact />
                  <div className='sticky '>
                    <Footer />
                  </div>


                </>
              } />
              <Route path='/request' element={
                <> <Request />
                  <div className='sticky '>
                    <Footer />
                  </div>

                </>
              } />
              <Route path='/about' element={
                <> <About />
                  <div className='sticky '>
                    <Footer />
                  </div>

                </>
              } />
              <Route path='/subscribe' element={
                <ProtectedRoute
                  isAuthenticated={isAuthenticated}
                >
                  <>  <Subscribe user={user} />
                    <div className='sticky '>
                      <Footer />
                    </div>

                  </>

                </ProtectedRoute>
              } />
              <Route path='/paymentsfail' element={
                <>   <PaymentFail />
                  <div className='sticky '>
                    <Footer />
                  </div>

                </>
              } />
              <Route path='/paymentssuccess' element={
                <>   <PaymentSuccess />
                  <div className='sticky '>
                    <Footer />

                  </div>

                </>
              } />
              <Route path='/*' element={
                <> <NotFound />
                  <div className='sticky '>
                    <Footer />

                  </div>


                </>
              } />
              <Route path='/courses/:id' element={
                <ProtectedRoute
                  isAuthenticated={isAuthenticated}
                >
                  <>  <CoursePage user={user} />
                    {/* <div className='sticky '>
                      <Footer />
                    </div> */}

                  </>

                </ProtectedRoute>
              } />
              <Route path='/profile' element={
                <ProtectedRoute
                  isAuthenticated={isAuthenticated}
                >
                  <>

                    <Profile user={user} />
                  </>

                </ProtectedRoute>
              } />
              <Route path='/changepassword' element={
                <ProtectedRoute
                  isAuthenticated={isAuthenticated}
                >
                  <>    <ChangePassword />
                    <div className='sticky '>
                      <Footer />
                    </div>

                  </>

                </ProtectedRoute>
              } />
              <Route path='/updateprofile' element={
                <ProtectedRoute
                  isAuthenticated={isAuthenticated}
                >
                  <>  <UpdateProfile user={user} />
                    <div className='sticky '>
                      <Footer />
                    </div>

                  </>

                </ProtectedRoute>
              } />

              {/* Admin Routes */}
              <Route path='/admin/dashboard' element={
                <ProtectedRoute
                  isAuthenticated={isAuthenticated}
                  adminRoute={true}
                  isAdmin={user && user.role === 'admin'}
                >
                  <> <Dashboard />
                    <div className='sticky '>
                      <Footer />
                    </div>

                  </>

                </ProtectedRoute>
              } />
              <Route path='/admin/createcourse' element={

                <ProtectedRoute
                  isAuthenticated={isAuthenticated}
                  adminRoute={true}
                  isAdmin={user && user.role === 'admin'}
                >
                  <> <CreateCourse />
                    <div className='sticky '>
                      <Footer />
                    </div>

                  </>

                </ProtectedRoute>
              } />
              <Route path='/admin/courses' element={
                <ProtectedRoute
                  isAuthenticated={isAuthenticated}
                  adminRoute={true}
                  isAdmin={user && user.role === 'admin'}
                >
                  <>
                    <AdminCourses />
                    <div className='sticky '>
                      <Footer />
                    </div>

                  </>

                </ProtectedRoute>
              } />
              <Route path='/admin/users' element={
                <ProtectedRoute
                  isAuthenticated={isAuthenticated}
                  adminRoute={true}
                  isAdmin={user && user.role === 'admin'}
                >
                  <> <Users />
                    <div className='sticky '>
                      <Footer />
                    </div>

                  </>

                </ProtectedRoute>
              } />
            </Routes>
            <Toaster />
          </>
        )
      }
    </Router>
  )
}

export default App
