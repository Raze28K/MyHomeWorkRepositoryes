// src/pages/Shop.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Search from "../components/Search/Search";
import ProductCard from "../components/ProductCard/ProductCard";

import { loadProducts, setQuery } from "../features/shop/shopSlice";
import {
  selectVisibleProducts,
  selectLoading,
  selectError,
  selectQuery,
} from "../features/shop/shopSelectors";

function Shop() {
  const dispatch = useDispatch();

  const products = useSelector(selectVisibleProducts);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const query = useSelector(selectQuery);

  useEffect(() => {
    dispatch(loadProducts());
  }, [dispatch]);

  return (
    <>
      <h1>Магазин</h1>

      <Search
        value={query}
        onChange={(value) => dispatch(setQuery(value))}
      />

      {loading && <p>Загрузка...</p>}
      {error && <p style={{ color: "crimson" }}>{error}</p>}

      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </>
  );
}

export default Shop;
