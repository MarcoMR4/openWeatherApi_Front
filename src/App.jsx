import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './Screens/Home'

// Colocar el pronostico de lluvia para la ciudad requerida 

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Home/>
    </>
  )
}

export default App
