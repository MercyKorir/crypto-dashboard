import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import LoadingAnimation from "./LoadingAnimation";
import styles from "../styles/Details.module.css";

const Details = () => {
  const { id } = useParams();
  const [cryptoDetails, setCryptoDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCryptoDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${id}`
        );
        setCryptoDetails(response.data);
      } catch (error) {
        console.error("Error fetching crypto details:", error);
        setError("Failed to fetch crypto details. Please try again later");
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 3000);
      }
    };

    fetchCryptoDetails();
  }, [id]);

  console.log(cryptoDetails);

  if (isLoading) {
    return <LoadingAnimation />;
  }

  return (
    <div className={styles.cryptoPageContainer}>
      <div className={styles.detailsContainer}>
        {error ? (
          <p>{error.message}</p>
        ) : (
          <>
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
              <div className={styles.itemInfoContainer}>
                <h3>Current Price</h3>
                <p>${cryptoDetails.market_data.current_price.usd}</p>
              </div>
              <div className={styles.itemInfoContainer}>
                <h3>Market Cap</h3>
                <p>${cryptoDetails.market_data.market_cap.usd}</p>
              </div>
              <div className={styles.itemInfoContainer}>
                <h3>Creation Date</h3>
                <p>{cryptoDetails.genesis_date}</p>
              </div>
              <div className={styles.itemInfoContainer}>
                <h3>Total Supply</h3>
                <p>{cryptoDetails.market_data.total_supply}</p>
              </div>
              <div className={styles.itemInfoContainer}>
                <h3>Total Volume</h3>
                <p>${cryptoDetails.market_data.total_volume.usd}</p>
              </div>
              <div className={styles.itemInfoContainer}>
                <h3>High 24H</h3>
                <p>${cryptoDetails.market_data.high_24h.usd}</p>
              </div>
              <div className={styles.itemInfoContainer}>
                <h3>Low 24H</h3>
                <p>${cryptoDetails.market_data.low_24h.usd}</p>
              </div>
              <div className={styles.itemInfoContainer}>
                <h3>Market Cap Change 24H</h3>
                <p>
                  $
                  {
                    cryptoDetails.market_data.market_cap_change_24h_in_currency
                      .usd
                  }
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Details;
