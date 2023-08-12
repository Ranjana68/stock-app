import React, { useReducer } from "react";
import "./StockPicker.css";

const stockData = [
  {
    name: "Apple Inc.",
    symbol: "AAPL",
    description: "Apple Inc. is a multinational technology company...",
    current_price: 150.25,
    change: "+2.18%",
    traded_on: "NASDAQ",
    industry: "Technology",
    pe_ratio: 28.45,
    market_cap: "2.5T"
  },
  {
    name: "Amazon.com Inc.",
    symbol: "AMZN",
    description: "Amazon.com, Inc. is an American e-commerce and...",
    current_price: 3250.75,
    change: "-1.05%",
    traded_on: "NASDAQ",
    industry: "Retail",
    pe_ratio: 72.91,
    market_cap: "1.6T"
  },
  {
    name: "Microsoft Corporation",
    symbol: "MSFT",
    description: "Microsoft Corporation is a multinational technology...",
    current_price: 305.4,
    change: "+0.75%",
    traded_on: "NASDAQ",
    industry: "Technology",
    pe_ratio: 37.89,
    market_cap: "2.3T"
  },
  {
    name: "Tesla, Inc.",
    symbol: "TSLA",
    description: "Tesla, Inc. is an American electric vehicle and clean...",
    current_price: 720.6,
    change: "-0.50%",
    traded_on: "NASDAQ",
    industry: "Automotive",
    pe_ratio: 176.25,
    market_cap: "750B"
  }
];

const initialState = {
  searchTerm: "",
  selectedStock: null,
  autocompleteResults: []
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_SEARCH_TERM":
      return { ...state, searchTerm: action.payload };
    case "SET_AUTOCOMPLETE_RESULTS":
      return { ...state, autocompleteResults: action.payload };
    case "SET_SELECTED_STOCK":
      return { ...state, selectedStock: action.payload };
    default:
      return state;
  }
};

function StockPicker() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSearchTermChange = (event) => {
    const newSearchTerm = event.target.value;
    dispatch({ type: "SET_SEARCH_TERM", payload: newSearchTerm });

    if (newSearchTerm.trim() === "") {
      dispatch({ type: "SET_AUTOCOMPLETE_RESULTS", payload: [] });
      return;
    }

    const filteredStocks = stockData.filter((stock) =>
      stock?.symbol?.toLowerCase().includes(newSearchTerm?.toLowerCase())
    );

    dispatch({ type: "SET_AUTOCOMPLETE_RESULTS", payload: filteredStocks });
  };

  const handleAutocompleteClick = (stock) => {
    dispatch({ type: "SET_SELECTED_STOCK", payload: stock });
    dispatch({ type: "SET_AUTOCOMPLETE_RESULTS", payload: [] });
    dispatch({ type: "SET_SEARCH_TERM", payload: "" });
  };

  const handleSearch = () => {
    const foundStock = stockData.find(
      (stock) =>
        stock?.symbol?.toLowerCase() === state?.searchTerm?.toLowerCase()
    );

    dispatch({ type: "SET_SELECTED_STOCK", payload: foundStock });
    dispatch({ type: "SET_SEARCH_TERM", payload: "" });
  };

  return (
    <div className="stock-picker">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for a stock symbol"
          value={state.searchTerm}
          onChange={handleSearchTermChange}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {state.autocompleteResults.length > 0 && (
        <ul className="autocomplete-list">
          {state.autocompleteResults.map((stock) => (
            <li
              key={stock.symbol}
              onClick={() => handleAutocompleteClick(stock)}
            >
              {stock.symbol} - {stock.name}
            </li>
          ))}
        </ul>
      )}
      {state.selectedStock && (
        <div className="stock-details">
          <h2>{state.selectedStock.name}</h2>
          <p>{state.selectedStock.description}</p>
          <p>Symbol: {state.selectedStock.symbol}</p>
          <p>Current Price: {state.selectedStock.current_price}</p>
          <p>Change: {state.selectedStock.change}</p>
          <p>Traded On: {state.selectedStock.traded_on}</p>
          <p>Industry: {state.selectedStock.industry}</p>
          <p>PE Ratio: {state.selectedStock.pe_ratio}</p>
          <p>Market Cap: {state.selectedStock.market_cap}</p>
        </div>
      )}
    </div>
  );
}

export default StockPicker;
