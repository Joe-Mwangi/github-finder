import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Navbar from "./componets/layout/Navbar"
import Footer from "./componets/layout/Footer"
import Home from "./componets/layout/pages/Home"
import About from "./componets/layout/pages/About"
import Notfound from "./componets/layout/pages/Notfound"

function App() {
  return (
    <Router>
      <div className="flex flex-col justify-between h-screen">
        <Navbar/>
        <main className="container mx-auto px-3 pb-12">
          <Routes>
            <Route path="/" element={<Home/>}></Route> 
            <Route path="/about" element={<About/>}></Route>
            <Route path="/*" element={<Notfound/>}></Route>
          </Routes>
        </main>
        <Footer/>
      </div>
    </Router>
  )
}
export default App