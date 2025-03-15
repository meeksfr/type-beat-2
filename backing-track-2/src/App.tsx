import { useState, useEffect } from 'react'
import Home from './pages/Home'

function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    fetch("/api/taste/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Home />
    </div>
  )
}

export default App
