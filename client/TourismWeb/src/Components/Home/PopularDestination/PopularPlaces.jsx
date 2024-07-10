import './Destination.css'

export default function PopularPlaces(props){
    return(
        <div className={props.class}>
          <div className='popularPlace-funDestinationsPara'>
            <h4>
              {props.title}
            </h4>
            <p> 
              {props.para}
            </p>
          </div>
          <div className='popularPlace-destinationsPhotos'>
              <img src={props.Img1} />
              <img src={props.Img2} />
          </div>
        </div>

    )
}