import React from "react"
import { Link } from "react-router-dom"
import './HeroAndNav.css'
import Nav from "../nav/nav"

export default function HeroAndNav() {

  const [hamValue, sethamValue] = React.useState(true)
  return (
    <div className='homeHero-mainContainer'>
      <Nav/>
      <div className='homeHero-mainPara'>
        <h2 className='homeHero-ParaHead'>
          Your Journey Your Story
        </h2>
        <p className='homeHero-paragraph'>
          Choose Your Adventure
        </p>
        <Link to="/trips">
          <button className='homeHero-PlanButton'>
          Travel Plan
        </button>
        </Link>
      </div>
    </div>
  )
}