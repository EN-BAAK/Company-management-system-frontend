import React from "react"
import { BrowserRouter as Router, Routes } from "react-router-dom"
import { useAppContext } from "./context/AppProvider"

const App = (): React.JSX.Element => {
  const { isLoggedIn } = useAppContext()

  return (
    <main id="App">
      <Router>
        <Routes>
          {isLoggedIn ?
            <React.Fragment>

            </React.Fragment>
            :
            <React.Fragment>
              
            </React.Fragment>
          }
        </Routes>
      </Router>
    </main>
  )
}

export default App
