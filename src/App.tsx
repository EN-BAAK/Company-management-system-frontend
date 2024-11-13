import React from "react"
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import { useAppContext } from "./context/AppProvider"
import Login from "./pages/Login"
import BottomNav from "./layouts/BottomNav"
import SettingsNav from "./pages/SettingsNav"
import Workers from "./pages/Workers"
import Companies from "./pages/Companies"
import AdminSettings from "./pages/AdminSettings"
import Shifts from "./pages/Shifts"
import EmptyPage from "./pages/EmptyPage"

const App = (): React.JSX.Element => {
  const { isLoggedIn, user } = useAppContext()

  return (
    <main id="App" className="d-flex flex-column">
      <Router>
        <Routes>
          {isLoggedIn ?
            <React.Fragment>
              {user.role === "admin" && (
                <React.Fragment>
                  <Route path="/settings" element={<SettingsNav />} />
                  <Route path="/settings/workers" element={<Workers />} />
                  <Route path="/settings/companies" element={<Companies />} />
                  <Route path="/settings/admin" element={<AdminSettings />} />
                </React.Fragment>
              )}
              <Route path="/" element={<Shifts />} />
              <Route path="*" element={<EmptyPage />} />
            </React.Fragment>
            :
            <React.Fragment>
              <Route path="/" element={<Login />} />
            </React.Fragment>
          }
        </Routes>
        {isLoggedIn && user.role === "admin" && <BottomNav />}
      </Router>
    </main>
  )
}

export default App
