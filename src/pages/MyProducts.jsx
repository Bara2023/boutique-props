import { useState, useEffect } from "react";
import axios from "axios";

function MyProducts() {
  const [products, setProducts] = useState([])
  const fetchProducts = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Veuillez vous connecter !");
      console.log("Aucun token trouvé !");
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get("http://localhost:5000/api/products/my-products", config);
      console.log("✅ Produits récupérés :", response.data);
      setProducts(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération :", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchProducts()
  }, []);

  return (
    <div>
      <h2>Mes Produits</h2>
      {products.length > 0 ? (
        <ul>
          {products.map((product) => (
            <li key={product._id}>
              <h3>{product.name}</h3>
              <p>Prix: {product.price} €</p>
              <p>Offre: {product.offer ? "Oui" : "Non"}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucun produit trouvé.</p>
      )}
    </div>
  );
}

export default MyProducts;
