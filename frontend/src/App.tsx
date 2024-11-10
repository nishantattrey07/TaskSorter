import './App.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
function App() {


  return (
    <>
      <RecoilRoot>
      <Router>
        <Routes>
            <Route path='/' element={<Signin />} />
            <Route path='/signin' element={<Signin />} />
            <Route path='/signup' element={<Signup/>} />
            <Route path='/dashboard' element={<Dashboard/>}/>

          
        </Routes>
        </Router>
        </RecoilRoot>
    </>
  )
}

export default App
