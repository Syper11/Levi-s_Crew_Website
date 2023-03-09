import React from 'react';
import Carousel from 'react-material-ui-carousel';
import SliderItems from './SliderItems';
import slider from "../helper/slider";



function CarouselSlider(){

  return (
    <div style={{ backgroundColor: "#5CB1CC", height: "850px", width: "100%" }}>
      <Carousel interval={8000}>
        {slider.map((item) => (
          <SliderItems key={item.id} item={item} />
        ))}
      </Carousel>
    </div>
  );
}

export default CarouselSlider;