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
            <div className="style-card-images">
              {/* Full Outfit (Left) */}
              <img
                src={
                  style.fullImage ||
                  "https://via.placeholder.com/180x200?text=Full+Outfit"
                }
                alt={style.name}
                className="full-image"
              />

              {/* Right side collage (Top & Bottom) */}
              <div className="right-collage">
                <img
                  src={
                    style.top?.image ||
                    "https://via.placeholder.com/100x95?text=Top"
                  }
                  alt={style.top?.name || "Top"}
                  className="top-image"
                />
                <img
                  src={
                    style.bottom?.image ||
                    "https://via.placeholder.com/100x95?text=Bottom"
                  }
                  alt={style.bottom?.name || "Bottom"}
                  className="bottom-image"
                />
              </div>
            </div>

            <div className="style-info">
              <h3>{style.name}</h3>
              <p>{style.category}</p>
              <p className="price">₦{style.price?.toLocaleString()}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default StylesGallery;
