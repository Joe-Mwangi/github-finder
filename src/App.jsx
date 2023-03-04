import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./componets/layout/Navbar"
import Footer from "./componets/layout/Footer"
import Home from "./componets/layout/pages/Home"
import About from "./componets/layout/pages/About"
import Notfound from "./componets/layout/pages/Notfound"
import GithubProvider from "./context/github/GithubContext"
import AlertProvider from "./context/alert/AlertContext"
import Alert from "./componets/layout/Alert"
import User from "./componets/layout/pages/User"

function App() {
  return (
    <GithubProvider>
      <AlertProvider>
        <Router>
          <div className="flex flex-col justify-between h-screen">
            <Navbar/>
            <main className="container mx-auto px-3 pb-12">
              <Alert />
              <Routes>
                <Route path="/" element={<Home/>}></Route> 
                <Route path="/about" element={<About/>}></Route>
                <Route path="/user/:login" element={<User/>}></Route>
                <Route path="/*" element={<Notfound/>}></Route>
              </Routes>
            </main>
            <Footer/>
          </div>
        </Router>
      </AlertProvider>  
    </GithubProvider>
  )
}
export default App