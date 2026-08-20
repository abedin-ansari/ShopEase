import Carousel from "react-bootstrap/Carousel";
import { HERO_SLIDES } from "../utils/constants";

const HeroCarousel = () => (
  <Carousel fade interval={4000} className="hero-carousel">
    {HERO_SLIDES.map((slide, i) => (
      <Carousel.Item key={i}>
        <img src={slide.img} alt={slide.title} />
        <div className="hero-overlay" />
        <Carousel.Caption>
          <h2>{slide.title}</h2>
          <p>{slide.desc}</p>
        </Carousel.Caption>
      </Carousel.Item>
    ))}
  </Carousel>
);

export default HeroCarousel;
