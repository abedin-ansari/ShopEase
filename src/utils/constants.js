// Image Imports
import EcomIMG1 from "../Images/EcomIMG1.jpg";
import EcomIMG2 from "../Images/EcomIMG2.jpg";
import EcomIMG3 from "../Images/EcomIMG3.jpg";
import LoginBG from "../Images/LoginBG.jpg";

// Hero Carousel Slides Data
export const HERO_SLIDES = [
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
    title: "Premium Quality",
    desc: "Shop the best brands at great prices",
  },
];

// Image Assets
export const IMAGES = {
  CAROUSEL_1: EcomIMG1,
  CAROUSEL_2: EcomIMG2,
  CAROUSEL_3: EcomIMG3,
  LOGIN_BG: LoginBG,
};

// API Configuration
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

// Constants
export const APP_NAME = "ShopEase";
export const CURRENCY = "₹";
