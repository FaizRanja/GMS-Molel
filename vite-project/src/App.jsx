import React from 'react'
import  { BrowserRouter as Router , Routes, Route } from "react-router-dom"
import RegisterUser from './Components/Auth/RegisterUser'
import GsmData from './Components/GSM/GsmData'
 const App = () => {
  return (
  <>
 <Router>
    <Routes>
      <Route path='/' element ={<GsmData/>}  />
    </Routes>
   </Router>
  </>
  )
}

export default App
