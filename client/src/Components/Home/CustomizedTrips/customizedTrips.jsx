import React from "react";
import {Link} from "react-router-dom"
import "./customizedTrips.css"

export default function CustomizedTripHomeSect (){
    return (
        <section className="customHome-body">
            <div className="customHome-heading">
                <h1>Create Your Perfect Getaway</h1>
                <p>Tailor-Made Adventures for Every Traveler</p>
            </div>
            <div className="customHome-para">
            <p>
            we believe that every journey should be as unique as the traveler embarking on it. Our customizable trip planner allows you to design your dream vacation, tailored to your interests, preferences, and budget. Whether you're seeking a relaxing beach retreat, an adventurous mountain trek, or a cultural city exploration, our easy-to-use tool ensures your trip is perfectly aligned with your desires. Explore endless possibilities, choose from a wide array of destinations and activities, and craft an itinerary that 
            transforms your travel dreams into reality. Start planning today and experience travel like never before!
            </p>
            <div className="customHome-button">
               <Link to={"/customize"}>
                <button>
                    Make Your Own Trip
                </button>
               </Link>
            </div>
            </div>
        </section>
    )
}