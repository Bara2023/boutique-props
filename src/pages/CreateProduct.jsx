/* eslint-disable no-unused-vars */
import { useState } from "react";

function CreateProduct() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    offer: false,
    user: "",
  });

  const { name, price, offer, user } = formData;

  const onChange = (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;

    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // Pour vérifier les données soumises
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
            placeholder="Please enter a name"
            value={name}
            onChange={onChange}
          />

          <input
            type="number"
            className="form-control"
            name="price"
            id="price"
            placeholder="Please enter a price"
            value={price}
            onChange={onChange}
          />

          {/* Champ checkbox pour l'offre */}
          <div className="form-group">
            <label>
              Offer:
              <input
                type="checkbox"
                name="offer"
                checked={offer}
                onChange={onChange}
              />
            </label>
          </div>

          <input
            type="text"
            className="form-control"
            name="user"
            id="user"
            placeholder="Please enter a user name"
            value={user}
            onChange={onChange}
          />

          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default CreateProduct;
