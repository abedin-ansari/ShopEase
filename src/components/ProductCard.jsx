// import Button from "react-bootstrap/Button";
// import Card from "react-bootstrap/Card";
// import { useDispatch } from "react-redux";

// const ProductCard = ({ item }) => (

//   <Card className="product-card">
//     <Card.Img variant="top" src={item.image} alt={item.title} />
//     <Card.Body>
//       <Card.Title>{item.title}</Card.Title>
//       <Card.Text>{item.description}</Card.Text>
//       <span className="product-price">${item.price}</span>
//       <Button variant="primary">Add to Cart</Button>
//     </Card.Body>
//   </Card>
// );

// export default ProductCard;

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useDispatch } from "react-redux";
import { addItems } from "../utils/cartSlice";

const ProductCard = ({ item }) => {
  const dispatch = useDispatch();

  const handleCartItem = () => {
    dispatch(addItems(item));
  };

  return (
    <Card className="product-card">
      <Card.Img variant="top" src={item.image} alt={item.title} />

      <Card.Body>
        <Card.Title>{item.title}</Card.Title>

        <Card.Text>{item.description}</Card.Text>

        <span className="product-price">${item.price}</span>

        <Button variant="primary" onClick={handleCartItem}>
          Add to Cart
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
