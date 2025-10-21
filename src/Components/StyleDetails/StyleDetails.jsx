import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase";
import { doc, getDoc, setDoc, collection } from "firebase/firestore";
import { auth } from "../../firebase";
import "./StyleDetails.css";

const StyleDetails = () => {
  const { id } = useParams();
  const [style, setStyle] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [measurements, setMeasurements] = useState({
    chest: "",
    waist: "",
    length: "",
    hip: "",
    sleeve: "",
  });

  useEffect(() => {
    const fetchStyle = async () => {
      const docRef = doc(db, "styles", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) setStyle(docSnap.data());
    };
    fetchStyle();
  }, [id]);

  const handleChange = (e) => {
    setMeasurements({ ...measurements, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) {
      alert("You must be logged in to save measurements!");
      return;
    }

    try {
      await setDoc(doc(collection(db, "measurements"), `${user.uid}_${id}`), {
        userId: user.uid,
        styleId: id,
        ...measurements,
        timestamp: new Date(),
      });
      alert("✅ Measurements saved successfully!");
      setShowForm(false);
    } catch (err) {
      console.error(err);
      alert("❌ Error saving measurements.");
    }
  };

  if (!style) return <p className="loading">Loading style details...</p>;

  return (
    <div className="style-details-container">
      <h1 className="style-title">{style.name}</h1>
      <p className="style-description">{style.description}</p>

      {/* Full Outfit */}
      <div className="style-full">
        <img
          src={style.fullImage}
          alt={style.name}
          className="style-full-image"
        />
      </div>

      {/* Top Section */}
      <div className="style-section">
        <h2>Top</h2>
        <img
          src={style.top?.image}
          alt={style.top?.name}
          className="style-part-image"
        />
        <div className="style-text">
          <h3>{style.top?.name}</h3>
          <p>{style.top?.description}</p>
          <p>
            <strong>Fabric:</strong> {style.top?.fabric}
          </p>
          <p>
            <strong>Details:</strong> {style.top?.details}
          </p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="style-section">
        <h2>Bottom</h2>
        <img
          src={style.bottom?.image}
          alt={style.bottom?.name}
          className="style-part-image"
        />
        <div className="style-text">
          <h3>{style.bottom?.name}</h3>
          <p>{style.bottom?.description}</p>
          <p>
            <strong>Fabric:</strong> {style.bottom?.fabric}
          </p>
          <p>
            <strong>Details:</strong> {style.bottom?.details}
          </p>
        </div>
      </div>

      <div className="style-meta">
        <p>
          <strong>Category:</strong> {style.category}
        </p>
        <p>
          <strong>Price:</strong> ₦{style.price.toLocaleString()}
        </p>
      </div>

      {/* 📏 Add Measurement Button */}
      <div className="measurement-btn-container">
        <button onClick={() => setShowForm(true)} className="measurement-btn">
          📏 Add Your Measurements
        </button>
      </div>

      {/* Popup Form */}
      {showForm && (
        <div className="measurement-popup">
          <div className="measurement-form-container">
            <h2>Enter Your Measurements</h2>
            <form onSubmit={handleSubmit}>
              {Object.keys(measurements).map((key) => (
                <div key={key} className="input-group">
                  <label>{key.toUpperCase()}</label>
                  <input
                    type="number"
                    name={key}
                    value={measurements[key]}
                    onChange={handleChange}
                    placeholder={`Enter ${key} (in inches/cm)`}
                    required
                  />
                </div>
              ))}
              <div className="form-actions">
                <button type="submit" className="save-btn">
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="cancel-btn"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StyleDetails;
