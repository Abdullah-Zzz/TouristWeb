import Home from "./Components/Home/home"
import Login from "./Components/Login/Login"
import Register from "./Components/Register/register"
import Tours from "./Components/Tours/tours"
import Booking from "./Components/booking/booking"
import AboutUs from "./Components/aboutus/aboutUs"
import { Routes, Route } from "react-router-dom"
import NotFound from "./Components/404notfound/404"
import Packages from "./Components/Tours/package/packages"
import Provinces from "./Components/provinces/provinces"
import Customize from "./Components/customize/customize"
import Table from "./Components/inclusionTable/table"

function App() {
  const cookie = document.cookie;
  return (
    <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />} />
        <Route path="/trips" element={<Provinces />} />
        <Route path="/trips/:productId" element={<Tours />} />
        <Route path="/booking/:productId" element={<Packages />} />
        <Route path="/booking/:productId/:packageId" element={<Booking />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/customize" element={<Customize />} />
        <Route path="/table" element={<Table />}/>
        <Route path="*" element={<NotFound />}/>
    </Routes>
  )
}

export default App