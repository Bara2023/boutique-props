import { useState, useEffect } from "react";

function Dashboard({setIsAuthenticated}) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    offer: false,
    user: "", // Ce champ sera mis à jour avec l'ID du current user
  });

  const { name, price, offer, user } = formData;

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    console.log("Données brutes de localStorage :", storedUser); // Vérifier si l'utilisateur est stocké

    if (storedUser) {
      const currentUser = JSON.parse(storedUser);
      console.log("Utilisateur parsé :", currentUser); // Vérifier le format des données

      if (currentUser && currentUser._id) {
        setFormData((prevState) => ({
          ...prevState,
          user: currentUser._id, // Associe l'ID de l'utilisateur connecté
        }));
      } else {
        console.log("Aucun ID utilisateur trouvé");
      }
    } else {
      console.log("Aucun utilisateur stocké dans localStorage");
    }
  }, []);


  const onChange = (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;

    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("Données du produit :", formData); // Log du produit avec l'user
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

export default Dashboard;
