import HeroCarousel from "./HeroCarousel";
import ProductCard from "./ProductCard";
import Footer from "./Footer";
import productData from "../../db.json";

const Home = () => {
  const products = productData.products || [];

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
