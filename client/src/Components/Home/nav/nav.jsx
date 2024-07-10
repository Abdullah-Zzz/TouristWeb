import React from "react"
import './nav.css'
import axios from "axios"
import {Link} from "react-router-dom"
axios.defaults.withCredentials = true;

export default function Nav() {

  const [user, setUser] = React.useState({})
  const [hamValue, sethamValue] = React.useState(true)

  const userInfo = async () =>{
      const res = await axios.get(`http://localhost:8080/users/api/user`,{
        validateStatus: (status) =>{

          return status < 500;
        },
        withCredentials:true
      })
      .catch(err =>{
        console.log(err)
      })
      const data = await res.data
      return data
      
    }
    React.useEffect(()=>{
      userInfo().then(data => setUser(data))
    },[])

    async function loggingOut (){
      try{

        const cookie = document.cookie;
        document.cookie = `${cookie}; Max-Age=0; Path=/`
        location.reload()
        
      }
      catch(err){
        throw err
      }
      
    }

    return (
      <nav className={hamValue ? "navbar-nav" : "navbar-navMobile"}>
        <div className="navbar-mainHead"> 
        <h1>Trippy</h1>
        <div className={hamValue ? "navbar-hamIcon" : "navbar-change"} onClick={() =>sethamValue(preValue => !preValue)}>
          <div className="navbar-bar1"></div>
          <div className="navbar-bar2"></div>
          <div className="navbar-bar3"></div>
        </div>

        </div>
        <div className={hamValue ? "navbar-navList" : "navbar-navListMobile"}>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>

            <Link to={Object.keys(user).length === 0 ? "/login" : "#"}>
              <button className={Object.keys(user).length === 0  ? "navbar-navBtn" : "navbar-username"}>
                {Object.keys(user).length === 0 ? "login" :  user.user.name}
              </button>
              
            </Link>
            {
              Object.keys(user).length === 0 ?
              <Link to="/register">
                <button className='navbar-navBtn'>
                  register 
                </button>
              </Link>
              :
              
            <button className="navbar-logoutBtn" onClick={() =>loggingOut()}>
              logout
            </button>
            }
          </ul>
        </div>
      </nav>
  )}