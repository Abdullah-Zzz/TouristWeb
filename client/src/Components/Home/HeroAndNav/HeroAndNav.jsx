import React from "react"
import { Link } from "react-router-dom"
import './HeroAndNav.css'
import Nav from "../nav/nav"
import Typed from 'typed.js';

export default function HeroAndNav() {
    React.useEffect(() => {
      const options = {
        strings: ['The Beauty Of Pakistan.'],
        typeSpeed: 50,
      };
      
      const typed = new Typed('#typed-element', options);
      
      return () => {
        typed.destroy();
      };
    }, []);

  const [hamValue, sethamValue] = React.useState(true)
  return (
    <div className='homeHero-mainContainer'>
      <Nav/>
      <div className='homeHero-mainPara'>
        <h2 className='homeHero-ParaHead'>
          Explore <span id="typed-element"></span>
        </h2>
        <p className='homeHero-paragraph'>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam odio, vero nulla tempora assumenda aliquid delectus molestias, expedita 
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