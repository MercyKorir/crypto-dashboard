import React, { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "../../styles/home-sections/CryptoList.module.css";

const CryptoList = () => {
  const [username, setUsername] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const queryClient = useQueryClient();

  const {
    data: cryptos,
    isLoading,
    error,
  } = useQuery(
    ["cryptos", currentPage, itemsPerPage],
    async () => {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets",
        {
          params: {
            vs_currency: "usd",
            order: "market_cap_desc",
            per_page: itemsPerPage,
            page: currentPage,
            sparkline: false,
          },
        }
      );

      setTotalPages(Math.ceil(response.headers["total"] / itemsPerPage));
      return response.data;
    },
    {
      keepPreviousData: true,
      staleTime: 60000,
    }
  );

  useEffect(() => {
    const userName = localStorage.getItem("userName");
    if (userName) {
      setUsername(userName);
    }
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    queryClient.invalidateQueries(["cryptos", pageNumber, itemsPerPage]);
  };

  const getPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.min(totalPages, 20); i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <div className={styles.cryptoListContainer}>
      <div className={styles.cryptoListContent}>
        <div className={styles.popularInfoContainer}>
          <div className={styles.popularInfoContent}>
            <div className={styles.recentCardWrapper}>
              <h2>Welcome, {username}!</h2>
              <p>This is your dashboard.</p>
            </div>
            <div className={styles.popularCardWrapper}>
              <h2>Popular</h2>
              <p>Check out the latest trends.</p>
            </div>
          </div>
        </div>
        <div className={styles.cryptoTableContainer}>
          <div className={styles.cryptoTableContent}>
            <table className={styles.cryptoTable}>
              <thead>
                <tr>
                  <th className={styles.headerNames}>#</th>
                  <th className={styles.headerNames}>Name</th>
                  <th className={styles.headerNames}>Price</th>
                  <th className={styles.headerNames}>24h %</th>
                  <th className={styles.headerNames}>Market Cap</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan="5" className={styles.cryptoData}>
                      Loading...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan="5" className={styles.cryptoData}>
                      An Error occurred! Please try again later.
                    </td>
                  </tr>
                ) : cryptos && cryptos.length > 0 ? (
                  cryptos.map((crypto, index) => {
                    return (
                      <tr key={crypto.id}>
                        <td className={styles.cryptoData}>
                          {(currentPage - 1) * itemsPerPage + index + 1}
                        </td>
                        <td className={styles.logoNameSymbol}>
                          <img
                            src={crypto.image}
                            alt={crypto.name}
                            className={styles.cryptoLogo}
                          />
                          <span>
                            <Link
                              to={`/crypto/${crypto.id}`}
                              className={styles.nameLink}
                            >
                              {crypto.name}
                            </Link>
                          </span>
                          <span className={styles.cryptoSymbol}>
                            {crypto.symbol.toUpperCase()}
                          </span>
                        </td>
                        <td className={styles.cryptoData}>
                          ${crypto.current_price}
                        </td>
                        <td className={styles.cryptoPrice}>
                          {crypto.price_change_percentage_24h?.toFixed(2) ??
                            "N/A"}
                          %
                        </td>
                        <td className={styles.cryptoData}>
                          ${crypto.market_cap}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="5" className={styles.cryptoData}>
                      No data available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className={styles.paginationContainer}>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {getPageNumbers().map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                disabled={currentPage === pageNumber}
              >
                {pageNumber}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoList;
