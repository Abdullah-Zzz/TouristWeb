import React from "react";
import axios from "axios"
import { Link } from "react-router-dom"
import "./login.css"
import Footer from "../Home/Footer/Footer";
import dev from "/Images/dev.png"
import Nav from "../Home/nav/nav"
import { useNavigate } from "react-router-dom";

export default function Login() {
    
    const navigate =  useNavigate()
    const cookie = document.cookie

    React.useEffect(() =>{
        if(cookie){
            navigate('/')
        }
    },[])
   

    const [errorStyles,seterrorStyles]=React.useState({
        color:"rgb(200,0,0)",
        display:"inline",
        visibility :"none",
    })

    const [errorMessage, seterrorMessage] = React.useState("")

    const [PostData, setPostData] = React.useState({
    email:"",
    password: "",
    })

    function handleSubmit(e){
        e.preventDefault()
        axios.post('http://127.0.0.1:8080/users/login' , {email:PostData.email, password:PostData.password},{
            validateStatus: function (status) {
                return status < 500; 
            }
        })
        .then(res => {
            if(res.status === 200 ){
                const token = res.data.token
                document.cookie=`myCookie=${token} ; Max-Age=3000; Path=/`
                navigate('/')
                window.location.reload()
            }
            else if (res.status === 401 || 404 ){
                seterrorMessage(res.data)
                seterrorStyles({...errorStyles, visibility:'visible'})
            }   
        })
        .catch(err => {seterrorMessage('An error has occurred, please refresh the page') 
        })
    }
    return (
        <>
            <Nav />
            <section className="login-section">
                <div className="login-container">
                    <div className="login-photoSection">
                        <img src={dev} />
                    </div>
                    <div className="login-formSection">
                        <h2>Login</h2>
                        <form method="POST" onSubmit={handleSubmit} className="login-form">
                            <label className="errorMsg" style={errorStyles}>{errorMessage}</label>
                            <input type="email" placeholder="Email" name="email" required onChange={(e) => setPostData({...PostData, email:e.target.value})}/>
                            <input type="password" placeholder="Password" name="password" required onChange={(e) => setPostData({...PostData, password:e.target.value})}/>
                            <button className="subBtn">Login</button>
                        </form>
                        <p>Register <Link to="/register"> Here</Link></p>
                    </div>

                </div>

            </section>
            <Footer />
        </>
    )
}