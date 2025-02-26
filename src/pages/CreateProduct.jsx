/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from "axios";

function CreateProduct() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    offer: false,
  });

  const { name, price, offer } = formData;

  const onChange = (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;

    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: value, // Mise à jour de la valeur correcte pour le champ
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("Données du produit: ", formData);

    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Erreur: Vous devez être connecté pour créer un produit.");
      alert("Vous devez être connecté pour créer un produit.")
      return // Empêche l'exécution de la requête
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post("http://localhost:5000/api/products", formData, config);
      console.log("Produit créé: ", response.data);
    } catch (error) {
      console.error("Erreur lors de la création du produit: ", error);
    }
  };

  return (
    <section className="form">
      <div className="form-group">
        <form onSubmit={onSubmit}>
          <input
            type="text"
            className="form-control"
            name="name"
            id="name"
            placeholder="Veuillez entrer un nom"
            value={name}
            onChange={onChange}
          />

          <input
            type="number"
            className="form-control"
            name="price"
            id="price"
            placeholder="Veuillez entrer un prix"
            value={price}
            onChange={onChange}
          />

          <div className="form-group">
            <label>
              Offer:
              <input type="checkbox" name="offer" checked={offer} onChange={onChange} />
            </label>
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Soumettre
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default CreateProduct;
