import axios from "axios";
import React, { useState, useEffect } from "react";
import Coincard from "./Coincard";
import "./App.css";
import InfiniteScroll from "react-infinite-scroll-component";

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [pages, setPages] = useState(2);
  const [hasMore, sethasMore] = useState(true);

  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false`
      )
      .then((res) => {
        setCoins(res.data);
        console.log(res.data);
        console.log(pages);
        // setCoins(res.data);
      })
      .catch((err) =>
        alert("API's are getting some error reopen after some time " + err)
      );
  }, []);

  const fetchData = async () => {
    setPages(pages + 1);
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=${pages}&sparkline=false`
      )
      .then((res) => {
        setCoins((prev) => [...prev, ...res.data]);
      })
      .catch((err) =>
        alert("API's are getting some error reopen after some time " + err)
      );
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
        <h1 className="coin-text">Search crypto currency</h1>
        <form>
          <input
            type="text"
            placeholder="Search"
            className="coin_input"
            onChange={handleChange}
          />
        </form>
      </div>

      <InfiniteScroll
        dataLength={coins.length}
        hasMore={hasMore}
        next={fetchData}
        loader={
          <p style={{ textAlign: "center", margin: "2rem 0" }}>
            {<b>Loading...</b>}
          </p>
        }
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
