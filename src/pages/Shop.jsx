import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Search from "../components/Search/Search";
import ProductCard from "../components/ProductCard/ProductCard";
import { loadProducts, setQuery } from "../features/shop/shopSlice";
import {
  selectVisibleProducts,
  selectLoading,
  selectError,
  selectQuery,
} from "../features/shop/shopSelectors";

const SORT_OPTIONS = [
  { value: "default", label: "По умолчанию" },
  { value: "price_asc", label: "Цена: по возрастанию" },
  { value: "price_desc", label: "Цена: по убыванию" },
  { value: "name_asc", label: "Название: А–Я" },
  { value: "name_desc", label: "Название: Я–А" },
];

function Shop() {
  const dispatch = useDispatch();
  const [sortBy, setSortBy] = useState("default");

  const products = useSelector(selectVisibleProducts);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const query = useSelector(selectQuery);

  const sortedProducts = useMemo(() => {
    const list = [...products];
    switch (sortBy) {
      case "price_asc":
        return list.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
      case "price_desc":
        return list.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
      case "name_asc":
        return list.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
      case "name_desc":
        return list.sort((a, b) => (b.title || "").localeCompare(a.title || ""));
      default:
        return list;
    }
  }, [products, sortBy]);

  useEffect(() => {
    dispatch(loadProducts());
  }, [dispatch]);

  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        Магазин
      </Typography>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mb: 3 }}>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Search
            value={query}
            onChange={(value) => dispatch(setQuery(value))}
          />
        </Box>
        <FormControl sx={{ minWidth: 220 }} size="small">
          <InputLabel id="sort-label">Сортировка</InputLabel>
          <Select
            labelId="sort-label"
            value={sortBy}
            label="Сортировка"
            onChange={(e) => setSortBy(e.target.value)}
          >
            {SORT_OPTIONS.map(({ value, label }) => (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress />
        </Box>
      )}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {!loading && !error && (
        <Grid container spacing={2}>
          {sortedProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
}

export default Shop;
