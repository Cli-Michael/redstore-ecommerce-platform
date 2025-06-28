import React, { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";

const Offer = () => {
  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOffer = async () => {
      try {
        const { data } = await axiosInstance.get("/api/offers/offer-show");
        setOffer(data);
      } catch (err) {
        setError("Failed to load offer details.");
        console.error("Error fetching offer:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOffer();
  }, []);

  if (loading) {
    return (
      <div className="offer">
        <div className="small-container">
          <p>Loading offer details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center" }}>
        <img
          src="images/Empty.png"
          alt="No Data Available"
          style={{ width: "200px", height: "200px", objectFit: "contain" }}
        />
      </div>
    );
  }

  if (!offer) {
    return (
      <div className="offer">
        <div className="small-container">
          <p>No offers available at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="offer">
      <div className="small-container">
        <div className="row">
          <div className="col-2">
            <img src={offer.image} className="offer-img" alt="Offer" />
          </div>
          <div className="col-2">
            <p>Exclusively Available on {offer.platform || "Our Store"}</p>
            <h1>{offer.title}</h1>
            <small>{offer.description}</small>
            <div>
              <a href={"#"} className="btn">
                Buy Now &#8594;
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offer;
