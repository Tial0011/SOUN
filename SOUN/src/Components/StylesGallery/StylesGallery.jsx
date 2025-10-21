import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { Link } from "react-router-dom";
import "./StylesGallery.css";

const StylesGallery = () => {
  const [styles, setStyles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStyles = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "styles"));
        const stylesList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setStyles(stylesList);
      } catch (error) {
        console.error("Error fetching styles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStyles();
  }, []);

  if (loading) return <p style={{ textAlign: "center" }}>Loading styles...</p>;

  return (
    <div className="styles-gallery">
      <h2>Choose Your Style ✨</h2>
      <div className="styles-grid">
        {styles.map((style) => (
          <Link to={`/style/${style.id}`} key={style.id} className="style-card">
            <img
              src={style.imageUrl}
              alt={style.name}
              className="style-image"
            />
            <h3>{style.name}</h3>
            <p>{style.category}</p>
            <p className="price">₦{style.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default StylesGallery;
