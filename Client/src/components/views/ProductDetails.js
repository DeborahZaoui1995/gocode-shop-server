import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState();
  
  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((res) => res.json())
      .then((json) => setProduct(json));
  }, [id]);

  return (
    <div>
      <h5>Product Details</h5>
      {product &&
      
        <div>
           <img src={product.image}></img> 

          <h6>{product.title}</h6>

          <h6>{product.price}</h6>

          <h6>{product.description}</h6>

          <h6>{product.category}</h6>
        </div>
      }
    </div>
  );
}

export default ProductDetails;
