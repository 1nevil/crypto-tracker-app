import React from "react";
import "./Coincard.css";
const Coincard = ({
  name,
  image,
  symbol,
  price,
  volume,
  priceChange,
  marketcap,
}) => {
  return (
    <div className="coin-container">
      <div
        className={
          priceChange < 0 ? "coin_row shadowred" : "coin_row shadowgreen"
        }
      >
        <div className="coin">
          <img src={image} alt="Coin image" />
          <h2>{name}</h2>
          <p className="crypto_symbol">{symbol}</p>
        </div>
        <div className="coin_data">
          <p className="coin-price">${price}</p>
          <p className="coin-volumn">${volume.toLocaleString()}</p>
          {priceChange < 0 ? (
            <p className="coin-per red">{priceChange.toFixed(2)} %</p>
          ) : (
            <p className="coin-per green">{priceChange.toFixed(2)} %</p>
          )}
          <p className="marketcap">
            Market cap : ${marketcap.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Coincard;
