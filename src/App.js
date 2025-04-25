import React, { useEffect, useState } from "react";
import axios from "axios";

import ProductCard from "./components/ProductCard";
import SkeletonLoader from "./components/SkeletonLoader";
import Buttons from "./components/Buttons";
import InputBox from "./components/InputBox";
import SortingButtons from "./components/SortingButtons";

import "./App.css";

const App = () => {
  const [productsData, setProductsData] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [debounceSearchTerm, setDebounceSearchTerm] = useState("");
  const [sortingOrder, setSortingOrder] = useState("");

  const PAGE_SIZE = 8;
  const noOfTotalPages = Math.ceil(totalProducts / PAGE_SIZE);

  const fetchData = async (pageNumber) => {
    try {
      setIsLoadingData(true);
      const skip = (pageNumber - 1) * PAGE_SIZE;

      let url = `https://dummyjson.com/products?limit=${PAGE_SIZE}&skip=${skip}`;
      let response;
      let products;

      if (debounceSearchTerm) {
        url = `https://dummyjson.com/products/search?q=${debounceSearchTerm}`;
        response = await axios.get(url);
      } else {
        response = await axios.get(url);
      }

      products = response?.data?.products;

      setTotalProducts(response.data?.total || 0);
      setProductsData(products);
    } catch (error) {
      console.log("Error in fetching products", error.message);
    } finally {
      setIsLoadingData(false);
    }
  };

  useEffect(() => {
    if (debounceSearchTerm === "" && searchTerm !== "") return;
    fetchData(currentPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage, debounceSearchTerm]);

  const handlePrevClick = () => {
    setSortingOrder("");
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextClick = () => {
    setSortingOrder("");
    setCurrentPage((prev) => prev + 1);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  const handleSort = (sortOrder) => {
    let products = productsData;
    if (sortOrder) {
      products = [...products].sort((a, b) => {
        return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
      });
    }

    setProductsData(products);
  };

  return (
    <div className="app-container">
      <div>
        <div className="header-container">
          <InputBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <Buttons
            handleNextClick={handleNextClick}
            handlePrevClick={handlePrevClick}
            currentPage={currentPage}
            noOfTotalPages={noOfTotalPages}
          />
        </div>
        <SortingButtons
          setSortingOrder={setSortingOrder}
          sortingOrder={sortingOrder}
          handleSort={handleSort}
        />
      </div>

      <div>
        {isLoadingData ? (
          <div className="products-container">
            {[...Array(PAGE_SIZE)].map((_, idx) => (
              <SkeletonLoader idx={idx} />
            ))}
          </div>
        ) : (
          <>
            {productsData.length === 0 ? (
              <div>No products Found</div>
            ) : (
              <>
                <div className="products-container">
                  {productsData?.map((products, i) => (
                    <ProductCard
                      title={products.title}
                      description={products.description}
                      thumbNail={products.thumbnail}
                      price={products.price}
                      key={products.id}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default App;
