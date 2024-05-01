import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import LoadingAnimation from "./LoadingAnimation";
import styles from "../styles/Details.module.css";

const Details = () => {
  const { id } = useParams();
  const [cryptoDetails, setCryptoDetails] = useState(null);

  useEffect(() => {
    const fetchCryptoDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${id}`
        );
        setCryptoDetails(response.data);
      } catch (error) {
        console.error("Error fetching crypto details:", error);
      }
    };

    fetchCryptoDetails();
  }, [id]);

  if (!cryptoDetails) {
    return <LoadingAnimation />;
  }

  return (
    <div className={styles.cryptoPageContainer}>
      <div className={styles.detailsContainer}>
        <div className={styles.header}>
          <img
            src={cryptoDetails.image.large}
            alt={cryptoDetails.name}
            className={styles.logo}
          />
          <h2 className={styles.title}>{cryptoDetails.name}</h2>
          <p className={styles.symbol}>{cryptoDetails.symbol}</p>
        </div>
        <div className={styles.details}>
          <div className={styles.priceContainer}>
            <h3>Current Price</h3>
            <p>${cryptoDetails.market_data.current_price.usd}</p>
          </div>
          <div className={styles.marketCapContainer}>
            <h3>Market Cap</h3>
            <p>${cryptoDetails.market_data.market_cap.usd}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
