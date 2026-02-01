import { useParams, Link } from "react-router-dom";
import { fetchProducts } from "../data/products";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import LikeButton from "../components/LikeButton/LikeButton";
import { toggleLike } from "../features/likes/likesSlice";
import { selectIsLiked, selectLikesCount } from "../features/likes/likesSelectors";

function ProductPages() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const isLiked = useSelector((state) => selectIsLiked(state, id));
  const likesCount = useSelector((state) => selectLikesCount(state, id));

  useEffect(() => {
    fetchProducts().then((products) => {
      const found = products.find((p) => p.id === Number(id));
      setProduct(found);
      setLoading(false);
    });
  }, [id]);

  const handleToggleLike = () => {
    dispatch(toggleLike(Number(id)));
  };

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <CircularProgress />
      </Box>
    );
  if (!product)
    return (
      <Box sx={{ py: 2 }}>
        <Typography color="text.secondary">Товар не найден</Typography>
        <Button component={Link} to="/shop" sx={{ mt: 1 }}>
          Вернуться в магазин
        </Button>
      </Box>
    );

  return (
    <Paper variant="outlined" sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {product.title}
      </Typography>
      <Typography color="text.secondary" paragraph>
        Цена: {product.price}
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        ID товара: {id}
      </Typography>
      <LikeButton
        isLiked={isLiked}
        likesCount={likesCount}
        onToggle={handleToggleLike}
      />
    </Paper>
  );
}

export default ProductPages;
