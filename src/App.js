import axios from "axios";
import React, { useState, useEffect } from "react";
import Coincard from "./Coincard";
import "./App.css";
import InfiniteScroll from "react-infinite-scroll-component";

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [pages, setPages] = useState(1);
  const [hasMore, sethasMore] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=${pages}&sparkline=false`
      );
      //because by default in devlopment phase useEffect run 2 times thats why added this condition
      const data = await res.data;
      pages === 1 ? setCoins(data) : setCoins((prev) => [...prev, ...data]);
      setPages(pages + 1);
    } catch (error) {
      alert("So many Api request are open " + error);
    }
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
    sethasMore(false);
    if (e.target.value === "") {
      sethasMore(true);
    }
  };

  const filteredCoins = coins.filter((coin) => {
    return coin.name.toLowerCase().includes(search.toLowerCase());
  });
  return (
    <div className="Coin_app">
      <div className="coin_search">
        <h1 className="coin-text">Crypto currency</h1>
        <form>
          <input
            type="text"
            placeholder="Search crypto currency"
            className="coin_input"
            onChange={handleChange}
          />
        </form>
      </div>

      <InfiniteScroll
        dataLength={coins.length}
        hasMore={hasMore}
        next={fetchData}
        loader={<h6 className="loading">Loading...</h6>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            {hasMore && <b>You have seen it all</b>}
          </p>
        }
      >
        {filteredCoins.map((coin) => {
          return (
            <Coincard
              key={coin.id}
              name={coin.name}
              price={coin.current_price}
              symbol={coin.symbol}
              marketcap={coin.total_volume}
              volume={coin.market_cap}
              image={coin.image}
              priceChange={coin.price_change_percentage_24h}
            />
          );
        })}
      </InfiniteScroll>
    </div>
  );
}
export default App;
