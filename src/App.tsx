import React from "react"
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import { useAppContext } from "./context/AppProvider"
import Login from "./pages/Login"

const App = (): React.JSX.Element => {
  const { isLoggedIn } = useAppContext()

  return (
    <main id="App">
      <Router>
        <Routes>
          {isLoggedIn ?
            <React.Fragment>
              fsdf
            </React.Fragment>
            :
            <React.Fragment>
              <Route path="/" element={<Login />} />
            </React.Fragment>
          }
        </Routes>
      </Router>
    </main>
  )
}

export default App
