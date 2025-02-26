import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const currentUser = JSON.parse(storedUser);
      setUser(currentUser); // Mets à jour l'état avec les données de l'utilisateur
      console.log("current user: ", currentUser)
    } else {
      navigate("/login"); // Si aucun utilisateur n'est connecté, redirige vers la page de login
    }
  }, [navigate]);

  return (
    <div>
      {user ? (
        <>
          <h1>Bienvenue {user.name}</h1>
          <div className="centered-div">
            <button className="btn" onClick={() => navigate("/create-product")}>Créer un produit</button>
            <button className="btn" onClick={() => navigate("/my-products")}>Voir mes produits</button>
          </div>
        </>
      ) : (
        <p>Chargement...</p>
      )}
    </div>
  );
}

export default Dashboard;
