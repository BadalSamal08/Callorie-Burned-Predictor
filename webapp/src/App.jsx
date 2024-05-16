import { useState } from 'react'
import Navbar from './Components/Navbar'
import Base from './Components/Base'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Navbar />
        <Base />
      </div>
    </>
  )
}

export default App
