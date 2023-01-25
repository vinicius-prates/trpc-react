import { useEffect, useState } from 'react'
import './App.css'


function App() {
  const [sneakerData, setSneakerData] = useState();
  useEffect(() => {
  
    fetch("http://localhost:4000/sneakers")
    .then((res) => res.json()
    .then((res) => {
      setSneakerData(res)
    }));

  },[])

  return (
    <div>
      <h1>dale</h1>
      <p></p>

    </div>
  )
}

export default App
