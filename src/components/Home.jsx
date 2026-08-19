import { useEffect, useState } from "react";
import axios from "axios";
import HeroCarousel from "./HeroCarousel";
import ProductCard from "./ProductCard";
import Footer from "./Footer";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/products")
      .then((res) => setProducts(res.data || []));
  }, []);

  return (
    <>
      <HeroCarousel />
      <section className="products-section">
        <h2>Our Latest Products</h2>
        <p className="products-subtitle">Handpicked items just for you</p>
        <div className="products-grid">
          {products.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Home;
