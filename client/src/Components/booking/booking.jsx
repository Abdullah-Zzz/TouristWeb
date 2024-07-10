import React, { useEffect } from "react";
import Nav from "../Home/nav/nav";
import "./booking.css"
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import  ImageSlider from "../Slider/ImageSlider";
import Table from "../inclusionTable/table";

export default function Booking() {
    const navigate = useNavigate()
    const cookie = document.cookie
    const Backend_URL = "http://localhost:8080"
    
    React.useEffect(() => {
        if (!cookie) {  
            navigate('/login')
        }
    }, [])

    const [Total, setTotal] = React.useState(1);
    const [pageInfo, setpageInfo] = React.useState()
    const [error, setError] = React.useState("");
    const { productId, packageId } = useParams();
    const [reservationInfo, setreservationInfo] = React.useState({
        name: "",
        number: Number,
        people: 0,
        packageName :'',
        transportation :"air"
    })
    const [bookedInfo, setbookedInfo] = React.useState("")
    useEffect(() => {
        const fetchInformation = async () => {
            try {
                const res = await axios.get(`${Backend_URL}/api/booking/${productId}/${packageId}`, {
                    validateStatus: (status) => {
                        return status < 500;
                    }
                })
                const data = res.data.mainData[0].packages.filter((pack) =>{
                  return pack.id === packageId 
                })
                setpageInfo(data[0])
            }
            catch (err) {
                console.log(err)
            }
        }
        fetchInformation();
    }, [productId])

    function settingInput(event) {
        const name = event.target.name;
        const value = event.target.value
        setreservationInfo({ ...reservationInfo, [name]: value })
    }

    function totalPrice(event) {
        const value = parseInt(event.target.value, 10);

        if (!isNaN(value) && value <= 10) {
            setTotal(value);
        } else {
            event.target.value = '';
        }
        settingInput(event)
    }

    function handleInput(event) {
        let value = event.target.value;
        value = value.replace(/\D/g, '');
        event.target.value = value;
    }

    const handleSubmit = async () => {
        const popUp = document.getElementById("booking-popUp");
        try {
            const res = await axios.post(`${Backend_URL}/api/booked`, {
                name: reservationInfo.name,
                number: reservationInfo.number,
                people: reservationInfo.people,
                packageName :pageInfo && pageInfo.package_name,
                transportation : reservationInfo.transportation
            }, {
                validateStatus: (status) => {
                    return status < 500;
                }
            })
            if(res.status == 200){
                const data = res.data
                setError("")
                setbookedInfo(data)
            }
            else{
                const data = res.data 
                popUp.style.display = "none";
                setError(data)
            }
        }
        catch (err) {
            setbookedInfo(err)
        }
    }
    const popupCancel = () => {
        const popUp = document.getElementById("booking-popUp");
        popUp.style.display = "none";
    }
    const confirmationPopUp = (e) => {
        e.preventDefault()
        const popUp = document.getElementById("booking-popUp");
        popUp.style.display = "flex";
    }
    console.log(reservationInfo)
    return (
        <section className="booking-mainContainer">
            <Nav />
            < div className="booking-popUp" id="booking-popUp">
                    <div className="booking-confirmation">
                        <p>
                            {bookedInfo === "" ? "Are you sure you want to book this trip?" : bookedInfo}
                        </p>
                    </div>
                    <div className="booking-popUpButtons">
                        {bookedInfo === "" ? <button className="booking-popUp-cancelbtn" onClick={popupCancel}>Cancel</button> : null}
                        {bookedInfo === "" ? <button className="booking-popUp-okbtn" onClick={handleSubmit}>Ok</button> : <button className="booking-popUp-bookedOkbtn" onClick={(e) => { setbookedInfo(""); popupCancel(e) }}>Ok</button>}
                    </div>
                </div>
            <section className="booking-body">
                
                <section className="booking-parentSection">
                    <section className="booking-infoSection">
                        <div className="booking-mainImage" >
                          {pageInfo && <ImageSlider imageURLs={pageInfo && pageInfo.image_url} /> }
                        </div>
                        <section className="booking-information">
                            <h2 className="booking-name">{pageInfo && pageInfo.package_name}</h2>
                            <div className="booking-city">
                                <img src="/Images/location.png" />
                                <p>{pageInfo && pageInfo.city}</p>
                            </div>
                            <div className="booking-priceAndDistance">
                                <div className="booking-price">

                                    <img src="/Images/dollar-symbol.png" />
                                    <p>{pageInfo && pageInfo.price} PKR/per person</p>
                                </div>
                            </div>
                            <div className="booking-description">
                                <h2>Description</h2>
                                <p>
                                    {pageInfo && pageInfo.description}
                                </p>
                                <h2>Tour Duration</h2>
                                <p>The whole tour will be of {pageInfo && pageInfo.duration}.</p>

                                {/* <ul>
                                    {pageInfo && pageInfo.details.tour_inclusion.map((para, index) => {
                                        return (
                                            <li key={index}>{para}.</li>
                                        )
                                    })}
                                </ul>
                                <h2>Tour Exclusion</h2>
                                <ul>
                                    {pageInfo && pageInfo.details.tour_exclusion.map((para, index) => {
                                        return (
                                            <li key={index}>{para}.</li>
                                        )
                                    })}
                                </ul>
                                <h2>Tour Itinearary</h2>
                                <ul>
                                    {pageInfo && pageInfo.details.tour_itinerary.map((para, index) => {
                                        return (
                                            <li key={index}>{para}.</li>
                                        )
                                    })}
                                </ul> */}
                                <Table 
                                    inclusion={pageInfo && pageInfo.details.tour_inclusion}
                                    exclusion = {pageInfo && pageInfo.details.tour_exclusion}
                                    itinerary = {pageInfo && pageInfo.details.tour_itinerary}
                                />
                            </div>
                        </section>
                    </section>
                    <section className="booking-paymentSection">
                        <div className="booking-cost">
                            <h3>{pageInfo && pageInfo.price} PKR</h3>
                            <p> /per person</p>
                        </div>
                        <div className="booking-paymentForm">
                            <div className="booking-paymentFormHead"><h4>Information</h4><span className="booking-error">{error}</span></div>
                            <form method="POST" onSubmit={(e) => confirmationPopUp(e)} className="booking-form" name="booking-form">
                                <input name="name" type="text" placeholder="Full Name" onChange={settingInput} required />
                                <input name="number" type="number" min="1111111111" max="9999999999" placeholder="Phone" onChange={settingInput} required />
                                <input name="people" type="number" min="1" max="10" placeholder="No of People ( max 10 )" onChange={totalPrice} onInput={handleInput} required />
                                <select name="custom-transport" className="custom-transport" onChange={(e) => setreservationInfo(oldInfo => ({...oldInfo, transportation: e.target.value}))} required>
                                    <option value="air">By Air</option>
                                    <option value="road">By Road</option>
                                </select>
                                <div className="booking-calculations">
                                    <div className="booking-calc1">
                                        <p>{pageInfo && pageInfo.price} PKR * 1 person</p>
                                        <p>
                                            {pageInfo && pageInfo.price} PKR
                                        </p>
                                    </div>
                                    <div className="booking-serviceCharge">
                                        <p>Service Charge</p>
                                        <p>1000 PKR</p>
                                    </div>
                                    <div className="booking-total">
                                        <p>Total</p>
                                        <p>{`${pageInfo && (pageInfo.price * reservationInfo.people ) + (reservationInfo.transportation == "air" ? 3000 : 2000)} PKR`}</p>
                                    </div>
                                </div>
                                <button className="booking-booknow">
                                    Book Now
                                </button>
                            </form>
                        </div>


                    </section>
                </section>
            </section>
        </section>
    )
}