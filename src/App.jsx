import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Navbar from "./componets/layout/Navbar"
import Footer from "./componets/layout/Footer"
import Home from "./componets/layout/Home"
import About from "./componets/layout/About"

function App() {
  return (
    <Router>
      <div className="flex flex-col justify-between h-screen">
        <Navbar/>
        <Routes>
          <Route exact path="/" element={<Home/>}></Route> 
          <Route exact path="/about" element={<About/>}></Route>
        </Routes>
        <Footer/>
      </div>
    </Router>
  )
}
export default App