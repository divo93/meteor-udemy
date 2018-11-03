import React from 'react'
import FetchWeather from './fetch_weather'
import ImageDetails from './image_details'

const Images = [
  { title: "Pine"},
  { title: "Mug"},
  { title: "Apple"}
]
const ImageList = () => {
  const RenderedImage = Images.map((image,index) => {
    return <ImageDetails image={image} key={index}/>
  })
  return(
    <div>
      {RenderedImage}
    </div>
  )
}

export default ImageList