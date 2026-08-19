import Carousel from "react-bootstrap/Carousel";
import EcomIMG1 from "../Images/EcomIMG1.jpg";
import EcomIMG2 from "../Images/EcomIMG2.jpg";
import EcomIMG3 from "../Images/EcomIMG3.jpg";

const slides = [
  {
    img: EcomIMG1,
    title: "New Collection 2026",
    desc: "Discover the latest trends in fashion",
  },
  {
    img: EcomIMG2,
    title: "Winter Sale",
    desc: "Up to 50% off on selected items",
  },
  {
    img: EcomIMG3,
    // title: "Premium Quality",
    // desc: "Shop the best brands at great prices",
  },
];

const HeroCarousel = () => (
  <Carousel fade interval={4000} className="hero-carousel">
    {slides.map((slide, i) => (
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
