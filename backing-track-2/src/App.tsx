import { useState, useEffect } from 'react'
import Home from './pages/Home'
import { ThemeProvider } from '@mui/material/styles'
import theme from './theme'

function App() {
  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {
    fetch("/api/taste/auth", {
      method: "POST"
    })
      .then((res) => {
        if (res.ok) {
          setAuthorized(true)
        } else {
          setAuthorized(false)
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div>
        {authorized ? <Home /> : <div>Failed to authorize with Spotify ://</div>}
      </div>
    </ThemeProvider>
  )
}

export default App
